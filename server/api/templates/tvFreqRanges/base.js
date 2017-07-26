import _ from 'lodash' // eslint-disable-line
import schema from '../../../../shared/models/schemas/tvFreqRange'

export default {
  $select: [
    'id',
    ..._.keys(schema),
  ],
}
