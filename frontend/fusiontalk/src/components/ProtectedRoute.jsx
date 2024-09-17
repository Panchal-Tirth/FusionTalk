import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";
import AxiosInstance from "./Axios";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
<<<<<<< HEAD
        console.log('Checking authorization...');
=======
        // console.log('Checking authorization...');
>>>>>>> 62b22c1e28b439d14ec47f201d422990e9ea80ed
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await AxiosInstance.post("/account/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
<<<<<<< HEAD
        console.log("Hello")
        const token = localStorage.getItem(ACCESS_TOKEN);
        console.log(token)
=======
        // console.log("Hello")
        const token = localStorage.getItem(ACCESS_TOKEN);
        // console.log(token)
>>>>>>> 62b22c1e28b439d14ec47f201d422990e9ea80ed
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}   

export default ProtectedRoute;