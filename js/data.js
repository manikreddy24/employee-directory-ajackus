let employees = [];

if (localStorage.getItem("employees")) {
  employees = JSON.parse(localStorage.getItem("employees"));
} else {
  employees = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", department: "HR", role: "Manager" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", department: "Tech", role: "Developer" },
    { id: 3, firstName: "Max", lastName: "Taylor", email: "max@example.com", department: "Finance", role: "Analyst" }
  ];
  localStorage.setItem("employees", JSON.stringify(employees));
}
