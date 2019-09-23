loadBoard();

function loadBoard() {
  const sortedClientsObj = getActiveClients();
  const sortedClients = Object.keys(sortedClientsObj);

  if (sortedClients.length == 0) {
    write("Šiuo metu klientų nėra", ".board__message");
  }

  let isFirst = false;
  let currentSpecialist = 0;
  let index = 0;

  for (const client of sortedClients) {
    const specialist = sortedClientsObj[client];

    if (currentSpecialist != specialist) {
      isFirst = true;
      currentSpecialist = specialist;
      index = 0;
    }

    //Don't show more than 4 clients per specialist
    if (index < 4) {
      addClientToBoard(client, specialist, isFirst, index);
    }

    index++;
    isFirst = false;
  }

  //enable fullscreen option
  document
    .querySelector(".go-fullscreen")
    .addEventListener("click", goFullscreen);
  document
    .querySelector(".close-fullscreen")
    .addEventListener("click", closeFullscreen);
}

function getActiveClients() {
  const allClientsObj = { ...localStorage };
  let sortable = [];

  //Turn client object to array
  for (let clientID in allClientsObj) {
    if (isActive(clientID)) {
      const specialistID = JSON.parse(allClientsObj[clientID]).specialist;
      sortable.push([clientID, specialistID]);
    }
  }

  //Sort array, by second value (which is specialist number)
  sortable.sort(function(a, b) {
    return a[1] - b[1];
  });

  //Remake the object from sorted array
  let sortedClientsObj = {};
  sortable.forEach(function(item) {
    sortedClientsObj[item[0] + " "] = item[1];
  });

  return sortedClientsObj;
}

function addClientToBoard(client, specialistID, isFirst, index) {
  const tr = document.createElement("tr");
  if (isFirst) {
    tr.classList.add("active-client");
  }

  const td1 = document.createElement("td");
  tr.appendChild(td1).append(client);

  const td2 = document.createElement("td");
  tr.appendChild(td2).append(specialistID);

  const td3 = document.createElement("td");
  if (isFirst) {
    tr.appendChild(td3).append("-");
  } else {
    let avg = parseInt(avgAppointmentTime(specialistID));

    if (!Number.isNaN(avg)) {
      avg = avg * index;
      avg = millisToMinutes(avg);
      if (avg == 0) avg = 1;
      avg += " min";
    } else {
      avg = "Nėra duomenų";
    }
    tr.appendChild(td3).append(avg);
  }

  document.querySelector("#clients tbody").appendChild(tr);
}

let elem = document.documentElement;
function goFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
