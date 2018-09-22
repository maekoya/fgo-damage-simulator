// vue.config.js
module.exports = {
  // options...
  baseUrl: '',
  productionSourceMap: false,
  css: {
    sourceMap: false
  },
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js',
      swDest: 'service-worker.js'
      // ...other Workbox options...
    }
  }
}
