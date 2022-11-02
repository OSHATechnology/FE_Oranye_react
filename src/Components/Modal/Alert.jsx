import { Icon } from "@iconify/react";
import React from "react";

const Alert = () => {
  return (
   <div>
      <div className="bg-green-500 w-80 h-1 rounded-t"></div>
      <div className="bg-green-100 p-2 flex gap-1 items-center w-80 h-14 rounded-b text-gray-600">
        <Icon icon="akar-icons:circle-alert"></Icon>
        <p className="text-sm font-medium ">Data berhasil di tambahkan</p>
      </div>
   </div>
  );
};

export default Alert;
