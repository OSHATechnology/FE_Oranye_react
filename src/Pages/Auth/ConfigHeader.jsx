import { useEffect, useState } from 'react';
import { GetTokenData } from './AuthProvider'

const ConfigHeader = () => {
    const [token, setToken] = useState(null);
    useEffect(() => {
        setToken(GetTokenData())
    }, [])

    if (token) {
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }
    return null;
}

export default ConfigHeader;