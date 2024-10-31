import { Pie, Bar } from "react-chartjs-2";
import { genresForPieChart, userRatings } from "../api/userDetails";
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
import { useEffect, useState } from "react";
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

function Stats({ username }) {
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const [genresResult, ratingsResult] = await Promise.all([
        genresForPieChart(username),
        userRatings(username),
      ]);
      const genreCount = {};

      genresResult.forEach((g) => {
        const genresArray = g.Genres.split(", ");
        genresArray.forEach((genre) => {
          genreCount[genre] = (genreCount[genre] || 0) + 1;
        });
      });

      const sortedGenres = Object.entries(genreCount)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5);

      const pieLabels = sortedGenres.map(([genre]) => genre);
      const pieData = sortedGenres.map(([, count]) => count);

      setPieData({
        labels: pieLabels,
        datasets: [
          {
            data: pieData,
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
      });

      const ratings = ratingsResult //key blir ratingen, value blir hvor mange ganger ratingen er gitt.
        .filter((row) => row.Rating)
        .reduce(
          (acc, row) => {
            acc[row.Rating] = (acc[row.Rating] || 0) + 1;
            return acc;
          },
          { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        );


      const ratingsData = Object.values(ratings);
      const labels = Object.keys(ratings);

      setBarData({
        labels: labels, 
        datasets: [
          {
            label: "Number of ratings",
            data: ratingsData, 
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
    fetchData();
  }, []);

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
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
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
                data={barData}
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
