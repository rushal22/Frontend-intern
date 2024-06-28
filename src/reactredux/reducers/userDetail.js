export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT"


const initialState = {
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        loggedIn : false,
        role: "user",
        user_detail: {}
}   

const UserDetails = (state = initialState , action) => {
   switch (action.type) {
    case LOGIN :
        return {
        ...state , 
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password,
        loggedIn: true,
        role: action.payload.role,
        user_detail: action.payload.user_detail
    };
    case LOGOUT:
    return initialState;
    default:
     return state
   }

}
export default UserDetails