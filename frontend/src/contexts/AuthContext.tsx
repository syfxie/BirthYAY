import React, {createContext, useContext, useEffect, useState} from "react";
// import axios from "axios";
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}
//
// export function AuthProvider({ children }) {
//
//     const navigate = useNavigate();
//
//     let [user, setUser] = useState(null);
//     const [token, setToken] = useState(null);
//
//     const clearLocalData = async () => {
//         localStorage.removeItem('authTokens');
//         setUser(null);
//         setToken(null);
//     }
//
//     const isLoggedIn = () => {
//         return user && user.id !== null && user.id !== undefined && user.id.length > 0 && token && token.length > 0;
//     }
//
//     const login = async (aUsername, aPassword) => {
//         await axios.post("/api/get-token/", {
//                 username: aUsername,
//                 password: aPassword
//             }
//         ).then((aResponse) =>{
//
//             setToken(aResponse.data.token);
//             localStorage.setItem('authTokens', aResponse.data.token);
//             navigate('/home');
//         });
//     }
//
//     const logout = async () => {
//         console.log('Sophie log out');
//
//         await axios.post("/api-auth/logout/", {}
//         ).then((aResponse) =>{
//             clearLocalData();
//             navigate('/login');
//         });
//     }
//
//     const register = async (aNewUser) => {
//         await axios.post("/api/users/", {
//                 email: aNewUser.email,
//                 username: aNewUser.username,
//                 password: aNewUser.password,
//                 first_name: aNewUser.firstName,
//                 last_name: aNewUser.lastName,
//                 birthday: aNewUser.birthday,
//             }
//         ).then((aResponse) =>{
//             navigate('/login');
//         });
//     };
//
//     const getLoggedInUser = async () => {
//         const localToken = localStorage.getItem('authTokens');
//
//         if (localToken && localToken.length > 0) {
//             await axios.get("/api/get-current-user/", {
//                 headers: {
//                     Authorization: `Token ${localToken}`
//                 },
//             }).then((aResponse) => {
//                 setUser(aResponse.data);
//                 setToken(localToken);
//             }, (aError) => {
//                 clearLocalData();
//             });
//         }
//     }
//
//     useEffect(() => {
//         getLoggedInUser();
//     }, [token]);
//
//
//     return (
//         <AuthContext.Provider value={{user, token, login, logout, register, isLoggedIn}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
