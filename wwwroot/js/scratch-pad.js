var map = L.map('map').setView([47.60003135073598, -122.3507633454539], 8)


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
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
 * Loads Map Coordinates to DOM only. Using ajax GET request, each coordinate is populated VIA data.
 *
 * @return function({data}) data iteratively plotted in leaflet Map.
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

            var myIcon = L.icon({
                iconUrl: '/img/drop-icon.svg',
                iconSize: [25, 75],
                iconAnchor: [13, 45]
            });

            var markerOptions = {
                bubblingMouseEvents: true,
                title: data[x].name,
                clickable: true
            }

            var plot = L.marker([data[x].coordinate_X, -data[x].coordinate_Y], { icon: myIcon }, markerOptions).addTo(map);
            plot.bindPopup(data[x].name + '<br>' + data[x].biome + '<br>' + data[x].coordinate_X + '&#176;' + '\n' + data[x].coordinate_Y + '&#176;');
            plot.addTo(map);
        }
    }).fail(showError);
    //var boundaries = new L.geoJson();
    //boundaries.addTo(map);
};

//L.geoJSON(myLines, {
//    style: myStyle
//}).addTo(map);



function loadGeoLayer() {
    var boundaryList = ['admiralty_inlet.json', 'central_puget_sound.json', 'east_straight_of_juan_de_fuca.json', 'hood_canal.json', 'san_juan_archipelago.json', 'south_puget_sound.json', 'strait_of_georgia.json', 'west_strait_of_juan_de_fuca.json', 'whidbey_basin.json'];

    console.log("Geo Layer Test");
    //var geoBoundaries = new L.geoJson(false, {
    //    style: function (feature) {
    //        console.log(feature);
    //        myStyle = {
    //            "color": feature.color,
    //            "weight": 2,
    //            "opacity": .6
    //        }
    //        return myStyle;
    //    }
    //});
    //geoBoundaries.addTo(map);

    boundaryList.forEach((x) => {

        console.log(x);

        $.ajax({
            datatype: "json",
            url: '/geojson/' + x,
            success: function (data) {
                $(data.features).each(function (key, data) {
                    var boundaries = new L.geoJson(false, {

                        style: function (feature) {
                            geoStyle = {
                                "color": feature.color,
                                "weight": 2,
                                "opacity": .6
                            }
                            return myStyle;
                        }
                    });
                    boundaries.addTo(map);
                })
            }
        });
    })
}
/*L.geoJSON('./geojson/hood_canal.geojson').addTo(map);*/


loadMapCoords();
loadGeoLayer();