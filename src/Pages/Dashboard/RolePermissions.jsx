import React, { useEffect, useState } from "react";
import TitleDashboard from "../../Components/TitleDashboard";
import ButtonNormal from "../../Components/ButtonNormal";
import ButtonSmall from "../../Components/ButtonSmall";
import axios from "axios";
import ConfigHeader from "../Auth/ConfigHeader";
import Modal from "../../Components/Modal/ModalRoleDetail";
import { Link } from "react-router-dom";
import ModalDetail from "../../Components/Modal/ModalDetail";
import Search from "../../Components/Search";
import Pagination from "react-js-pagination";

const RolePermissions = () => {
  const [dataRole, setDataRole] = useState([]);
  const [dataPermissions, setDataPermissions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [roleDetails, setRoleDetails] = useState([]);
  const [modalDetailsRole, setModalDetailsRole] = useState(false);

  const fetchDataRole = async (page = 1, search = "") => {
    const result = await axios.get(
      `/api/roles?search=${search}&page=${page}`,
      ConfigHeader
    );
    setDataRole(result.data.data);
  };

  let dataRoleId = "";
  const showModalDetail = async (roleId) => {
    dataRoleId = roleId;
    await fetchDataRoleDetail();
  };
  const fetchDataRoleDetail = async () => {
    const result = await axios.get(`/api/roles/${dataRoleId}`, ConfigHeader);
    setRoleDetails(result.data.data);
    setModalDetailsRole(true);
  };

  const feacthDataPermissions = async (page = 1, search = "") => {
    const result = await axios.get(
      `/api/permissions?show_role=true&search=${search}&page=${page}`,
      ConfigHeader
    );
    setDataPermissions(result.data.data);
  };

  useEffect(() => {
    fetchDataRole();
    feacthDataPermissions();
  }, []);

  const handleSearchRole = (e) => {
    try {
      fetchDataRole(1, e.target.value);
    } catch (err) { }
  };

  const handleSearchPermissions = (e) => {
    try {
      feacthDataPermissions(1, e.target.value);
    } catch (err) { }
  };

  return (
    <div className="w-full md:mx-8">
      <TitleDashboard
        Title="Role & Permissions Management"
        Keterangan="Create, Read, and Delete Roles"
      />

      <div className="md:flex gap-8 mt-8 space-y-4 md:space-y-0">
        <div className="basis-1/2 h-fit border border-gray-200 rounded-xl space-y-4 p-4">
          <div>
            <p className="text-xl font-bold">List Role</p>
          </div>
          <div className="flex justify-between items-center ">
            <div>
              <Link to="../addRole">
                <ButtonNormal
                  bg="bg-green-600 "
                  icon="akar-icons:plus"
                  text="Add"
                />
              </Link>
            </div>
            <Search onChange={handleSearchRole} />
          </div>
          <div>
            <table className="w-full text-center overflow-x-scroll rounded">
              <thead className="bg-gray-100 border-b-2 border-gray-700">
                <tr>
                  <th>#</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-gray-600">
                {dataRole.data ? (
                  Object.keys(dataRole.data).map((row, index) => (
                    <tr key={dataRole.data[row].roleId}>
                      <td>{index + 1}</td>
                      <td class="text-start">{dataRole.data[row].nameRole}</td>
                      <td className="w-24">
                        <div className="flex justify-center text-center">
                          <ButtonNormal
                            bg="bg-blue-500 "
                            text="details"
                            onClick={() =>
                              showModalDetail(dataRole.data[row].roleId)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Loading</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            activePage={dataRole.current_page ? dataRole.current_page : 0}
            itemsCountPerPage={dataRole?.per_page ? dataRole?.per_page : 0}
            totalItemsCount={dataRole?.total ? dataRole?.total : 0}
            onChange={(pageNumber) => {
              fetchDataRole(pageNumber);
            }}
            innerClass="flex justify-center items-center gap-2 my-8 "
            pageRangeDisplayed={8}
            itemClass="text-sm font-semibold text-slate-600 rounded-full px-2 hover:bg-slate-100 "
            linkClass="page-link"
            activeClass="bg-slate-100 font-bold"
          />
        </div>
        <div className="basis-1/2 h-fit border border-gray-200 rounded-xl space-y-4 p-4">
          <div>
            <p className="text-xl font-bold">List Permissions</p>
          </div>
          <div className="flex justify-end">
            <Search onChange={handleSearchPermissions} />
          </div>

          <div>
            <table className="w-full text-center overflow-x-scroll rounded">
              <thead className="bg-gray-100 border-b-2 border-gray-700">
                <tr>
                  <th>#</th>
                  <th className="w-1/2">Permission</th>
                  <th className="w-1/2">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-gray-600">
                {dataPermissions.data ? (
                  Object.keys(dataPermissions.data).map((row, index) => (
                    <tr key={dataPermissions.data[row].namePermissionId}>
                      <td>{index + 1}</td>
                      <td class="text-start">{dataPermissions.data[row].namePermission}</td>
                      <td>
                        <div className="flex flex-wrap justify-start text-center gap-1 w-full">
                          {/* <ButtonNormal
                            bg="bg-blue-500 "
                            text="details"
                          /> */}
                          {/* {
                            dataPermissions.data[row].roles ? Object.keys(dataPermissions.data[row].roles).map((row2, index) => (
                                <ButtonNormal
                                    bg="bg-blue-500 "
                                    text={dataPermissions.data[row].roles[row2].nameRole}
                                />
                            )) : ''
                          } */}
                          <span className="text-gray-600 text-xs">{dataPermissions.data[row].description}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Loading</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            activePage={dataPermissions.current_page ? dataPermissions.current_page : 0}
            itemsCountPerPage={dataPermissions?.per_page ? dataPermissions?.per_page : 0}
            totalItemsCount={dataPermissions?.total ? dataPermissions?.total : 0}
            onChange={(pageNumber) => {
              feacthDataPermissions(pageNumber);
            }}
            innerClass="flex justify-center items-center gap-2 my-8 "
            pageRangeDisplayed={8}
            itemClass="text-sm font-semibold text-slate-600 rounded-full px-2 hover:bg-slate-100 "
            linkClass="page-link"
            activeClass="bg-slate-100 font-bold"
          />
        </div>
      </div>
      {modalDetailsRole && (
        <ModalDetail
          isOpen={modalDetailsRole}
          setIsOpen={setModalDetailsRole}
          title="Role Details"
          typeData="role"
          data={roleDetails}
        />
      )}
    </div>
  );
};

export default RolePermissions;
