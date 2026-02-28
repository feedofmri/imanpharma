import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login but save the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on role if unauthorized
        if (user.role === 'admin' || user.role === 'manager') {
            return <Navigate to="/seller" replace />;
        }
        return <Navigate to="/buyer" replace />;
    }

    return children;
}

export default ProtectedRoute;
