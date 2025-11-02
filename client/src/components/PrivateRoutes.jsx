import React from 'react'
import {usePrivy} from '@privy-io/react-auth';
import { Navigate } from 'react-router-dom';

function PrivateRoutes({children}) {
    const {authenticated, ready} = usePrivy();
    if(!ready){
        return <div>Loading...</div>
    }
  return authenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoutes