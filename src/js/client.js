init();

function init() {
  document.querySelector(".check-client-btn").addEventListener("click", login);
  document.querySelector(".enter-client-code").focus();
}

function login() {
  clearInterval(window.myInterval);
  const enteredID = document.querySelector(".enter-client-code").value;

  if (enteredID) {
    const clientData = getClientData(enteredID);
    if (clientData) {
      removeMsgs();
      showInfoCard(enteredID);
    } else {
      removeCards();
      errorMsg("Tokio vartotojo nėra");
    }
  } else {
    removeCards();
    warningMsg("Kliento kodas neįvestas");
  }
}

function showInfoCard(clientID) {
  clearInterval(window.myInterval);
  const clientData = getClientData(clientID);
  clear(".client__info__appointment-time");

  //Name
  write(clientData["name"], ".client__info__name");
  //ID
  write(`<span>Kliento kodas: </span>` + clientID, ".client__info__code");
  //Status
  write(clientStatus(clientID, clientData), ".client__info__status");

  if (isActive(clientID)) {
    //Position in Line
    write(inLine(clientID), ".client__info__line-position");
    //How long to wait/ How long appointment took
    write(howLong(clientID), ".client__info__appointment-time");
    //Check "How long to wait" every 5 seconds
    window.myInterval = setInterval(function() {
      write(howLong(clientID), ".client__info__appointment-time");
    }, 5000);
  } else {
    clear(".client__info__line-position");
    clear(".client__info__appointment-time");
  }

  addCancelButton(clientID);
  displayCard();
}

function clientStatus(clientID, clientData) {
  let status;
  if (clientData["serviced"]) {
    status = `<span class="green-txt">Aptarnauta</span>`;
  } else {
    status = "Laukia aptarnavimo";
    if (positionInLine(clientID) == 0) {
      status = "Pas specialistą";
    }
    if (clientData["canceled"]) {
      status = `<span class="red-txt">Atšaukta</span>`;
    }
  }

  return `<span>Kliento statusas: </span>` + status;
}

function addCancelButton(clientID) {
  document.querySelector(".client__info__cancel").innerHTML = "";
  const button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("cancel-btn");
  button.append("Atšaukti");

  if (isActive(clientID) && positionInLine(clientID) != 0) {
    button.classList.add("orange");
    button.addEventListener("click", function() {
      updateClient(clientID, "canceled", true);
      showInfoCard(clientID);
    });
  } else {
    button.classList.add("disabled");
  }

  document.querySelector(".client__info__cancel").appendChild(button);
}

function inLine(clientID) {
  const pos = positionInLine(clientID);

  if (pos < 1) {
    return "";
  } else if (pos == 1) {
    return `<span>Eilėje esate pirmas</span>`;
  } else {
    return `<span>Kiek klientų prieš jus laukia eilėje: </span>` + (pos - 1);
  }
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
    toWait = "";
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
