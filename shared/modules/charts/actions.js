import _ from 'lodash' // eslint-disable-line
import TvFreq from '../../models/TvFreq'

export const TYPES = {
  TV_FREQ_LOAD: 'TV_FREQ_LOAD',
  TV_FREQ_COUNT: 'TV_FREQ_COUNT',
}

/*
  TvFreqs
*/
export function loadTvFreqs(chart, query, callback) {
  return {
    chart,
    type: TYPES.TV_FREQ_LOAD,
    request: TvFreq.cursor(query),
    callback,
  }
}
