import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useSessionStorage } from './SessionStorage';

// GET CALLBACK DATA
const OauthCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    const error_description = urlParams.get('error_description');
    const [user, setUser] = useSessionStorage('user', null);

    // console.log('code: ', code);
    // console.log('code: ', state);
    // console.log('code: ', error);

    // SEND DATA TO SERVER
    const sendData = async () => {
        const response = await axios.get('api/auth/google/callback', {
            params: {
                code: code,
                state: state,
                error: error,
                error_description: error_description
            },
        }).then(res => {
            console.log(res);
            sessionStorage.setItem('user', JSON.stringify(res));
        }).catch(err => {
            console.log(err);
        });
    }

    sendData();

    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    )
}

export default OauthCallback