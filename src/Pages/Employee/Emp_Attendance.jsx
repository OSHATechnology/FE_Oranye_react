import React, { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Menu, Tab, Transition } from "@headlessui/react";
import ConfigHeader from "../Auth/ConfigHeader";
import axios from "axios";
import Spinner2 from "../../Components/Spinner2";
import LogoImg from "../../assets/oranye-logo.png";
import moment from "moment";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FurloughCard = (props) => {
  const [typeFurlough, setTypeFurlough] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [listTypeFurlough, setListTypeFurlough] = useState([]);

  const fecthTypeFurlough = async () => {
    const res = await axios.get(
      "/api/furlough_type?show_all=true",
      ConfigHeader
    );
    setListTypeFurlough(res.data.data);
  };

  const clearInput = () => {
    setTypeFurlough("");
    setStartAt("");
    setEndAt("");
  };

  const handleFurlough = (e) => {
    e.preventDefault();
    try {
      const data = {
        type: "furlough",
        type_furlough: typeFurlough,
        start_at: startAt,
        end_at: endAt,
      };
      const resp = axios.post("/api/my/add-leave-request", data, ConfigHeader);
      resp.then((res) => {
        alert(res.data.message);
        props.actionRefresh();
        clearInput();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthTypeFurlough();
  }, []);

  return (
    <div className="">
      <div className="flex flex-row w-full">
        <div className="flex basis-1/4 items-center justify-center">
          <img src={LogoImg} alt="" />
        </div>
        <div className="basis-3/4 m-4">
          <form onSubmit={handleFurlough}>
            <table className="w-full">
              <tbody>
                <tr>
                  <td>
                    <p className="mr-2 text-md">Type</p>
                  </td>
                  <td>
                    <select
                      name=""
                      id=""
                      onChange={(e) => setTypeFurlough(e.target.value)}
                      className="rounded w-full border border-gray-300"
                    >
                      <option value="-">-- Select Type--</option>
                      {listTypeFurlough.length > 0 &&
                        listTypeFurlough.map((item, index) => (
                          <option key={index} value={item.furTypeId}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="mr-2 text-md">Start Date</p>
                  </td>
                  <td>
                    <input
                      type="date"
                      name=""
                      id=""
                      onChange={(e) => setStartAt(e.target.value)}
                      placeholder="Start Date"
                      className="rounded w-full border border-gray-300"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="mr-2 text-md">End Date</p>
                  </td>
                  <td>
                    <input
                      type="date"
                      name=""
                      id=""
                      onChange={(e) => setEndAt(e.target.value)}
                      placeholder="End Date"
                      className="rounded w-full border border-gray-300"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 mt-2"
              >
                Request Furlough
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const WorkPermitCard = (props) => {
  const [dataWorkPermit, setDataWorkPermit] = useState({
    start_at: "",
    end_at: "",
  });

  const clearInput = () => {
    setDataWorkPermit({
      start_at: "",
      end_at: "",
    });
  };

  const handleWorkPermit = (e) => {
    e.preventDefault();
    try {
      const data = {
        type: "work_permit",
        ...dataWorkPermit,
      };
      const resp = axios.post("/api/my/add-leave-request", data, ConfigHeader);
      resp.then((res) => {
        alert(res.data.message);
        props.actionRefresh();
        clearInput();
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-row w-full">
        <div className="flex basis-1/4 items-center justify-center">
          <img src={LogoImg} alt="" />
        </div>
        <div className="basis-3/4 m-4">
          <form onSubmit={handleWorkPermit}>
            <table className="w-full">
              <tbody>
                <tr>
                  <td>
                    <p className="mr-2 text-md">Start Date</p>
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      name=""
                      id=""
                      onChange={(e) =>
                        setDataWorkPermit({
                          ...dataWorkPermit,
                          start_at: e.target.value,
                        })
                      }
                      placeholder="Start Date"
                      className="rounded w-full border border-gray-300"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="mr-2 text-md">End Date</p>
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      name=""
                      id=""
                      onChange={(e) =>
                        setDataWorkPermit({
                          ...dataWorkPermit,
                          end_at: e.target.value,
                        })
                      }
                      placeholder="End Date"
                      className="rounded w-full border border-gray-300"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="mr-2 text-md">Picture</p>
                  </td>
                  <td colSpan="2">
                    <input
                      type="file"
                      name=""
                      id=""
                      placeholder="End Date"
                      className="rounded w-full border border-gray-300"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 mt-2"
              >
                Request Work Permit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function KaryawanKehadiran() {
  const [leaveRequest, setLeaveRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reqOvertime, setReqOvertime] = useState({
    start_at: "",
    end_at: "",
  });
  const [notifications, setNotifications] = useState([]);

  const refreshTable = () => {
    setIsLoading(false);
    fetchDataLeaveRequest();
  };

  const clearInputReqOvertime = () => {
    setReqOvertime({
      start_at: "",
      end_at: "",
    });
  };

  const actionType = [
    {
      id: 1,
      name: "Furlough",
      component: <FurloughCard actionRefresh={refreshTable} />,
    },
    {
      id: 2,
      name: "Work Permit",
      component: <WorkPermitCard actionRefresh={refreshTable} />,
    },
  ];

  const getColorStatus = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-green-800";
      case "rejected":
        return "text-red-800";
      case "waiting for approved":
        return "text-yellow-800";
      default:
        return "text-gray-800";
    }
  };

  const getIconType = (type) => {
    switch (type.toLowerCase()) {
      // iconify
      case "furlough":
        return (
          <Icon icon="bi:airplane-engines-fill" className="text-xl mr-1" />
        );
      case "work permit":
        return "";
      default:
        return "";
    }
  };

  const fetchDataNotification = async (limit = 10) => {
    try {
      const response = await axios.get("/api/my/notification?limit=" + limit, ConfigHeader);
      setNotifications(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchDataLeaveRequest = async () => {
    try {
      const response = await axios.get(
        `/api/my/leave-requests?show_all=true`,
        ConfigHeader
      );
      setLeaveRequest(response.data.data);
      setIsLoading(true);
    } catch (error) {
      console.log("failed fetch data leave request");
      console.log(error);
    }
  };

  const handleOvertime = (e) => {
    e.preventDefault();
    const data = {
      type: "overtime",
      ...reqOvertime,
    };

    try {
      const resp = axios.post("/api/my/add-leave-request", data, ConfigHeader);
      resp.then((res) => {
        clearInputReqOvertime();
        alert(res.data.message);
        refreshTable();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataLeaveRequest();
  }, []);

  return (
    <div className="pb-4">
      <div className="flex justify-end md:w-4/5 mt-8 mb-2">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-yellow-500 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <Icon
                icon="akar-icons:bell"
                className="text-center text-lg text-black"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute top-0 right-12 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  <div className="">
                    <p className="font-bold text-gray-600 text-sm px-2">
                      Notifications
                    </p>
                  </div>
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  <div className="flex items-center gap-2 px-2">
                    <div>
                      <Icon icon={"bxs:plane"}></Icon>
                    </div>
                    <div className="text-xs">
                      <div>
                        <p className="font-semibold text-gray-600">
                          Furlough for 06 Desember
                        </p>
                      </div>
                      <div className="flex font-thin text-gray-400">
                        <div>
                          <p>12 June 22</p>
                        </div>
                        <div>
                          <p>|</p>
                        </div>
                        <div>
                          <p>08:00 A.M</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Icon
                        icon={"akar-icons:circle-check"}
                        className="text-green-600"
                      ></Icon>
                    </div>
                  </div>
                </Menu.Item>
              </div>
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="../notification"
                      className={`${active ? "font-bold" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <p className="text-xs text-blue-600">Show All Notification</p>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {/* <div className="justify-end flex md:w-4/5 ">
                    <button className="w-fit h-fit bg-yellow-500 rounded p-1">
                        <Icon icon="akar-icons:bell" className="text-center text-lg text-black" />
                    </button>
                </div> */}
      </div>
      <div className="flex justify-center ">
        <div className=" items-start justify-center md:min-h-1/3 md:flex md:flex-row md:w-4/5 md:gap-4 space-y-8 md:space-y-0">
          <div className="flex w-full basis-1/2 min-h-max md:min-h-full shadow-xl items-center justify-center rounded-xl border-2 border-gray-100 md:border-0 mt-4 md:mt-0">
            <div className="w-full py-4 sm:px-0 ml-4">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl">
                  {actionType.map((type) => (
                    <Tab
                      key={type.id}
                      className={({ selected }) =>
                        classNames(
                          "focus:outline-none hover:text-orange-500 mr-2",
                          selected ? "border-b-2 border-orange-500" : " "
                        )
                      }
                    >
                      <p className="text-md font-semibold">{type.name}</p>
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                  {actionType.map((type) => (
                    <Tab.Panel
                      key={type.id}
                      className={classNames(
                        "rounded-xl bg-white",
                        "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2"
                      )}
                    >
                      {type.component}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
          <div className="flex w-full basis-1/2 md:min-h-full shadow-xl items-start justify-center rounded-xl pr-4 border-2 border-gray-100 md:border-0">
            <div className="w-full py-4 sm:px-0 ml-4">
              <div className="flex space-x-1 rounded-xl p-1 mt-1">
                <p className="text-md font-semibold">Overtime</p>
              </div>
              <div className="mt-6">
                <form action="" onSubmit={handleOvertime}>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td>
                          <p className="mr-2 text-md">Start Time</p>
                        </td>
                        <td>
                          <input
                            type="datetime-local"
                            name=""
                            id=""
                            placeholder="Start Date"
                            required
                            value={reqOvertime.start_at}
                            className="rounded w-full border border-gray-300"
                            onChange={(e) =>
                              setReqOvertime({
                                ...reqOvertime,
                                start_at: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mr-2 text-md">End Time</p>
                        </td>
                        <td>
                          <input
                            type="datetime-local"
                            name=""
                            id=""
                            required
                            value={reqOvertime.end_at}
                            placeholder="End Date"
                            className="rounded w-full border border-gray-300"
                            onChange={(e) =>
                              setReqOvertime({
                                ...reqOvertime,
                                end_at: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 mt-2"
                    >
                      Request Overtime
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8 mb-2">
        <div className=" items-start md:flex md:flex-row md:w-4/5">
          <p className="text-lg font-semibold">History</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="items-start md:min-h-1/3 md:flex md:flex-row md:w-4/5">
          <table className=" w-full text-center overflow-x-scroll">
            <thead className="bg-gray-100 border-b-2 border-gray-800 text-xs md:text-sm">
              <tr className="">
                <th className=" py-2">No</th>
                <th className="">Type</th>
                <th className="">Requested At</th>
                <th className="">Confirmed At</th>
                <th className="">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm font-medium">
              {isLoading ? (
                leaveRequest?.data?.map((data, index) => (
                  <tr key={data.id} className="border-b border-gray-200">
                    <td className="py-2">{index + 1}</td>
                    <td>
                      <div className="flex items-center justify-center py-4">
                        {getIconType(data.type)}
                        <span>{data.type}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center py-4">
                        <span>
                          {data?.requestAt
                            ? moment(data?.requestAt).format("H:m DD MMMM Y")
                            : "-"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center py-4">
                        <span>
                          {data?.confirmedAt
                            ? moment(data?.confirmedAt).format("H:m DD MMMM Y")
                            : "-"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={
                          "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 " +
                          getColorStatus(data.status)
                        }
                      >
                        {data.status ? data.status : "-"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-2">
                    <Spinner2 />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
