document.querySelector(".load-btn").addEventListener("click", loadJSON);

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
    let clients = JSON.parse(response);

    loadJSONtoStorage(clients);
  });
}


function loadJSONtoStorage(clients){

  const keys = Object.keys(clients)

  for (const key of keys) {
    console.log(clients[key]);
    
    window.localStorage.setItem(key, clients[key]);
  }
  
}