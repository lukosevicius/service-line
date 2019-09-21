loadSpecialistpage();

function loadSpecialistpage() {
  addFilter();
  addClientsForCurrentSpecialist();
}

function addFilter() {
  document.querySelector(".specialists").innerHTML = "";
  const specialists = getUniqueSpecialists();

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

    document.querySelector(".specialists").appendChild(select);
  } else {
    document
      .querySelector(".specialists")
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
    return JSON.parse(el).specialist;
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
    document.querySelector("#clients").innerHTML = "";
  }
}

function createClientsTable(selectedSpecialist) {
  document.querySelector("#clients").innerHTML = "";
  addBoardHeader("Laukiantys klientai", "Aptarnauti");

  const clientsObj = { ...localStorage };
  const clients = Object.keys(clientsObj);

  let isFirstClient = true;

  clients.forEach(client => {
    const isClientServiced = JSON.parse(clientsObj[client]).serviced;

    if (!isClientServiced) {
      const clientsSpecialist = JSON.parse(clientsObj[client]).specialist;

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

  document.querySelector("#clients").appendChild(tr);
}

function createHandleClientButton(client) {
  const button = document.createElement("button");

  button.append("Aptarnauti");
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
  let clientData = JSON.parse(window.localStorage.getItem(clientID));
  clientData.serviced = true;
  clientData.endedAppointment = new Date();

  clientData = JSON.stringify(clientData);
  window.localStorage.setItem(clientID, clientData);
}

function addBoardHeader(client, specialist) {
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  tr.appendChild(th1).append(client);

  const th2 = document.createElement("th");
  tr.appendChild(th2).append(specialist);

  document.querySelector("#clients").appendChild(tr);
}


function startAppointment(client) {
  // let clientObj = JSON.parse(window.localStorage.getItem("1"));  
  let clientObj = JSON.parse(window.localStorage.getItem(parseInt(client)));  
  
  if (!clientObj.startedAppointment) {
    clientObj.startedAppointment = new Date();
  }
  window.localStorage.setItem(parseInt(client), JSON.stringify(clientObj));
}
