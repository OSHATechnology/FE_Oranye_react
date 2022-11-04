import TitleDashboard from "../../Components/TitleDashboard";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ButtonNormal from "../../Components/ButtonNormal";
import { Icon } from "@iconify/react";
import axios from "axios";
import ConfigHeader from "../Auth/ConfigHeader";

const fectDataPermissions = async () => {
  try {
    const response = await axios.get(
      "api/permissions?filter=group",
      ConfigHeader
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const RoleEdit = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [listPermissions, setListPermissions] = useState([]);
  const [nameRole, setNameRole] = useState("");
  const [descriptionRole, setDescriptionRole] = useState("");
  const [listPermissionsRole, setListPermissionsRole] = useState([]);
  const [basicSalaryRole, setBasicSalaryRole] = useState(0);

  const fetchRole = async () => {
    try {
      const response = await axios.get(
        `api/roles/${searchParams.get("id")}`,
        ConfigHeader
      );
      setNameRole(response.data.data.nameRole);
      setDescriptionRole(response.data.data.description);
    } catch (error) {}
  };

  const handleAlert = (type, message) => {
    props.alert(type, message);
  };

  const fetchDataRolePermissions = async () => {
    try {
      const response = await axios.get(
        `api/role-permissions?roleId=${searchParams.get("id")}`,
        ConfigHeader
      );
      const arrayItems = [];
      response.data.data.map((item) => {
        item.data.map((item2) => {
          arrayItems.push(item2.id);
        });
      });
      setListPermissionsRole(arrayItems);
    } catch (error) {}
  };

  const fetchSalaryRole = async () => {
    try {
      const response = await axios.get(
        `api/basic_salary_by_role/${searchParams.get("id")}`,
        ConfigHeader
      );
      setBasicSalaryRole(response.data.data.fee);
    } catch (error) {}
  };

  const togglePermissionGroup = (e) => {
    const id = e.target.id;
    const parent = document.getElementById(id);
    const explode = id.split("_");
    const element = document.getElementsByClassName(
      "item-permission-" + explode[1]
    );
    let roleId = listPermissionsRole;
    for (let i = 0; i < element.length; i++) {
      if (parent.checked) {
        if (!element[i].checked) {
          element[i].checked = !element[i].checked;
          roleId.push(element[i].value);
        }
      } else {
        if (element[i].checked) {
          element[i].checked = !element[i].checked;

          const index = roleId.indexOf(element[i].value);
          roleId.splice(index, 1);
        }
      }
    }
    setListPermissionsRole(roleId);
    roleId = [];
  };

  const onChangePermission = (e, permisId) => {
    setListPermissionsRole(
      listPermissionsRole.includes(permisId)
        ? listPermissionsRole.filter(
            (item) => item !== parseInt(e.target.value)
          )
        : [...listPermissionsRole, parseInt(e.target.value)]
    );
    console.log(listPermissionsRole);
  };

  const editRole = async (data) => {
    try {
      const response = await axios.put(
        `api/roles/${searchParams.get("id")}`,
        data,
        ConfigHeader
      );
      handleAlert("success", response.data.message);
      return response;
    } catch (error) {
      handleAlert("failed", error.response.data.data);
      return error;
    }
  };

  const editBasicSalaryRole = async (data) => {
    try {
      const response = await axios.post(
        `api/basic_salary_by_role`,
        data,
        ConfigHeader
      );
    } catch (error) {}
  };

  const editRolePermissions = async (roleId, data) => {
    try {
      await axios.delete(
        `api/roles-permissions/detachAll`,
        {
          data: {
            roleId: roleId,
          },
        },
        ConfigHeader
      );
      data.forEach(async (item) => {
        const response = await axios.post(
          "api/role-permissions",
          {
            roleId: roleId,
            permissionId: item,
          },
          ConfigHeader
        );
        return response;
      });
    } catch (error) {
      return error;
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const dataRole = {
        nameRole: nameRole,
        description: descriptionRole,
      };

      const dataBasicSalary = {
        roleId: searchParams.get("id"),
        fee: basicSalaryRole,
      };

      const dataRolePermissions = {
        roleId: searchParams.get("id"),
        roles_permissions: listPermissionsRole,
      };

      await editRole(dataRole).then(async (data) => {
        console.log(data)
        if (data.status === 200) {
          editRolePermissions(
            dataRolePermissions.roleId,
            dataRolePermissions.roles_permissions
          ).then((data) => {
            console.log(data);
          });
          editBasicSalaryRole(dataBasicSalary).then((data) => {
            console.log(data);
          });
          return navigate("/dashboard/role");
        } else {
          console.log("error");
        }
      });
    } catch (error) {
      handleAlert("failed", error.response.data.data);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRole();
    fetchDataRolePermissions().then(() => {
      fectDataPermissions().then((data) => {
        setListPermissions(data.data);
      });
      fetchSalaryRole();
    });
  }, []);

  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard Title="Edit Role" Keterangan="update role area" />
      <div>
        <Link
          to="../role"
          className="flex gap-1 items-center text-blue-400 hover:text-blue-700 w-fit"
        >
          <Icon icon="bi:arrow-left" className="text-sm  font-medium"></Icon>
          <p className="text-sm  font-medium hover:font-bold">
            Back to Role & Permissions
          </p>
        </Link>
      </div>

      <div className="md:w-full border rounded flex flex-col justify-content-center shadow space-y-4 p-4">
        <div className="flex flex-row w-full items-center justify-center md:justify-start">
          <div className="basis-1/5 ">
            <p className="text-lg font-semibold text-gray-700">Role Name</p>
          </div>
          <div className="basis-4/5 ">
            <input
              type="text"
              className="w-full rounded h-8"
              value={nameRole}
              onChange={(e) => setNameRole(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row w-full items-center justify-center md:justify-start">
          <div className="basis-1/5 ">
            <p className="text-lg font-semibold text-gray-700">
              Salary by Role
            </p>
          </div>
          <div className="basis-4/5 ">
            <input
              type="number"
              value={basicSalaryRole}
              onChange={(e) => setBasicSalaryRole(e.target.value)}
              className="w-full rounded h-8"
            />
          </div>
        </div>
        <div className="flex flex-row w-full items-start justify-center md:justify-start">
          <div className="basis-1/5 ">
            <p className="text-lg font-semibold text-gray-700">
              Role Description
            </p>
          </div>
          <div className="basis-4/5">
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              className="w-full rounded"
              onChange={(e) => setDescriptionRole(e.target.value)}
              value={descriptionRole}
            ></textarea>
          </div>
        </div>
        <div className="md:flex md:flex-row w-full items-start justify-center md:justify-start">
          <div className="basis-1/5 ">
            <p className="text-lg font-semibold text-gray-700 items-start">
              Permissions
            </p>
          </div>
          <div className="basis-4/5 ">
            <div className="md:flex">
              {/* list permissions */}
              <div className="basis-1/2 space-y-4">
                {listPermissions &&
                  listPermissions.map((item, index) => {
                    if (index % 2 === 0) {
                      return (
                        <div>
                          <div className="flex items-center gap-2 my-2">
                            <input
                              type="checkbox"
                              id={"permis_" + item.id}
                              className="rounded border border-gray-400"
                              onClick={togglePermissionGroup}
                            />
                            <label
                              htmlFor={"permis_" + item.id}
                              className="text-sm font-medium text-gray-600"
                            >
                              {item.group}
                            </label>
                          </div>
                          <div className="flex flex-col gap-2">
                            {item.data.map((permis, key) => (
                              <div
                                key={key}
                                className="flex items-center gap-2 ml-6"
                              >
                                <input
                                  type="checkbox"
                                  id={"permis_" + item.id + "_" + permis.id}
                                  value={permis.id}
                                  onClick={(e) =>
                                    onChangePermission(e, permis.id)
                                  }
                                  className={
                                    "rounded border border-gray-400 item-permission-" +
                                    item.id
                                  }
                                  checked={listPermissionsRole.includes(
                                    permis.id
                                  )}
                                />
                                <label
                                  htmlFor={
                                    "permis_" + item.id + "_" + permis.id
                                  }
                                  className="text-sm font-medium text-gray-600"
                                >
                                  {permis.namePermission}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
              <div className="basis-1/2 space-y-4">
                {listPermissions &&
                  listPermissions.map((item, index) => {
                    if (index % 2 === 1) {
                      return (
                        <div>
                          <div className="flex items-center gap-2 my-2">
                            <input
                              type="checkbox"
                              id={"permis_" + item.id}
                              className="rounded border border-gray-400"
                              onClick={togglePermissionGroup}
                            />
                            <label
                              htmlFor={"permis_" + item.id}
                              className="text-sm font-medium text-gray-600"
                            >
                              {item.group}
                            </label>
                          </div>
                          <div className="flex flex-col gap-2">
                            {item.data.map((permis, key) => (
                              <div
                                key={key}
                                className="flex items-center gap-2 ml-6"
                              >
                                <input
                                  type="checkbox"
                                  id={"permis_" + item.id + "_" + permis.id}
                                  value={permis.id}
                                  onClick={(e) =>
                                    onChangePermission(e, permis.id)
                                  }
                                  className={
                                    "rounded border border-gray-400 item-permission-" +
                                    item.id
                                  }
                                  checked={listPermissionsRole.includes(
                                    permis.id
                                  )}
                                />
                                <label
                                  htmlFor={
                                    "permis_" + item.id + "_" + permis.id
                                  }
                                  className="text-sm font-medium text-gray-600"
                                >
                                  {permis.namePermission}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <ButtonNormal
            bg="bg-green-600 "
            text="Create"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleEdit;
