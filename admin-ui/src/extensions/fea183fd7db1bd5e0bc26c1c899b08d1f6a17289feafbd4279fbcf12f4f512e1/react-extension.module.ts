import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { hostExternalFrame } from '@vendure/admin-ui/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      hostExternalFrame({
        path: '',

        // You can also use parameters which allow the app
        // to have dynamic routing, e.g.
        // path: ':slug'
        // Then you can use the getActivatedRoute() function from the
        // UiDevkitClient in order to access the value of the "slug"
        // parameter.

        breadcrumbLabel: 'React App',
        // This is the URL to the compiled React app index.
        // The next step will explain the "assets/react-app" path.
        extensionUrl: './assets/react-app/index.html',
        openInNewTab: false,
      }),
    ]),
  ],
})
export class ReactUiExtensionModule {}