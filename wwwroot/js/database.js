function ViewModel() {

    //Table Permission Values
    self = this;
    self.permission = ko.observable();
    self.permissionDescription = ko.observable();

    //JWT Authorization Token
    var tokenKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJuYmYiOjE2OTMyNTAwODksImV4cCI6MTY5Mzg1NDg4OSwiaWF0IjoxNjkzMjUwMDg5fQ.XEls9WP69PODOTt2ITZFDqtaLjKkX64damLQglwnOhI';

    //AQ Database Schema To Populate Table
    self.result = ko.observable();
    self.user = ko.observable();

    self.dbId = ko.observable();
    self.dbPermissionReq = ko.observable();
    self.dbName = ko.observable();

    self.dbCoordinateX = ko.observable();
    self.dbCoordinateY = ko.observable();
    self.dbWidthM = ko.observable();
    self.dbDepthM = ko.observable();
    self.dbWildlife = ko.observable();

    self.dbBiome = ko.observable();
    self.dbWaterHealth = ko.observable();
    self.dbSpeed = ko.observable();
    self.dbCurrents = ko.observable();
    self.dbTides = ko.observable();

    self.dbInvasiveSpecies = ko.observable();
    self.dbIsResidential = ko.observable();
    self.dbIsPublicLands = ko.observable();
    self.dbTopography = ko.observable();
    self.errors = ko.observableArray([]);

    var permissionValue = document.querySelector("#permissionValue").innerHTML;
    console.log(permissionValue);

    if (permissionValue == 111) { // Ignore values with no space character
        console.log("admin permission");
       self.permission("Administrator"); // Update "firstName"
       self.permissionDescription("You have privelages required to create, update, or delete any database records."); // Update "lastName"
   }
    if (permissionValue == 1) {
        console.log("guest permission");
       self.permission("Guest");
       self.permissionDescription("You are a guest you may only view the data tables.");
   }
    if (permissionValue == 0) {
        console.log("no permission");
       self.permission("No Permissions");
       self.permissionDescription("You have no permissions and may not view the data.");
   }


    self.callApi = function () {
        self.result('');
        self.errors.removeAll();

        var token = sessionStorage.getItem(tokenKey);
        var headers = {};

        var data = {
            id: self.dbId,
            permissionReq: self.dbPermissionReq,
            name: self.dbName,
            coordinateX: self.dbCoordinateX,
            coordinateY: self.dbCoordinateY,
            widthM: self.dbWidthM,
            depthM: self.dbDepthM,
            wildlife: self.dbWildlife,
            biome: self.dbBiome,
            waterHealth: self.dbWaterHealth,
            speed: self.dbSpeed,
            currents: self.dbCurrents,
            tides: self.dbTides,
            invasiveSpecies: self.dbInvasiveSpecies,
            isResidential: self.dbIsResidential,
            isPublicLands: self.dbIsPublicLands,
            topography: self.dbTopography
        }

        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            type: 'GET',
            url: '/sounds/',
            headers: headers,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function (data) {
            self.result(data);
            self.result("Table Loaded!");
        }).fail(showError);
    }

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

    //Add Record Functionality
    self.addRecord = function () {
        self.result('');
        self.errors.removeAll();

        var data = {
            id: self.dbId,
            permissionReq: self.dbPermissionReq,
            name: self.dbName,
            coordinateX: self.dbCoordinateX,
            coordinateY: self.dbCoordinateY,
            widthM: self.dbWidthM,
            depthM: self.dbDepthM,
            wildlife: self.dbWildlife,
            biome: self.dbBiome,
            waterHealth: self.dbWaterHealth,
            speed: self.dbSpeed,
            currents: self.dbCurrents,
            tides: self.dbTides,
            invasiveSpecies: self.dbInvasiveSpecies,
            isResidential: self.dbIsResidential,
            isPublicLands: self.dbIsPublicLands,
            topography: self.dbTopography
        }
        $.ajax({
            type: 'POST',
            url: '/sounds/add',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function (data) {
            self.result(data);
            self.result("Done!");
            console.log("User Registered!")
            console.log(data);
        }).fail(showError);
    }

}
var app = new ViewModel();
ko.applyBindings(app);