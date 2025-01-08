import React, { useEffect, useState } from "react";
import { Line, Scatter, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function ChartComponent() {
  const [danceabilityTempoData, setDanceabilityTempoData] = useState([]);
  const [danceabilityValenceData, setDanceabilityValenceData] = useState([]);
  const [loudnessLanguageData, setLoudnessLanguageData] = useState([]);

  // Fonction pour récupérer les données depuis l'API
  useEffect(() => {
    fetch("http://localhost:8000/tempo")
      .then(response => response.json())
      .then(data => {
        setDanceabilityTempoData(data.items); // Sauvegarder les données de tempo et danceability
      });

    fetch("http://localhost:8000/danceability-valence")
      .then(response => response.json())
      .then(data => {
        setDanceabilityValenceData(data.items); // Sauvegarder les données de danceability et valence
      });

    fetch("http://localhost:8000/loudness-language")
      .then(response => response.json())
      .then(data => {
        setLoudnessLanguageData(data.items); // Sauvegarder les données de loudness et language
      });
  }, []);

  // Préparer les données pour le graphique Tempo vs Danceability
  const danceabilityTempoChartData = {
    labels: danceabilityTempoData.map(item => item.track_name),
    datasets: [
      {
        label: "Danceability",
        data: danceabilityTempoData.map(item => item.danceability),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1
      },
      {
        label: "Tempo",
        data: danceabilityTempoData.map(item => item.tempo),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1
      }
    ]
  };

  // Préparer les données pour le graphique Danceability vs Valence
  const danceabilityValenceChartData = {
    labels: danceabilityValenceData.map(item => item.track_name),
    datasets: [
      {
        label: "Danceability",
        data: danceabilityValenceData.map(item => item.danceability),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      },
      {
        label: "Valence",
        data: danceabilityValenceData.map(item => item.valence),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  };

  // Préparer les données pour le graphique Loudness vs Language
  const loudnessLanguageChartData = {
    labels: loudnessLanguageData.map(item => item.language),
    datasets: [
      {
        label: "Loudness",
        data: loudnessLanguageData.map(item => item.loudness),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h1>Graphiques de Spotify</h1>

      <h2>Danceability vs Tempo</h2>
      <Scatter data={danceabilityTempoChartData} />

      <h2>Danceability vs Valence</h2>
      <Line data={danceabilityValenceChartData} />

      <h2>Loudness vs Language</h2>
      <Bar data={loudnessLanguageChartData} />
    </div>
  );
}

export default ChartComponent;
