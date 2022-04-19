//Declaramos las constantes y variables globales
const datos_tabla = document.getElementById("datos_tabla");
const modalCuerpo = document.getElementById("modalCuerpo");
const pais = document.getElementById("pais");
const itemSesion = document.getElementById("item-sesion");
const situacionChile = document.getElementById("situacionChile");
const errorLogin = document.getElementById("errorLogin");
const splitarray = [];
const spacesArray = [
  {
    location: "GB",
    confirmed: 21846115,
    deaths: 171004,
    recovered: 0,
    active: 0,
  },
  {
    location: "kr",
    confirmed: 15830644,
    deaths: 20034,
    recovered: 0,
    active: 0,
  },
  {
    location: "cr",
    confirmed: 3733919,
    deaths: 100116,
    recovered: 0,
    active: 0,
  },
  {
    location: "ae",
    confirmed: 894186,
    deaths: 2302,
    recovered: 0,
    active: 0,
  },
  {
    location: "cr",
    confirmed: 844892,
    deaths: 8357,
    recovered: 0,
    active: 0,
  },
  {
    location: "nz",
    confirmed: 799190,
    deaths: 497,
    recovered: 0,
    active: 0,
  },
  {
    location: "sa",
    confirmed: 752078,
    deaths: 9060,
    recovered: 0,
    active: 0,
  },
  {
    location: "lk",
    confirmed: 662717,
    deaths: 16492,
    recovered: 0,
    active: 0,
  },
  {
    location: "West Bank and Gaza",
    confirmed: 656617,
    deaths: 5656,
    recovered: 0,
    active: 0,
  },
  {
    location: "dm",
    confirmed: 578626,
    deaths: 4375,
    recovered: 0,
    active: 0,
  },
  {
    location: "ba",
    confirmed: 376264,
    deaths: 15742,
    recovered: 0,
    active: 0,
  },
  {
    location: "mk",
    confirmed: 307967,
    deaths: 9256,
    recovered: 0,
    active: 0,
  },
  {
    location: "sv",
    confirmed: 162089,
    deaths: 4124,
    recovered: 0,
    active: 0,
  },
  {
    location: "tt",
    confirmed: 140781,
    deaths: 3787,
    recovered: 0,
    active: 0,
  },
  {
    location: "cd",
    confirmed: 86748,
    deaths: 1337,
    recovered: 0,
    active: 0,
  },
  {
    location: "ci",
    confirmed: 81834,
    deaths: 797,
    recovered: 0,
    active: 0,
  },
  {
    location: "cv",
    confirmed: 55974,
    deaths: 401,
    recovered: 0,
    active: 0,
  },
  {
    location: "pg",
    confirmed: 43615,
    deaths: 649,
    recovered: 0,
    active: 0,
  },
  {
    location: "cd",
    confirmed: 24079,
    deaths: 385,
    recovered: 0,
    active: 0,
  },
  {
    location: "lc",
    confirmed: 23045,
    deaths: 365,
    recovered: 0,
    active: 0,
  },
  {
    location: "bf",
    confirmed: 20865,
    deaths: 383,
    recovered: 0,
    active: 0,
  },
  {
    location: "sd",
    confirmed: 17356,
    deaths: 138,
    recovered: 0,
    active: 0,
  },
  {
    location: "pg",
    confirmed: 15904,
    deaths: 183,
    recovered: 0,
    active: 0,
  },
  {
    location: "sm",
    confirmed: 15779,
    deaths: 114,
    recovered: 0,
    active: 0,
  },
  {
    location: "cr",
    confirmed: 14649,
    deaths: 113,
    recovered: 0,
    active: 0,
  },
  {
    location: "ck",
    confirmed: 12285,
    deaths: 139,
    recovered: 0,
    active: 0,
  },
  {
    location: "vc",
    confirmed: 8344,
    deaths: 106,
    recovered: 0,
    active: 0,
  },
  {
    location: "sl",
    confirmed: 7677,
    deaths: 125,
    recovered: 0,
    active: 0,
  },
  {
    location: "ag",
    confirmed: 7523,
    deaths: 135,
    recovered: 0,
    active: 0,
  },
  {
    location: "st",
    confirmed: 5948,
    deaths: 73,
    recovered: 0,
    active: 0,
  },
  {
    location: "kn",
    confirmed: 5554,
    deaths: 43,
    recovered: 0,
    active: 0,
  },
  {
    location: "Summer Olympics 2020",
    confirmed: 865,
    deaths: 0,
    recovered: 0,
    active: 0,
  },
  {
    location: "Diamond Princess",
    confirmed: 712,
    deaths: 13,
    recovered: 0,
    active: 0,
  },
  {
    location: "Winter Olympics 2022",
    confirmed: 535,
    deaths: 0,
    recovered: 0,
    active: 0,
  },
  { location: "Holy See", confirmed: 29, deaths: 0, recovered: 0, active: 0 },
  { location: "MS Zaandam", confirmed: 9, deaths: 2, recovered: 0, active: 0 },
  {
    location: "ck",
    confirmed: 7,
    deaths: 0,
    recovered: 0,
    active: 0,
  },
];

