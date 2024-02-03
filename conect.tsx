const axios = require('axios');

// Faz uma requisição a um usuarío com um ID expecifico
axios.get('http://localhost:8000/api/v1/restaurantes/')
  .then(function (response) {
    // manipula o sucesso da requisição
    console.log(response);
  })
  .catch(function (error) {
    // manipula erros da requisição
    console.error(error);
  })
  .finally(function () {
    // sempre será executado
  });
