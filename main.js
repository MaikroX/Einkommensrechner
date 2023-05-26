let newWork = {
  ID: "",
  newWorkDate: "",
  where: "",
  what: "",
  timeWork: "",
  howManyMoney: "",
  buttonThere: false,
};

function init() {
  document.getElementById("workings").innerHTML = ``;
  showWorkings();
  calcTotalMoney();
}

function toggleButtons(index, isVisible) {
  const storedData = getData();
  if (storedData) {
    const workData = JSON.parse(storedData);

    // ID des übergeordneten Elements
    const parentId = `myIncoming${index}`;

    // Buttons im übergeordneten Element
    let parentElement = document.getElementById(parentId);
    let paidButton = parentElement.querySelector(`#paid${index}`);
    let deleteButton = parentElement.querySelector(`#delete${index}`);

    // Buttons ein- oder ausblenden
    if (isVisible) {
      paidButton.classList.remove("toggleIndex");
      deleteButton.classList.remove("toggleIndex");
    } else {
      paidButton.classList.add("toggleIndex");
      deleteButton.classList.add("toggleIndex");
    }
    workData[index].buttonThere = isVisible;
    localStorage.setItem("workData", JSON.stringify(workData));
  }
}

function showButtons(index) {
  const storedData = getData();
  if (storedData) {
    const workData = JSON.parse(storedData);

    // ID des übergeordneten Elements
    const parentId = `myIncoming${index}`;

    // Buttons im übergeordneten Element ausblenden
    let parentElement = document.getElementById(parentId);
    let paidButton = parentElement.querySelector(`#paid${index}`);
    let deleteButton = parentElement.querySelector(`#delete${index}`);

    paidButton.classList.remove("toggleIndex");
    deleteButton.classList.remove("toggleIndex");
    workData[index].buttonThere = true;
    localStorage.setItem("workData", JSON.stringify(workData));
  }
}

function hideButtons(index) {
  const storedData = getData();
  if (storedData) {
    const workData = JSON.parse(storedData);

    // ID des übergeordneten Elements
    const parentId = `myIncoming${index}`;

    // Buttons im übergeordneten Element ausblenden
    let parentElement = document.getElementById(parentId);
    let paidButton = parentElement.querySelector(`#paid${index}`);
    let deleteButton = parentElement.querySelector(`#delete${index}`);

    paidButton.classList.add("toggleIndex");
    deleteButton.classList.add("toggleIndex");
    workData[index].buttonThere = false;
    localStorage.setItem("workData", JSON.stringify(workData));
  }
}

function deleteIncoming(index) {
  // Daten aus dem LocalStorage abrufen
  const storedData = getData();
  if (storedData) {
    const workData = JSON.parse(storedData);

    // Eintrag an dem angegebenen Index entfernen
    workData.splice(index, 1);

    // Aktualisierte Daten im LocalStorage speichern
    localStorage.setItem("workData", JSON.stringify(workData));

    // Entfernen Sie das Element aus der Anzeige
    const parentId = `myIncoming${index}`;
    let deletedIncoming = document.getElementById(parentId);
    if (deletedIncoming) {
      deletedIncoming.style.display = "none";
    } else {
      console.log(`Element with ID '${parentId}' not found.`);
    }

    // Aktualisiere die Anzeige
    document.getElementById("workings").innerHTML = ``;
    showWorkings();
    calcTotalMoney();
  }
}

function incomingPaid(index) {
  const storedData = getData();
  if (storedData) {
    const workData = JSON.parse(storedData);
    localStorage.setItem("workData", JSON.stringify(workData));

    const incomingState = `incomingState${index}`;
    let changeState = document.getElementById(incomingState);
    if (changeState) {
      changeState.classList.remove("incoming-border-right-openIncoming");
      changeState.classList.add("incoming-border-right-paidIncoming");

      // Buttons ausblenden, wenn auf "Incoming Paid" geklickt wird
      setTimeout(() => {
        hideButtons(index);
      }, 5);
    }
  } else {
    console.log(`Element with ID '${parentId}' not found.`);
  }
}

function save() {
  getWhatWhere();
  getChoosenDate();
  validateEuroIncoming();
  addToLocalStorage();
  showAlertNewIncoming();
  document.getElementById("saveButton").disabled = true;
  document.getElementById("workings").innerHTML = ``;
  showWorkings();
  calcTotalMoney();
}

function getWhatWhere() {
  let whereWork = document.getElementById("whereWork").value;
  let doing = document.getElementById("doing").value;
  newWork.where = whereWork;
  newWork.what = doing;
  showWorkings();
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
