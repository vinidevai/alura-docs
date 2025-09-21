import { emitRegistrationUser } from "./socket-front-registration.js";

const form = document.getElementById('form-cadastro');

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const user = form['input-usuario'].value;
  const password = form['input-senha'].value;

  emitRegistrationUser({
    user: user,
    password: password
  });
});