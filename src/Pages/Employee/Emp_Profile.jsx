import axios from "axios";
import React, { useEffect, useState } from "react";
import ConfigHeader from "../Auth/ConfigHeader";
import { AuthData } from "../Auth/AuthProvider";
import moment from "moment";
import { Icon } from "@iconify/react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function KaryawanProfile(props) {
    const empAuthId = AuthData?.id ? AuthData?.id : 0;
    const [employee, setEmployee] = useState([]);
    const clientId =
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com";

    const fetchDataEmp = async () => {
        const response = await axios.get(
            `/api/employee/` + empAuthId,
            ConfigHeader
        );
        setEmployee(response.data.data);
    };

    useEffect(() => {
        fetchDataEmp();
    }, []);
    return (
        <div className="flex justify-center">
            <div className=" items-start justify-center w-screen md:min-h-1/3 md:flex md:flex-row md:w-4/5">
                {employee?.length !== 0 ? (
                    <div className=" md:w-full  m-3  flex justify-content-center gap-4">
                        <div className=" w-full border  rounded flex flex-col justify-content-center">
                            <div className="md:flex md:flex-row w-full">
                                <div className="flex basis-1/4 items-center justify-center">
                                    {employee?.photo ? (
                                        <img src={employee?.photo} alt="" className="w-36" />
                                    ) : (
                                        ".."
                                    )}
                                </div>

                                <div className="basis-3/4 m-4 text-center md:text-start">
                                    <div className="md:flex md:justify-between items-center">
                                        <div>
                                            <h3 className="text-2xl text-orange-500 font-extrabold">
                                                {employee?.name}
                                            </h3>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Joined at,{" "}
                                                {moment(employee?.joinedAt).format("DD MMMM YYYY")}
                                            </p>
                                        </div>
                                    </div>
                                    <h4 className="text-2xl">{employee?.employeeId}</h4>
                                    <table className="mt-5 text-start">
                                        <tr>
                                            <td>
                                                <p className="text-sm">Status</p>
                                            </td>
                                            <td>
                                                <p className="text-sm">:</p>
                                            </td>
                                            <td>
                                                <p className="text-sm text-orange-500">
                                                    {employee?.statusHire.status}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="text-sm">Role</p>
                                            </td>
                                            <td>
                                                <p className="text-sm">:</p>
                                            </td>
                                            <td>
                                                <p className="text-sm">{employee?.role.role}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="flex flex-row w-full justify-center md:justify-start">
                                <h3 className="text-md md:text-xl font-extrabold ml-4 text-center">
                                    Employee Information
                                </h3>
                            </div>
                            <div className="md:flex md:flex-row w-full items-start m-4 space-y-4 md:space-y-0">
                                <div className="md:basis-2/3 md:flex">
                                    <div className="md:flex md:basis-1/2 items-center ">
                                        <table>
                                            <tr>
                                                <td>
                                                    <p className="text-xs md:text-sm w-20 md:w-auto">
                                                        First Name
                                                    </p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">:</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">{employee?.firstName}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="text-xs md:text">Last Name</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">:</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">{employee?.lastName}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="text-xs md:text">Birth Date</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">:</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">
                                                        {moment(employee?.birthDate).format(
                                                            "dddd, DD MMMM YYYY"
                                                        )}
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="text-xs md:text">Address</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">:</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">{employee?.address}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div className="md:basis-1/2 ">
                                        <table>
                                            <tr>
                                                <td>
                                                    <p className="text-xs md:text w-20 md:w-auto">City</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">:</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">{employee?.city}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="text-xs md:text">Nation</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">:</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">{employee?.nation}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="text-xs md:text">Email</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">:</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs md:text">{employee?.email}</p>
                                                </td>
                                            </tr>

                                        </table>
                                    </div>
                                </div>
                                <div className="md:basis-1/3 space-y-1 items-center gap-2">
                                    <p className="text-xs text-gray-600 font-medium">Hubungkan akun dengan google :</p>

                                    {!employee?.google_id && (
                                        <GoogleOAuthProvider clientId={clientId}>
                                            <GoogleLogin

                                                shape="circle"
                                                size="small"
                                                text="signup_with"
                                                onSuccess={async (credentialResponse) => {
                                                    await axios
                                                        .get(`api/auth/google/callback`, {
                                                            params: {
                                                                creds: credentialResponse.credential,
                                                            },
                                                        })
                                                        .then(async (response) => {
                                                            try {
                                                                if (response.status === 200) {
                                                                    alert("success");
                                                                    window.location.reload();
                                                                }
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            console.log(error);
                                                        });
                                                }}
                                                onError={() => {
                                                    console.log("Login Failed");
                                                }}
                                            />
                                        </GoogleOAuthProvider>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* <div className=" basis-1/4 border  rounded flex flex-col justify-content-center py-8 space-y-8">
              <div className="flex items-center justify-center text-center gap-2">
                <Icon icon="logos:google-icon"></Icon>
                <p className="text-sm font-bold">Connect with google account</p>
              </div>
              <div className="mx-8">
                <p className="text-start text-sm font-medium">E-mail</p>
                <input
                  type="text"
                  placeholder="E-mail"
                  className="w-full rounded h-9 border border-gray-400"
                />
              </div>
              <div className="text-center">
                <button className="bg-orange-500 rounded py-2 px-4 text-white font-bold">
                  Connect
                </button>
                {!employee?.google_id && (
                  <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                      text="signup_with"
                      onSuccess={async (credentialResponse) => {
                        await axios
                          .get(`api/auth/google/callback`, {
                            params: {
                              creds: credentialResponse.credential,
                            },
                          })
                          .then(async (response) => {
                            try {
                              if (response.status === 200) {
                                alert("success");
                              }
                            } catch (error) {
                              console.log(error);
                            }
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </GoogleOAuthProvider>
                )}
              </div>
            </div> */}
                    </div>
                ) : (
                    "Loading"
                )}
            </div>
        </div>
    );
}