let increaser = '0';
let next = document.getElementById("next-page");
let previous = document.getElementById("previous-page");
let myChart;

//llamada a la funcion del login
$('#js-form').submit(async (event) => {
  event.preventDefault()
  const email = document.getElementById('js-input-email').value
  const password = document.getElementById('js-input-password').value
  const JWT = await postData(email, password)
  const posts = await getPosts(JWT)
  fillTable(posts, 'js-table-posts')
})

//funcion para traer el token del login
const postData = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/login',
      {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password })
      })

    const { token } = await response.json()
    
    if (token === undefined) {
      errorLogin.innerHTML = `<p class="error-form text-center animate__animated animate__shakeX">Datos incorrectos</p>`;
      //loading.classList.add("remove");
    } else {
      localStorage.setItem("MasterKey", token);

      errorLogin.innerHTML = "";
      location.reload();
    }

    return token;
  } catch (err) {
    console.error(`Error: ${err} `)
  }
}


(() => {
  const cerrarSesion = document.getElementById("cerrarSesion");

  if (localStorage.getItem("MasterKey") != undefined) {
    itemSesion.innerHTML = `
    <a id="cerrarSesion" class="nav-link" href="#" >Cerrar Sesión</a>`;
    situacionChile.innerHTML =
      '<a class="nav-link situacion" href="/covid19/situacion-chile.html">Situación en Chile</a>';
  } else {
    itemSesion.innerHTML = `
    <a id="nav-item-login" class="nav-link" href="#"  data-toggle="modal" data-target="#exampleModal">Iniciar Sesión</a>`;
    situacionChile.innerHTML = "";
  }
})();


cerrarSesion.addEventListener("click", async (e) => {
  localStorage.removeItem("MasterKey");
  window.location.href = "/covid19/";
});


//conexion con la API
const getTotalData = async () => {
  try {
    const url = `http://localhost:3000/api/total`;
    const resp = await fetch(url);
    const { data: datx } = await resp.json();
    let filteredResult = datx.filter((x) => !x.location.includes(" "));
    var newArrayC = filteredResult.concat(spacesArray);

    //filtro mas de 10000 casos
    let result = newArrayC.filter((x) => x.confirmed > 10000);

    //for para particionar el array en porciones de 10 en 10    

    for (let i = 0; i < result.length; i += 10)
      (() => {
        const newArray = result.slice(i, i + 10);
        splitarray.push(newArray);
      })();


    // Boton next para acualizar el contenido, sumando (+) un (1) digito al contador.
    next.addEventListener("click", (e) => {
      increaser <= splitarray, increaser++;

      // if para deshabilitar el boton next cuando el array llegue a su fin
      if (splitarray[increaser] === splitarray[splitarray.length - 1]) {
        next.disabled = true;
      }
      if (splitarray[increaser] !== splitarray[splitarray.length - 1]) {
        next.disabled = false;
      }
      if (splitarray[increaser] !== splitarray[0]) {
        previous.disabled = false;
      }

      // Se reemplaza el div del chart cada vez que se presiona el boton next para actualizar la informacion
      $('#bar-chart-grouped').replaceWith($('<canvas id="bar-chart-grouped" width="800" height="450"></canvas>'));
      grafico(increaser, splitarray);
    });

    //Boton previous para acualizar el contenido, restando (-) un (1) digito al contador.
    previous.addEventListener("click", (e) => {
      increaser <= splitarray, increaser--;

      // Se reemplaza el div del chart cada vez que se presiona el boton next para actualizar la informacion
      $('#bar-chart-grouped').replaceWith($('<canvas id="bar-chart-grouped" width="800" height="450"></canvas>'));
      grafico(increaser, splitarray);

      // if para deshabilitar el boton previous cuando el array llegue al index
      if (splitarray[increaser] === splitarray[0]) {
        previous.disabled = true;
      }
      if (splitarray[increaser] !== splitarray[splitarray.length - 1]) {
        next.disabled = false;
      }
      if (splitarray[increaser] !== splitarray[0]) {
        previous.disabled = false;
      }

    });
  } catch (err) {
    console.log(err);
  }
};

