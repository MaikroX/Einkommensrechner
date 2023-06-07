let newWork = {
  ID: "",
  newWorkDate: "",
  where: "",
  what: "",
  startTime: "",
  endTime: "",
  durationHour: "",
  durarationMinute: "",
  howManyMoney: "",
  buttonThere: false,
  isPaid: false,
};

document.addEventListener(
  "touchmove",
  function (event) {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  },
  { passive: false }
);

function init() {
  document.getElementById("workings").innerHTML = ``;
  showWorkingsPaid();
  showWorkingsUnpaid();
  calcTotalMoney();
  calcgotMoney();
  calcOpenMoney();
}

function save() {
  getWhatWhere();
  getChoosenDate();
  validateEuroIncoming();
  isPaid = false;
  getTimeWork();
  addToLocalStorage();
  showAlertNewIncoming();
  document.getElementById("saveButton").disabled = true;
  document.getElementById("workings").innerHTML = ``;
  showWorkingsPaid();
  showWorkingsUnpaid();
  calcTotalMoney();
  calcgotMoney();
  calcOpenMoney();
}

function getTimeWork() {
  let startZeit = document.getElementById("timePickerStart").value;
  let endZeit = document.getElementById("timePickerEnde").value;

  newWork.startTime = startZeit;
  newWork.endTime = endZeit;

  let startZeitMs = new Date("1970-01-01T" + startZeit + "Z").getTime();
  let endZeitMs = new Date("1970-01-01T" + endZeit + "Z").getTime();

  if (endZeitMs < startZeitMs) {
    endZeitMs += 24 * 60 * 60 * 1000; // 24 Stunden in Millisekunden
  }

  let differenzMs = endZeitMs - startZeitMs;
  let differenzStunden = Math.floor(differenzMs / (1000 * 60 * 60));
  let differenzMinuten = Math.floor((differenzMs / (1000 * 60)) % 60);

  newWork.durationHour = differenzStunden;
  newWork.durarationMinute = differenzMinuten;

  console.log(
    "Differenz: " +
      differenzStunden +
      " Stunden und " +
      differenzMinuten +
      " Minuten"
  );
}

function getWhatWhere() {
  let whereWork = document.getElementById("whereWork").value;
  let doing = document.getElementById("doing").value;
  newWork.where = whereWork;
  newWork.what = doing;
  // showWorkingsPaid();
  // showWorkingsUnpaid();
}

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
  document.getElementById("newSaved").style.display = "flex";
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

function calcOpenMoney() {
  // Daten aus LocalStorage abrufen
  const storedData = localStorage.getItem("workData");
  // Überprüfen, ob Daten im LocalStorage vorhanden sind
  if (storedData) {
    // Daten in ein Array umwandeln
    const workData = JSON.parse(storedData);
    // Variable zum Speichern der Gesamtsumme von howManyMoney
    let openMoney = 0;
    // Schleife durchlaufen, um jeden Datensatz zu verarbeiten
    for (let i = 0; i < workData.length; i++) {
      const work = workData[i];
      // Addiere howManyMoney zum totalMoney
      if (work.isPaid == false) {
        openMoney += parseFloat(work.howManyMoney);
        // Datensatz in die Tabelle einfügen
        document.getElementById("openMoney").innerHTML = ``;
        document.getElementById("openMoney").innerHTML += /*html*/ `
      ${openMoney.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} €
    `;
      }
    }
    console.log("Bezahlt: ", openMoney);
  }
  // Zeige die Gesamtsumme von howManyMoney an
}
