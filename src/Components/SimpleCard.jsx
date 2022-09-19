import React from "react";
import { Icon } from "@iconify/react";

const SimpleCard = (props) => {
    return (
        <div className={props.bgColor+" w-80 h-36 rounded "}>
            <div className="p-6">
                <div>
                    <h3 className="text-base font-semibold text-gray-500">
                        {props.Title}
                    </h3>
                </div>
                <div className="flex my-2 items-center">
                    <Icon icon={props.Icon} className="text-2xl mr-2" />
                    <p className="text-2xl font-bold ">{props.Count}</p>
                </div>
            </div>
        </div>
    );
};

SimpleCard.defaultProps = {
    bgColor: "bg-gray-200",
    Title: "Title",
    Icon: "mdi:account",
    Count: 0,
};

export default SimpleCard;
