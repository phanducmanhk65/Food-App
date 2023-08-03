import {callAPIDish} from "../../components"

export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const GET_ALL_DISH = 'GET_ALL_DISH';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const ADD_CART = 'ADD_CART' ;
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART = 'DELETE_CART';
export const GET_DISH_SEARCH = 'GET_DISH_SEARCH'

export const actFetchDishRequest = () => {
    return (dispatch) => {
        return callAPIDish('dish/all', 'GET', null).then(res => {
           
            dispatch(GetAllDish(res.data));
        });
    }
}
  // SEARCH FOR PRODUCT
  export const actSearchDishRequest = (searchCriteria) => {
    return (dispatch) => {
      return callAPIDish(`dish/search?${searchCriteria}`)
        .then((response) => {
          dispatch(GetDishSearch(response.data));
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          dispatch({ type: 'SEARCH_DISH_ERROR', payload: error });
        });
    };
  };
// GET_DISH_SEARCH
    export const GetDishSearch = (data) => {
        return {
            type: GET_DISH_SEARCH,
            payload: data
        }
    }

// GET_ALL_DISH 
    export const GetAllDish = (data) => {
        return {
            type: GET_ALL_DISH,
            payload: data
        }
    }

// GET_NUMBER_CART
    export const GetNumberCart = (data) => {
        return {
            type: GET_NUMBER_CART,
            payload: data
        }
    }   
    export function AddCart(payload){
        return {
            type:'ADD_CART',
            payload
        }
    }
    export function UpdateCart(payload){
        return {
            type:'UPDATE_CART',
            payload
        }
    }
    export function DeleteCart(key){
        return{
            type:'DELETE_CART',
            payload:key
        }
    }
     
    export function IncreaseQuantity(key){
        return{
            type:'INCREASE_QUANTITY',
            payload:key
        }
    }
    export function DecreaseQuantity(key){
        return{
            type:'DECREASE_QUANTITY',
            payload:key
        }
    }
    // actions/index.js
    export const addToCart = (item) => {
        return (dispatch, getState) => {
          dispatch({ type: "ADD_TO_CART", payload: item });
          const { cart } = getState()._todoProduct;
          localStorage.setItem("cart", JSON.stringify(cart));
        };
      };
      
  
