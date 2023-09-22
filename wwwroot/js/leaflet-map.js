var map = L.map('map').setView([47.60003135073598, -122.3507633454539], 8)


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


/**
 * Returns errors to the user from JavaScript Web Token (JWT) authorization helpers.
 *
 * @param {string} jqXHR HTML response.
 * @return {string} error / success message.
 */

function showError(jqXHR) {

    self.result(jqXHR.status + ': ' + jqXHR.statusText);

    var response = jqXHR.responseJSON;
    if (response) {
        if (response.Message) self.errors.push(response.Message);
        if (response.ModelState) {
            var modelState = response.ModelState;
            for (var prop in modelState) {
                if (modelState.hasOwnProperty(prop)) {
                    var msgArr = modelState[prop]; // expect array here
                    if (msgArr.length) {
                        for (var i = 0; i < msgArr.length; ++i) self.errors.push(msgArr[i]);
                    }
                }
            }
        }
        if (response.error) self.errors.push(response.error);
        if (response.error_description) self.errors.push(response.error_description);
    }
}

    console.log("test file");
/**
 * Leads Database to DOM only. Uses observable array to hold the JSON object used to update DOM.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
function loadMapCoords() {

    this.result = ''
    self.errors.removeAll();

    $.ajax({
        type: 'GET',
        url: '/sounds',
    }).done(function (data) {
        console.log(data);
        for (var x in data) {
           var plot = L.marker([data[x].coordinate_X, -data[x].coordinate_Y]).addTo(map);
           plot.addTo(map);
        }
    }).fail(showError);
};

loadMapCoords();