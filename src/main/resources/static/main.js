const urlAllUser = "http://localhost:8080/admin/users/"
const urlUser = '/api/user'

async function getActiveUser() {
    let response = await fetch(urlUser);
    let activeUser = await response.json();
    getNavbar(activeUser);
}

window.addEventListener('DOMContentLoaded', getActiveUser);

function getNavbar(activeUser) {
    let userInformation = document.getElementById('activeUser')
    let roles = ''
    for (let role of activeUser.roles) {
        roles += role.name + ' '
    }
    userInformation.insertAdjacentHTML('afterbegin',
        `<b> ${activeUser.username} </b> with roles: <b>${roles} </b>`)
}

window.addEventListener('DOMContentLoaded', getUserTable);

async function getUserTable() {
    let response = await fetch(urlUser);
    let tableB = document.getElementById('userTable');
    let activeUser = await response.json();
    let roles = [];
    let userHTML = '';
    for (let role of activeUser.roles) {
        roles.push(' ' + role.name)
    }
    userHTML += `<tr>
    <td>${activeUser.id}</td>
    <td>${activeUser.name}</td>
    <td>${activeUser.lastName}</td>
    <td>${activeUser.username}</td>
    <td>${activeUser.age}</td>
    <td>${roles}</td>
    </tr>`
    tableB.innerHTML = userHTML;
}

window.addEventListener('DOMContentLoaded', getAllUserTable);

async function getAllUserTable() {
    let response = await fetch(urlAllUser);
    let tableB = document.getElementById('allUserTable');
    let allUser = await response.json();
    let allUserHTML = '';
    for (let user of allUser) {
        let roles = [];
        for (let role of user.roles) {
            roles.push(' ' + role.name)
        }
        allUserHTML += `<tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.lastName}</td>
      <td>${user.username}</td>
      <td>${user.age}</td>
      <td>${roles}</td>
      <td>
      <button class="btn btn-info" onclick="editUserForm(${user.id})">Edit</button>
      </td>
      <td>
      <button class="btn btn-danger" onclick="deleteUserForm(${user.id})">Delete</button>
      </td>
      </tr>`
        tableB.innerHTML = allUserHTML;
    }
}

const formNewUser = document.getElementById("newUser")

window.addEventListener('submit', createUser);

async function createUser(evt) {
    evt.preventDefault()
    let roles = []
    for (let i = 0; i < formNewUser.roleNew.options.length; i++) {
        if (formNewUser.roleNew.options[i].selected) {
            roles.push({
                id: formNewUser.roleNew.options[i].value
            })
        }
    }

    let createJSON = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: formNewUser.name.value,
            username: formNewUser.username.value,
            lastName: formNewUser.lastName.value,
            age: formNewUser.age.value,
            password: formNewUser.password.value,
            roles: roles
        })
    }

    await fetch(urlAllUser, createJSON).then(() => {
        getAllUserTable();
        $('#ex1-tab-1').click();
        formNewUser.reset();
    })

}

//DELETE USER

const delId = document.getElementById('idDeleteEd');

async function deleteUserForm(id) {
    const delName = document.getElementById('nameDeleteEd');
    const delLastName = document.getElementById('lastNameDeleteEd');
    const delUsername = document.getElementById('usernameDeleteEd');
    const delAge = document.getElementById('ageDeleteEd');
    const urlDelete = urlAllUser + id;
    let deleteForm = await fetch(urlDelete);
    $('#deleteForm').modal('show');
    await deleteForm.json().then(user => {
        delId.value = `${user.id}`;
        delName.value = `${user.name}`;
        delLastName.value = `${user.lastName}`;
        delUsername.value = `${user.username}`;
        delAge.value = `${user.age}`;
    })
}

async function deleteUser() {
    const urlDelete = urlAllUser + delId.value;
    let createJSON = {
        method: 'DELETE'
    }
    await fetch(urlDelete, createJSON).then(() => {
        $('#closeDeleteB').click();
        getAllUserTable();
    })
}

//EDIT USER

const editId = document.getElementById('idEd');

async function editUserForm(id) {
    const editName = document.getElementById('nameEd');
    const editUsername = document.getElementById('usernameEd');
    const editLastName = document.getElementById('lastNameEd');
    const editAge = document.getElementById('ageEd');
    const urlEdit = urlAllUser + id;
    let editForm = await fetch(urlEdit);
    $('#editForm').modal('show');
    await editForm.json().then(user => {
        editId.value = `${user.id}`;
        editName.value = `${user.name}`;
        editUsername.value = `${user.username}`;
        editLastName.value = `${user.lastName}`;
        editAge.value = `${user.age}`;
    })
}

async function editUser() {
    const urdEdit = urlAllUser;
    const editForm = document.getElementById('formEdit')
    let roles = []
    for (let i = 0; i < roleEd.options.length; i++) {
        if (roleEd.options[i].selected) {
            roles.push({
                id: roleEd.options[i].value
            })
        }
    }
    let createJSON = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: editForm.idEd.value,
            name: editForm.nameEd.value,
            username: editForm.usernameEd.value,
            lastName: editForm.lastNameEd.value,
            age: editForm.ageEd.value,
            password: editForm.passwordEd.value,
            roles: roles
        })
    }
    await fetch(urdEdit, createJSON).then(() => {
        $('#closeEditB').click();
        getAllUserTable();
    })
}
