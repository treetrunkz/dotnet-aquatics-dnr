/**
 * =========================================================================================================
 * 
 * @Author           Ellie Seraphine
 * @version          1.0.0
 * @project          Aquatics Inventory Management System
 * 
 * @file ajax-handler.js 
 * manages the loading of javascript files based on the view.
 * 
 * =========================================================================================================
 */

var self = this;

var num = document.querySelector("#permissionValue").innerHTML;

var selfId = 0;

isNewRecord = false;

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


self.errors = ko.observableArray([]);
self.result = ko.observable();

permissionInt = ko.observable(permissionValue);
self.sounds = ko.observableArray();
loadDB();

/**
 * Object function to facilitate DTO (Data Transfer Object) for the Sound model. DTO is not needed for loading of the database.
 *
 * @return {Object} DTO which matches the Sound model.
 */

function Sound(name, coordinate_X, coordinate_Y, width_m, depth_m, wildlife, biome, waterHealth, speed, currents, tides, invasiveSpecies, isResidential, isPublicLands, topography)
{
    return {
        permissionReq: 1,
        name: ko.observable(name),

        coordinate_X: ko.observable(coordinate_X),
        coordinate_Y: ko.observable(coordinate_Y),
        width_m: ko.observable(width_m),
        depth_m: ko.observable(depth_m),
        wildlife: ko.observable(wildlife),

        biome: ko.observable(biome),
        waterHealth: ko.observable(waterHealth),
        speed: ko.observable(speed),
        currents: ko.observable(currents),
        tides: ko.observable(tides),

        invasiveSpecies: ko.observable(invasiveSpecies),
        isResidential: ko.observable(isResidential),
        isPublicLands: ko.observable(isPublicLands),
        topography: ko.observable(topography)
    }
}

/**
 * Leads Database to DOM only. Uses observable array to hold the JSON object used to update DOM.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
function loadDB() {
    this.result = ''
    self.errors.removeAll();

    $.ajax({
        type: 'GET',
        url: '/sounds',
    }).done(function (data) {
        console.log(data);
        selfid = data.length + 1;
        console.log(selfid)
        sounds(data);
    }).fail(showError);
};

/**
 * KnockoutJS ViewModel containing different views. Currently, using one view.
 */
var ViewModel = {
    editView: ko.observable("")
};

/**
 * addRecord helper function to add a record to the database and define it's a new record.
 */
ViewModel.addRecord = function () {
    var setSound = new Sound("", 0, 0, 0, 0, "", "", "", 0, "", "", "", false, false, "");
    sounds.push(setSound);
    isNewRecord = true;
};

/**
 * Delete a record, refresh the ViewModel keeping the view up to date..
 *
 * @param {number} d ID to use the UserServices to delete the record.
 * @return {void} updated data view, with deleted record removed.
 * verify post comes back from the user with authorization. generate random string
 * randomly gen string for user verification for each page loaded.
 */
function deleteRecord (d) {
    $.ajax({
        type: "DELETE",
        url: "sounds/" + d
    }).done(function (data) {
        console.log("Record Deleted Successfully " + data.status);
        ViewModel.reset();
        loadDB();
    }).fail(function (err) {
        console.log(err.status);
        ViewModel.reset();
    });
};

/**
 * Edits a record, refresh the ViewModel keeping the view up to date..
 * This function is not currently used.
 * 
 * @return {void} updated data view, with compatible input.
 */
ViewModel.editRecord = function (d) {
    var editSound = SoundService.GetById(d);
    var Edit = {};
    Edit.PermissionReq = 1;
    Edit.Name = editSound.Name;
    Edit.Coordinate_X = editSound.Coordinate_X;
    Edit.Coordinate_Y = editSound.Coordinate_Y;
    Edit.Width_m = editSound.Width_m;
    Edit.Depth_m = editSound.Depth_m;
    Edit.Wildlife = editSound.Wildlife;
    Edit.Biome = editSound.Biome;
    Edit.WaterHealth = editSound.WaterHealth;
    Edit.Speed = editSound.Speed;
    Edit.Currents = editSound.Currents;
    Edit.Tides = editSound.Tides;
    Edit.InvasiveSpecies = editSound.InvasiveSpecies;
    Edit.IsResidential = editSound.IsResidential;
    Edit.IsPublicLands = editSound.IsPublicLands;
    Edit.Topography = editSound.Topography;
};

/**
 * Saves record, converting "true" and "false" strings to booleans
 * Depending on @isNewRecord either POST or PUT is used.(Add/Edit)
 *
 * @return {void} New record.
 */
ViewModel.saveRecord = function (d) {
    var Sou = {};
    Sou.PermissionReq = 1;
    Sou.Name = d[0].value;
    Sou.Coordinate_X = d[1].value;
    Sou.Coordinate_Y = d[2].value;
    Sou.Width_m = d[3].value;
    Sou.Depth_m = d[4].value;
    Sou.Wildlife = d[5].value;
    Sou.Biome = d[6].value;
    Sou.WaterHealth = d[7].value;
    Sou.Speed = d[8].value;
    Sou.Currents = d[9].value;
    Sou.Tides = d[10].value;
    Sou.InvasiveSpecies = d[11].value;
    Sou.IsResidential = d[12].value;
    Sou.IsPublicLands = d[13].value;
    Sou.Topography = d[14].value;

    var res = JSON.stringify(Sou).replace(/:[ ]*"(true|false)"/g, ':$1');

    if (isNewRecord === false) {
        $.ajax({
            async: false,
            type: "PUT",
            url: "sounds/update/" + Sou.Id,
            contentType: 'application/json; charset=utf-8',
            data: JSON.parse(res)
        }).done(function (data) {
            console.log("Record Updated Successfully " + data.status);
            ViewModel.reset();
        }).fail(function (err) {
            console.log("Error Occured, Please Reload the Page and Try Again " + err.status);
            ViewModel.reset();
        });
    };

    if (isNewRecord === true) {
        isNewRecord = false;

        tal = JSON.parse(res);

        $.ajax({
            type: "POST",
            url: "sounds/add",
            contentType: 'application/json; charset=utf-8',
            data: res
        }).done(function (data) {
            console.log("Record Added Successfully " + data.status);
            ViewModel.reset();
            loadDB();
        }).fail(function (err) {
            console.log("Error Occured, Please Reload the Page and Try Again " + err.status);
            ViewModel.reset();
        });
    };
};

ViewModel.reset = function (t) {
    this.editView("");
};

ko.applyBindings(ViewModel, document.getElementById("databaseManagement")); 