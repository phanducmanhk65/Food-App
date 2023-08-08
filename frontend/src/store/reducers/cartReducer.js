import {
  GET_ALL_DISH,
  GET_NUMBER_CART,
  ADD_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART,
  ADD_TO_CART,
} from '../action/cartAction';

const initialState = {
  numberCart: 0,
  _todoProduct: {
    cart: [],
    numberCart: 0,
  },
  _dish: [],
};

const savedCart = localStorage.getItem('cart');

const cartReducer = (state = initialState, action) => {
  console.log("Reducer is called with action type:", action.type);
  if (!state._todoProduct.cart.length && savedCart) {
    const parsedCart = JSON.parse(savedCart);
    if (Array.isArray(parsedCart)) {
      state._todoProduct.cart = parsedCart;
      state._todoProduct.numberCart = parsedCart.length;
      state.numberCart = parsedCart.length;
    }
  
  }
  const calculateTotalQuantity = (cart) => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  switch (action.type) {
    
    case GET_ALL_DISH:
      return {
        ...state,
        _dish: action.payload,
      };

      case GET_NUMBER_CART:
        const cartItems = state._todoProduct.cart;
        const totalQuantity = calculateTotalQuantity(cartItems);
      
        // Lưu giá trị totalQuantity vào localStorage
        localStorage.setItem('cartQuantity', JSON.stringify(totalQuantity));
      
        return {
          ...state,
          numberCart: totalQuantity,
          _todoProduct: {
            ...state._todoProduct,
            numberCart: totalQuantity,
          },
        };
      
      
      
        case ADD_CART:
  const cartItem = state._todoProduct.cart.find(
    (item) => item.id === action.payload.id
  );

  if (cartItem) {
    // Xử lý thêm sản phẩm đã tồn tại trong giỏ hàng
    // console.log("Alo 1", state.numberCart);
    // console.log("State before update:", state);
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
    // Xử lý thêm sản phẩm chưa tồn tại trong giỏ hàng
    // console.log("Alo 2", state.numberCart);
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
    
    // Lấy giỏ hàng từ state và thực hiện việc tăng số lượng sản phẩm
    const increasedCart = state._todoProduct.cart.map((item) => {
      if (item.id === action.payload.id) {
        // Tăng số lượng của sản phẩm đi 1 và trả về sản phẩm mới với số lượng đã tăng
        return { ...item, quantity: item.quantity + 1 };
      }
      // Nếu không phải sản phẩm cần tăng số lượng, trả về sản phẩm không thay đổi
      return item;
    });
    const increasedTotalQuantity = calculateTotalQuantity(increasedCart);
    // Tính tổng giá tiền của giỏ hàng sau khi tăng số lượng
    const increasedTotalPrice = increasedCart.reduce((acc, item) => {
      // Thêm giá tiền của từng sản phẩm vào tổng giá tiền (acc)
      return acc + item.price * item.quantity;
    }, 0);
  
    // Lưu increasedCart (giỏ hàng đã được tăng số lượng) vào localStorage
    localStorage.setItem('cart', JSON.stringify(increasedCart));
  
    // Trả về state mới sau khi đã tăng số lượng sản phẩm
    return {
      ...state,
      _todoProduct: {
        ...state._todoProduct,
        cart: increasedCart,
      },
      numberCart: increasedTotalQuantity, // Tăng số lượng tổng cộng của giỏ hàng đi 1
      totalPrice: increasedTotalPrice, // Cập nhật tổng giá tiền mới
    };
  
  
        case DECREASE_QUANTITY:
          // Lấy giỏ hàng từ state và thực hiện việc giảm số lượng sản phẩm
          const updatedCart = state._todoProduct.cart.map((item) => {
            if (item.id === action.payload.id) {
              if (item.quantity === 1) {
                // Nếu số lượng của sản phẩm là 1, tức là sắp giảm xuống 0
                return { ...item, quantity: 0 }; // Giảm số lượng xuống 0
              }
              // Giảm số lượng của sản phẩm đi 1 và trả về sản phẩm mới với số lượng đã giảm
              return { ...item, quantity: item.quantity - 1 };
            }
            // Nếu không phải sản phẩm cần giảm số lượng, trả về sản phẩm không thay đổi
            return item;
          });
          const decreasedTotalQuantity = calculateTotalQuantity(updatedCart);
          // Lọc bỏ các sản phẩm có quantity bằng 0 (đã giảm xuống 0) khỏi giỏ hàng
          const filteredCart = updatedCart.filter((item) => item.quantity > 0 && item !== null);
        
          // Tính tổng giá tiền của giỏ hàng sau khi giảm số lượng
          const totalPrice = filteredCart.reduce((acc, item) => {
            // Thêm giá tiền của từng sản phẩm vào tổng giá tiền (acc)
            return acc + item.price * item.quantity;
          }, 0);
        
          // Lưu filteredCart (giỏ hàng đã được lọc) vào localStorage
          localStorage.setItem('cart', JSON.stringify(filteredCart));
        
          // Trả về state mới sau khi đã giảm số lượng sản phẩm
          return {
            ...state,
            _todoProduct: {
              ...state._todoProduct,
              cart: filteredCart,
            },
            numberCart: decreasedTotalQuantity, // Giảm số lượng tổng cộng của giỏ hàng đi 1
            totalPrice: totalPrice, // Cập nhật tổng giá tiền mới
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

    case ADD_TO_CART:
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
};

export default cartReducer;