let currentPage = 1;
let pageSize = 10;

document.getElementById("pageSize").addEventListener("change", () => {
  pageSize = parseInt(document.getElementById("pageSize").value);
  currentPage = 1;
  filterAndRender();
});

document.getElementById("searchInput").addEventListener("input", () => {
  currentPage = 1;
  filterAndRender();
});

document.getElementById("departmentFilter").addEventListener("change", () => {
  currentPage = 1;
  filterAndRender();
});

document.getElementById("roleFilter").addEventListener("change", () => {
  currentPage = 1;
  filterAndRender();
});

function renderEmployees(data) {
  const container = document.getElementById("employeeList");
  container.innerHTML = "";

  data.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";

    // Store employee ID in a hidden attribute for edit use
    card.innerHTML = `
      <p class="emp-name"><strong>${emp.firstName} ${emp.lastName}</strong></p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;

    container.appendChild(card);
  });

  localStorage.setItem("employees", JSON.stringify(employees));
}


function filterAndRender() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const department = document.getElementById("departmentFilter").value;
  const role = document.getElementById("roleFilter").value;

  const filtered = employees.filter(emp => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(search) ||
      emp.lastName.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search);
    const matchesDept = department ? emp.department === department : true;
    const matchesRole = role ? emp.role === role : true;
    return matchesSearch && matchesDept && matchesRole;
  });

  const start = (currentPage - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);
  renderEmployees(paginated);

  const pageInfo = document.getElementById("pageInfo");
  if (pageInfo) {
    pageInfo.textContent = `Page ${currentPage} of ${Math.max(1, Math.ceil(filtered.length / pageSize))}`;
  }
}

function nextPage() {
  const totalFiltered = employees.filter(emp => {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const department = document.getElementById("departmentFilter").value;
    const role = document.getElementById("roleFilter").value;

    const matchesSearch =
      emp.firstName.toLowerCase().includes(search) ||
      emp.lastName.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search);
    const matchesDept = department ? emp.department === department : true;
    const matchesRole = role ? emp.role === role : true;
    return matchesSearch && matchesDept && matchesRole;
  });

  const totalPages = Math.ceil(totalFiltered.length / pageSize);
  if (currentPage < totalPages) {
    currentPage++;
    filterAndRender();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    filterAndRender();
  }
}

function openAddForm() {
  window.location.href = "add-edit.html";
}

function editEmployee(id) {
  localStorage.setItem("editId", id);
  window.location.href = "add-edit.html";
}

function deleteEmployee(id) {
  const index = employees.findIndex(e => e.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    filterAndRender();
  }
}

// Initial render
filterAndRender();

