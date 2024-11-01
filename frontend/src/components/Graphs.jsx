import { Pie, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
Chart.defaults.color = "HSL(30, 20%, 70%)";

function Stats({ pieData, barData }) {
  const [localPieData, setLocalPieData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }],
  });
  const [localBarData, setLocalBarData] = useState({
    labels: [],
    datasets: [{ label: '', data: [], backgroundColor: [], borderColor: [], borderWidth: 1 }],
  });
  
  useEffect(()=> {
    if (pieData) {
      const labels = pieData.map((item) => item[0]);
      const dataValues = pieData.map((item) => item[1]);

      setLocalPieData({
          labels: labels,
          datasets: [
            {
              data: dataValues,
              backgroundColor: [
                "hsl(0, 50%, 40%)",
                "hsl(30, 40%, 45%)",
                "hsl(45, 40%, 50%",
                "hsl(120, 30%, 35%)",
                "hsl(180, 25%, 40%)",
              ],
              hoverBackgroundColor: [
                "hsl(0, 50%, 35%)",
                "hsl(30, 40%, 40%)",
                "hsl(45, 40%, 45%)",
                "hsl(120, 30%, 30%)",
                "hsl(180, 25%, 35%)",
              ],
            },
          ],
        })
    }

  }, [pieData])

  console.log(localPieData)
  

  useEffect(() => {
    if (barData) {
      const ratingsCount = barData.reduce(
        (acc, { Rating }) => {
          acc[Rating] = (acc[Rating] || 0) + 1;
          return acc;
        },
        { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } // Initialize for ratings 1-5
      );
  
      setLocalBarData({
        labels: Object.keys(ratingsCount),
        datasets: [
          {
            label: "Number of ratings",
            data: Object.values(ratingsCount),
            backgroundColor: [
              "hsl(195, 30%, 45%)",
              "hsl(220, 25%, 45%)",
              "hsl(270, 30%, 45%)",
              "hsl(320, 40%, 45%)",
              "hsl(30, 20%, 35%)",
            ],
            borderColor: [
              "hsl(195, 30%, 40%)",
              "hsl(220, 25%, 40%)",
              "hsl(270, 30%, 40%)",
              "hsl(320, 40%, 40%)",
              "hsl(30, 20%, 30%)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [barData]);


return (
  <div
    className="d-flex flex-row justify-content-around"
    style={{ width: "100%" }}
  >
    <div style={{ height: "400px", width: "300px" }}>
      <p
        className="mt-2"
        style={{
          color: "HSL(30, 20%, 85%)",
          fontSize: "120%",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Most played genres
      </p>
      <div style={{ height: "400px", width: "300px" }}>
        {pieData ? (
          <Pie 
          data={localPieData} options={{ maintainAspectRatio: false }} 
          />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
    <div>
      <div>
        <p
          className="mt-2"
          style={{
            color: "HSL(30, 20%, 85%)",
            fontSize: "120%",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Ratings given
        </p>
        <div style={{ height: "400px", width: "300px" }}>
          {barData ? (
            <Bar
              data={localBarData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                      callback: function (value) {
                        return Number.isInteger(value) ? value : "";
                      },
                    },
                  },
                },
              }}
            />
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default Stats;
