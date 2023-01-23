var itemName = document.getElementById("itemName")
var deadline = document.getElementById("deadline")
var priority = document.getElementById("priority")
var addItemBtn = document.getElementById("addItemBtn")

var addSection2 = document.getElementById("addSection2")
var addSection3 = document.getElementById("addSection3")
var addSection4 = document.getElementById("addSection4")

let date = new Date().toLocaleDateString(); // to get it in this format -> 1/24/2023
//ID's to display date in different-different sections
let idToday = 1
let idFuture = 1
let idCompleted = 1

//constructor function to create objects
function CreateObject(name, deadline, priority) {
    this.name = name;
    this.date = deadline;
    this.priority = priority;
    this.completed = false;
}

//add button
function addItem() {
    if (itemName.value !== '' && deadline.value !== '' && priority.value !== '') {
        const inputDate = dateConvert(deadline.value)
        if (inputDate == date) {
            todayTodo(itemName.value, inputDate, priority.value)
        }
        else if (inputDate > date || inputDate < date) {
            futureTodo(itemName.value, inputDate, priority.value)
        }
    }

    itemName.value = ''
    deadline.value = ''
    priority.value = ''
}

addItemBtn.addEventListener('click', addItem)

//creating object to insert in array/today section using User Input
function todayTodo(name, deadline, priority) {
    const todoEntry = new CreateObject(name, deadline, priority);
    const userToday = JSON.parse(localStorage.getItem('userToday')) || []
    userToday.push(todoEntry)
    localStorage.setItem('userToday', JSON.stringify(userToday))
    insertTodayTodo(todoEntry)
}
//insert in section 2
function insertTodayTodo(obj) {
    const div = document.createElement("div")
    div.innerHTML = `<span>${idToday}.  ${obj.name} </span> <span>${obj.date}</span> <span>Priority:  ${obj.priority} </span> <div> <button class= "btn2" type="submit"> <img src="Tick.png" onclick="moveToday(${idToday})"> </button> &nbsp &nbsp <button class= "btn2" type="submit"> <img src="Delete.png" onclick="removeToday(${idToday})"> </button> </div>`
    div.className = "container"
    div.id = "todayTodo"
    addSection2.append(div)
    idToday++
}
//creating object to insert in array/future section using User Input
function futureTodo(name, deadline, priority) {
    const todoEntry = new CreateObject(name, deadline, priority);
    const userFuture = JSON.parse(localStorage.getItem('userFuture')) || []
    userFuture.push(todoEntry)
    localStorage.setItem('userFuture', JSON.stringify(userFuture))
    // const todoEntryData = JSON.parse(localStorage.getItem('user'))
    insertFutureTodo(todoEntry)
}
//insert in section 3
function insertFutureTodo(obj) {
    const div = document.createElement("div")
    div.innerHTML = `<span>${idFuture}.  ${obj.name} </span> <span>${obj.date}</span> <span>Priority:  ${obj.priority} </span> <div> <button class= "btn2" type="submit"> <img src="Tick.png" onclick="moveFuture(${idFuture})"> </button> &nbsp &nbsp <button class= "btn2" type="submit"> <img src="Delete.png" onclick="removeFuture(${idFuture})"> </button> </div>`
    div.className = "container"
    div.id = "todayTodo"
    addSection3.append(div)
    if (obj.date < date) {
        div.style.borderWidth = '4px'
        div.style.borderColor = "red";
    }
    idFuture++
}
//insert in section 4
function insertCompleted(obj) {
    const div = document.createElement("div")
    div.innerHTML = `<span>${idCompleted}.  ${obj.name} </span> <span>${obj.date}</span> <span>Priority:  ${obj.priority} </span> <div> <button id="btn1" type="submit"> <img src="DeleteBlack.png" onclick="removeCompleted(${idCompleted})"> </div>`
    div.className = "container"
    div.id = "completedTodo"
    addSection4.append(div)
    idCompleted++
}

//page reload
function onReload() {
    addSection2.innerHTML = ''
    addSection3.innerHTML = ''
    addSection4.innerHTML = ''
    //today
    const userToday = JSON.parse(localStorage.getItem('userToday')) || []
    userToday.map((e) => {
        insertTodayTodo(e)
    })

    //future
    const userFuture = JSON.parse(localStorage.getItem('userFuture')) || []
    userFuture.map((e) => {
        insertFutureTodo(e)
    })

    //completed
    const userCompleted = JSON.parse(localStorage.getItem('userCompleted')) || []
    userCompleted.map((e) => {
        insertCompleted(e)
    })
}

document.addEventListener('DOMContentLoaded', onReload)


function moveToday(id){
    const userToday = JSON.parse(localStorage.getItem('userToday')) || []
    const userCompleted = JSON.parse(localStorage.getItem('userCompleted')) || []
    const collect = userToday.splice(id-1,1)
    userCompleted.push(collect[0])
    localStorage.setItem('userToday', JSON.stringify(userToday))
    localStorage.setItem('userCompleted', JSON.stringify(userCompleted))
    window.location.reload();
}

function moveFuture(id){
    const userFuture = JSON.parse(localStorage.getItem('userFuture')) || []
    const userCompleted = JSON.parse(localStorage.getItem('userCompleted')) || []
    const collect = userFuture.splice(id-1,1)
    userCompleted.push(collect[0])
    localStorage.setItem('userFuture', JSON.stringify(userFuture))
    localStorage.setItem('userCompleted', JSON.stringify(userCompleted))
    window.location.reload();
}

function removeToday(id){
    const userToday = JSON.parse(localStorage.getItem('userToday'))
    userToday.splice(id-1,1)
    localStorage.setItem('userToday', JSON.stringify(userToday))
    window.location.reload();
}

function removeFuture(id){
    const userFuture = JSON.parse(localStorage.getItem('userFuture'))
    userFuture.splice(id-1,1)
    localStorage.setItem('userFuture', JSON.stringify(userFuture))
    window.location.reload();
}

function removeCompleted(id){
    const userCompleted = JSON.parse(localStorage.getItem('userCompleted'))
    userCompleted.splice(id-1,1)
    localStorage.setItem('userCompleted', JSON.stringify(userCompleted))
    window.location.reload();
}
// converting date
function dateConvert(s) {
    let pqr = s.replace("-01", "-1")
    pqr = pqr.replace("-02", "-2")
    pqr = pqr.replace("-03", "-3")
    pqr = pqr.replace("-04", "-4")
    pqr = pqr.replace("-05", "-5")
    pqr = pqr.replace("-06", "-6")
    pqr = pqr.replace("-07", "-7")
    pqr = pqr.replace("-08", "-8")
    pqr = pqr.replace("-09", "-9")
    if (pqr.length == 9 && pqr.charAt(6) == '-') {
        const y = pqr.substring(0, 4)
        const m = pqr.substring(5, 6)
        const d = pqr.substring(7, 9)
        return m + "/" + d + "/" + y
    }
    else if (pqr.length == 9 && pqr.charAt(7) == '-') {
        const y = pqr.substring(0, 4)
        const m = pqr.substring(5, 7)
        const d = pqr.substring(8, 9)
        return m + "/" + d + "/" + y
    }
    else if (pqr.length == 8) {
        const y = pqr.substring(0, 4)
        const m = pqr.substring(5, 6)
        const d = pqr.substring(7, 8)
        return m + "/" + d + "/" + y
    }
    else {
        const y = pqr.substring(0, 4)
        const m = pqr.substring(5, 7)
        const d = pqr.substring(8, 10)
        return m + "/" + d + "/" + y
    }
}