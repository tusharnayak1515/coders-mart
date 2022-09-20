let isOrders = null;

if(typeof window !== "undefined") {
    if(!localStorage.getItem("cm_user_orders")) {
        isOrders = null;
    }
    else {
        isOrders = JSON.parse(localStorage.getItem("cm_user_orders"));
    }
}

const initState = {
    orders: isOrders,
    order: null,
    isLoading: false,
}

const orderReducer = (state=initState,action)=> {
    if(action.type === "order-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "get-orders") {
        const {orders,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            orders: orders,
            isLoading: false
        }
    }
    else if(action.type === "get-order") {
        const {order,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            order: order,
            isLoading: false
        }
    }
    else if(action.type === "place-order") {
        const {orders,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            orders: orders,
            isLoading: false
        }
    }
    else if(action.type === "logout") {
        return {
            ...state,
            orders: null,
            order: null,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default orderReducer;