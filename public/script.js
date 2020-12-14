async function getToDoList(){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/tasks', requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body;
}

async function getSingleTask(id){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/tasks/' + id, requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error('Error!');
    }
    return body;
}

async function addTask(){
    let prioritySelect = document.getElementById('priority');
    let completedSelect = document.getElementById('completed');
    let t = {
        name: document.getElementById('name').value,
        assignedTo: document.getElementById('assignee').value,
        priority: prioritySelect.options[prioritySelect.selectedIndex].value,
        completed: completedSelect.options[completedSelect.selectedIndex].value
    }
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(t),
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/tasks', requestOptions);
    if (response.status != 200){
        throw Error('task not saved!');
    }
    window.location.href = 'index.html';
    return true;
}

async function deleteTask(el){
    let requestOptions = {
        method: 'DELETE', 
        headers: {'Content-Type': 'application/json'}
    }
    let deleteId = el.closest('.task').dataset.id;

    const response = await fetch('/tasks/' + deleteId, requestOptions);
    if (response.status != 204){
        throw Error('task not deleted');
    }
    window.location.href = 'index.html';
    return true;
}

async function updateTask(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    let prioritySelect = document.getElementById('priority');
    let completedSelect = document.getElementById('completed');
    let t = {
        name: document.getElementById('name').value,
        assignedTo: document.getElementById('assignee').value,
        priority: prioritySelect.options[prioritySelect.selectedIndex].value,
        completed: completedSelect.options[completedSelect.selectedIndex].value
    }
    let requestOptions = {
        method: 'PUT',
        body: JSON.stringify(t),
        headers: {'Content-Type': 'application/json'}
    }
    const response = await fetch('/tasks/' + id, requestOptions);
    if (response.status != 200){
        throw Error('task not saved!');
    }
    window.location.href = 'index.html';
    return true;
}