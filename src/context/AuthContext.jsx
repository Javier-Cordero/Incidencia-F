import { useMutation } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/AuthApi";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: login,
        onError: (error) => { setErrorMessage(error.response?.data?.message || "Error desconocido") },
        onSuccess: (data) => {
            localStorage.setItem("authToken", data.token)
            setUser(data)
            navigate("/Home")
        }
    })
    const setUserData = (data) => setUser(data)
    return (
        <AuthContext.Provider value={{ user, setUserData, loginMutation, errorMessage }}>
            {children}
        </AuthContext.Provider>
    )
}