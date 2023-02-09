import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    VendureConfig,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import 'dotenv/config';
import path from 'path';
import { RandomCatPlugin } from './plugins/cats/cat';
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';

const IS_DEV = process.env.APP_ENV === 'dev';

export const config: VendureConfig = {
    apiOptions: {
        port: 3000,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        // The following options are useful in development mode,
        // but are best turned off for production for security
        // reasons.
        ...(IS_DEV ? {
            adminApiPlayground: {
                settings: { 'request.credentials': 'include' } as any,
            },
            adminApiDebug: true,
            shopApiPlayground: {
                settings: { 'request.credentials': 'include' } as any,
            },
            shopApiDebug: true,
        } : {}),
    },
    authOptions: {
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: process.env.SUPERADMIN_USERNAME,
            password: process.env.SUPERADMIN_PASSWORD,
        },
        cookieOptions: {
          secret: process.env.COOKIE_SECRET,
        },
    },
    dbConnectionOptions: {
        type: 'postgres',
        // See the README.md "Migrations" section for an explanation of
        // the `synchronize` and `migrations` options.
        synchronize: true,
        migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
        logging: false,
        database: process.env.DB_NAME,
        schema: process.env.DB_SCHEMA,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    // When adding or altering custom field definitions, the database will
    // need to be updated. See the "Migrations" section in README.md.
    customFields: {
      Product: [
        { name: 'intensity', type: 'int', min: 0, max: 100, defaultValue: 0 },
      ],
    },
    plugins: [
        RandomCatPlugin,
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            // For local dev, the correct value for assetUrlPrefix should
            // be guessed correctly, but for production it will usually need
            // to be set manually to match your production url.
            assetUrlPrefix: IS_DEV ? undefined : 'https://www.my-shop.com/assets',
        }),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation.
                // Here we are assuming a storefront running at http://localhost:8080.
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
            },
        }),
        AdminUiPlugin.init({
            adminUiConfig: {
                apiPort: 3000,
                brand: 'My Store phone',
                hideVendureBranding: true,
                hideVersion: true,
              }, 
            route: "admin",
            port: 3002,
            app: compileUiExtensions({
              outputPath: path.join(__dirname, '../admin-ui'),
              extensions: [{
                // Points to the path containing our Angular "glue code" module
                extensionPath: path.join(__dirname, 'ui-extension/modules'),
                ngModules: [
                  {
                    // We want to lazy-load our extension...
                    type: 'lazy',
                    // ...when the `/admin/extensions/react-ui`
                    // route is activated
                    route: 'react-ui',
                    // The filename of the extension module
                    // relative to the `extensionPath` above
                    ngModuleFileName: 'react-extension.module.ts',
                    // The name of the extension module class exported
                    // from the module file.
                    ngModuleName: 'ReactUiExtensionModule',
                  },
                ],
                staticAssets: [
                  // This is where we tell the compiler to copy the compiled React app
                  // artifacts over to the Admin UI's `/static` directory. In this case we
                  // also rename "build" to "react-app". This is why the `extensionUrl`
                  // in the module config points to './assets/react-app/index.html'.
                  { path: path.join(__dirname, 'ui-extension/react-app/build'), rename: 'react-app' },
                ],
              }],
              devMode: true,
            }),
          }),
    ],
};
