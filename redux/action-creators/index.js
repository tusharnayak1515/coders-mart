import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ********************************OTP Section*********************************** \\

export const submitOtp = (otp)=> async (dispatch)=> {
    dispatch({
        type: "otp-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    
    try {
        const res = await axios.post(`${url}/api/auth/verifyotp`,{otp});
        localStorage.setItem("cm_otp", JSON.stringify(res.data.myotp));
        if(res.data.success) {
            dispatch({
                type: "submit-otp",
                payload: {
                    otp: res.data.myotp
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "submit-otp",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "submit-otp",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const resetStatus = ()=> async(dispatch)=> {
    localStorage.removeItem("cm_otp");
    dispatch({
        type: "reset-otp-status"
    });
}

// ********************************User Section*********************************** \\

export const sendUserEmail = (email)=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.post(`${url}/api/auth/user/sendemail`,{email});

        if(res.data.success) {
            dispatch({
                type: "send-user-email",
                payload: {
                    error: null
                }
            });
            toast.success("Verification code sent to your email!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "send-user-email",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "send-user-email",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const resetUserPassword = ({otp, newpassword, confirmpassword})=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/auth/user/resetpassword`,{otp,newpassword,confirmpassword});

        if(res.data.success) {
            dispatch({
                type: "reset-user-password",
                payload: {
                    error: null
                }
            });
            toast.success("Password reset successfull!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "reset-user-password",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "reset-user-password",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const userRegister = ({name,email,password})=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.post(`${url}/api/auth/user/register`,{name,email,password});

        if(res.data.success) {
            dispatch({
                type: "user-register",
                payload: {
                    user: getCookie("cm_user_token")
                }
            });
            toast.success("Welcome to Coders Mart!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "user-register",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "user-register",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const userLogin = ({email,password})=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });
    
    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.post(`${url}/api/auth/user/login`,{email,password});

        if(res.data.success) {
            dispatch({
                type: "user-login",
                payload: {
                    user: getCookie("cm_user_token")
                }
            });
            toast.success("Welcome Back!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "user-login",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "user-login",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const userProfile = (token)=> async (dispatch)=> {
    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/auth/user/profile`,{headers: {cm_user_token: token}});
        if(typeof window !== "undefined") {
            localStorage.setItem("cm_user_profile", JSON.stringify(res.data.user));
        }

        if(res.data.success) {
            dispatch({
                type: "user-profile",
                payload: {
                    profile: res.data.user
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "user-profile",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "user-profile",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const editUserProfile = ({name,email,phone,address})=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/auth/user/editprofile`,{name, email, phone, address});
        localStorage.setItem("cm_user_profile", JSON.stringify(res.data.user));

        if(res.data.success) {
            dispatch({
                type: "edit-user-profile",
                payload: {
                    profile: res.data.user
                }
            });
            toast.success("Profile Updated Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "edit-user-profile",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "edit-user-profile",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const changeUserPassword = ({oldpassword, newpassword, confirmpassword})=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/auth/user/changepassword`, {oldpassword, newpassword, confirmpassword});

        if(res.data.success) {
            dispatch({
                type: "change-user-password",
                payload: {
                    error: null,
                }
            });
            toast.success(`Password updated successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "change-user-password",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "change-user-password",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const logout = ()=> async (dispatch)=> {
    localStorage.removeItem("cm_user_cart");
    localStorage.removeItem("cm_user_orders");
    localStorage.removeItem("cm_otp");
    deleteCookie("cm_user_token");
    deleteCookie("cm_user_profile");
    deleteCookie("cm_seller_token");
    deleteCookie("cm_seller_profile");
    dispatch({
        type: "logout"
    });

    toast.success(`Logged out successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

// ********************************Seller Section*********************************** \\

export const sendSellerEmail = (email)=> async (dispatch)=> {
    dispatch({
        type: "seller-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.post(`${url}/api/auth/seller/sendemail`,{email});

        if(res.data.success) {
            dispatch({
                type: "send-seller-email",
                payload: {
                    error: null
                }
            });
            toast.success("Verification code sent to your email!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "send-seller-email",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "send-seller-email",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const resetSellerPassword = ({otp, newpassword, confirmpassword})=> async (dispatch)=> {
    dispatch({
        type: "seller-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/auth/seller/resetpassword`,{otp,newpassword,confirmpassword});

        if(res.data.success) {
            dispatch({
                type: "reset-seller-password",
                payload: {
                    error: null
                }
            });
            toast.success("Password reset successfull!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "reset-seller-password",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "reset-seller-password",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const sellerRegister = ({name,email,password})=> async (dispatch)=> {
    dispatch({
        type: "seller-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.post(`${url}/api/auth/seller/register`,{name,email,password});

        if(res.data.success) {
            dispatch({
                type: "seller-register",
                payload: {
                    seller: getCookie("cm_seller_token")
                }
            });
            toast.success("Welcome to Coders Mart!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "seller-register",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "seller-register",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const sellerLogin = ({email,password})=> async (dispatch)=> {
    dispatch({
        type: "seller-loading"
    });
    
    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.post(`${url}/api/auth/seller/login`,{email,password});

        if(res.data.success) {
            dispatch({
                type: "seller-login",
                payload: {
                    seller: getCookie("cm_seller_token")
                }
            });
            toast.success("Welcome Back!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "seller-login",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "seller-login",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const sellerProfile = (token)=> async (dispatch)=> {
    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/auth/seller/profile`,{headers: {cm_user_token: token}});
        if(typeof window !== "undefined") {
            localStorage.setItem("cm_seller_profile", JSON.stringify(res.data.seller));
        }

        if(res.data.success) {
            dispatch({
                type: "seller-profile",
                payload: {
                    profile: res.data.seller
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "seller-profile",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "seller-profile",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const editSellerProfile = ({name,email,phone,address})=> async (dispatch)=> {
    dispatch({
        type: "seller-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/auth/seller/editprofile`,{name, email, phone, address});
        if(typeof window !== "undefined") {
            localStorage.setItem("cm_seller_profile", JSON.stringify(res.data.seller));
        }

        if(res.data.success) {
            dispatch({
                type: "edit-seller-profile",
                payload: {
                    profile: res.data.seller
                }
            });
            toast.success("Profile Updated Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "edit-seller-profile",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "edit-seller-profile",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const changeSellerPassword = ({oldpassword, newpassword, confirmpassword})=> async (dispatch)=> {
    dispatch({
        type: "seller-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/auth/seller/changepassword`, {oldpassword, newpassword, confirmpassword});

        if(res.data.success) {
            dispatch({
                type: "change-seller-password",
                payload: {
                    error: null,
                }
            });
            toast.success(`Password updated successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "change-seller-password",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "change-seller-password",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

// *******************************Product Section********************************** \\

export const getallProducts = ()=> async (dispatch)=> {
    dispatch({
        type: "product-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/products/`);

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("cm_products", JSON.stringify(res.data.products));
            }
            dispatch({
                type: "get-products",
                payload: {
                    products: res.data.products,
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-products",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "get-products",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const searchedProducts = (name)=> async (dispatch)=> {
    dispatch({
        type: "product-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/products/searchproduct?name=${name}`);

        if(res.data.success) {
            dispatch({
                type: "search-products",
                payload: {
                    searchedProducts: res.data.searchedProducts,
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "search-products",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "search-products",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const getProduct = (id)=> async (dispatch)=> {
    dispatch({
        type: "product-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/products/getproduct?product=${id}`);

        if(res.data.success) {
            dispatch({
                type: "get-product",
                payload: {
                    product: res.data.product,
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-product",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "get-product",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const resetProduct = ()=> async(dispatch)=> {
    dispatch({
        type: "reset-product"
    });
}

export const resetSearchedProducts = ()=> async(dispatch)=> {
    dispatch({
        type: "reset-searched-products"
    });
}

export const addProduct = ({name,description,brand,price,category,quantity,gender,size,image})=> async (dispatch)=> {
    dispatch({
        type: "product-loading"
    });

    let myimg = null;
    if(image !== "") {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "coders_mart");
        data.append("cloud_name", "alpha2625");
        const response = await axios.post("https://api.cloudinary.com/v1_1/alpha2625/image/upload", data);
        myimg = response.data.secure_url;
    }
    else {
        myimg = "https://cdn1.vectorstock.com/i/thumb-large/46/50/missing-picture-page-for-website-design-or-mobile-vector-27814650.jpg";
    }

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.post(`${url}/api/products/addproduct`, {name,description,brand,price,category,quantity,gender,size,image: myimg});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("cm_products", JSON.stringify(res.data.products));
            }
            dispatch({
                type: "add-product",
                payload: {
                    products: res.data.products,
                }
            });

            toast.success(`Product added successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "add-product",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "add-product",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const editProduct = ({id,name,description,brand,price,category,quantity,gender,size,image})=> async (dispatch)=> {
    dispatch({
        type: "product-loading"
    });

    let myimg = null;
    if(image !== "") {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "coders_mart");
        data.append("cloud_name", "alpha2625");
        const response = await axios.post("https://api.cloudinary.com/v1_1/alpha2625/image/upload", data);
        myimg = response.data.secure_url;
    }
    else {
        myimg = "https://cdn1.vectorstock.com/i/thumb-large/46/50/missing-picture-page-for-website-design-or-mobile-vector-27814650.jpg";
    }

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/products/editproduct`, {id,name,description,brand,price,category,quantity,gender,size,image:myimg});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("cm_products", JSON.stringify(res.data.products));
            }
            dispatch({
                type: "edit-product",
                payload: {
                    products: res.data.products,
                }
            });

            toast.success(`Product updated successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "edit-product",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "edit-product",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const deleteProduct = (id)=> async (dispatch)=> {
    dispatch({
        type: "product-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.delete(`${url}/api/products/deleteproduct?product=${id}`);

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("cm_products", JSON.stringify(res.data.products));
            }
            dispatch({
                type: "delete-product",
                payload: {
                    products: res.data.products,
                }
            });

            toast.success(`Product deleted successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "delete-product",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "delete-product",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

// *************************************Cart Section************************************* \\

export const getCart = (token)=> async (dispatch)=> {
    dispatch({
        type: "cart-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/cart/`, {headers: {cm_user_token: token}});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("cm_user_cart", JSON.stringify(res.data.cart));
            }
            dispatch({
                type: "get-cart",
                payload: {
                    cart: res.data.cart,
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-cart",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "get-cart",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const addToCart = (id)=> async (dispatch)=> {
    dispatch({
        type: "cart-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/cart/addtocart`, {id});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("cm_user_cart", JSON.stringify(res.data.cart));
            }
            dispatch({
                type: "add-to-cart",
                payload: {
                    cart: res.data.cart,
                }
            });

            toast.success(`Product added to cart successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "add-to-cart",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "add-to-cart",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const removeFromCart = (id)=> async (dispatch)=> {
    dispatch({
        type: "cart-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/cart/removefromcart`, {id});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("cm_user_cart", JSON.stringify(res.data.cart));
            }
            dispatch({
                type: "remove-from-cart",
                payload: {
                    cart: res.data.cart,
                }
            });

            toast.success(`Product removed from cart successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "remove-from-cart",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "remove-from-cart",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

// *************************************Order Section************************************* \\

export const getAllOrders = (token)=> async (dispatch)=> {
    dispatch({
        type: "order-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/orders/`, {headers: {cm_user_token: token}});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("cm_user_orders", JSON.stringify(res.data.orders));
            }
            dispatch({
                type: "get-orders",
                payload: {
                    orders: res.data.orders,
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-orders",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "get-orders",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const getOrder = ({id,token})=> async (dispatch)=> {
    dispatch({
        type: "order-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/orders/getorder?order=${id}`, {headers: {cm_user_token: token}});

        if(res.data.success) {
            dispatch({
                type: "get-order",
                payload: {
                    order: res.data.order,
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-order",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "get-order",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const placeOrder = ({products,destination})=> async (dispatch)=> {
    dispatch({
        type: "order-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.post(`${url}/api/orders/placeorder`, {products,destination});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("cm_user_orders", JSON.stringify(res.data.orders));
                localStorage.setItem("cm_user_cart", JSON.stringify(res.data.cart));
            }
            dispatch({
                type: "place-order",
                payload: {
                    orders: res.data.orders,
                    cart: res.data.cart
                }
            });

            toast.success(`Order placed successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "place-order",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "place-order",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

// *************************************Review Section************************************* \\

export const getAllReviews = (id)=> async (dispatch)=> {
    dispatch({
        type: "review-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/reviews?product=${id}`);

        if(res.data.success) {
            dispatch({
                type: "get-reviews",
                payload: {
                    reviews: res.data.reviews,
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-reviews",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "get-reviews",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const getReview = ({id,token})=> async (dispatch)=> {
    dispatch({
        type: "review-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/reviews/getreview?review=${id}`, {headers: {cm_user_token: token}});

        if(res.data.success) {
            dispatch({
                type: "get-review",
                payload: {
                    review: res.data.review,
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-review",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "get-review",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const addReview = ({ratings, review, productId})=> async (dispatch)=> {
    dispatch({
        type: "review-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.post(`${url}/api/reviews/addreview`, {ratings, review, productId});

        if(res.data.success) {
            dispatch({
                type: "add-review",
                payload: {
                    reviews: res.data.reviews,
                }
            });

            toast.success(`Review added successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "add-review",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "add-review",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const editReview = ({ratings, review, id})=> async (dispatch)=> {
    dispatch({
        type: "review-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/reviews/editreview`, {ratings, review, id});

        if(res.data.success) {
            dispatch({
                type: "edit-review",
                payload: {
                    reviews: res.data.reviews,
                }
            });

            toast.success(`Review updated successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "edit-review",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "edit-review",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const deleteReview = (id)=> async (dispatch)=> {
    dispatch({
        type: "review-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.delete(`${url}/api/reviews/deletereview?review=${id}`);

        if(res.data.success) {
            dispatch({
                type: "delete-review",
                payload: {
                    reviews: res.data.reviews,
                }
            });

            toast.success(`Review deleted successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "delete-review",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "delete-review",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const likeReview = (id)=> async (dispatch)=> {
    dispatch({
        type: "review-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/reviews/likereview`,{id});

        if(res.data.success) {
            dispatch({
                type: "like-review",
                payload: {
                    reviews: res.data.reviews,
                    review: res.data.myreview,
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "like-review",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "like-review",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const unlikeReview = (id)=> async (dispatch)=> {
    dispatch({
        type: "review-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-mart.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/reviews/unlikereview`,{id});

        if(res.data.success) {
            dispatch({
                type: "unlike-review",
                payload: {
                    reviews: res.data.reviews,
                    review: res.data.myreview,
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "unlike-review",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "unlike-review",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}