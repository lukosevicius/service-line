setEventListeners();

function setEventListeners() {
  document.querySelector(".check-client-btn").addEventListener("click", login);
}

function login() {
  const enteredClientID = document.querySelector(".enter-client-code").value;

  if (enteredClientID) {
    const clientData = JSON.parse(window.localStorage.getItem(enteredClientID));
    if (clientData) {
      removeMsgs();
      showInfo(enteredClientID, clientData);
    } else {
      removeCards();
      dangerMsg("Tokio vartotojo nėra");
    }
  } else {
    removeCards();
    warningMsg("Kliento kodas neįvestas");
  }
}

function showInfo(client, clientData) {
  document.querySelector(".client-code").innerHTML = "Kliento kodas: " + client;

  const status = clientData["serviced"] ? "aptarnauta" : "laukia aptarnavimo";
  document.querySelector(".client-status").innerHTML =
    `<span>Kliento statusas: </span>` + status;

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
      `<span>Apsilankymas pas specialistą truko: </span>` + diff + " (min:sek)";
  }
  
  document.querySelector('.card').classList.add('scale-out');
  setTimeout(function(){
    document.querySelector('.card').classList.remove('scale-out');
  }, 50);
}
