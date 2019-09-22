init();

function init() {
  document
    .querySelector(".load-btn")
    .addEventListener("click", loadExamplaryJSON);
  document
    .querySelector(".add-client-btn")
    .addEventListener("click", addNewClient);
  document.querySelector(".delete-btn").addEventListener("click", deleteAll);

  document.querySelector(".add-client-btn").focus();
}

function loadExamplaryJSON() {
  getJSONfromFile(function(response) {
    if (response) {
      loadClientsToStorage(response);
    } else {
      errorMsg("Nepavyko nuskaityti lankytojų duomenų");
    }
  });
}

function getJSONfromFile(callback) {
  fetch("clients.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      callback(data);
    })
    .catch(function() {
      callback(false);
    });
}

function loadClientsToStorage(allClientsObj) {
  const allClientsIDs = Object.keys(allClientsObj);

  for (const clientID of allClientsIDs) {
    const serviced = allClientsObj[clientID].serviced;
    
    if(serviced){
      const clientsData = JSON.stringify(allClientsObj[clientID]);
      saveServicedClient(clientID, clientsData);
    } else {
      const specialistID = JSON.stringify(allClientsObj[clientID].specialist);
      saveClient(clientID, specialistID);
    }
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

function saveServicedClient(clientID, clientData){
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

function deleteAll() {
  window.localStorage.clear();
  successMsg("Visi duomenys ištrinti");
}
