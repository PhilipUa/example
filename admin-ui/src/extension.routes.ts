export const extensionRoutes = [  {
    path: 'extensions/react-ui',
    loadChildren: () => import('./extensions/fea183fd7db1bd5e0bc26c1c899b08d1f6a17289feafbd4279fbcf12f4f512e1/react-extension.module').then(m => m.ReactUiExtensionModule),
  }];
