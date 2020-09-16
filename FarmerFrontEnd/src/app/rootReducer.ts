const initialState = {
    token: ''
}

interface farmerInfo {
    role: string,
    rating: number,
    _id: string,
    firstName: string,
    lastName: string,
    email: string
}

interface IUser {
    exp: number,
    farmer: farmerInfo
    iat: number
}

interface ITokenObject {
    token: string,
    userInfo: IUser
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SETTOKEN':
            localStorage.setItem('token', JSON.stringify(action.payload))
            return {
                ...state,
                token: action.payload
            }

        case 'LOGOUT':

            localStorage.removeItem('token')
            return {
                ...state,
                token: ''
            }

        default:
            return state
    }
}