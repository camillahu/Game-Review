import { Pie } from "react-chartjs-2";
import { genresForPieChart, userRatings } from "../api/userGames.js";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
Chart.register(ArcElement, Tooltip, Legend);
Chart.defaults.color = "HSL(30, 20%, 70%)";

function PieChart({ username }) {
  const [pieData, setPieData] = useState(null);
  const [ratingsData, setRatingsData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const [genresResult, ratingsResult] = 
      await Promise.all([genresForPieChart(username), userRatings(username)]) 
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

      const labels = sortedGenres.map(([genre]) => genre);
      const data = sortedGenres.map(([, count]) => count);

      setPieData({
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "hsl(0, 50%, 40%)",
              "hsl(30, 40%, 45%)",
              "hsl(45, 40%, 50%",
              "hsl(120, 30%, 35%)",
              "hsl(180, 25%, 40%)",
              "hsl(195, 30%, 45%)",
              "hsl(220, 25%, 45%)",
              "hsl(270, 30%, 45%)",
              "hsl(320, 40%, 45%)",
              "hsl(30, 20%, 35%)",
            ],
            hoverBackgroundColor: [
              "hsl(0, 50%, 35%)",
              "hsl(30, 40%, 40%)",
              "hsl(45, 40%, 45%)",
              "hsl(120, 30%, 30%)",
              "hsl(180, 25%, 35%)",
              "hsl(195, 30%, 40%)",
              "hsl(220, 25%, 40%)",
              "hsl(270, 30%, 40%)",
              "hsl(320, 40%, 40%)",
              "hsl(30, 20%, 30%)",
            ],
          },
        ],
      });


      const ratings = ratingsResult
      .filter(row => row.Rating)
      .reduce((acc, row) => {
        acc[row.Rating] = (acc[row.Rating] || 0) + 1;
        return acc
      }, {})
      setRatingsData(ratings) //key blir ratingen, value blir hvor mange ganger ratingen er gitt. 
    }
    fetchData();
  }, []);


  


  return (
    <div>
      <div style={{ height: "auto", width: "350px" }}>
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
        {pieData ? <Pie data={pieData} /> : <p>Loading chart data...</p>}
      </div>
    </div>
  );
}

export default PieChart;
