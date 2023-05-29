let newWork = {
  ID: "",
  newWorkDate: "",
  where: "",
  what: "",
  timeWork: "",
  howManyMoney: "",
  buttonThere: false,
  isPaid: false,
};

function init() {
  document.getElementById("workings").innerHTML = ``;
  showWorkingsPaid();
  showWorkingsUnpaid();
  calcTotalMoney();
  calcgotMoney();

}

function save() {
  getWhatWhere();
  getChoosenDate();
  validateEuroIncoming();
  isPaid = false;
  addToLocalStorage();
  showAlertNewIncoming();
  document.getElementById("saveButton").disabled = true;
  document.getElementById("workings").innerHTML = ``;
  showWorkingsPaid();
  showWorkingsUnpaid();
  calcTotalMoney();
  calcgotMoney();


}

function getWhatWhere() {
  let whereWork = document.getElementById("whereWork").value;
  let doing = document.getElementById("doing").value;
  newWork.where = whereWork;
  newWork.what = doing;
  showWorkingsPaid();
  showWorkingsUnpaid();
}

// function checkMoneyInput() {
//   // timeWork.push(btnDauer.textContent);
//   const inputValue = parseFloat(numberInput.value);

//   // Stellen Sie sicher, dass der Wert eine Zahl ist und nicht NaN
//   if (!isNaN(inputValue)) {
//     // Begrenzen Sie die Anzahl der Nachkommastellen auf maximal 2
//     const fixedValue = inputValue.toFixed(2);
//     // Fügen Sie den formatierten Wert der Liste hinzu
//     newWork.workData[0].howManyMoney = fixedValue;
//   }
// }

function getChoosenDate() {
  let getWorkDate = document.getElementById("getDate").value;
  const date = new Date(getWorkDate);
  const tag = date.getDate();
  const monat = date.getMonth() + 1; // Monat ist 0-basiert, also +1
  const jahr = date.getFullYear();
  const formedDate = `${tag.toString().padStart(2, "0")}.${monat
    .toString()
    .padStart(2, "0")}.${jahr.toString()}`;
  newWork.newWorkDate = formedDate;
}

function showAlertNewIncoming() {
  document.getElementById("newSaved").style.display = "block";
  setTimeout(function () {
    document.getElementById("newSaved").style.display = "none";
  }, 2000);
}

function validateEuroIncoming() {
  const numberInput = document.getElementById("number-input");
  const errorMessage = document.getElementById("error-message");
  const value = numberInput.value;

  if (!/^\d{1,}([.,]\d{0,2})?$/.test(value)) {
    errorMessage.textContent =
      "Bitte geben Sie eine Zahl mit maximal 2 Nachkommastellen ein.";

    numberInput.focus();
  } else {
    errorMessage.textContent = "";
    $("#exampleModal").modal("hide");
  }
  newWork.howManyMoney = numberInput.value;
}

function validate() {
  const getDate = document.getElementById("getDate").value;
  const whereWork = document.getElementById("whereWork").value;
  const doing = document.getElementById("doing").value;
  const numberInput = +document
    .getElementById("number-input")
    .value.replace(",", ".");

  if (getDate && whereWork && doing && numberInput) {
    document.getElementById("saveButton").disabled = false;
  } else {
    document.getElementById("saveButton").disabled = true;
  }
}

function calcTotalMoney() {
  // Daten aus LocalStorage abrufen
  const storedData = localStorage.getItem("workData");
  // Überprüfen, ob Daten im LocalStorage vorhanden sind
  if (storedData) {
    // Daten in ein Array umwandeln
    const workData = JSON.parse(storedData);
    // Variable zum Speichern der Gesamtsumme von howManyMoney
    let totalMoney = 0;
    // Schleife durchlaufen, um jeden Datensatz zu verarbeiten
    for (let i = 0; i < workData.length; i++) {
      const work = workData[i];
      // Addiere howManyMoney zum totalMoney
      totalMoney += parseFloat(work.howManyMoney);
      // Datensatz in die Tabelle einfügen
    }
    document.getElementById("totalMoney").innerHTML = ``;
    document.getElementById("totalMoney").innerHTML += /*html*/ `
    ${totalMoney.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} €
  `;

    // Zeige die Gesamtsumme von howManyMoney an
    console.log("Gesamtsumme von howManyMoney: ", totalMoney);
  }
}



function calcgotMoney() {
  // Daten aus LocalStorage abrufen
  const storedData = localStorage.getItem("workData");
  // Überprüfen, ob Daten im LocalStorage vorhanden sind
  if (storedData) {
    // Daten in ein Array umwandeln
    const workData = JSON.parse(storedData);
    // Variable zum Speichern der Gesamtsumme von howManyMoney
    let gotMoney = 0;
    // Schleife durchlaufen, um jeden Datensatz zu verarbeiten
    for (let i = 0; i < workData.length; i++) {
      const work = workData[i];
      // Addiere howManyMoney zum totalMoney
      if (work.isPaid == true) {

        gotMoney += parseFloat(work.howManyMoney);
        // Datensatz in die Tabelle einfügen
        document.getElementById("gotMoney").innerHTML = ``;
        document.getElementById("gotMoney").innerHTML += /*html*/ `
      ${gotMoney.toLocaleString("de-DE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} €
    `;

      }
    }
  }
  // Zeige die Gesamtsumme von howManyMoney an
  console.log("Bezahlt: ", gotMoney);

}
