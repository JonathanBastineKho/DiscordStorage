import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { Spinner } from "flowbite-react";

const PrivateRoute = ({ children }) => {
    const { token, logout } = useContext(AuthContext);

    const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);

    useEffect(() => {
        if (token) {
            axios
                .get("/api/verify_token", {
                    headers: { Authorization: `${token}` },
                })
                .then((res) => {
                    if (res.data.success) {
                        setAuth(true);
                    } else {
                      logout();
                    }
                })
                .catch((error) => {
                    logout();
                })
                .then(() => setIsTokenValidated(true));
        } else {
            setIsTokenValidated(true);
        }
    }, [token]);

    if (!isTokenValidated) {
        return (
            <div className="text-center text-8xl">
                <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
        );
    }
    // return auth ? children : <Navigate to="/login" />;
    if (auth){
        return children
    } else {
        return <Navigate to="/login" />
    }
};

export default PrivateRoute;