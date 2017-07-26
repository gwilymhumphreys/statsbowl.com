import _ from 'lodash' // eslint-disable-line
import schema from '../../../../shared/models/schemas/appSettings'
import StaticPage from '../../../models/StaticPage'

export default {
  $select: ['id', ..._.without(_.keys(schema), 'createdDate')],
  staticPageLinks: (appSettings, options, callback) => {
    StaticPage.cursor({visible: true, showInFooter: true}).sort('order').select('id', 'title', 'slug').toJSON(callback)
  },
}
