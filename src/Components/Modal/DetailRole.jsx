import axios from "axios";
import React, { useState, useEffect} from "react";
import ConfigHeader from "../../Pages/Auth/ConfigHeader";
import ButtonNormal from "../ButtonNormal";
import ModalDelete from "../../Components/Modal/ModalDelete";
import { Link } from "react-router-dom";

const fecthListPermission = async (roleId) => {
    const response = await axios.get('api/role-permissions?roleId='+roleId,ConfigHeader);
    return response.data;
};

const DetailRole = ({ ...data }) => {
    const [listPermission, setListPermission] = useState([]);
    const [modalRoleDelete, setModalRoleDelete] = useState(false);
    const [roleDeleteData, setRoleDeleteData] = useState({});

    let dataRoleId = "";
    const showModalDelete = async (roleId) => {
      dataRoleId = roleId;
      setRoleDeleteData(dataRoleId);
      setModalRoleDelete(true);
    };

     useEffect(() => {
        (data.roleId !== undefined) && fecthListPermission(data.roleId).then((data) => {
            setListPermission(data);
        });
    }, [data.roleId]);
    
    return (    
        <>
        <div className="items-start space-y-4">
          <div className="w-full  space-y-1">
            <div className="flex ">
                <div className="basis-1/4 ">
                    <p className="font-medium text-gray-600">Role Name</p>
                </div>
                <div className="basis-3/4 ">
                    <p className="font-bold text-gray-800">{data.nameRole}</p>
                </div>
            </div>
            <div className="flex overflow-y-auto h-4/5">
                <div className="basis-1/4">
                <p className="font-medium text-gray-600">Permissions</p>
                </div>
                <div className="basis-3/4 ">
                    <table className="w-full">
                        <thead className="font-semibold text-sm"> 
                            <tr>
                                <td>#</td>
                                <td>Permissions</td>
                                <td>details</td>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            {
                                listPermission.data ? Object.keys(listPermission.data).map((key, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{listPermission.data[key].group}</td>
                                              <td>
                                                <ul className="list-disc">
                                                    {
                                                        listPermission.data[key].data ? Object.keys(listPermission.data[key].data).map((key1, index1) => {
                                                            return (
                                                                <li key={index1}>{listPermission.data[key].data[key1].namePermission}</li>
                                                            )
                                                        }) : null
                                                    }
                                                </ul>
                                            </td>
                                        </tr>
                                    )
                                }) : <tr><td colSpan="3">
                                        <div className="flex justify-center items-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                                        </div>
                                    </td></tr>
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
            </div>


            <div className="flex justify-between gap-2">
            <Link to="../RoleEdit">
                <ButtonNormal bg="bg-yellow-400 " icon="akar-icons:edit"  text="Edit" width="w-20" 
                // onClick={() => setIsOpen(false)} 
                />
                </Link>
                <ButtonNormal bg="bg-red-600 " icon="bx:trash"  text="Delete" width="w-20"
                onClick={() =>
                    showModalDelete(data.roleId)}
                />
            </div>
          </div>
          {modalRoleDelete && (
            <ModalDelete
              isOpen={modalRoleDelete}
              setIsOpen={setModalRoleDelete}
              title="Delete Role"
              typeData="role"
              data={roleDeleteData}
            />
          )}
        </>
    );
};

export default DetailRole;