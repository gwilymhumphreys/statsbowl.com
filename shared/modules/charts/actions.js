import _ from 'lodash' // eslint-disable-line
import TvFreq from '../../models/TvFreq'
import TvFreqRange from '../../models/TvFreqRange'

export const TYPES = {
  TV_FREQ_LOAD: 'TV_FREQ_LOAD',
  TV_FREQ_RANGE_LOAD: 'TV_FREQ_RANGE_LOAD',
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

export function loadTvFreqRanges(chart, query, callback) {
  return {
    chart,
    type: TYPES.TV_FREQ_RANGE_LOAD,
    request: TvFreqRange.cursor(query),
    callback,
  }
}
