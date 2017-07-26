export default (props) => ({

  meta: [
    {charset: 'utf-8'},
    {'http-equiv': 'X-UA-Compatible', content: 'IE:edge'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},

    {name: 'msapplication-TileImage', content: '/public/favicons/mstile-144x144.png'},
    {name: 'msapplication-config', content: '/public/favicons/browserconfig.xml'},
    {name: 'theme-color', content: '#ffffff'},

    {name: 'apple-mobile-web-app-capable', value: 'yes'},
  ],

  link: [
    {rel: 'apple-touch-icon', sizes: '180x180', href: '/public/favicons/apple-touch-icon.png'},
    {rel: 'icon', type: 'image/png', href: '/public/favicons/favicon-32x32.png', sizes: '32x32'},
    {rel: 'icon', type: 'image/png', href: '/public/favicons/favicon-16x16.png', sizes: '16x16'},
    {rel: 'manifest', href: '/public/favicons/manifest.json'},
    {rel: 'mask-icon', href: '/public/favicons/safari-pinned-tab.svg', color: '#42c299'},
  ],

})
