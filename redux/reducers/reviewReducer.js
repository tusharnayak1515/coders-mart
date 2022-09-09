const initState = {
    reviews: null,
    review: null,
    isLoading: false,
}

const reviewReducer = (state=initState,action)=> {
    if(action.type === "review-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "get-reviews") {
        const {reviews,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            reviews: reviews,
            isLoading: false
        }
    }
    else if(action.type === "get-review") {
        const {review,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            review: review,
            isLoading: false
        }
    }
    else if(action.type === "add-review") {
        const {reviews,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            reviews: reviews,
            isLoading: false
        }
    }
    else if(action.type === "edit-review") {
        const {reviews,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            reviews: reviews,
            isLoading: false
        }
    }
    else if(action.type === "delete-review") {
        const {reviews,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            reviews: reviews,
            isLoading: false
        }
    }
    else if(action.type === "like-review") {
        const {reviews,review,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            reviews: reviews,
            review: review,
            isLoading: false
        }
    }
    else if(action.type === "unlike-review") {
        const {reviews,review,error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            reviews: reviews,
            review: review,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default reviewReducer;