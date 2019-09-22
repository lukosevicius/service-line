loadSpecialistpage();

function loadSpecialistpage() {
  addFilter();
  addClientsForCurrentSpecialist();
}

function addFilter() {
  clear('.specialists__select');
  const specialists = getUniqueSpecialists();

  //Check if there any specialists
  if (specialists.length !== 0) {
    //Create 'Select' element, with options for each specialist
    let select = document.createElement("select");
    select.classList.add("choose-specialist");

    specialists.forEach(specialist => {
      let option = document.createElement("option");
      option.value = specialist;
      option.append(specialist + " specialistas");
      select.appendChild(option);
    });

    document.querySelector(".specialists__select").appendChild(select);
  } else {
    document
      .querySelector(".specialists__select")
      .append("Šiuo metu nėra eilėje laukiančių klientų");
  }
}

// function getSpecialistsThatHaveClients() {
//   const clientsData = Object.values({ ...localStorage });

//   //Remove clients that were served
//   allSpecialistArray = clientsData.filter(client => {
//     client = JSON.parse(client);

//     if (!client.serviced) {
//       return client;
//     }
//   });


//   //Get only specialists numbers
//   allSpecialistArray = clientsData.map(client => {
//     client = JSON.parse(client);

//       return client.specialist;
//   });
  

//   let uniqueSpecialists = Array.from(new Set(allSpecialistArray));
//   uniqueSpecialists.sort((a, b) => a - b);


//   return uniqueSpecialists;
// }

function getUniqueSpecialists() {
  const clientsData = Object.values({ ...localStorage });

  allSpecialistArray = clientsData.map(el => {
    return parseInt(JSON.parse(el).specialist);
  });

  let uniqueSpecialists = Array.from(new Set(allSpecialistArray));
  uniqueSpecialists.sort((a, b) => a - b);

  return uniqueSpecialists;
}

function addClientsForCurrentSpecialist() {
  //First check if there are any specialist assigned
  if (document.querySelector("select.choose-specialist")) {
    //Check which specialist is currently selected and display its clients
    let selectedSpecialist = document.querySelector("select.choose-specialist")
      .value;
    createClientsTable(selectedSpecialist);

    //Rerender clients waiting-list when specialist is changed
    document
      .querySelector("select.choose-specialist")
      .addEventListener("change", function() {
        selectedSpecialist = document.querySelector("select.choose-specialist")
          .value;
        createClientsTable(selectedSpecialist);
      });
  } else {
    clear('#clients thead');
    clear('#clients tbody');
  }
}

function createClientsTable(selectedSpecialist) {
  clear('#clients thead');
  clear('#clients tbody');
  addBoardHeader("Laukiantys klientai", "Aptarnauti");

  const allClientsObj = { ...localStorage };
  const clients = Object.keys(allClientsObj);

  let isFirstClient = true;

  clients.forEach(client => {
    const isClientServiced = JSON.parse(allClientsObj[client]).serviced;

    if (!isClientServiced) {
      const clientsSpecialist = JSON.parse(allClientsObj[client]).specialist;

      if (clientsSpecialist == selectedSpecialist) {
        addClientToBoard(client, selectedSpecialist, isFirstClient);
        isFirstClient = false;
      }
    }
  });
}

function addClientToBoard(client, specialist, isFirstClient) {
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  tr.appendChild(td1).append(client);

  if (isFirstClient) {
    startAppointment(client);
    const button = createHandleClientButton(client);
    td2.appendChild(button);
  }
  tr.appendChild(td2);

  document.querySelector("#clients tbody").appendChild(tr);
}

function createHandleClientButton(client) {
  const button = document.createElement("button");

  const i = document.createElement('i');
  i.classList.add('material-icons');
  i.append('check');

  button.appendChild(i); 
  // button.append("Aptarnauta");
  button.setAttribute("data-client", client);
  button.classList.add("btn");
  button.classList.add("delete-button");

  button.addEventListener("click", function() {
    const client = this.getAttribute("data-client");
    handleClient(client);
    addClientsForCurrentSpecialist();
  });

  return button;
}

function handleClient(clientID) {
  let clientData = getClientData(clientID);
  clientData.serviced = true;
  clientData.endedAppointment = new Date();

  clientData = JSON.stringify(clientData);
  window.localStorage.setItem(clientID, clientData);
}

function addBoardHeader(client, specialist) {
  const thead = document.createElement("tr");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  tr.appendChild(th1).append(client);

  const th2 = document.createElement("th");
  tr.appendChild(th2).append(specialist);

  tr.classList.add('light-blue');
  tr.classList.add('lighten-1');

  document.querySelector("#clients thead").appendChild(tr);
}


function startAppointment(clientID) {
  let clientData = getClientData(parseInt(clientID));  
  
  if (!clientData.startedAppointment) {
    clientData.startedAppointment = new Date();
  }
  window.localStorage.setItem(parseInt(clientID), JSON.stringify(clientData));
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});
