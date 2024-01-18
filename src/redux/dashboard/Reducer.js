import {GET_DATA_SUCCESS, REFRESH} from './ActionTypes';

const initialState = {
  storeData: [],
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REFRESH:
      return {...state, refresh: action.payload};
    case GET_DATA_SUCCESS:
      return {...state, storeData: action.payload};
    case GET_DATA_SUCCESS:
      return {...state, storeData: action.payload};

    default:
      return {...state};
  }
};
