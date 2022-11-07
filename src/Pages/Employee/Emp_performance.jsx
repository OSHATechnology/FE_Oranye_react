import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";
import ConfigHeader from "../Auth/ConfigHeader";
import moment from "moment";
import 'chartjs-adapter-moment';

const ChartHorizontalBar = (props) => {
  const chartData = {
    labels: props.data.labels,
    datasets: [{
      label: 'Jam Masuk',
      data: props.data.datasets,
      backgroundColor: 'rgba(248,147,29,1)',
      borderColor: 'rgba(248,147,29,1)',
      borderWidth: 2,

    }]
  };

  const options = {
    responsive: true,

    scales: {
      y: {
        title: {
          display: true,
          text: 'Jam Masuk'
        },
        min: 0,
        max: 24,
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

const Emp_performance = () => {
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const fetchDataPerformanceAttendance = async () => {
    try {
      const response = await axios.get('/api/my/performance/attendance', ConfigHeader);
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const loadPerformance = async () => {
    fetchDataPerformanceAttendance().then(async (res) => {
      setLabels([]);
      setDataSets([]);
      setData([]);
      await res.map((data) => {
        data.date = moment(data.date).format("DD MMMM YYYY");
        setLabels((labels) => [...labels, data.date]);
        data.status ? setDataSets(prevState => [...prevState, moment(data.timestamp).format('h')]) : setDataSets(prevState => [...prevState, null]);
      });
      setData({
        labels: labels,
        datasets: dataSets
      });
    })
  };


  const [data, setData] = useState({
    labels: labels,
    datasets: dataSets
  });

  useEffect(() => {
    fetchDataPerformanceAttendance().then(async (res) => {
      setLabels([]);
      setDataSets([]);
      setData([]);
      await res.map((data) => {
        data.date = moment(data.date).format("DD MMMM YYYY");
        setLabels((labels) => [...labels, data.date]);
        data.status ? setDataSets(prevState => [...prevState, moment(data.timestamp).format('h')]) : setDataSets(prevState => [...prevState, null]);
      });
      setData({
        labels: labels,
        datasets: dataSets
      });
    })
  }, []);

  return (
    <div className="flex justify-center">
      <div className=" items-center justify-center w-screen md:min-h-1/3 gap-4 flex md:flex-col md:w-4/5">
        <ChartHorizontalBar data={data} />

        <button onClick={loadPerformance} className="select-none bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Load Performance
        </button>
      </div>
    </div>
    // <iframe title="oranye-dash-employee" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=49e9c046-daf4-4f5e-a895-1a37d02d670e&autoAuth=true&ctid=101a63ed-7f15-42ed-9b65-d87f03d4ec7e&rp:employeeId=1" frameborder="0" allowFullScreen="true"></iframe>
  );
};

export default Emp_performance;
