loadSpecialistpage();

function loadSpecialistpage() {
  addFilter();
  addClientsForCurrentSpecialist();
}

function addFilter() {
  document.querySelector(".specialists").innerHTML = "";

  const specialists = Object.values({ ...localStorage });
  let uniqueSpecialists = Array.from(new Set(specialists));
  uniqueSpecialists.sort((a, b) => a - b);

  if (uniqueSpecialists.length !== 0) {
    //Create 'Select' element, with options for each specialist
    let select = document.createElement("select");
    select.classList.add("choose-specialist");

    uniqueSpecialists.forEach(specialist => {
      let option = document.createElement("option");
      option.value = specialist;
      option.append(specialist + " specialistas");
      select.appendChild(option);
    });

    document.querySelector(".specialists").appendChild(select);
  } else {
    document
      .querySelector(".specialists")
      .append("Šiuo metu nėra eilėjė laukiančių klientų");
  }
}

function addClientsForCurrentSpecialist() {
  //First check if there are any clients assigned to specialists
  if (document.querySelector("select.choose-specialist")) {
    let currentSpecialist = document.querySelector("select.choose-specialist")
      .value;
    createClientsTable(currentSpecialist);

    //Rerender clients waiting-list when specialist is changed
    document
      .querySelector("select.choose-specialist")
      .addEventListener("change", function() {
        currentSpecialist = document.querySelector("select.choose-specialist")
          .value;
        createClientsTable(currentSpecialist);
      });
  } else {
    document.querySelector("#clients").innerHTML = "";
  }
}

function createClientsTable(currentSpecialist) {
  document.querySelector("#clients").innerHTML = "";
  addBoardHeader("Laukiantys klientai", "Aptarnauti");

  const clientsObj = { ...localStorage };
  const clients = Object.keys(clientsObj);
  let firstClient = true;

  clients.forEach(client => {
    if (clientsObj[client] === currentSpecialist) {
      addClientToBoard(client, currentSpecialist, firstClient);
      firstClient = false;
    }
  });
}

function addClientToBoard(client, specialist, firstClient) {
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  tr.appendChild(td1).append(client);

  if (firstClient) {
    const button = document.createElement("button");
    button.append("Aptarnauti");
    button.setAttribute("data-client", client);
    button.classList.add("btn");
    button.classList.add("delete-button");

    button.addEventListener("click", function() {
      window.localStorage.removeItem(this.getAttribute("data-client"));
      loadSpecialistpage();
    });

    td2.appendChild(button);
  }

  tr.appendChild(td2);

  document.querySelector("#clients").appendChild(tr);
}

function addBoardHeader(client, specialist) {
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  tr.appendChild(th1).append(client);

  const th2 = document.createElement("th");
  tr.appendChild(th2).append(specialist);

  document.querySelector("#clients").appendChild(tr);
}
