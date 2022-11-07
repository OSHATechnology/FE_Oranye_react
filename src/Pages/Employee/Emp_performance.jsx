import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";
import ConfigHeader from "../Auth/ConfigHeader";

const ChartHorizontalBar = (props) => {
    const chartData = props.data;
    console.log(props.data);
    // const options =  {
    //     scales: {
    //         x: {
    //             type: 'timeseries',
    //         }
    //     }
    // }
    const options = {};

  return <Line data={chartData} options={options} />;
};

const Emp_performance = () => {
    const [chartData, setChartData] = useState({});
    const fetchDataPerformanceAttendance = async () => {
        try {
            const response = await axios.get('/api/my/performance/attendance',ConfigHeader);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    };

    const [labels,setLabels] = useState([]);
    const [dataSets,setDataSets] = useState([]);
    
    const data =  {
        labels: labels,
        datasets: dataSets,
        // datasets: [
        //   {
        //     label: "My First dataset",
        //     backgroundColor: "rgba(255,99,132,0.2)",
        //     borderColor: "rgba(248,147,29,1)",
        //     borderWidth: 1,
        //     hoverBackgroundColor: "rgba(255,99,132,0.4)",
        //     hoverBorderColor: "rgba(255,99,132,1)",
        //     data: [65, 59, 80, 81, 56, 55, 40],
        //   },
        // ],
      };

    useEffect(() => {
        fetchDataPerformanceAttendance()
        .then((response) => {
            console.log(response.data);
            response.data.map((item) => {
                setLabels((labels) => [...labels,item.date]);
                console.log(item);
                item.status ?  setDataSets((dataSets) => [...dataSets,item.timestamp]) : setDataSets((dataSets) => [...dataSets, 0]);
               ;
            })
        })
        .then(() => {
            console.log(data);
        })
    }, []);
    
  return (
    <div className="flex justify-center">
      <div className=" items-start justify-center w-screen md:min-h-1/3 md:flex md:flex-row md:w-4/5">
        <ChartHorizontalBar data={data} />
      </div>
    </div>
    // <iframe title="oranye-dash-employee" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=49e9c046-daf4-4f5e-a895-1a37d02d670e&autoAuth=true&ctid=101a63ed-7f15-42ed-9b65-d87f03d4ec7e&rp:employeeId=1" frameborder="0" allowFullScreen="true"></iframe>
  );
};

export default Emp_performance;
