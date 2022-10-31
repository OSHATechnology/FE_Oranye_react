import React from "react";
import TitleDashboard from "../../Components/TitleDashboard";

const Home = (props) => {
  return (
    <div className="md:ml-8 space-y-8 pb-10">
      <TitleDashboard Title="Property Dashboard" Keterangan="Welcome, Admin!" />

      <div>
        <iframe title="oranye-dash-admin - Page 1" width="800" height="473.5" src="https://app.powerbi.com/view?r=eyJrIjoiNTk4MDY0NTQtMjk3Zi00ZmQ2LTgxZjUtODk0OTIxM2E3ZWZmIiwidCI6IjEwMWE2M2VkLTdmMTUtNDJlZC05YjY1LWQ4N2YwM2Q0ZWM3ZSIsImMiOjEwfQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe>
      </div>
    </div>
  );
};

export default Home;
