import {ADD_IMAGES, CHANGE_IMAGE_STATUS} from './ActionTypes';

const initialState = {
  image_queue: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGES: {
      const nextQueue = [];
      for (const img of action?.payload?.images) {
        nextQueue.push({
          url: img,
          status: false,
          shopId: action.payload.shopId,
        });
      }
      return {
        ...state,
        image_queue: [...state.image_queue, ...nextQueue],
      };
    }
    case CHANGE_IMAGE_STATUS: {
      const currentList = state.image_queue.filter(
        i => i.url.fileName !== action.payload.index,
      );
      // currentList[action.payload.index].status = action.payload.status;
      return {...state, image_queue: currentList};
    }

    default:
      return {...state};
  }
};
