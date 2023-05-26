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
          <div class="modal-content bg-dark">
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
                    class="form-control"
                    placeholder="Wähle ein Datum"
                    oninput="validate()"
                  />
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

                <div
                  class="form-group d-flex justify-content-between align-items-center"
                >
                  <label for="recipient-name" class="col-form-label"
                    >DAUER
                    <small class="text-secondary">in Stunden (BETA)</small></label
                  >

                  <button
                  disabled
                    class="btn btn-secondary dropdown-toggle mt-3 mb-3 workTime-btn"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <div id="chooseHours" class="dropdown-menu overflow-auto">
                    <a class="dropdown-item" href="#"
                      >Keine Angabe</a
                    >
                    <a class="dropdown-item" href="#">0</a>
                    <a class="dropdown-item" href="#">0.5</a>
                    <a class="dropdown-item" href="#">1</a>
                    <a class="dropdown-item" href="#">1.5</a>
                    <a class="dropdown-item" href="#">2</a>
                    <a class="dropdown-item" href="#">2.5</a>
                    <a class="dropdown-item" href="#">3</a>
                    <a class="dropdown-item" href="#">3.5</a>
                    <a class="dropdown-item" href="#">4</a>
                    <a class="dropdown-item" href="#">4.5</a>
                    <a class="dropdown-item" href="#">5</a>
                    <a class="dropdown-item" href="#">5.5</a>
                    <a class="dropdown-item" href="#">6</a>
                    <a class="dropdown-item" href="#">6.5</a>
                    <a class="dropdown-item" href="#">7</a>
                    <a class="dropdown-item" href="#">7.5</a>
                    <a class="dropdown-item" href="#">8</a>
                    <a class="dropdown-item" href="#">8.5</a>
                    <a class="dropdown-item" href="#">9</a>
                    <a class="dropdown-item" href="#">9.5</a>
                    <a class="dropdown-item" href="#">10</a>
                    <a class="dropdown-item" href="#">10.5</a>
                    <a class="dropdown-item" href="#">11</a>
                    <a class="dropdown-item" href="#">11.5</a>
                    <a class="dropdown-item" href="#">12</a>
                    <a class="dropdown-item" href="#">12.5</a>
                    <a class="dropdown-item" href="#">13</a>
                    <a class="dropdown-item" href="#">13.5</a>
                    <a class="dropdown-item" href="#">14</a>
                    <a class="dropdown-item" href="#">14.5</a>
                    <a class="dropdown-item" href="#">15</a>
                    <a class="dropdown-item" href="#">15.5</a>
                    <a class="dropdown-item" href="#">16</a>
                  </div>
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
    `;
}
