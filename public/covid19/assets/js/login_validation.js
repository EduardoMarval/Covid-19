const itemSesion = document.getElementById("item-sesion");
const situacionChile = document.getElementById("situacionChile");
const errorLogin = document.getElementById("errorLogin");

//llamada a la funcion del login
$('#js-form').submit(async (event) => {
    event.preventDefault()
    const email = document.getElementById('js-input-email').value
    const password = document.getElementById('js-input-password').value
    const JWT = await postData(email, password)
    const posts = await getPosts(JWT)
    fillTable(posts, 'js-table-posts')
  });
  
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
        '<a class="nav-link situacion" href="/covid19/chile_status.html">Situación en Chile</a>';
    } else {
      itemSesion.innerHTML = `
      <a id="nav-item-login" class="nav-link" href="#"  data-toggle="modal" data-target="#loginModal">Iniciar Sesión</a>`;
      situacionChile.innerHTML = "";
    }
  })();

  cerrarSesion.addEventListener("click", async (e) => {
    localStorage.removeItem("MasterKey");
    window.location.href = "/covid19/";
  });
  
  
  loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    loginValidation(userEmail.value, userPassword.value);
  });
  
  