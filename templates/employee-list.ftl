<#-- employee-list.ftl -->

<div class="employee-grid">
  <#list employees as emp>
    <div class="employee-card">
      <p><strong>Employee ID:</strong> ${emp.id}</p>
      <p><strong>First Name:</strong> ${emp.firstName}</p>
      <p><strong>Last Name:</strong> ${emp.lastName}</p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    </div>
  </#list>
</div>

