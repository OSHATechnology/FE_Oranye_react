import React from "react";
import { Icon } from "@iconify/react";

const ButtonNormal = (props) => {
    return (
        <div>
            <button onClick={props.onClick} className={"flex rounded px-2 py-1 items-center text-center justify-center " + props.bg + props.textColor + props.width} >
                <Icon icon={props.icon} className={props.iconColor + " text-2xl"} />
                <span>{props.text}</span>
            </button>
        </div>
    );
};

ButtonNormal.defaultProps = {
    bg: "bg-gray-400 ",
    width: "w-fit ",
    textColor: "text-white ",
    icon: " ",
    colorIcon: "text-white",
    text: "Button"
}

export default ButtonNormal;
