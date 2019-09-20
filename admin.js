addEventListeners();

function addEventListeners() {
  document
    .querySelector(".load-btn")
    .addEventListener("click", loadExamplaryJSON);
  document
    .querySelector(".add-client-btn")
    .addEventListener("click", addNewClient);
}

function loadExamplaryJSON() {
  getJSONfromFile(function(response) {
    let clientsJSON = JSON.parse(response);

    loadClientsToStorage(clientsJSON);
  });
}

function getJSONfromFile(callback) {
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

function loadClientsToStorage(clientsObj) {
  const clients = Object.keys(clientsObj);
  for (const client of clients) {
    window.localStorage.setItem(client, JSON.stringify(clientsObj[client]));
  }

  document.querySelector(".message").innerHTML =
    "Pavyzdiniai klientai sukelti į LocalStorage atmintį";
}

function addNewClient() {
  //Randomly assign client to one of 3 working specialists.
  const specialistID = Math.floor(Math.random() * 3) + 1;
  const clientID = createClientID();

  const clientData = JSON.stringify({
    specialist: specialistID,
    serviced: false
  });

  //Add new client to Local storage
  window.localStorage.setItem(clientID, clientData);
}

function createClientID() {
  //Make new client ID, by taking currently biggest number from received array adding 1 to it
  const allClients = Object.keys({ ...localStorage })

  if (allClients.length === 0) {
    return 1;
  } else {
    return (Math.max(...allClients) + 1);
  }
}

// function getClientsForSpecialist(wantedSpecialistID) {
//   const allClientsObj = { ...localStorage };
//   const allClientsIDs = Object.keys(allClientsObj);

//   const pickedClients = [];

//   allClientsIDs.forEach(client => {
//     const clientsData = JSON.parse(allClientsObj[client]);

//     if (clientsData["specialist"] == wantedSpecialistID) {
//       pickedClients.push(client);
//     }
//   });

//   return pickedClients;
// }
