
const ADD_POST = 'ADD POST'


export const addPost = (post: Array<any>) => {
    return {
        type: ADD_POST,
        payload: post
    }
}

export const posts = (state = [], action: any) => {
    switch (action.type) {
        case ADD_POST:
            let newPosts = action.payload.concat(state)
            return newPosts
        default:
            return state
    }
}

