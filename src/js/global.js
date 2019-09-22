function successMsg(text) {
    addMessage(text, 'alert-success')
}

function warningMsg(text) {
    addMessage(text, 'alert-warning')
}

function dangerMsg(text) {
    addMessage(text, 'alert-danger')
}

function removeMsgs(){
  document.querySelector(".alert-message").innerHTML = "";
  document.querySelector(".alert").classList.add("scale-out");
}

function removeCards(){
  document.querySelector(".card").classList.add("scale-out");
}

function addMessage(text, type){
    const alert = document.querySelector(".alert");
    const alertMessage = document.querySelector(".alert-message");
    alert.classList.remove("alert-warning");
    alert.classList.remove("alert-danger");
    alert.classList.remove("alert-success");
    alert.classList.add("scale-out");
  
    setTimeout(function(){
    alertMessage.innerHTML = text;
    alert.classList.add(type);
    alert.classList.remove("scale-out");
  
    document.querySelector(".close-alert").addEventListener("click", function() {
      alertMessage.innerHTML = "";
      alert.classList.add("scale-out");
    });
  },50);
}

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