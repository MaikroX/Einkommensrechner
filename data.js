function getData() {
  const storedData = localStorage.getItem("workData");
  return storedData;
}

function addToLocalStorage() {
  let existingData = JSON.parse(localStorage.getItem("workData")) || [];
  existingData.push(newWork);
  localStorage.setItem("workData", JSON.stringify(existingData));
}

