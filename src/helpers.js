//@flow
import { has, merge } from 'lodash';
export const generateID = () =>
    Math.floor(Math.random() * 1000) + Date.now() + '',
  findIdInArray = (id, arr) => {
    let ret = null;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        ret = arr[i];
        break;
      }
    }
    return ret;
  },
  parseRelations = (arr1, arr2) =>
    arr1.map(v => merge(findIdInArray(v.id, arr2), v));
