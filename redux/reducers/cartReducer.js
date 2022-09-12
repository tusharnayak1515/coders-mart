let isCart = null;

if(typeof window !== "undefined") {
    if(!localStorage.getItem("cm_user_cart")) {
        isCart = null;
    }
    else {
        isCart = JSON.parse(localStorage.getItem("cm_user_cart"));
    }
}

const initState = {
    cart: isCart,
    isLoading: false,
}

const cartReducer = (state=initState,action)=> {
    if(action.type === "cart-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "get-cart") {
        const {cart,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            cart: cart,
            isLoading: false
        }
    }
    else if(action.type === "add-to-cart") {
        const {cart,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            cart: cart,
            isLoading: false
        }
    }
    else if(action.type === "remove-from-cart") {
        const {cart,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            cart: cart,
            isLoading: false
        }
    }
    else if(action.type === "place-order") {
        const {cart,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            cart: cart,
            isLoading: false
        }
    }
    else if(action.type === "logout") {
        return {
            ...state,
            cart: null,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default cartReducer;