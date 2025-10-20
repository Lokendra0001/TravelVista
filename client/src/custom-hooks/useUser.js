import React from 'react'
import { useSelector } from "react-redux";


const useUser = () => {
    const { user, role, loading } = useSelector((state) => state.auth);
    return { user, role, loading };
}

export default useUser