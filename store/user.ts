import { Alert } from 'react-native'
import Firebase, { db } from '../config/Firebase.js'

const UPDATE_EMAIL = 'UPDATE EMAIL'
const UPDATE_USERNAME = 'UPDATE USERNAME'
const UPDATE_PASSWORD = 'UPDATE PASSWORD'
const UPDATE_IMAGE = 'UPDATE IMAGE'
const LOGIN = 'LOGIN'
const SIGNUP = 'SIGNUP'

export const updateEmail = (email: string) => {
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export const updateImage = (image: string) => {
    return {
        type: UPDATE_IMAGE,
        payload: image
    }
}


export const updateUsername = (username: string) => {
    return {
        type: UPDATE_USERNAME,
        payload: username
    }
}


export const updatePassword = (password: string) => {
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}

export const login = () => {
    return async (dispatch: any, getState: any) => {
        try {
            const { email, password } = getState().user
            const response: any = await Firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
                throw error
            })

            dispatch(getUser(response.user.uid))
        } catch (error) {
            alert(error)
        }
    }
}

export const getUser = (uid: string) => {
    return async (dispatch: any, getState: any) => {
        try {
            const user = await db
                .collection('users')
                .doc(uid)
                .get()

            dispatch({ type: LOGIN, payload: user.data() })
        } catch (error) {
            alert(error)
        }
    }
}

export const signup = () => {
    return async (dispatch: any, getState: any) => {
        const { email, password, username } = getState().user
        const response: any = await Firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
            throw error
        })
        if (response.user.uid) {
            const user = {
                id: response.user.uid,
                email: email,
                username
            }

            await db.collection('users')
                .doc(response.user.uid)
                .set(user)
                .catch(error => {
                    throw error
                })

            dispatch({ type: SIGNUP, payload: user })
        }
    }
}

export const user = (state = {}, action: any) => {
    switch (action.type) {
        case LOGIN:
            return action.payload
        case SIGNUP:
            return action.payload
        case UPDATE_EMAIL:
            return { ...state, email: action.payload }
        case UPDATE_IMAGE:
            return { ...state, image: action.payload }
        case UPDATE_USERNAME:
            return { ...state, username: action.payload }
        case UPDATE_PASSWORD:
            return { ...state, password: action.payload }
        default:
            return state
    }
}

