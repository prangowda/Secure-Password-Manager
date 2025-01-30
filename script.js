document.addEventListener("DOMContentLoaded", loadPasswords);

function generatePassword() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("password").value = password;
}

function savePassword() {
    let site = document.getElementById("site").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (!site || !username || !password) {
        alert("Please fill all fields!");
        return;
    }

    let passwordData = { site, username, password };
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    passwords.push(passwordData);
    localStorage.setItem("passwords", JSON.stringify(passwords));

    document.getElementById("site").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    loadPasswords();
}

function loadPasswords() {
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    let table = document.getElementById("passwordTable");
    table.innerHTML = `
        <tr>
            <th>Site</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
        </tr>
    `;

    passwords.forEach((item, index) => {
        let row = table.insertRow();
        row.insertCell(0).innerText = item.site;
        row.insertCell(1).innerText = item.username;
        row.insertCell(2).innerHTML = `<input type="password" value="${item.password}" id="pass${index}" readonly>`;
        row.insertCell(3).innerHTML = `
            <button class="copy-btn" onclick="copyPassword(${index})">Copy</button>
            <button onclick="deletePassword(${index})">Delete</button>
        `;
    });
}

function copyPassword(index) {
    let passInput = document.getElementById(`pass${index}`);
    passInput.type = "text"; 
    passInput.select();
    document.execCommand("copy");
    passInput.type = "password"; 
    alert("Password copied!");
}

function deletePassword(index) {
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    passwords.splice(index, 1);
    localStorage.setItem("passwords", JSON.stringify(passwords));
    loadPasswords();
}
