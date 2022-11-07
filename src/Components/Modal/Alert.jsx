import { Icon } from "@iconify/react";
import React from "react";

const Alert = (props) => {
  return (
    <div className="w-80 fixed right-0 top-0 m-5 z-50 shadow rounded">
      <div className={"bg-" + props.color + "-500  h-1 rounded-t"}></div>
      <div className={"flex justify-between bg-white"}>
        <div className={" p-2 flex gap-1 items-center  h-14 rounded-b "}>
          <Icon
            icon="akar-icons:circle-alert"
            className={"text-" + props.color + "-800"}
          ></Icon>
          <p className={"text-xs font-medium text-" + props.color + "-800"}>
            {props.text}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

Alert.defaultProps = {
  color: "green",
  text: "Data berhasil di tambahkan.",
};

export default Alert;
