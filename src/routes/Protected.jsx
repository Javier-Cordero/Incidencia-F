import proptypes from 'prop-types';
import { useQuery } from "@tanstack/react-query";
import { Outlet, Navigate } from 'react-router-dom';
import { getMe } from '../api/AuthApi';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
function ProtectedRoute({ children }) {
    const authToken = localStorage.getItem("authToken");
    const { setUserData } = useContext(AuthContext);
    const { data, isError, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: () => getMe(authToken),
        retry: 1,
        enabled: Boolean(authToken),
    })
    useEffect(() => { if (data && !isError && !isLoading) setUserData(data) }, [data, isError, isLoading, setUserData]);
    if (isLoading) return <div>Cargando...</div>
    if (!authToken || (isError && !data)) {
        localStorage.removeItem("authToken");
        console.clear();
        return <Navigate to="/" replace={true} />;
    }
    return <Outlet />;
}
ProtectedRoute.propTypes = { children: proptypes.any, };
export default ProtectedRoute    