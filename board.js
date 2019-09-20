loadBoard();

function loadBoard() {
  const sortedClientsObj = getUnservicedClients();
  const sortedClients = Object.keys(sortedClientsObj);

  for (const client of sortedClients) {
    const specialist = sortedClientsObj[client];

    addClientToBoard(client, specialist);
  }
}

function getUnservicedClients() {
  const clientsObj = { ...localStorage };

  var sortable = [];

  //Turn client object to array
  for (var client in clientsObj) {
    const clientObj = JSON.parse(clientsObj[client]);
    if(!clientObj.serviced){
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

function addClientToBoard(client, specialist) {
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  tr.appendChild(td1).append(client);

  const td2 = document.createElement("td");
  tr.appendChild(td2).append(specialist);

  document.querySelector("#clients").appendChild(tr);
}
