function main () {
  // creating all the initial html
  function buildSplash () {
    mainContainer = document.getElementById('main-container');
    input = document.createElement('input');
    input.setAttribute('id', 'input-search');
    button = document.createElement('button');
    button.setAttribute('id', 'btn-search');
    button.innerText = 'Search';
    mainContainer.appendChild(input);
    mainContainer.appendChild(button);
    button.addEventListener('click', searchUser);
  } 
  // calling searchUser when event onclick in button
  // if there is a response, call buildList function passing the data
  // else, display message not found
  function searchUser() {
    const unername = document.getElementById('input-search').value;
    destroyAndBuild();
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
           const data = JSON.parse(this.responseText);
           buildList(data);
          } else if (this.readyState == 4 && this.status == 404) {
            // throw error message if there is no user
            buildError();
          }
        };
    xhttp.open('GET', 'https://api.github.com/users/' + unername + '/repos', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send();
  }

  // build the box and the list of repos itinerating each object of the response
  function buildList(data) {
    const user = data[0].owner.login
    error = document.getElementById('error-msg');
      if (error) {
        console.log("lelelel")
      }
      header = document.createElement('h1');
      header.innerText = user;
      ulist = document.createElement('ul');
      ulist.setAttribute('id', 'list-repos');
      mainContainer.appendChild(header);
      mainContainer.appendChild(ulist);
    for (let i = 0; i < data.length; i++) {
      const repos = data[i].name;
      ulist = document.getElementById('list-repos');
      list = document.createElement('li');
      list.setAttribute('class', 'list-item')
      list.innerText = repos;
      ulist.appendChild(list);
    }
  }

  // remove main container and rebuilded again once you clicked the button 
  // so the results from the last search are removed
  function destroyAndBuild() {
    mainContainer.remove();
    base = document.getElementById('base');
    mainContainer = document.createElement('div');
    mainContainer.setAttribute('id', 'main-container');
    mainContainer.setAttribute('class', 'box');
    base.appendChild(mainContainer);
    buildSplash();
  }

  // build the error message
  function buildError() {
      mainContainer = document.getElementById('main-container');
      error = document.createElement('div');
      error.setAttribute('id', 'error-msg');
      error.setAttribute('class', 'box error');
      error.innerText = "Does not exist";
      mainContainer.appendChild(error);
  }
  // call buildSplash for creating initial html
  buildSplash();
  
}
// run main function once the page is loaded
window.addEventListener('load', main)