import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ConfigHeader from "../Auth/ConfigHeader";
import Spinner2 from "../../Components/Spinner2";

const Notifications = () => {
  const [notifData, setNotifData] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/my/notifications', ConfigHeader);
      setNotifData(response.data.data);
    } catch (err) {
      console.log(err.response)
    }
  }

  useEffect(() => {
    fetchNotifications().then(() => {
      console.log('fetching data')
      console.log(notifData)
    });
  }, [])

  return (
    <div className="flex justify-center mt-8">
      <div className=" items-start justify-start w-screen md:min-h-1/3 md:w-4/5  space-y-4">
        <div >
          <Link to="../attendance" className="flex items-center gap-1">
            <Icon icon="bi:arrow-left" className="text-blue-600"></Icon>
            <p className="text-sm text-blue-600 font-medium">
              Back to Attendance
            </p>
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Icon icon="carbon:notification-new" className="text-lg"></Icon>
            <p className="text-lg font-bold text-black">Notifications</p>
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium">
              Mark all read
            </p>
          </div>
        </div>

        <div className=" space-y-1 shadow rounded p-2">
          {notifData?.data ? notifData?.data?.map((data, index) => (
            <div key={index} className="flex  justify-between border-b border-gray-300 items-center ">

              <div>
                <div className="flex items-center gap-1">
                  <Icon icon="bxs:plane"></Icon>
                  <p className="font-semibold">Accepted furlough for 06 September 2022</p>
                </div>
                <div>
                  <p className="text-xs font-thin ml-5">01 September 2022</p>
                </div>
              </div>
              <div>
                <p className="text-blue-500 text-sm">Mark Red</p>
              </div>
            </div>
          )) : (
            <Spinner2 />
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
