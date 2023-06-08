function toggleButtons(index, isVisible) {
  const storedData = getData();
  if (storedData) {
    const workData = JSON.parse(storedData);

    // ID des übergeordneten Elements
    const parentId = `myIncoming${index}`;
    // Buttons im übergeordneten Element
    let parentElement = document.getElementById(parentId);
    let btnBoxes = parentElement.querySelector(`#btnBox${index}`);
    let paidButton = parentElement.querySelector(`#paid${index}`);
    let deleteButton = parentElement.querySelector(`#delete${index}`);
    let unPaidButton = parentElement.querySelector(`#unPaid${index}`);
    // Buttons ein- oder ausblenden
    if (isVisible) {
      btnBoxes.classList.remove("toggleIndex");
      paidButton.classList.remove("toggleIndex");
      deleteButton.classList.remove("toggleIndex");
      unPaidButton.classList.remove("toggleIndex");
    } else {
      btnBoxes.classList.add("toggleIndex");
      paidButton.classList.add("toggleIndex");
      deleteButton.classList.add("toggleIndex");
      unPaidButton.classList.add("toggleIndex");
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
    let btnBoxes = parentElement.querySelector(`#btnBox${index}`);
    let paidButton = parentElement.querySelector(`#paid${index}`);
    let deleteButton = parentElement.querySelector(`#delete${index}`);
    let unPaidButton = parentElement.querySelector(`#unPaid${index}`);

    btnBoxes.classList.remove("toggleIndex");
    paidButton.classList.remove("toggleIndex");
    deleteButton.classList.remove("toggleIndex");
    unPaidButton.classList.remove("toggleIndex");
    workData[index].buttonThere = true;
    localStorage.setItem("workData", JSON.stringify(workData));
  }
}

function incomingPaid(index) {
  const storedData = getData();
  if (storedData) {
    const workData = JSON.parse(storedData);
    localStorage.setItem("workData", JSON.stringify(workData));

    const incomingState = `incomingState${index}`;
    let changeState = document.getElementById(incomingState);
    if (changeState && workData[index].isPaid == false) {
      changeState.classList.remove("incoming-border-right-openIncoming");
      changeState.classList.add("incoming-border-right-paidIncoming");
      workData[index].isPaid = true;
      localStorage.setItem("workData", JSON.stringify(workData));

      // Buttons ausblenden, wenn auf "Incoming Paid" geklickt wird
      setTimeout(() => {
        hideButtons(index);
      }, 5);
      if (window.location.pathname === "/meine-seite.html") {
        calcTotalMoney();
        calcgotMoney();
      }
      window.location.reload();
    }
  } else {
    console.log(`Element with ID '${parentId}' not found.`);
  }
}

function unPaid(index) {
  const storedData = getData();
  if (storedData) {
    const workData = JSON.parse(storedData);
    localStorage.setItem("workData", JSON.stringify(workData));

    const incomingState = `incomingState${index}`;
    let changeState = document.getElementById(incomingState);
    if (changeState && workData[index].isPaid === true) {
      changeState.classList.add("incoming-border-right-openIncoming");
      changeState.classList.remove("incoming-border-right-paidIncoming");
      workData[index].isPaid = false;
      localStorage.setItem("workData", JSON.stringify(workData));

      // Buttons ausblenden, wenn auf "Incoming Paid" geklickt wird
      setTimeout(() => {
        hideButtons(index);
      }, 5);
      calcTotalMoney();
      calcgotMoney();
      window.location.reload();
    }
  } else {
    console.log(`Element with ID '${parentId}' not found.`);
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
    let unPaidButton = parentElement.querySelector(`#unPaid${index}`);

    paidButton.classList.add("toggleIndex");
    deleteButton.classList.add("toggleIndex");
    unPaidButton.classList.add("toggleIndex");

    workData[index].buttonThere = false;
    localStorage.setItem("workData", JSON.stringify(workData));
  }
}

function checkPaidOnLoad(index) {
  const storedData = getData();
  if (storedData) {
    const workData = JSON.parse(storedData);
    localStorage.setItem("workData", JSON.stringify(workData));

    const incomingState = `incomingState${index}`;
    let changeState = document.getElementById(incomingState);
    if (changeState && workData[index].isPaid == true) {
      changeState.classList.add("incoming-border-right-openIncoming");
      changeState.classList.remove("incoming-border-right-paidIncoming");
      workData[index].isPaid = false;
      localStorage.setItem("workData", JSON.stringify(workData));

      // Buttons ausblenden, wenn auf "Incoming Paid" geklickt wird
      setTimeout(() => {
        hideButtons(index);
      }, 5);
    }
  }
  initOpenMoney();
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
    init();
    initOpenMoney();
    window.location.reload();
  }
}
