import React from "react";

const TitleDashboard = (props) => {
    return (
        <div className="w-full h-fit border-b border-slate-200 pb-1 mt-8">
            <div>
                <h2 className="text-2xl font-extrabold text-black">{props.Title}</h2>
            </div>
            <div>
                <p className="text-xs font-medium text-slate-400">{props.Keterangan}</p>
            </div>
        </div>
    );
};

TitleDashboard.defaultProps = {
    Title: 'Title Dashboard',
    Keterangan: ''
}

export default TitleDashboard;
