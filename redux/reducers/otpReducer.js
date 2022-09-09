let isOtp = null;

if(typeof window !== "undefined") {
    if(!localStorage.getItem("cm_otp")) {
        isOtp = null;
    }
    else {
        isOtp = JSON.parse(localStorage.getItem("cm_otp"));
    }
}

const initState = {
    otp: isOtp,
    isLoading: false,
}

const otpReducer = (state=initState,action)=> {
    if(action.type === "otp-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "submit-otp") {
        const {otp,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            otp: otp,
            isLoading: false
        }
    }
    else if(action.type === "reset-otp-status") {
        const {error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            otp: null,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default otpReducer;