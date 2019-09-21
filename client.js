setEventListeners();

function setEventListeners() {
  document.querySelector(".check-client-btn").addEventListener("click", login);
}

function login() {
  const enteredClientID = document.querySelector(".enter-client-code").value;

  if (enteredClientID) {
    const clientData = JSON.parse(window.localStorage.getItem(enteredClientID));
    if (clientData) {
      document.querySelector(".message").innerHTML = "Prisijungta sėkmingai";
      showInfo(enteredClientID, clientData);
    } else {
      document.querySelector(".message").innerHTML = "Tokio vartotojo nėra";
    }
  } else {
    document.querySelector(".message").innerHTML = "Kliento kodas neįvestas";
  }
}

function showInfo(client, clientData) {
  document.querySelector(".client-code").innerHTML = "Kliento kodas: " + client;

  const status = clientData["serviced"] ? "aptarnauta" : "laukia aptarnavimo";
  document.querySelector(".client-status").innerHTML =
    "Kliento statusas: " + status;

  if (clientData["serviced"]) {
    const started = new Date(clientData["startedAppointment"]);
    const ended = new Date(clientData["endedAppointment"]);

    const timeDiffenrenceInMs = ended - started;

    function millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      if(seconds < 1){
          seconds = 1;
      }
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    const diff = millisToMinutesAndSeconds(timeDiffenrenceInMs);

    document.querySelector(".client-appointment-time").innerHTML =
      "Apsilankymas pas specialistą truko: " + diff + " (min:sek)";
  }
}
