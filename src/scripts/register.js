import { toast, green, red } from "./toast.js";

export async function registerRequest(registerBody) {
  const body = await fetch(`http://localhost:3333/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerBody), //enviando dados em json
  })
    .then(async (response) => {
      const resJson = await response.json(); //recebendo dados e convertendo para objeto js - token
      if (response.ok) {
        localStorage.setItem("petInfo body", JSON.stringify(resJson));
        toast("Sua conta foi criada com sucesso!", green);
        setTimeout(function () {
          location.replace("../../");
        }, 1000);
        return resJson;
      } else {
        throw Error(resJson.message);
      }
    })
    .catch((err) => toast(err.message, red));

  return body;
}

export function handleRegister() {
  const inputs = document.querySelectorAll("input");
  const buttonReg = document.querySelector(".register__button-acess");
  const spinner = document.querySelector(".spinner");

  let registerUser = {};
  let count = 0;

  if (buttonReg) {
    buttonReg.addEventListener("click", (event) => {
      event.preventDefault(); // formulario carrega pagina
      spinner.classList.remove("hidden");

      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          count++;
        }

        registerUser[input.name] = input.value.trim(); //coloca as informações num objeto de acordo com o name dos inputs
      });
      if (count != 0) {
        count = 0;
        return toast("Digite os campos corretamente", red); //encerra função para obrigar o usuário a acontecer novamente, preencha todos os campos
      } else {
        registerRequest(registerUser);
      }
    });
  }
}

function backToLoginPage() {
  const buttons = document.querySelectorAll(".register__login-button");
  const spinner = document.querySelector(".spinner__register");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      spinner.classList.remove("hidden");
      event.preventDefault();
      setTimeout(function () {
        location.replace("../../");
      }, 2000);
    });
  });
}

backToLoginPage();
handleRegister();
