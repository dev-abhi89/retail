const {REFRESH, SET_FILTERS, GET_DROPDOWN_DATA} = require('./ActionTypes');

export function updateHomeFilter(action) {
  return {type: SET_FILTERS, payload: action};
}
export function getDropdownData(action) {
  return {type: GET_DROPDOWN_DATA, payload: action};
}
