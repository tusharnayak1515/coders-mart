import { getCookie } from "cookies-next";

let isSeller = null;
let isProfile = null;

if(!getCookie("cm_user_token")) {
    isSeller = null;
}
else {
    isSeller = getCookie("cm_user_token");
}

if(!getCookie("cm_user_profile")) {
    isProfile = null;
}
else {
    isProfile = JSON.parse(getCookie("cm_user_profile"));
}

const initState = {
    seller: isSeller,
    profile: isProfile,
    isLoading: false,
}

const sellerReducer = (state=initState,action)=> {
    if(action.type === "seller-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "seller-register") {
        const {seller,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            seller: seller,
            isLoading: false
        }
    }
    else if(action.type === "seller-login") {
        const {seller,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            seller: seller,
            isLoading: false
        }
    }
    else if(action.type === "seller-profile") {
        const {profile,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }
    else if(action.type === "edit-seller-profile") {
        const {profile,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }
    else if(action.type === "change-seller-password") {
        const {error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default sellerReducer;