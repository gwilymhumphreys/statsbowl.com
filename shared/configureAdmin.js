import admin from 'fl-admin'

admin({
  models: [
    {
      Model: require('./models/User'),
      display: model => model.email,
      fields: {
        id: {
          listDisplay: true,
        },
        admin: {
          listDisplay: true,
        },
      },
    },
    {
      Model: require('./models/Profile'),
      display: model => model.nickname,
      fields: {
      },
    },
    {
      Model: require('./models/AppSettings'),
      singleton: true,
      fields: {
        landingPageImage: {
          input: 'image',
        },
        footerContactInfo: {
          input: 'textarea',
        },
      },
    },
    {
      Model: require('./models/StaticPage'),
      fields: {
        title: {
          listEdit: true,
        },
        content: {
          input: 'rich',
        },
      },
    },
    {
      Model: require('./models/Game'),
      fields: {
      },
    },
    {
      Model: require('./models/Organisation'),
      fields: {
      },
    },
  ],
})
