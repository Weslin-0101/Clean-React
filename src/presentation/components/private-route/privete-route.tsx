import React, { useContext } from 'react'
import { Route, RouteProps, Navigate } from 'react-router-dom';
import { ApiContext } from '@/presentation/contexts'

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
    const { getCurrentAccount } = useContext(ApiContext);
    return getCurrentAccount()?.accessToken
        ? <Route {...props} />
        : <Navigate to="/login" />
}

export default PrivateRoute