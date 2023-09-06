var self = this;

//S1:Boolean to check wheather the operation is for Edit and New Record
var IsNewRecord = false;
self.Employees = ko.observableArray([]);
loadEmployees();

//S2:Method to Load all Employees by making call to WEB API GET method
function loadEmployees() {
    $.ajax({
        type: "GET",
        url: "api/EmployeeInfoAPI"
    }).done(function (data) {
        alert("Success");
        self.Employees(data);
    }).fail(function (err) {
        alert(err.status + " <--------------->");
    });
};
alert("Loading Data");

//S3:The Employee Object
function Employee(eno, ename, dname, desig, sal) {
    return {
        EmpNo: ko.observable(eno),
        EmpName: ko.observable(ename),
        DeptName: ko.observable(dname),
        Designation: ko.observable(desig),
        Salary: ko.observable(sal)
    }
};

//S4:The ViewModel where the Templates are initialized
var EmpViewModel = {
    readonlyTemplate: ko.observable("readonlyTemplate"),
    editTemplate: ko.observable()
};

//S5:Method to decide the Current Template (readonlyTemplate or editTemplate)
EmpViewModel.currentTemplate = function (tmpl) {
    return tmpl === this.editTemplate() ? 'editTemplate' :
        this.readonlyTemplate();
}.bind(EmpViewModel);

//S6:Method to create a new Blank entry When the Add New Record button is clicked
EmpViewModel.addnewRecord = function () {
    alert("Add Called");
    self.Employees.push(new Employee(0, "", "", "", 0.0));
    IsNewRecord = true; //Set the Check for the New Record
};

//S7:Method to Save the Record (This is used for Edit and Add New Record)
EmpViewModel.saveEmployee = function (d) {
    var Emp = {};
    Emp.EmpNo = d.EmpNo;
    Emp.EmpName = d.EmpName;
    Emp.DeptName = d.DeptName;
    Emp.Designation = d.Designation;
    Emp.Salary = d.Salary;

    //Edit the Record
    if (IsNewRecord === false) {
        $.ajax({
            type: "PUT",
            url: "api/EmployeeInfoAPI/" + Emp.EmpNo,
            data: Emp
        }).done(function (data) {
            alert("Record Updated Successfully " + data.status);
            EmpViewModel.reset();
        }).fail(function (err) {
            alert("Error Occured, Please Reload the Page and Try Again " + err.status);
            EmpViewModel.reset();
        });
    }

    //The New Record
    if (IsNewRecord === true) {
        IsNewRecord = false;
        $.ajax({
            type: "POST",
            url: "api/EmployeeInfoAPI",
            data: Emp
        }).done(function (data) {
            alert("Record Added Successfully " + data.status);
            EmpViewModel.reset();
            loadEmployees();
        }).fail(function (err) {
            alert("Error Occures, Please Reload the Page and Try Again " + err.status);
            EmpViewModel.reset();
        });
    }data.return("nothing");
}
