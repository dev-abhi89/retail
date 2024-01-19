import {
  CLEAR_DATA,
  GET_DATA,
  GET_DATA_FAILURE,
  GET_DATA_SUCCESS,
  REFRESH,
} from './ActionTypes';

const initialState = {
  storeData: [],
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {...state, loading: true, error: null};
    case GET_DATA_SUCCESS:
      return {...state, storeData: action.payload, loading: false};
    case GET_DATA_FAILURE:
      return {...state, error: action?.payload, loading: false};
    case CLEAR_DATA:
      return {...state, error: null, loading: false, storeData: []};

    default:
      return {...state};
  }
};
