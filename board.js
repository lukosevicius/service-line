function loadClientsFromStorage() {
  const clientsObj = { ...localStorage };
  const sortedClients = sortClientsObject(clientsObj);
  const clients = Object.keys(sortedClients);

  for (const client of clients) {
    const specialist = sortedClients[client];

    addClientToBoard(client, specialist);
  }
}

function sortClientsObject(clientsObj) {
  var sortable = [];

  for (var client in clientsObj) {
    sortable.push([client, clientsObj[client]]);
  }

  sortable.sort(function(a, b) {
    return a[1] - b[1];
  });

  var sortedClientsObj = {};
  sortable.forEach(function(item) {

    sortedClientsObj[item[0]+' '] = item[1];
     
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

loadClientsFromStorage();
