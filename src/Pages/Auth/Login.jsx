import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthProvider";

export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const onChangeUsername = (e) => {
        const value = e.target.value
        setUsername(value)
    }

    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post(`/api/auth/login`, {
                    'email': username,
                    password
                    }).then(resp => {
                        // setUser(resp.data.user)
                        //set user in auth provider
                        // return AuthProvider(resp.data.user)
                        navigate('/dashboard')
                    })
            });
        } catch (error) {
            alert('Invalid Credentials')
        }
    }

    return (
        <div className="flex items-center min-h-screen p-4 bg-amber-100 justify-center">
            <div className="flex flex-col w-screen overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
                <div className="hidden p-4 py-6 h-full lg:h-auto bg-[url('assets/kantor.jpeg')] bg-cover bg-center md:flex md:w-60 md:flex-shrink-0  md:flex-col min-h-full md:items-center md:justify-evenly"></div>
                <div className="p-5 bg-white md:flex-1">
                    <h3 className="my-4 text-2xl mb-16 text-orange-500 text-center font-bold">
                        Login
                    </h3>
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
                                Employee Id
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

                        <div className="w-3/4">
                           
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-lg font-semibold text-orange-500 transition-colors duration-300 bg-white border border-orange-500 rounded-md shadow hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-orange-200 focus:ring-4"
                                
                                >
                                Log in
                            </button>
                             
                        </div>
                        <div className="flex flex-col">
                            <span className="flex items-center justify-center space-x-1">
                                <p className="text-xs">Forgot your password?</p>
                                <a
                                    href="#"
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
