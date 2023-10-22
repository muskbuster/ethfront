import "./App.css";
import React, { useEffect } from 'react';
import { opti, eth, bin, celo, arti, gno, mono, aval, poly } from "./component/sankyFunc";
import pilot from "./assest/Hyperlane Pilot.png"
import ship from "./assest/Hyperlane Ship Vertical.png"
import ship2 from "./assest/Hyperlane Ship-1.png"
import ship3 from "./assest/Hyperlane Ship.png"
import img1 from "./assest/IMG_1223 1.png"
import img2 from "./assest/IMG_1259 1.png"
import art1 from "./assest/Untitled_Artwork 10.png"
import art2 from "./assest/Untitled_Artwork 2 1.png"
import h from "./assest/hyperlane.png"
import { useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};



const key = new Map([
  [1, "Ethereum"],
  [10, "Optimism"],
  [56, "Biannce Smart Chain"],
  [100, "Gnosis"],
  [1284, "Moonbeam"],
  [42161, "Arbitrum"],
  [42220, "Celo"],
  [43114, "Avalanche"],
  [137, "Polygon"]
]);

function App() {

  const [Chain, setChain] = useState("Polygon")
  const [modalIsOpen, setIsOpen] = useState(true);
  const labels = ["Polygon", "Binance", "Arbitrum", "Celo", "Optimism", "Avalanche", "Moonbeam", "Gnosis", "Ethereum"]
  const [Res, setRes] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [dispatch, setDispatch] = useState("");
  const [user, setUser] = useState();
  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        label: "most active chain",
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  })

  const [userChartData, setUserChartData] = useState({
    labels,
    datasets: [
      {
        label: "No of Active  User By Chain",
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  })

  const handelClose = () => {
    setIsOpen(false);
  }

  const dataset = async () => {
    try {
      const res = await axios.get("http://localhost:3002/chainPerformance");
      const actv = await axios.get("http://localhost:3002/totalInterChainMessagesPerChain");
      const dis = await axios.get("http://localhost:3002/dispatch");
      const user = await axios.get("http://localhost:3002/uniqueUsers");
      setDispatch(dis.data.dispatches.slice(0, 3));
      setUser(user);
      setActiveUser(actv);
      setRes(res);
      const chainData = actv.data.totalInterChainMessagesPerChain.mostActiveChains.map((chain) => chain.average)
      setChartData({
        ...chartData,
        labels,
        datasets: [
          {
            label: "most active chain",
            data: chainData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      })
    }

    catch (err) {
      console.log(err)
    }
  }

  const getUserGraph = () => {
    const userData = user.data.data;
    const labels = [];
    const numbers = Object.values(userData);

    Object.keys(userData).forEach((id) => {
      const chainName = key.get(parseInt(id));
      labels.push(chainName);
    });
    setUserChartData({
      labels,
      datasets: [
        {
          label: 'No of active user by chain',
          data: numbers,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    })
  }

  useEffect(() => {
    {
      user && getUserGraph()
    }

  }, [user])


  useEffect(() => {
    { Res && eth(Res.data.chainPerformanceScore.ethereum); }
    { Res && opti(Res.data.chainPerformanceScore.optimism); }
    { Res && bin(Res.data.chainPerformanceScore.binance); }
    { Res && gno(Res.data.chainPerformanceScore.gnosis); }
    { Res && arti(Res.data.chainPerformanceScore.arbitrum); }
    { Res && celo(Res.data.chainPerformanceScore.celo); }
    { Res && mono(Res.data.chainPerformanceScore.moonbeam); }
    { Res && aval(Res.data.chainPerformanceScore.avalanche); }
    { Res && poly(Res.data.chainPerformanceScore.polygon); }
  }, [Res])

  useEffect(() => {
    dataset();
  }, []);

  return (
    <>
      <div className={`flex flex-col justify-center items-center bg-[#2362C0] overflow-x-hidden`}>
        <div className="shadow-md w-screen flex justify-center items-center fixed top-0 left-0 right-0 z-[100] bg-[#2362C0]"><img src={h} className="w-52"/></div>
        <img src={pilot} className="absolute z-0 w-48 m-2 mb-[100%] mr-[85%] animate-bounce " />
        <img src={ship} className="absolute z-0 w-[12rem] m-2 ml-[65%] animate-bounce " />
        <img src={ship2} className="absolute z-0 w-[20rem] m-2 mt-[90%] mr-[85%] animate-bounce " />
        <img src={img1} className="absolute z-0 w-[40rem] m-2 mt-[85%] ml-[85%]" />
        <img src={img2} className="absolute z-0 w-[25rem] m-2 mb-[20%] mr-[85%]" />
        <img src={art1} className="absolute z-0 w-[25rem] m-2 mb-[90%] ml-[85%]" />
        <div className="flex flex-col mt-24 mb-16 z-50">
          <div className="flex felx-row justify-between space-x-4">
            <div className="bg-[#D631B9] p-2 rounded-md">
              <div className="bg-[#2362C0] shadow-2xl z-[10] border-4 border-[#D631B9] outline outline-4 outline-white p-4">
                <div className="font-bold text-xl">Total interchain messages</div>
                <div className="flex justify-center items-center font-bold text-white text-4xl mt-2 h-10">{activeUser ? activeUser.data.totalInterChainMessagesPerChain.sumDispatchCounter : "Loading.."}</div>
              </div>
            </div>
            <div className="bg-[#D631B9] p-2 rounded-md">
              <div className="bg-[#2362C0] shadow-2xl z-[10] border-4 border-[#D631B9] outline outline-4 outline-white p-4">
                <div className="font-bold text-xl">Successful relaying percentage</div>
                <div className="flex justify-center items-center font-bold text-white text-4xl mt-2 h-10">{activeUser ? activeUser.data.totalInterChainMessagesPerChain.relayPercentage.toFixed(4) : "Loading.."}</div>
              </div>
            </div>
            <div className="bg-[#D631B9] p-2 rounded-md">
              <div className="bg-[#2362C0] shadow-2xl z-[10] border-4 border-[#D631B9] outline outline-4 outline-white p-4">
                <div className="font-bold text-xl">Total no. of active users</div>
                <div className="flex justify-center items-center font-bold text-white text-4xl mt-2 h-10">{user ? user.data.total : "Loading.."}</div>
              </div>
            </div>
          </div>
          <div className="bg-[#D631B9] p-2 rounded-md mt-12">
            <div className="bg-white shadow-2xl z-[10] border-4 border-[#D631B9] outline outline-4 outline-white">
              <div className="bg-[#2362C0]">
                <div className="p-2 flex justify-center items-center text-xl font-semibold text-white">Chain Performance</div>
                <div className="mx-auto max-w-8xl px-2">
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="flex space-x-4 ml-1 text-white">
                        <div
                          href="#"
                          className=""
                        >
                        </div>
                        {labels.map((key) => (
                          <button
                            className={`rounded-md px-3 py-2 text-sm font-medium ${Chain === key ? "bg-[#D631B9]" : "hover:border-white border-2 border-[#2362C0]"}`}
                            onClick={() => setChain(key)}
                          >
                            {key}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-7 mb-8 h-96 flex justify-center items-center">
                {Res ? "" : <div className="font-bold ml-[30%] text-3xl text-[#2362C0]">"Loading..."</div>}
                <canvas id={"ethChart"} className={`absolute] ${Chain == "Ethereum" ? "opacity-100" : "collapse"}`} />
                <canvas id={"optiChart"} className={`absolute ${Chain == "Optimism" ? "opacity-100" : "collapse"}`} />
                <canvas id={"binChart"} className={`absolute ${Chain == "Binance" ? "opacity-100" : "collapse"}`} />
                <canvas id={"gnoChart"} className={`absolute ${Chain == "Gnosis" ? "opacity-100" : "collapse"}`} />
                <canvas id={"artiChart"} className={`absolute ${Chain == "Arbitrum" ? "opacity-100" : "collapse"}`} />
                <canvas id={"monoChart"} className={`absolute ${Chain == "Moonbeam" ? "opacity-100" : "collapse"}`} />
                <canvas id={"celoChart"} className={`absolute ${Chain == "Celo" ? "opacity-100" : "collapse"}`} />
                <canvas id={"avalChart"} className={`absolute ${Chain == "Avalanche" ? "opacity-100" : "collapse"}`} />
                <canvas id={"polyChart"} className={`absolute ${Chain == "Polygon" ? "opacity-100" : "collapse"}`} />
              </div>
            </div>
          </div>
          <div className="bg-[#D631B9] p-2 rounded-md mt-12">
            <div className="bg-white shadow-2xl z-[10] border-4 border-[#D631B9] outline outline-4 outline-white">
              <div className="bg-[#2362C0] p-2 flex justify-center items-center text-xl font-semibold text-white">Most Active Chain</div>
              <div className="mt-7 mb-8 h-80 flex items-center justify-center">
                {Res ? "" : <div className="font-bold text-3xl text-[#2362C0]">"Loading..."</div>}
                {activeUser && <Bar options={options} data={chartData} />}
              </div>
            </div>
          </div>
          <div className="bg-[#D631B9] p-2 rounded-md mt-12">
            <div className="bg-white shadow-2xl z-[10] border-4 border-[#D631B9] outline outline-4 outline-white">
              <div className="bg-[#2362C0] p-2 flex justify-center items-center text-xl font-semibold text-white">No. of Active users by chain</div>
              <div className="mt-7 mb-8 h-80 flex items-center justify-center">
                {Res ? "" : <div className="font-bold text-3xl text-[#2362C0]">"Loading..."</div>}
                {console.log(userChartData)}
                {user && <Bar options={options} data={userChartData} />}
              </div>
            </div>
          </div>
          <div className="bg-[#D631B9] p-2 rounded-md mt-12">
            <div className="bg-white shadow-2xl z-[10] border-4 border-[#D631B9] outline outline-4 outline-white h-[48rem] overflow-hidden">
              <div className="bg-[#2362C0] p-2 flex justify-center items-center text-xl font-semibold text-white">Latest Dispatch Messages</div>
              <div className="mt-7 mb-8">
                {Res ? "" : <div className="font-bold text-3xl text-[#2362C0] flex justify-center items-center ">"Loading..."</div>}
                {dispatch && <ul>
                  {dispatch.map((dispatch, index) => (
                    <li className="w-[48rem] overflow-hidden text-ellipsis pl-6" key={index}>
                      <strong>Id:</strong> {dispatch.id}<br />
                      <strong>Sender:</strong> {dispatch.sender}<br />
                      <strong>Origin:</strong> {key.get(parseInt(dispatch.origin))}<br />
                      <strong>Destintion:</strong> {key.get(parseInt(dispatch.destination))}<br />
                      <strong>Recipient:</strong> {dispatch.recipient}<br />
                      <strong>Message:</strong> {dispatch.message}<br />
                      <strong>Transaction Hash:</strong> {dispatch.transactionHash}
                      <div className="border-b-4 border-dashed mt-4 mb-4 border-black"/>
                    </li>
                  ))}
                </ul>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
