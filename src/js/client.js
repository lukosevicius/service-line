setEventListeners();

function setEventListeners() {
  document.querySelector(".check-client-btn").addEventListener("click", login);
}

function login() {
  clearInterval(window.myInterval);
  const enteredID = document.querySelector(".enter-client-code").value;

  if (enteredID) {
    const clientData = getClientData(enteredID);
    if (clientData) {
      removeMsgs();
      showInfoCard(enteredID, clientData);
    } else {
      removeCards();
      errorMsg("Tokio vartotojo nėra");
    }
  } else {
    removeCards();
    warningMsg("Kliento kodas neįvestas");
  }
}

function showInfoCard(clientID, clientData) {
  clear(".client-appointment-time");
  write("Kliento kodas: " + clientID, ".client-code");

  let status = clientData["serviced"] ? "aptarnauta" : "laukia aptarnavimo";
  status = `<span>Kliento statusas: </span>` + status;
  write(status, ".client-status");

  write(howLong(clientID), ".client-appointment-time");

  //Check time every 5 seconds
  window.myInterval = setInterval(function() {
    write(howLong(clientID), ".client-appointment-time");
  }, 5000);

  displayCard();
}

function howLong(clientID) {
  let clientData = getClientData(clientID);
  if (clientData["serviced"]) {
    return howLongWasAppointment(clientData);
  } else {
    return howLongToWait(clientID, clientData["specialist"]);
  }
}

function howLongToWait(clientID, specialistID) {
  let avg = avgAppointmentTime(specialistID);
  const index = positionInLine(clientID);
  let toWait;

  if (index == 0) {
    toWait = `<span>Klientas šiuo metu yra pas specialistą</span>`;
  } else {
    avg = avg * index;
    avgInMins = millisToMinutesAndSeconds(avg);
    toWait = `<span>Laukti liko maždaug: </span>` + avgInMins + " (min:sek)";
  }

  return toWait;
}

function howLongWasAppointment(clientData) {
  const started = new Date(clientData["startedAppointment"]);
  const ended = new Date(clientData["endedAppointment"]);

  const timeDiffenrenceInMs = ended - started;

  const diff = millisToMinutesAndSeconds(timeDiffenrenceInMs);
  const appointment =
    `<span>Apsilankymas pas specialistą truko: </span>` + diff + " (min:sek)";

  return appointment;
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  if (seconds < 1) {
    seconds = 1;
  }
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function displayCard() {
  document.querySelector(".card").classList.add("scale-out");
  setTimeout(function() {
    document.querySelector(".card").classList.remove("scale-out");
  }, 50);
}
