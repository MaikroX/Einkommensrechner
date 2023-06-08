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

function initOpenMoney() {
  document.getElementById("overviewOpenWorkings").innerHTML = ``;
  showWorkingsUnpaid();
  calcTotalUnpaidHoursAndMinutes();
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
    endZeitMs += 24 * 60 * 60 * 1000;
  }

  let differenzMs = endZeitMs - startZeitMs;
  let differenzStunden = Math.floor(differenzMs / (1000 * 60 * 60));
  let differenzMinuten = Math.floor((differenzMs / (1000 * 60)) % 60);

  newWork.durationHour = differenzStunden;
  newWork.durarationMinute = differenzMinuten;
}

function getWhatWhere() {
  let whereWork = document.getElementById("whereWork").value;
  let doing = document.getElementById("doing").value;
  newWork.where = whereWork;
  newWork.what = doing;
}

function getChoosenDate() {
  let getWorkDate = document.getElementById("getDate").value;
  const date = new Date(getWorkDate);
  const tag = date.getDate();
  const monat = date.getMonth() + 1;
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
  const storedData = localStorage.getItem("workData");
  if (storedData) {
    const workData = JSON.parse(storedData);
    let totalMoney = 0;
    for (let i = 0; i < workData.length; i++) {
      const work = workData[i];
      totalMoney += parseFloat(work.howManyMoney);
    }
    document.getElementById("totalMoney").innerHTML = ``;
    document.getElementById("totalMoney").innerHTML += /*html*/ `
    ${totalMoney.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} €
  `;
  }
}

function calcgotMoney() {
  const storedData = localStorage.getItem("workData");
  if (storedData) {
    const workData = JSON.parse(storedData);
    let gotMoney = 0;
    for (let i = 0; i < workData.length; i++) {
      const work = workData[i];
      if (work.isPaid == true) {
        gotMoney += parseFloat(work.howManyMoney);
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
}

function calcOpenMoney() {
  const storedData = localStorage.getItem("workData");
  if (storedData) {
    const workData = JSON.parse(storedData);
    let openMoney = 0;
    for (let i = 0; i < workData.length; i++) {
      const work = workData[i];
      if (work.isPaid == false) {
        openMoney += parseFloat(work.howManyMoney);
        document.getElementById("openMoney").innerHTML = ``;
        document.getElementById("openMoney").innerHTML += /*html*/ `
      ${openMoney.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} €
    `;
      }
    }
  }
}

function calcTotalUnpaidHoursAndMinutes() {
  const storedData = localStorage.getItem("workData");
  if (storedData) {
    const workData = JSON.parse(storedData);
    let totalHours = 0;
    let totalMinutes = 0;
    for (let i = 0; i < workData.length; i++) {
      const work = workData[i];
      if (work.isPaid == false) {
        totalHours += parseFloat(work.durationHour);
        totalMinutes += parseFloat(work.durarationMinute);
      }
    }

    // Umwandlung der Minuten in Stunden
    let additionalHoursFromMinutes = Math.floor(totalMinutes / 60);
    let remainingMinutes = totalMinutes % 60;

    totalHours += additionalHoursFromMinutes;

    console.log("Gesamt unbezahlte Stunden: ", totalHours);
    console.log("Gesamt unbezahlte Minuten: ", remainingMinutes);
    document.getElementById("openHours").innerHTML = "";
    document.getElementById(
      "openHours"
    ).innerHTML += `${totalHours}h ${remainingMinutes}min`;
  }
}

// Sortierung nach Datum
function sortWorkDataByDate() {
  const storedData = localStorage.getItem("workData");
  if (storedData) {
    const workData = JSON.parse(storedData);
    function compareDates(a, b) {
      const datePartsA = a.newWorkDate.split(".");
      const datePartsB = b.newWorkDate.split(".");
      const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
      const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
      return dateA - dateB;
    }
    workData.sort(compareDates);
    localStorage.setItem("workData", JSON.stringify(workData));
  }
}

function sortByDateOnClick() {
  sortWorkDataByDate();
  init();
}

// Sortierung nach Name
function sortWorkDataByName() {
  const storedData = localStorage.getItem("workData");
  if (storedData) {
    const workData = JSON.parse(storedData);
    function compareNames(a, b) {
      if (a.where < b.where) {
        return 1;
      }
      if (a.where > b.where) {
        return -1;
      }
      return 0;
    }
    workData.sort(compareNames);
    localStorage.setItem("workData", JSON.stringify(workData));
  }
}

function sortByNameOnClick() {
  sortWorkDataByName();
  init();
}
