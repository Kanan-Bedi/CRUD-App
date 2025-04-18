let records = [];
let editIndex = -1;

document.getElementById("recordForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !password) {
        alert("All fields are required!");
        return;
    }

    const data = { name, password };

    if (editIndex === -1) {
        records.push(data); // Create
    } else {
        records[editIndex] = data; // Update
        editIndex = -1;
    }

    this.reset();
    renderTable();
});

function renderTable() {
    const tbody = document.querySelector("#recordTable tbody");
    tbody.innerHTML = "";

    records.forEach((record, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
      <td>${record.name}</td>
      <td>${'*'.repeat(record.password.length)}</td>
      <td>
        <button onclick="editRecord(${index})">Edit</button>
        <button onclick="deleteRecord(${index})">Delete</button>
      </td>
    `;

        tbody.appendChild(row);
    });
}

function editRecord(index) {
    document.getElementById("name").value = records[index].name;
    document.getElementById("password").value = records[index].password;
    editIndex = index;
}

function deleteRecord(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        records.splice(index, 1);
        renderTable();
    }
}
