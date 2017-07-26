import _ from 'lodash' // eslint-disable-line
import schema from '../../../../shared/models/schemas/tvFreq'

export default {
  $select: [
    'id',
    ..._.keys(schema),
  ],
}
