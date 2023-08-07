import { toast, green, red } from "./toast.js";
// import { profileImg } from "./dashboard.js";

async function loginRequest(loginBody) {
  //request login
  const token = await fetch("http://localhost:3333/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginBody), //enviando dados em json
  })
    .then(async (response) => {
      const resJson = await response.json(); //recebendo dados e convertendo para objeto js - token

      if (response.ok) {
        localStorage.setItem("petInfo: login token", resJson.token);
        toast(
          "Login realizado com sucesso! Aguarde redirecionamento...",
          green
        ); // toast login com sucesso
        setTimeout(function () {
          location.replace("./src/pages/dashboard.html");
        }, 3000); //atrasa o carregamento da página para visualizar o toast
        return resJson;
      } else {
        throw new Error(resJson.message);
      }
    })
    .catch((err) => toast(err.message, red)); //toast

  return token;
}

function handleLogin() {
  const inputs = document.querySelectorAll("input");
  const button = document.querySelector(".login__button-acess");
  const spinner = document.querySelector(".spinner");
  let loginUser = {};
  let count = 0;

  if (button) {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // formulario carrega pagina
      spinner.classList.remove("hidden");

      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          count++;
        }

        loginUser[input.name] = input.value.trim();
      });
      if (count != 0) {
        count = 0;
        return toast("Digite os campos corretamente", red); //encerra função para obrigar o usuário a acontecer novamente, preencha todos os campos
      } else {
        loginRequest(loginUser);
      }
    });
  }
}

function backToRegisterPage() {
  const buttonBack = document.querySelector(".login__button-register");

  if (buttonBack) {
    buttonBack.addEventListener("click", () => {
      localStorage.clear();
      location.replace("./src/pages/register.html");
    });
  }
}

export async function getProfileInfos() {
  const token = localStorage.getItem("petInfo: login token");
  const infos = await fetch("http://localhost:3333/users/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const resJson = await response.json();

      if (response.ok) {
        return resJson;
      } else {
        throw Error(resJson.message);
      }
    })
    .catch((err) => alert(err));

  return infos;
}

backToRegisterPage();
handleLogin();
