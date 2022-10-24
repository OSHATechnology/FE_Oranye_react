import React from "react";

export default function Login() {
    return (
        <div className="flex items-center min-h-screen p-4 bg-amber-100 justify-center">
            <div className="flex flex-col w-screen overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
                <div className="hidden p-4 py-6 h-fulllg:h-auto bg-kantor bg-cover bg-center md:flex md:w-60 md:flex-shrink-0  md:flex-col min-h-full md:items-center md:justify-evenly"></div>
                <div className="p-5 bg-white md:flex-1">
                    <h3 className="text-2xl mt-8 mb-20 text-orange-500 text-center font-bold">
                        Reset Password
                    </h3>
                    <form
                        action="#"
                        className="flex flex-col items-center"
                    >
                        <div className="relative z-0 w-3/4 group">
                            <input
                                type="text"
                                name=""
                                id=""
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none hover:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor=""
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] hover:border-orange-500 peer-focus:left-0 peer-focus:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                New Password
                            </label>
                        </div>
                        <div className="relative z-0 w-3/4 group">
                            <input
                                type="text"
                                name=""
                                id=""
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none hover:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="employee_id"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] hover:border-orange-500 peer-focus:left-0 peer-focus:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Confirm New Password
                            </label>
                        </div>
                        {/* <div className="flex items-center space-x-2 my-4">
                            
                            <p
                                className="text-xs font-semibold text-gray-300"
                            >
                                We will send link reset password to your email
                            </p>
                        </div> */}

                        <div className="w-3/4 my-12">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-lg font-semibold text-orange-500 transition-colors duration-300 bg-white border border-orange-500 rounded-md shadow hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-orange-200 focus:ring-4"
                            >
                                Submit
                            </button>
                        </div>
                        {/* <div className="flex flex-col my-4">
                            <span className="flex items-center justify-center space-x-1">
                                <p className="text-xs">Back to</p>
                                <a
                                    href="/login"
                                    className="text-xs  font-bold text-orange-600 hover:underline focus:text-orange-800"
                                >
                                    Login
                                </a>
                            </span>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
}
