const form = document.querySelector('#form');
const input = document.querySelector('#input');

form.addEventListener('submit', event => {
  event.preventDefault();
  fetch('/', {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({ url: input.value })
  })
    .then(response => {
      return response.text();
    })
    .then(text => {
      const result = JSON.parse(text);
      console.log(result);
    });
  input.value = '';
});
