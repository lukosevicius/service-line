document.querySelector(".load-btn").addEventListener("click", loadJSON);
document.querySelector(".add-client-btn").addEventListener("click", addClient);

function loadJSONfromFile(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "clients.json", true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function loadJSON() {
  loadJSONfromFile(function(response) {
    let clientsJSON = JSON.parse(response);

    loadJSONtoStorage(clientsJSON);
  });
}

function loadJSONtoStorage(clientsJSON) {
  const clients = Object.keys(clientsJSON);
  for (const client of clients) {
    window.localStorage.setItem(client, clientsJSON[client]);
  }

  document.querySelector(".message").innerHTML =
    "Pavyzdiniai klientai sukelti į LocalStorage atmintį";
}

function addClient() {
  //Create unique Client ID

  
  do{
    var clientID = Math.floor(Math.random() * Math.floor(999));
  } while (window.localStorage.getItem(clientID));
  
  var randomSpecialistID = Math.floor(Math.random() * 3) + 1;

  window.localStorage.setItem(clientID, randomSpecialistID);
}
