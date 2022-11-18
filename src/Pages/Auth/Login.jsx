import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSessionStorage } from "./SessionStorage";
import { AuthRedirect } from "./AuthProvider";
import { Icon } from "@iconify/react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function Login(props) {
    const navigate = useNavigate();
<<<<<<< HEAD
    const clientId = "xxxxxxxxxxxx.apps.googleusercontent.com";
=======
    const clientId = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com";
>>>>>>> fb6fa3b2515d4dde5db21e0c3bbac173e4c292a3
    const [user, setUser] = useSessionStorage('user', null);
    const [errorMessages, setErrorMessages] = useState({ name: "employee_id", message: "id tidak ada" });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (props.user !== null) {
            navigate(AuthRedirect(user));
        }
    }, [props.user]);

    const onChangeUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
    }

    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post(`/api/auth/login`, {
                    'email': username,
                    password
                }).then((resp) => {
                    const rslt = resp.data.data.user
                    sessionStorage.setItem('user', JSON.stringify(rslt));
                    window.location.reload();
                    setIsLoading(false);

                }).catch(err => {
                    setErrorMessages({ name: "failed", message: err.response.data.data });
                    setPassword('');
                    setIsLoading(false);
                })
            })
        } catch (error) {
            alert('Invalid Credentials')
            setIsLoading(false);
        }
    }


    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="relative text-center p-2">
                <span className="text-red-500 text-xs">{errorMessages.message}</span>
            </div>
        );

    return (
        <div className="flex items-center min-h-screen p-4 bg-amber-100 justify-center">
            <div className="flex flex-col w-screen overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
                <div className="hidden p-4 py-6 h-full lg:h-auto bg-[url('assets/oranye-login.png')] bg-cover bg-center md:flex md:w-60 md:flex-shrink-0  md:flex-col min-h-full md:items-center md:justify-evenly"></div>
                <div className="p-5 bg-white md:flex-1">
                    <h3 className="my-4 text-2xl mb-16 text-orange-500 text-center font-bold">
                        Login
                    </h3>

                    {renderErrorMessage('failed')}
                    <form onSubmit={handleSubmit}
                        className="flex flex-col space-y-5 last:space-y-5 items-center"
                    >
                        <div className="relative z-0 w-3/4 group">
                            <input
                                type="text"
                                name="employee_id"
                                id="employee_id"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-500 hover:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                                placeholder=" "
                                value={username}
                                onChange={onChangeUsername}
                                required
                            />
                            <label
                                htmlFor="employee_id"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] hover:border-orange-500 peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Employee Id or Email
                            </label>
                        </div>
                        <div className="relative z-0 w-3/4 group">
                            <input
                                type="password"
                                name="password_employee"
                                id="password_employee"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 hover:border-orange-500 border-gray-300 appearance-none  dark:border-gray-500 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                                placeholder=" "
                                value={password}
                                onChange={onChangePassword}
                                autoComplete="current-password"
                                required
                            />
                            <label
                                htmlFor="password_employee"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] hover:border-orange-500 peer-focus:left-0 peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                password
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-orange-200 accent-orange-100 "
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm font-semibold text-amber-500"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="w-3/4 space-y-2">

                            <button
                                type="submit"
                                className={"w-full px-4 py-2 text-lg font-semibold text-orange-500 transition-colors duration-300 border border-orange-500 rounded-md shadow hover:text-white focus:outline-none focus:ring-orange-200 focus:ring-4 " + (isLoading ? ' bg-orange-500 cursor-not-allowed' : 'bg-white hover:bg-orange-500')}

                            >

                                {isLoading ? (
                                    <>
                                        <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg>
                                    </>
                                ) : (
                                    "Login"
                                )}

                            </button>
                            {/* <button
                                type="button"
                                className={"w-full px-4 py-2 text-lg font-semibold text-orange-500 transition-colors duration-300 border border-orange-500 rounded-md shadow focus:outline-none focus:ring-orange-200 focus:ring-4 "}
                            >


                                <div className="flex items-center gap-2 justify-center">

                                    <Icon icon="logos:google-icon"></Icon>
                                    <p>Login with Google</p>
                                </div>

                            </button> */}

                        </div>
                        <div className="">

                            {/* login with google */}
                            <GoogleOAuthProvider clientId={clientId}>
                                <GoogleLogin
                                    theme="outline"
                                    shape="pill"
                                    onSuccess={async credentialResponse => {
                                        await axios.get(`api/auth/callback`, {
                                            params: {
                                                creds: credentialResponse.credential
                                            }
                                        }).then(async (response) => {
                                            try {
                                                if (response.status === 200) {
                                                    const rslt = response.data.data.user;
                                                    sessionStorage.setItem('user', JSON.stringify(rslt));
                                                    window.location.reload();
                                                }
                                            } catch (error) {
                                                setErrorMessages({ name: "failed", message: "error!" });
                                            }
                                        }).catch((error) => {
                                            setErrorMessages({ name: "failed", message: error.response.data.message });
                                        });
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                    useOneTap
                                />
                            </GoogleOAuthProvider>
                        </div>
                        <div className="flex flex-col">
                            <span className="flex items-center justify-center space-x-1">
                                <p className="text-xs">Forgot your password?</p>
                                <a
                                    href="/forgot-password"
                                    className="text-xs  font-bold text-orange-600 hover:underline focus:text-orange-800"
                                >
                                    Reset here
                                </a>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
