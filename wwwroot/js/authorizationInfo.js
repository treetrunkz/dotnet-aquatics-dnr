function ViewModel() {


    //think about taking in two parameters one for user the other for sound, then using
    //the data to cover all of the data needs of the whole page.

    //============= Authorization ================//
    self = this;
    self.permission = ko.observable();
    self.permissionDescription = ko.observable();
    self.result = ko.observable();
    self.user = ko.observable();
    self.errors = ko.observableArray([]);

    //JWT Authorization Token
    var tokenKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJuYmYiOjE2OTMyNTAwODksImV4cCI6MTY5Mzg1NDg4OSwiaWF0IjoxNjkzMjUwMDg5fQ.XEls9WP69PODOTt2ITZFDqtaLjKkX64damLQglwnOhI';

    var permissionValue = document.querySelector("#permissionValue").innerHTML;
    console.log(permissionValue);

    if (permissionValue == 111) { // Ignore values with no space character
        console.log("admin permission");
        self.permission("Administrator");
        self.permissionDescription("You have privelages required to create, update, or delete any database records.");
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

}

var app = new ViewModel();
ko.applyBindings(app, document.getElementById("authorization"));
