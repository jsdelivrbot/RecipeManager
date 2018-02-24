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
  parseRelations = (arr1, arr2) =>
    arr1.map(v => merge(findIdInArray(v.id, arr2), v)),
  generateIngredientsToPrepare = task => {
    const ret = {}
    task.recipes.forEach(recipe => {
      (recipe.ingredients || []).forEach(ingredient => {
        if (has(ret, ingredient.id)) {
          ret[ingredient.id].amount +=
            ingredient.amount * recipe.amount / recipe.baseAmount
        } else {
          ret[ingredient.id] = {
            ...ingredient,
            amount: ingredient.amount * recipe.amount / recipe.baseAmount
          }
        }
      })
    })
    return ret
  }
