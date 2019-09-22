addEventListeners();

function addEventListeners() {
  document
    .querySelector(".load-btn")
    .addEventListener("click", loadExamplaryJSON);
  document
    .querySelector(".add-client-btn")
    .addEventListener("click", addNewClient);
  document
    .querySelector(".delete-btn")
    .addEventListener("click", deleteAll);
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
    const specialistID = JSON.stringify(clientsObj[client].specialist);
    saveClient(client, specialistID);
  }
  successMsg("Pavyzdiniai klientai sukelti į atmintį");
}

function addNewClient() {
  //Randomly assign client to one of 3 working specialists.
  const specialistID = Math.floor(Math.random() * 3) + 1;
  const clientID = createClientID();

  saveClient(clientID, specialistID);
  successMsg("Užregistruota sėkmingai");
}

function createClientID() {
  //Make new client ID, by taking currently biggest number from received array adding 1 to it
  const allClients = Object.keys({ ...localStorage });

  if (allClients.length === 0) {
    return 1;
  } else {
    return Math.max(...allClients) + 1;
  }
}

function saveClient(clientID, specialistID) {
  //Start appoinment immediately if this is specialist's first client
  let appointment = null;
  if (!hasActiveClients(specialistID)) {
    appointment = new Date();
  }

  const clientData = JSON.stringify({
    specialist: specialistID,
    serviced: false,
    created: new Date(),
    startedAppointment: appointment,
    endedAppointment: null
  });

  //Add new client to Local storage
  window.localStorage.setItem(clientID, clientData);
}

function hasActiveClients(wantedSpecialistID) {
  const allClientsObj = { ...localStorage };
  const allClientsIDs = Object.keys(allClientsObj);

  const pickedClients = [];

  allClientsIDs.forEach(client => {
    const clientsData = JSON.parse(allClientsObj[client]);

    if (
      clientsData["specialist"] == wantedSpecialistID &&
      !clientsData["serviced"]
    ) {
      pickedClients.push(client);
    }
  });

  if (pickedClients.length > 0) {
    return true;
  } else {
    return false;
  }

  // return pickedClients;
}

function deleteAll(){
  window.localStorage.clear();
  dangerMsg("Visi duomenys iš 'LocalStorage' atminties buvo ištrinti")
}






