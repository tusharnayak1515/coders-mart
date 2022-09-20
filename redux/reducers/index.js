import userReducer from "./userReducer";
import sellerReducer from "./sellerReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import reviewReducer from "./reviewReducer";
import otpReducer from "./otpReducer";

const { HYDRATE } = require("next-redux-wrapper");
const { combineReducers } = require("redux");

const rootReducer = combineReducers({
    userReducer: userReducer,
    sellerReducer: sellerReducer,
    productReducer: productReducer,
    cartReducer: cartReducer,
    orderReducer: orderReducer,
    reviewReducer: reviewReducer,
    otpReducer: otpReducer,
})

const masterReducer = (state,action)=> {
    if(action.type === HYDRATE) {
        // console.log("state: ",state.orderReducer.orders);
        // console.log("action.payload: ",action.payload.productReducer.product);
        const nextState = {
            ...state,
            userReducer: {
                user: state.userReducer.user ? state.userReducer.user : action.payload.userReducer.user,
                profile: state.userReducer.profile ? state.userReducer.profile : action.payload.userReducer.profile,
                isLoading: state.userReducer.isLoading
            },
            sellerReducer: {
                seller: state.sellerReducer.seller ? state.sellerReducer.seller : action.payload.sellerReducer.seller,
                profile: state.sellerReducer.profile ? state.sellerReducer.profile : action.payload.sellerReducer.profile,
                isLoading: state.sellerReducer.isLoading
            },
            productReducer: {
                products: [...new Set(action.payload.productReducer.products, state.productReducer.products)],
                product: action.payload.productReducer.product ? action.payload.productReducer.product : state.productReducer.product,
                isLoading: state.productReducer.isLoading
            },
            cartReducer: {
                cart: state.cartReducer.cart ? state.cartReducer.cart : action.payload.cartReducer.cart,
                isLoading: state.cartReducer.isLoading
            },
            orderReducer: {
                orders: [...new Set(action.payload.orderReducer.orders, state.orderReducer.orders)],
                order: action.payload.orderReducer.order ? action.payload.orderReducer.order : state.orderReducer.order,
                isLoading: state.orderReducer.isLoading
            },
            reviewReducer: {
                reviews: [...new Set(action.payload.reviewReducer.reviews, state.reviewReducer.reviews)],
                review: action.payload.reviewReducer.review ? action.payload.reviewReducer.review : state.reviewReducer.review,
                isLoading: state.reviewReducer.isLoading
            },
            otpReducer: {
                otp: state.otpReducer.otp,
                isLoading: state.otpReducer.isLoading,
            },
        }
        // console.log(nextState.productReducer.product);
        return nextState;
    }
    else {
        return rootReducer(state,action);
    }
}

export default masterReducer;