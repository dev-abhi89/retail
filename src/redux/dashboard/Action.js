import DatabaseServices from '../../services/DatabaseService';

const {
  REFRESH,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  GET_DATA,
  CLEAR_DATA,
} = require('./ActionTypes');

export function refreshData(action) {
  return {type: REFRESH, payload: action};
}

export const getAllStoreThunk = payload => async dispatch => {
  try {
    dispatch({type: GET_DATA});
    const response = await DatabaseServices.getAllStores();
    return dispatch({type: GET_DATA_SUCCESS, payload: response});
  } catch (e) {
    console.log(e);
    dispatch({type: GET_DATA_FAILURE, payload: e?.message});
  }
};
export function clearData() {
  return {type: CLEAR_DATA};
}
