import {
  ADD_IMAGES,
  CHANGE_IMAGE_STATUS,
  REMOVE_FROM_QUEUE,
} from './ActionTypes';

export function addImageToLocal(action) {
  return {type: ADD_IMAGES, payload: action};
}
export function updateImageStatus(action) {
  return {type: CHANGE_IMAGE_STATUS, payload: action};
}
export function removeFromQueue(action) {
  return {type: REMOVE_FROM_QUEUE, payload: action};
}
