const chartContainer = document.getElementById("chartContainer");
const loading = document.getElementById("loader");

//get confirmados
const getChileConfirmed = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/confirmed", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const { data } = await response.json();
    return (confirmed = data);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

//get deaths
const getChileDeaths = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/deaths", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const { data } = await response.json();
    return (deaths = data);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

//get recovered
const getChileRecovered = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/recovered", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const { data } = await response.json();
    return (recovered = data);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const tokenValue = localStorage.getItem("MasterKey");
const getConfirmed = getChileConfirmed(tokenValue);
const getDeaths = getChileDeaths(tokenValue);
const getRecovered = getChileRecovered(tokenValue);

Promise.all([getConfirmed, getDeaths, getRecovered]).then((values) => {
  //promesas resueltas de la consulta a las 3 API
  const fechas = values[0].map((fecha) => fecha.date);
  const confirmados = values[0].map((confirmado) => confirmado.total);
  const fallecidos = values[1].map((muerto) => muerto.total);
  const recuperados = values[2].map((recuperado) => recuperado.total);

  //crear chart
  new Chart(document.getElementById("line-chart"), {
    type: "line",
    responsive: "true",
    data: {
      labels: fechas,
      datasets: [
        {
          data: confirmados,
          label: "Confirmados",
          borderColor: "#00FFFF",
          fill: true,
        },
        {
          data: fallecidos,
          label: "Fallecidos",
          borderColor: "#C5050C",
          fill: true,
        },
        {
          data: recuperados,
          label: "Recuperados",
          borderColor: "#33CC33",
          fill: true,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "World population per region (in millions)",
      },
    },
  });
  quitLoad();
});

function quitLoad() {
  loading.classList.toggle("hidden");
}