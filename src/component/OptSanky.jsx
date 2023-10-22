import React, { useEffect } from 'react';
import { Chart, LinearScale } from 'chart.js'
import { SankeyController, Flow } from 'chartjs-chart-sankey';
import data from "./data.json";

function OptSanky() {
    useEffect(() => {
        Chart.register(SankeyController, Flow, LinearScale)
        // Get the canvas context inside the useEffect
        const ctx = document.getElementById("chart1").getContext("2d");
        var colors = {
            Oil: "yellow",
            Coal: "gray",
            "Fossil Fuels": "red",
            Electricity: "blue",
            Energy: "orange"
        };

        // the y-order of nodes, smaller = higher
        var priority = {
            Oil: 1,
            'Natural Gas': 2, // Corrected typo
            Coal: 3,
            'Fossil Fuels': 1,
            Electricity: 2,
            Energy: 1
        };

        function getColor(name) {
            return colors[name] || "green";
        }

        var chart1 = new Chart(ctx, {
            type: "sankey",
            data: {
                datasets: [
                    {
                        data: data.optimism,
                        // colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from),
                        // colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to),
                        borderWidth: 2,
                        borderColor: 'black'
                    }
                ]
            }
        });
        return () => {
            chart1.destroy()
        }
    }, []);

    return (
        <canvas id="chart1" />
    )
}

export default OptSanky