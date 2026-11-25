import {Navigate, Outlet} from 'react-router-dom';
const ProtectedRoute = () => {
    const islogin = sessionStorage.getItem('loginvalue')=== "true";
    return islogin ? <Outlet/> : <Navigate to="/login" />;
}
export default ProtectedRoute;