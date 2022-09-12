import { getCookie } from "cookies-next";

let isUser = null;
let isProfile = null;

if(!getCookie("cm_user_token")) {
    isUser = null;
}
else {
    isUser = getCookie("cm_user_token");
}

if(typeof window !== "undefined") {
    if(!localStorage.getItem("cm_user_profile")) {
        isProfile = null;
    }
    else {
        isProfile = JSON.parse(localStorage.getItem("cm_user_profile"));
    }
}

const initState = {
    user: isUser,
    profile: isProfile,
    isLoading: false,
}

const userReducer = (state=initState,action)=> {
    if(action.type === "user-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "user-register") {
        const {user,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            user: user,
            isLoading: false
        }
    }
    else if(action.type === "user-login") {
        const {user,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            user: user,
            isLoading: false
        }
    }
    else if(action.type === "user-profile") {
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
    else if(action.type === "edit-user-profile") {
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
    else if(action.type === "change-user-password") {
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
    else if(action.type === "logout") {
        return {
            ...state,
            user: null,
            profile: null,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default userReducer;