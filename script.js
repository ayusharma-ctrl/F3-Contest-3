var itemName = document.getElementById("itemName")
var deadline = document.getElementById("deadline")
var priority = document.getElementById("priority")
var addItemBtn = document.getElementById("addItemBtn")

var addSection2 = document.getElementById("addSection2")
var addSection3 = document.getElementById("addSection3")
var addSection4 = document.getElementById("addSection4")

let date = new Date().toLocaleDateString();
let idToday = 1
let idFuture = 1
let idCompleted = 1

var imageDelBla = document.createElement("img")
imageDelBla.src = "DeleteBlack.png"

var imageTick = `<img src="Tick.png" onclick="move()">`
var imageDelete = `<img src="Delete.png">`

function CreateObject(name, deadline, priority) {
    this.name = name;
    this.date = deadline;
    this.priority = priority;
    this.completed = false;
}


function addItem() {
    if (itemName.value !== '' && deadline.value !== '' && priority.value !== '') {
        const inputDate = dateConvert(deadline.value)
        if (inputDate == date) {
            todayTodo(itemName.value, inputDate, priority.value)
        }
        else if (inputDate > date || inputDate < date ) {
            futureTodo(itemName.value, inputDate, priority.value)
        }
    }

    itemName.value = ''
    deadline.value = ''
    priority.value = ''
}

addItemBtn.addEventListener('click', addItem)

function futureTodo(name, deadline, priority) {
    const todoEntry = new CreateObject(name, deadline, priority);
    const localArr = JSON.parse(localStorage.getItem('userFuture'))
    localArr.push(todoEntry)
    localStorage.setItem('userFuture', JSON.stringify(localArr))
    // const todoEntryData = JSON.parse(localStorage.getItem('user'))
    insertFutureTodo(todoEntry)
}

function insertFutureTodo(obj) {
    const div = document.createElement("div")
    div.innerHTML = `<span>${idFuture}.  ${obj.name}</span> <span>${obj.date}</span> <span>Priority:  ${obj.priority} </span> <span> ${imageTick} &nbsp &nbsp ${imageDelete} </span>`
    div.className = "container"
    div.id = "todayTodo"
    addSection3.append(div)
    if(obj.date < date){
        div.style.borderWidth = '4px'
        div.style.borderColor = "red";
    }
    idFuture++
}

function todayTodo(name, deadline, priority) {
    const todoEntry = new CreateObject(name, deadline, priority);
    const localArr = JSON.parse(localStorage.getItem('userToday'))
    localArr.push(todoEntry)
    localStorage.setItem('userToday', JSON.stringify(localArr))
    insertTodayTodo(todoEntry)
}

function insertTodayTodo(obj) {
    const div = document.createElement("div")
    div.innerHTML = `<span>${idToday}.  ${obj.name}</span> <span>${obj.date}</span> <span>Priority:  ${obj.priority} </span> <span> ${imageTick} &nbsp &nbsp ${imageDelete} </span>`
    div.className = "container"
    div.id = "todayTodo"
    addSection2.append(div)
    idToday++
}

function onReload() {
//today
    const userToday = JSON.parse(localStorage.getItem('userToday'))
    if (userToday == null) {
        const userToday = []
        const todoEntry = new CreateObject("Today's Task 1", date, "High");
        userToday.push(todoEntry)
        localStorage.setItem('userToday', JSON.stringify(userToday))
    }

    userToday.map((e)=>{
        insertTodayTodo(e)
    })

//future

    const userFuture = JSON.parse(localStorage.getItem('userFuture'))
    if (userFuture == null) {
        const userFuture = []
        const todoEntry = new CreateObject("Future's Task 1", "6/15/2023", "High");
        const todoEntry1 = new CreateObject("Learn DSA", "1/20/2023", "High");
        userFuture.push(todoEntry)
        userFuture.push(todoEntry1)
        localStorage.setItem('userFuture', JSON.stringify(userFuture))
    }

    userFuture.map((e) => {
        insertFutureTodo(e)
    })

//completed
    const userCompleted = JSON.parse(localStorage.getItem('userCompleted'))
    if (userCompleted == null) {
        const userCompleted = []
        const todoEntry = new CreateObject("Completed Task 1", "12/25/2022", "Medium");
        userCompleted.push(todoEntry)
        localStorage.setItem('userCompleted', JSON.stringify(userCompleted))
    }

    userCompleted.map((e) => {
        insertCompleted(e)
    })
}

document.addEventListener('DOMContentLoaded', onReload)




function insertCompleted(obj) {
    const div = document.createElement("div")
    div.innerHTML = `<span>${idCompleted}.  ${obj.name}</span> <span>${obj.date}</span> <span>Priority:  ${obj.priority} </span>`
    div.className = "container"
    div.id = "completedTodo"
    div.append(imageDelBla)
    addSection4.append(div)
    idCompleted++
}


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

    else if(pqr.length == 8){
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



function deleteCompleted(){
    // console.log(this.parentElement.children[0].innerText)
    const temp = this.parentElement.children[0].innerText
    const temp1 = temp.slice(3)
    const userCompleted = JSON.parse(localStorage.getItem('userCompleted'))
    userCompleted.splice(userCompleted.find((e)=>e.name === temp1),1)
    localStorage.setItem('userCompleted', JSON.stringify(userCompleted))
    this.parentElement.remove()
}

imageDelBla.addEventListener('click', deleteCompleted)

// function move(){
//     console.log("working")
//     console.log(this)

// }