setEventListeners();

function setEventListeners() {
  document.querySelector(".check-client-btn").addEventListener("click", login);
}

function login() {
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

function showInfoCard(client, clientData) {
  write("Kliento kodas: " + client, ".client-code");

  let status = clientData["serviced"] ? "aptarnauta" : "laukia aptarnavimo";
  status = `<span>Kliento statusas: </span>` + status;
  write(status, ".client-status");

  if (clientData["serviced"]) {
    appointment = howLong(clientData);
    write(appointment, ".client-appointment-time");
  }

  displayCard();
}

function howLong(clientData) {
  const started = new Date(clientData["startedAppointment"]);
  const ended = new Date(clientData["endedAppointment"]);

  const timeDiffenrenceInMs = ended - started;

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    if (seconds < 1) {
      seconds = 1;
    }
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const diff = millisToMinutesAndSeconds(timeDiffenrenceInMs);
  const appointment =
    `<span>Apsilankymas pas specialistą truko: </span>` + diff + " (min:sek)";

  return appointment;
}

function displayCard() {
  document.querySelector(".card").classList.add("scale-out");
  setTimeout(function() {
    document.querySelector(".card").classList.remove("scale-out");
  }, 50);
}
