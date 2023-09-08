/**
 * =========================================================================================================
 * 
 * @Author          Ellie Seraphine
 * @version         1.2.0
 * @project         Aquatics Inventory Management System
 * 
 * @file authorization.js 
 * creates view model for KnockoutJS' Model-View-View Model (MVVM) using ko.observable
 * KnockoutJS binds javascript and DOM elements based on the user's permission level and authorization.
 * 
 * =========================================================================================================
 */

function ViewModel() {

    self = this;
    self.permission = ko.observable();
    self.permissionDescription = ko.observable();
    self.result = ko.observable();
    self.user = ko.observable();
    self.errors = ko.observableArray([]);

    var permissionValue = document.querySelector("#permissionValue").innerHTML;


    if (permissionValue == 111) { 
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

}

var app = new ViewModel();
ko.applyBindings(app, document.getElementById("authorization"));
