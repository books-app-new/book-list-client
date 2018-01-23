'use strict';

var __API_URL__ = 'https://deploy-test-301.herokuapp.com'; 

pageLoad();

$('#user-form').on('submit', function(e) {
  e.preventDefault();

  let data = {
    book_id: e.target.book_id.value,
    author: e.target.author.value,
    title: e.target.title.value,
    description: e.target.description.value
  }

  $.post(`${__API_URL__}/db/person`, data)
  .then(function() {
    pageLoad();
  })
  .catch(function(err) {
    console.error(err);
    pageLoad();
  });
});

function pageLoad() {
  $.get(`${__API_URL__}/db/person`)
  .then(function(data) {
    console.log('our data:', data);
    $('#results').empty();

    data.rows.forEach(function(item) {
      let content = `
        <h2>book_id: ${item.book_id}</h2>
        <p>author: ${item.author}</p>
        <p>title: ${item.title}</p>
        <p>isbn: ${item.isbn}</p>
        <p>description: ${item.description}</p>
      `;
      $('#results').append(content);
    });
  }, function(err) {
    console.error(err);
  });
}