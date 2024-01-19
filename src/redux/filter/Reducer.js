import {GET_DROPDOWN_DATA, REFRESH_APP, SET_FILTERS} from './ActionTypes';

const initialState = {
  homeFilter: {},
  dropDowndata: {route: [], area: [], type: []},
  refreshApp: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return {...state, homeFilter: action.payload};
    case GET_DROPDOWN_DATA:
      return {...state, dropDowndata: action.payload};
    case REFRESH_APP:
      return {...state, refreshApp: !state.refreshApp};

    default:
      return {...state};
  }
};
