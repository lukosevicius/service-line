function write(msg, elem) {
  document.querySelector(elem).innerHTML = msg;
}

function clear(elem) {
  document.querySelector(elem).innerHTML = "";
}

function getClientData(id) {
  return JSON.parse(window.localStorage.getItem(id));
}

function successMsg(text) {
  addMessage(text, "alert-success");
}

function warningMsg(text) {
  addMessage(text, "alert-warning");
}

function errorMsg(text) {
  addMessage(text, "alert-danger");
}

function removeMsgs() {
  clear(".alert-message");
  document.querySelector(".alert").classList.add("scale-out");
}

function removeCards() {
  document.querySelector(".card").classList.add("scale-out");
}

function addMessage(text, type) {
  const alert = document.querySelector(".alert");
  const alertMessage = document.querySelector(".alert-message");
  alert.classList.remove("alert-warning");
  alert.classList.remove("alert-danger");
  alert.classList.remove("alert-success");
  alert.classList.add("scale-out");

  setTimeout(function() {
    alertMessage.innerHTML = text;
    alert.classList.add(type);
    alert.classList.remove("scale-out");

    document
      .querySelector(".close-alert")
      .addEventListener("click", function() {
        alertMessage.innerHTML = "";
        alert.classList.add("scale-out");
      });
  }, 50);
}

/****************** Client Functions *********************/

function avgAppointmentTime(specialistID) {
  const allClientsObj = { ...localStorage };
  const servicedClientsIDs = getSpecialistsServicedClients(specialistID);
  let sum = 0;
  let values = 0;

  servicedClientsIDs.forEach(id => {
    const started = new Date(JSON.parse(allClientsObj[id]).startedAppointment);
    const ended = new Date(JSON.parse(allClientsObj[id]).endedAppointment);

    const timeDiffenrenceInMs = ended - started;

    sum += timeDiffenrenceInMs;
    values++;
  });

  const avg = Math.floor(sum / values);

  return avg;
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  if (seconds < 1) {
    seconds = 1;
  }
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function millisToMinutes(millis) {
  var minutes = Math.floor(millis / 60000);
  return minutes;
}

function getSpecialistsServicedClients(wantedSpecialist) {
  const allClientsObj = { ...localStorage };
  const allClientsIDs = Object.keys(allClientsObj);
  const filteredClientsIDs = [];

  allClientsIDs.forEach(clientID => {
    const isClientServiced = JSON.parse(allClientsObj[clientID]).serviced;

    if (isClientServiced) {
      const clientsSpecialist = JSON.parse(allClientsObj[clientID]).specialist;

      if (clientsSpecialist == wantedSpecialist) {
        filteredClientsIDs.push(clientID);
      }
    }
  });

  return filteredClientsIDs;
}

function getSpecialistsClients(wantedSpecialist) {
  const allClientsObj = { ...localStorage };
  const allClientsIDs = Object.keys(allClientsObj);
  const filteredClientsIDs = [];

  allClientsIDs.forEach(clientID => {
    const isClientServiced = JSON.parse(allClientsObj[clientID]).serviced;

    if (!isClientServiced) {
      const clientsSpecialist = JSON.parse(allClientsObj[clientID]).specialist;

      if (clientsSpecialist == wantedSpecialist) {
        filteredClientsIDs.push(clientID);
      }
    }
  });

  return filteredClientsIDs;
}

function positionInLine(clientID) {
  const clientsData = getClientData(clientID);
  const specialistID = clientsData["specialist"];

  const clients = getSpecialistsClients(specialistID);
  const index = clients.indexOf(clientID.toString());

  return index;
}

/****************** init Materialize JS ******************/

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});

// function getClientsForSpecialist(wantedSpecialistID) {
//   const allClientsObj = { ...localStorage };
//   const allClientsIDs = Object.keys(allClientsObj);

//   const pickedClients = [];

//   allClientsIDs.forEach(client => {
//     const clientsData = JSON.parse(allClientsObj[client]);

//     if (clientsData["specialist"] == wantedSpecialistID) {
//       pickedClients.push(client);
//     }
//   });

//   return pickedClients;
// }
