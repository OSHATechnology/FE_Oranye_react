import React from "react";
import { Icon } from "@iconify/react";

const SimpleCard = (props) => {
    return (
        <div className={props.bgColor+" flex items-center w-80 h-24 rounded border border-slate-200 shadow"}>
            <div className=" flex gap-2 items-center ml-4">
                <div>
                    <Icon icon={props.Icon} className="text-5xl mr-2 text-slate-600" />
                </div>
                <div className="my-2 items-center">
                    <h3 className="text-xs font-semibold text-slate-400">
                        {props.Title}
                    </h3>
                    <p className="text-2xl font-bold text-black">{props.Count}</p>
                </div>
            </div>
        </div>
    );
};

SimpleCard.defaultProps = {
    bgColor: "bg-white",
    Title: "Title",
    Icon: "mdi:account",
    Count: 0,
};

export default SimpleCard;
