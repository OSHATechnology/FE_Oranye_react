import React from "react";

const TitleDashboard = (props) => {
    return (
        <div className="w-full h-fit mt-8">
            <div>
                <h2 className="text-2xl font-extrabold text-black">{props.Title}</h2>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-400">{props.Keterangan}</p>
            </div>
        </div>
    );
};

TitleDashboard.defaultProps = {
    Title: 'Title Dashboard',
    Keterangan: ''
}

export default TitleDashboard;
