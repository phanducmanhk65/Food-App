import {callAPIDish} from "../../components"

export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const GET_ALL_DISH = 'GET_ALL_DISH';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const ADD_CART = 'ADD_CART' ;
export const ADD_TO_CART = 'ADD_TO_CART' ;

export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART = 'DELETE_CART';
export const GET_DISH_SEARCH = 'GET_DISH_SEARCH'

export const actFetchDishRequest = () => {
  return (dispatch) => {
      return callAPIDish('dish/alldish', 'GET').then(res => {
          dispatch(GetAllDish(res.data));
          console.log('Dishsssssssssssssssssssss', res.data);
      });
     
  }
}

  // SEARCH FOR PRODUCT
  export const actSearchDishRequest = (searchCriteria) => {
    return (dispatch) => {
      return callAPIDish(`dish/search?${searchCriteria}`,{ withCredentials: true })
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
    export function AddCart(payload) {
        return (dispatch, getState) => {
          dispatch({ type: ADD_CART, payload });
          const { cart } = getState().cart._todoProduct;
          // Tạo một bản sao của giỏ hàng mới và cập nhật số lượng món ăn dựa vào payload
          const updatedCart = cart.map((item) =>
            item.id === payload.id ? { ...item, quantity: item.quantity } : item
          );
          console.log('Quantityyyyyyyyyyyy:', updatedCart.find(item => item.id === payload.id)?.quantity);

          localStorage.setItem("cart", JSON.stringify(updatedCart));
        };
      }
      
      export function UpdateCart(payload) {
        return (dispatch, getState) => {
          dispatch({ type: UPDATE_CART, payload });
          // const { cart } = getState().cart._todoProduct;
          // Tạo một bản sao của giỏ hàng mới và cập nhật số lượng món ăn dựa vào payload
          // const updatedCart = cart.map((item) =>
          //   item.id === payload.id ? { ...item, quantity: payload.quantity } : item
          // );
          // localStorage.setItem("cart", JSON.stringify(updatedCart));
        };
      }
      
      export function IncreaseQuantity(item) {
        return (dispatch, getState) => {
          dispatch({ type: INCREASE_QUANTITY, payload: item });
          // const { cart } = getState().cart._todoProduct;
          // const newCart = { ...cart };
          // newCart[item.id] = (newCart[item.id] || 0) + 1;
          // localStorage.setItem("cart", JSON.stringify(newCart));
        };
      }
      
      export function DecreaseQuantity(item) {
        return (dispatch, getState) => {
          dispatch({ type: DECREASE_QUANTITY, payload: item });
          // const { cart } = getState().cart._todoProduct;
          // const newCart = { ...cart };
          // if (newCart[item.id] && newCart[item.id] > 1) {
          //   newCart[item.id] -= 1;
          //   localStorage.setItem("cart", JSON.stringify(newCart));
          // } else {
          //   // Nếu số lượng món ăn là 1 hoặc không tồn tại trong giỏ hàng nữa, xóa khỏi giỏ hàng
          //   delete newCart[item.id];
          //   localStorage.setItem("cart", JSON.stringify(newCart));
          // }
        };
      }
      
      export function DeleteCart(item) {
        return (dispatch, getState) => {
          dispatch({ type: DELETE_CART, payload: item });
          const { cart } = getState().cart._todoProduct;
          const newCart = { ...cart };
          delete newCart[item.id];
          localStorage.setItem("cart", JSON.stringify(newCart));
        };
      }
      
      export function addToCart(item) {
        return (dispatch, getState) => {
          dispatch({ type: ADD_TO_CART, payload: item });
          const { cart } = getState().cart._todoProduct;
          const newCart = { ...cart };
          newCart[item.id] = (newCart[item.id] || 0) + 1;
          console.log('New Cartttttttt:', newCart);
          localStorage.setItem("cart", JSON.stringify(newCart));
        };
      }
    