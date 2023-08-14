import { combineReducers } from 'redux';
import {
  GET_ALL_DISH,
  GET_NUMBER_CART,
  ADD_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART,
} from '../action';


const initialState = {
  numberCart: 0,
  _todoProduct: {
    cart: [],
    numberCart: 0, // Add the numberCart property here
  },
  _dish: [],
};

const savedCart = localStorage.getItem('cart');
if (savedCart) {
  initialState._todoProduct.cart = JSON.parse(savedCart);
  initialState._todoProduct.numberCart = initialState._todoProduct.cart.length;
  initialState.numberCart = initialState._todoProduct.numberCart;
}

function todoDish(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DISH:
      return {
        ...state,
        _dish: action.payload,
      };

    case GET_NUMBER_CART:
        return {
            ...state,
            _todoProduct: {
              ...state._todoProduct,
              numberCart: state._todoProduct.cart.length,
            },
          };

    case ADD_CART:
      const cartItem = state._todoProduct.cart.find(
        (item) => item.id === action.payload.id
      );

      if (cartItem) {
        return {
          ...state,
          _todoProduct: {
            ...state._todoProduct,
            cart: state._todoProduct.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          },
          numberCart: state.numberCart + 1,
        };
      } else {
        return {
          ...state,
          _todoProduct: {
            ...state._todoProduct,
            cart: [...state._todoProduct.cart, { ...action.payload, quantity: 1 }],
          },
          numberCart: state.numberCart + 1,
        };
      }

      case INCREASE_QUANTITY:
        const increasedCart = state._todoProduct.cart.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return {
          ...state,
          _todoProduct: {
            ...state._todoProduct,
            cart: increasedCart,
          },
          numberCart: state.numberCart + 1,
        };
  
        case DECREASE_QUANTITY:
          const updatedCart = state._todoProduct.cart.map((item) => {
            if (item.id === action.payload.id) {
              if (item.quantity === 1) {
                return null;
              }
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
        
          const totalPrice = updatedCart.reduce((acc, item) => {
            // Thêm kiểm tra item !== null để tránh lỗi khi item đã bị xóa
            return item !== null ? acc + item.price * item.quantity : acc;
          }, 0);
        
          return {
            ...state,
            _todoProduct: {
              ...state._todoProduct,
              cart: updatedCart.filter((item) => item !== null),
            },
            numberCart: state.numberCart - 1,
            totalPrice: totalPrice, // Cập nhật tổng giá tiền
          };
        
    case DELETE_CART:
      return {
        ...state,
        _todoProduct: {
          ...state._todoProduct,
          cart: state._todoProduct.cart.filter(
            (item) => item.id !== action.payload.id
          ),
        },
        numberCart: state.numberCart - action.payload.quantity,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        _todoProduct: {
          ...state._todoProduct,
          cart: [...state._todoProduct.cart, action.payload],
        },
        numberCart: state.numberCart + 1,
      };

    default:
      return state;     
  }
}

const ShopApp = combineReducers({
    _todoDish: todoDish,
});

export default ShopApp;
