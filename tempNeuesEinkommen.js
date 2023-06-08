function showNewWorkInput() {
  document.getElementById("newModal").innerHTML = ``;

  document.getElementById("newModal").innerHTML += /*html*/ `
        <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog w-100">
          <div class="modal-content bg-new-Incoming">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Neues Einkommen   
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label"
                    >WANN</label
                  >
                  <input
                    id="getDate"
                    type="date"
                    class="form-control text-center"
                    placeholder="Wähle ein Datum"
                    oninput="validate()"
                  />
                </div>

                <div class="d-flex">
                  <div class="form-group d-flex w-100 justify-content-between"
                  >

                    <div class="d-flex flex-column justify-content-center">
                    <label for="recipient-name" class="col-form-label"
                      >Beginn</label
                    >
                    
                      <input class="timepicker-style" type="time" id="timePickerStart" name="timepickerStart" min="00:00" max="23:59" required>
                    </div>
                    

                    
                    <div class="d-flex flex-column justify-content-center">
                    <label for="recipient-name" class="col-form-label"
                      >Ende</label
                    >
                      <input class="timepicker-style" type="time" id="timePickerEnde" name="timepickerEnd" min="00:00" max="23:59" required>
                    </div>
                    
                    </div>
                  </div>               



                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">WO</label>
                  <input
                    id="whereWork"
                    placeholder="Zb. Firmenname"
                    type="text"
                    class="form-control"
                    oninput="validate()"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">WAS</label>
                  <input
                    id="doing"
                    placeholder="Zb. Bar, Dj, Grafikdesign"
                    type="text"
                    class="form-control"
                    oninput="validate()"
                  />
                </div>



                <div class="form-group">
                  <label for="recipient-name" class="col-form-label"
                    >VERDIENST <span><small>(in € Gesamt)</small></span></label
                  >
                  <input
                    placeholder="Zb. 95.20"
                    type="text"
                    class="form-control"
                    id="number-input"
                    oninput="validate()"
                  />
                  <p id="error-message" class="text-center"></p>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Schließen
              </button>

              <button
                id="saveButton"
                disabled
                type="button"
                class="btn btn-primary"
                onclick="save()"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    `;
  startTimerPlaceholder();
  endTimerPlaceholder();
  datePlaceholder();
}

function startTimerPlaceholder() {
  let timePicker = document.getElementById("timePickerStart");
  let currentTime = new Date();
  let hours = String(currentTime.getHours()).padStart(2, "0");
  let minutes = "00";
  let defaultValue = hours + ":" + minutes;
  timePicker.value = defaultValue;
}

function endTimerPlaceholder() {
  let timePicker = document.getElementById("timePickerEnde");
  let currentTime = new Date();
  let hours = String(currentTime.getHours() + 1).padStart(2, "0");
  let minutes = "00";
  let defaultValue = hours + ":" + minutes;
  timePicker.value = defaultValue;
}

function datePlaceholder() {
  let dateInput = document.getElementById("getDate");
  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let day = String(today.getDate()).padStart(2, "0");
  let defaultValue = year + "-" + month + "-" + day;
  dateInput.value = defaultValue;
}
