import _ from 'lodash' // eslint-disable-line
import schema from '../../../../shared/models/schemas/game'

export default {
  $select: [
    'id',
    'startup_id',
    'organisation_id',
    'creator_id',
    'updater_id',
    ..._.keys(schema),
  ],
}
