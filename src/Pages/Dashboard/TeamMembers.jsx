import React from "react";
import { Link } from "react-router-dom";
import SimpleCard from "../../Components/SimpleCard";
import TitleDashboard from "../../Components/TitleDashboard";

const TeamMembers = () => {
  return (
    <div className="w-full md:mx-8 space-y-8">
      <TitleDashboard
        Title="Team Details"
        Keterangan="Detailed information of team"
      />
      <div>
        <Link to="../team">
          <p className="text-sm text-blue-600 font-medium">
            Back to Team Management
          </p>
        </Link>
      </div>
      
      <div className="flex gap-2">
      <SimpleCard
        bgColor="bg-gray-100 hover:bg-gray-200"
        Title="Team Name"
        Icon=""
        Count="Team Develop"
      />
      <SimpleCard
        bgColor="bg-gray-100 hover:bg-gray-200"
        Title="Leader Team"
        Icon=""
        Count="Mr.Fachrian S.Ag."
      />
      <SimpleCard
        bgColor="bg-gray-100 hover:bg-gray-200"
        Title="Team Maker"
        Icon=""
        Count="Mr.Fachrian S.Ag."
      />
      </div>
    </div>
  );
};

export default TeamMembers;
