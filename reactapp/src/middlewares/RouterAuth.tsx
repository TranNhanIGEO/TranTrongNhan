import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import configs from 'configs';
import { useSelector } from 'react-redux';
import CookieHelper from 'helpers/cookieHelper';
import { AuthState } from 'stores/auth/authStateTypes';
import { authStore } from 'stores/auth/authSlice';
import { UserRoleTypes } from 'models/Enums/UserRoleTypes';

export const NotRequiredAuth: React.FC = () => {
    const { user }: AuthState = useSelector(authStore);

    if (user.role?.includes(UserRoleTypes.Admin)) {
        return <Navigate to={configs.routes.admin.dashboard} replace />
    }
    
    if (user.role?.includes(UserRoleTypes.User)) {
        return <Navigate to={configs.routes.customer.home} replace />
    }

    return <Outlet />;
}

export const RequiredAuth: React.FC = () => {
    const uid = CookieHelper.getCookie("uid");
    const { user }: AuthState = useSelector(authStore);

    if (!user.id || !uid) {
        return <Navigate to={configs.routes.auth.login} replace />
    }
    
    return <Outlet />;
}

export const RequiredAdminRole: React.FC = () => {
    const uid = CookieHelper.getCookie("uid");
    const { user }: AuthState = useSelector(authStore);

    if (!user.role?.includes(UserRoleTypes.Admin) || !uid) {
        return <Navigate to={configs.routes.auth.login} replace />
    }
    
    return <Outlet />;
}

export const RequiredUserRole: React.FC = () => {
    const uid = CookieHelper.getCookie("uid");
    const { user }: AuthState = useSelector(authStore);

    if (!user.role?.includes(UserRoleTypes.User) || !uid) {
        return <Navigate to={configs.routes.auth.login} replace />
    }
    
    return <Outlet />;
}
