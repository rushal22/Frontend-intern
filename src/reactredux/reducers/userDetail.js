export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT"


const initialState = {
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        loggedIn : false,
        image : ''
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
        image: action.payload.image
    };
    case LOGOUT:
    return initialState;
    default:
     return state
   }

}
export default UserDetails