import {GET_DROPDOWN_DATA, SET_FILTERS} from './ActionTypes';

const initialState = {
  homeFilter: {area: '', type: '', route: ''},
  dropDowndata: {route: [], area: [], type: []},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return {...state, homeFilter: action.payload};
    case GET_DROPDOWN_DATA:
      return {...state, dropDowndata: action.payload};

    default:
      return {...state};
  }
};
