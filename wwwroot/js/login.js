/**
 * =========================================================================================================
 * 
 * @Author          Ellie Seraphine
 * @version         1.2.0
 * @project         Aquatics Inventory Management System
 * 
 * @file authorization.js 
 * Auth requirements are implemented with the help of the dependecy injection in Program.cs, 
 * UserService, and the User Controller. KnockoutJS receives one-way binding from the user. It is bound 
 * to the SQL Server Database and DOM elements based on input validation.
 * 
 * Note: Input validation is not implemented in this version.
 * 
 * =========================================================================================================
 */

function ViewModel() {
    var self = this;

    var tokenKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJuYmYiOjE2OTMyNTAwODksImV4cCI6MTY5Mzg1NDg4OSwiaWF0IjoxNjkzMjUwMDg5fQ.XEls9WP69PODOTt2ITZFDqtaLjKkX64damLQglwnOhI';

    self.result = ko.observable();
    self.user = ko.observable();

    self.registerFirstname = ko.observable();
    self.registerLastname = ko.observable();
    self.registerUsername = ko.observable();
    self.registerPassword = ko.observable();
    self.registerPermission = 1;

    self.loginUsername = ko.observable();
    self.loginPassword = ko.observable();
    self.errors = ko.observableArray([]);

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

    self.callApi = function () {
        self.result('');
        self.errors.removeAll();

        var token = sessionStorage.getItem(tokenKey);
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            type: 'GET',
            url: '/users',
            headers: headers
        }).done(function (data) {
            self.result(data);
        }).fail(showError);
    }

    self.register = function () {
        self.result('');
        self.errors.removeAll();

        var data = {
            firstname: self.registerFirstname(),
            lastname: self.registerLastname(),
            username: self.registerUsername(),
            password: self.registerPassword(),
            permission: 111
        };

        $.ajax({
            type: 'POST',
            url: '/users/register',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function (data) {
            self.result(data);
            console.log("User Registered!")
        }).fail(showError);
    }

    self.login = function () {
        self.result('');
        self.errors.removeAll();

        var loginData = {
            Username: self.loginUsername(),
            Password: self.loginPassword()
        };

        //AJAX call to authenticate user and change view to aquatics
        $.ajax({
            type: 'POST',
            url: '/users/authenticate',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(loginData),
        }).done(function (data) {
            self.user(data.userName);
            // Cache the access token in session storage.
            sessionStorage.setItem(tokenKey, data.access_token);
            console.log("Success! Login Token")
            window.location.assign('/aquatics')
        }).fail(showError);
    }


    self.logout = function () {
        // Log out from the cookie based logon.
        var token = sessionStorage.getItem(tokenKey);
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            type: 'POST',
            url: '/users/logout',
            headers: headers
        }).done(function (data) {
            // Successfully logged out. Delete the token.
            self.user('');
            sessionStorage.removeItem(tokenKey);
        }).fail(showError);
    }
}

var app = new ViewModel();
ko.applyBindings(app);