//funcion donde procesamos los datos obtenidos para poblar el grafico y la tabla
function grafico(increaser, splitarray) {

  let activeLocation = splitarray[increaser].map((item) => item.location);
  let confirmedCases = splitarray[increaser].map((item) => item.confirmed);
  let deathCases = splitarray[increaser].map((item) => item.deaths);
  let activeCases = splitarray[increaser].map((item) => item.active);
  let recoveredCases = splitarray[increaser].map((item) => item.recovered);

  // se limpia el innerHTML que contiene la tabla 
  datos_tabla.innerHTML = '';

  //foreach para poblar la tabla cada vez que se ejecute la funcion "grafico"
  splitarray[increaser].forEach((item) => {
    datos_tabla.innerHTML += `
    <tr class="animate__animated animate__fadeInUp">
    
      <th scope="row">${item.location}</th>
      <td>${item.confirmed}</td>
      <td>${item.deaths}</td>
      <td>${item.recovered}</td>
      <td>${item.active}</td>
      <td><button  data-location="${item.location}" type="button" class="btn btn-show-modal button-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Detalles
  </button></td>
    </tr>`;
  });

  getModalButtons();

  // plugin para agregar imagen de fondo al grafico "chart"

  const plugin = {
    id: 'custom_canvas_background_color',
    beforeDraw: (chart) => {
      const ctx = chart.canvas.getContext('2d');
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle =
        '#002851';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };


  // Configuracion y poblado de grafico "chart"

  new Chart(document.getElementById("bar-chart-grouped"), {
    type: 'bar',
    data: {
      labels: activeLocation,
      datasets: [
        {
          label: "Confirmados",
          backgroundColor: "#00FFFF",
          data: confirmedCases,
        },
        {
          label: "Fallecidos",
          backgroundColor: "#C5050C",
          data: deathCases,
        },
        {
          label: "Recuperados",
          backgroundColor: "#33CC33",
          data: recoveredCases,
        },
        {
          label: "Activos",
          backgroundColor: "#FE9815",
          data: activeCases,
        },
      ],
    },
    plugins: [plugin],
    options: {
      plugins: {
        legend: {
          labels: {
            color: "#2D85E0",
            font: {
              size: 15
            }
          }
        }
      },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050',
      },
      scales: {
        y: {
          ticks: {
            color: "#2D85E0",
            font: {
              size: 12,
            },
            stepSize: 1000,
            beginAtZero: true
          }
        },
        x: {
          ticks: {
            color: "#2D85E0",
            font: {
              size: 12
            },
            stepSize: 1000,
            beginAtZero: true
          }
        }
      }
    }

  });
};

// promesa para ejecutar la funciones principales al cargado de la pagina

new Promise(function (resolve) {
  resolve(getTotalData());
}).then(function () {
  grafico(increaser, splitarray);
});


const getModalButtons = async () => {
  const button = document.querySelectorAll(".btn-show-modal");
  let locationParameter = "";
  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", (e) => {
      console.log(e);
      locationParameter = e.target.getAttribute("data-location");
      // modalCuerpo.innerHTML = `${locationParameter}`;
      getSingleData(locationParameter);
    });
  }
};
// funcion para obtener los datos por pais desde la api

const getSingleData = async (locationParameter) => {
  try {
    const url = `http://localhost:3000/api/countries/${locationParameter}`;
    const resp = await fetch(url);
    const { data: datos } = await resp.json();


    document.getElementById("charModal").innerHTML = "";
    document.getElementById("charModal").innerHTML = `
    <canvas id="doughnut-chart" width="800" height="450"></canvas>
    `;


    const { location, confirmed, deaths, recovered, active } = datos;
    pais.innerHTML = location;

    const plugin2 = {
      id: 'custom_canvas_background_color',
      beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle =
          '#002851';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    };

    new Chart(document.getElementById("doughnut-chart"), {
      type: "doughnut",
      data: {
        labels: ["Confirmados", "Fallecidos", "Recuperados", "Activos"],
        datasets: [
          {
            label: "",
            backgroundColor: [
              "#00FFFF",
              "#C5050C",
              "#33CC33",
              "#FE9815",
            ],
            data: [confirmed, deaths, recovered, active],

          },
        ],
      },
      plugins: [plugin2],
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#2D85E0',
              boxWidth: 10,
            }
          }
        },
        responsive: true,
        title: {
          display: true,
          text: "Predicted world population (millions) in 2050",
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
