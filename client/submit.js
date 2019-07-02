const form = document.querySelector('#form');
const input = document.querySelector('#input');
const table = document.querySelector('#table-field');
const errorMessage = document.querySelector('#error');

const fillTable = info => {
  const { title, links, uniqueDomains, googleAnalytics, secure } = info;
  const titleField = document.querySelector('#title-field');
  titleField.innerHTML = title;
  const linksField = document.querySelector('#links-field');
  linksField.innerHTML = links;
  const domainsField = document.querySelector('#domains-field');
  domainsField.innerHTML = uniqueDomains;
  const googleField = document.querySelector('#google-field');
  googleField.innerHTML = googleAnalytics ? 'Yes' : 'No';
  const secureField = document.querySelector('#secure-field');
  secureField.innerHTML = secure ? 'Yes' : 'No';
  table.classList.remove('hidden');
};

form.addEventListener('submit', event => {
  event.preventDefault();
  table.classList.add('hidden');
  errorMessage.classList.add('hidden');
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
      if (result.err) {
        errorMessage.classList.remove('hidden');
      } else fillTable(result);
    });
  input.value = '';
});
