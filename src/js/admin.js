init();

function init() {
  document
    .querySelector(".load-btn")
    .addEventListener("click", loadExamplaryJSON);
  document
    .querySelector(".add-client-btn")
    .addEventListener("click", addNewClient);
  document.querySelector(".delete-btn").addEventListener("click", deleteAll);

  document.querySelector(".admin__options__enter input").focus();
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
    .catch(function(error) {
      callback(false);
    });
}

function loadClientsToStorage(allClientsObj) {
  const allClientsIDs = Object.keys(allClientsObj);

  for (const clientID of allClientsIDs) {
    const serviced = allClientsObj[clientID].serviced;

    if (serviced) {
      const clientsData = JSON.stringify(allClientsObj[clientID]);
      saveServicedClient(clientID, clientsData);
    } else {
      const specialistID = JSON.stringify(allClientsObj[clientID].specialist);
      const name = allClientsObj[clientID].name;
      saveClient(clientID, specialistID, name);
    }
  }
  successMsg("Pavyzdiniai klientai sukelti į atmintį");
}

function addNewClient() {
  const name = document.querySelector(".admin__options__enter input").value;

  if (isEnteredCorrectly(name)) {
    //Randomly assign client to one of 3 working specialists.
    const specialistID = Math.floor(Math.random() * 3) + 1;
    const clientID = createClientID();

    saveClient(clientID, specialistID, name);
    showClientCard(clientID, specialistID);
    successMsg("Užregistruota sėkmingai");
    document.querySelector(".enter-client-code").value = "";
  } else {
    errorMsg(
      "Netesingai įvestas vardas. Galima naudoti tik didžiąsias ar mažąsias raides, bei tarpus"
    );
  }
}

function showClientCard(clientID, specialistID) {
  addInfoToCard(clientID, specialistID);
  displayCard();
}

function addInfoToCard(clientID, specialistID) {
  const inputValue = document.querySelector(".admin__options__enter input")
    .value;

  // const clientData = getClien
  document.querySelector(".admin__cards__name").innerHTML =
    `Naujas klientas: <span class="name">${inputValue}</span>`;
  document.querySelector(".admin__cards__num").innerHTML =
    "Kliento kodas: " + clientID;
  document.querySelector(".admin__cards__spec").innerHTML =
    "Specialisto ID, kuris priims klieną: " + specialistID;
}

function isEnteredCorrectly(name) {
  var regName = /^[a-žA-Ž ]+$/;
  const inputValue = document.querySelector(".admin__options__enter input")
    .value;

  if (!regName.test(inputValue)) {
    return false;
  } else {
    return true;
  }
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

function saveClient(clientID, specialistID, name) {
  //Start appoinment immediately if this is specialist's first client
  let appointment = null;
  if (!hasActiveClients(specialistID)) {
    appointment = new Date();
  }

  const clientData = JSON.stringify({
    name: name,
    specialist: specialistID,
    serviced: false,
    canceled: false,
    created: new Date(),
    startedAppointment: appointment,
    endedAppointment: null
  });

  //Add new client to Local storage
  window.localStorage.setItem(clientID, clientData);
}

function saveServicedClient(clientID, clientData) {
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
}

function deleteAll() {
  window.localStorage.clear();
  successMsg("Visi duomenys ištrinti");
}

function displayCard() {
  document.querySelector(".card").classList.add("scale-out");
  setTimeout(function() {
    document.querySelector(".card").classList.remove("scale-out");
  }, 50);
}
