import data from "./data.json";
import { Chart, LinearScale } from 'chart.js'
import { SankeyController, Flow } from 'chartjs-chart-sankey';

export const opti = (data) => {
    Chart.register(SankeyController, Flow, LinearScale)
    const ctx = document.getElementById("optiChart").getContext("2d");
    createSanky(ctx, data)
}

export const poly  = (data) => {
    Chart.register(SankeyController, Flow, LinearScale)
    const ctx = document.getElementById("polyChart").getContext("2d");
    createSanky(ctx, data)
}

export const eth = (data) => {
    Chart.register(SankeyController, Flow, LinearScale)
    const ctx = document.getElementById("ethChart").getContext("2d");
    createSanky(ctx, data)
}

export const bin = (data) => {
    Chart.register(SankeyController, Flow, LinearScale)
    const ctx = document.getElementById("binChart").getContext("2d");
    createSanky(ctx, data)
}

export const celo = (data) => {
    Chart.register(SankeyController, Flow, LinearScale)
    const ctx = document.getElementById("celoChart").getContext("2d");
    createSanky(ctx, data)
}

export const arti = (data) => {
    Chart.register(SankeyController, Flow, LinearScale)
    const ctx = document.getElementById("artiChart").getContext("2d");
    createSanky(ctx, data)
}

export const gno = (data) => {
    Chart.register(SankeyController, Flow, LinearScale)
    const ctx = document.getElementById("gnoChart").getContext("2d");
    createSanky(ctx, data)
}

export const mono = (data) => {
    Chart.register(SankeyController, Flow, LinearScale)
    const ctx = document.getElementById("monoChart").getContext("2d");
    createSanky(ctx, data)
}

export const aval = (data) => {
    Chart.register(SankeyController, Flow, LinearScale)
    const ctx = document.getElementById("avalChart").getContext("2d");
    createSanky(ctx, data)
}



const createSanky = (ctx, dataSet) => {
    var chart = new Chart(ctx, {
        type: "sankey",
        data: {
            datasets: [
                {
                    data: dataSet,
                    colorFrom: '#2362C0',
                    colorTo: '#D631B9',
                    color: "white"
                }
            ]
        }
    });
}