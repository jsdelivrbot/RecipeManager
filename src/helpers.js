//@flow
import { has, merge } from 'lodash'
import axios from 'axios'
export const generateID = () =>
    Math.floor(Math.random() * 1000) + Date.now() + '',
  findIdInArray = (id, arr) => {
    let ret = null
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        ret = arr[i]
        break
      }
    }
    return ret
  },
  parseRelations = (obj1, obj2) =>{
    const ret = {}
    Object.entries(obj1).forEach(v =>(ret[v[1].id]= merge(obj2[v[1].id], v[1])))
    return ret;
  },
  generateIngredientsToPrepare = task => {
    console.log('gitp',task);
    const ret = {}
    Object.entries(task.recipes).forEach(recipe => {
      Object.entries(recipe[1].ingredients || {}).forEach(ingredient => {
        if (has(ret, ingredient[0])) {
          ret[ingredient[0]].amount +=
            ingredient[1].amount * recipe[1].amount / recipe[1].baseAmount
        } else {
          ret[ingredient[0]] = {
            ...ingredient[1],
            amount: ingredient[1].amount * recipe[1].amount / recipe[1].baseAmount
          }
        }
      })
    })
    return ret
  }
