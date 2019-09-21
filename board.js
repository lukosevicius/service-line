loadBoard();

function loadBoard() {
  const sortedClientsObj = getUnservicedClients();
  const sortedClients = Object.keys(sortedClientsObj);

  let isFirst = false;
  let currentSpecialist = 0;

  for (const client of sortedClients) {
    const specialist = sortedClientsObj[client];

    if (currentSpecialist != specialist) {
      isFirst = true;
      currentSpecialist = specialist;
    }
    // console.log(window.localStorage.getItem(1));

    addClientToBoard(client, specialist, isFirst);
    isFirst = false;
  }
}

function getUnservicedClients() {
  const clientsObj = { ...localStorage };

  var sortable = [];

  //Turn client object to array
  for (var client in clientsObj) {
    const clientObj = JSON.parse(clientsObj[client]);
    if (!clientObj.serviced) {
      sortable.push([client, clientObj.specialist]);
    }
  }

  //Sort array, by second value (which is specialist number)
  sortable.sort(function(a, b) {
    return a[1] - b[1];
  });

  //Remake the object from sorted array
  var sortedClientsObj = {};
  sortable.forEach(function(item) {
    sortedClientsObj[item[0] + " "] = item[1];
  });

  return sortedClientsObj;
}

function addClientToBoard(client, specialist, isFirst) {
  const tr = document.createElement("tr");
  if (isFirst) {
    tr.classList.add("active-client");
  }

  const td1 = document.createElement("td");
  tr.appendChild(td1).append(client);

  const td2 = document.createElement("td");
  tr.appendChild(td2).append(specialist);

  document.querySelector("#clients").appendChild(tr);
}

