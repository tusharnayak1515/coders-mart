let isProducts = null;

if(typeof window !== "undefined") {
    if(!localStorage.getItem("cm_products")) {
        isProducts = null;
    }
    else {
        isProducts = JSON.parse(localStorage.getItem("cm_products"));
    }
}

const initState = {
    products: isProducts,
    searchedProducts: null,
    product: null,
    isLoading: false,
}

const productReducer = (state=initState,action)=> {
    if(action.type === "product-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "get-products") {
        const {products,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            products: products,
            isLoading: false
        }
    }
    else if(action.type === "search-products") {
        const {searchedProducts,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            searchedProducts: searchedProducts,
            isLoading: false
        }
    }
    else if(action.type === "get-product") {
        const {product,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            product: product,
            isLoading: false
        }
    }
    else if(action.type === "reset-product") {
        return {
            ...state,
            product: null,
            isLoading: false
        }
    }
    else if(action.type === "reset-searched-products") {
        return {
            ...state,
            searchedProducts: null,
            isLoading: false
        }
    }
    else if(action.type === "add-product") {
        const {products,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            products: products,
            isLoading: false
        }
    }
    else if(action.type === "edit-product") {
        const {products,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            products: products,
            isLoading: false
        }
    }
    else if(action.type === "delete-product") {
        const {products,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            products: products,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default productReducer;