const form = document.getElementById("employeeForm");
const editId = localStorage.getItem("editId");
if (editId) {
  const emp = employees.find(e => e.id == editId);
  if (emp) {
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;
  }
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const newEmp = {
    id: editId ? parseInt(editId) : Date.now(),
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    department: document.getElementById("department").value.trim(),
    role: document.getElementById("role").value.trim(),
  };

  if (editId) {
    const index = employees.findIndex(e => e.id == editId);
    employees[index] = newEmp;
    localStorage.removeItem("editId");
  } else {
    employees.push(newEmp);
  }

  localStorage.setItem("employees", JSON.stringify(employees)); // 👈 This line is crucial
  window.location.href = "index.html";
});


function cancel() {
  localStorage.removeItem("editId");
  window.location.href = "index.html";
}
