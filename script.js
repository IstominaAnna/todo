const tasksList = document.getElementsByTagName('LI');
let state = 'all';
let counterNumber = 0;
let counterNumberHtml = document.getElementById('counterNumber')

let itemsArray = localStorage.getItem('items') ?
    JSON.parse(localStorage.getItem('items')) : []

const close = document.getElementsByClassName("close");
const list = document.querySelector('ul');


localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))

class Task {
    constructor(text, checked = false) {
        this.text = text
        this.cheсked = checked
    }


}

function createIl(task) {
    const li = document.createElement('li')
    const label = document.createElement('label')
    label.innerHTML = task.text
    li.append(label)
    list.append(li);

    const edit = document.createElement('input')
    edit.value = task.text
    edit.className = 'editing'
    li.append(edit)

    document.getElementById('taskInput').value = ""
    const span = document.createElement('span')
    const cross = document.createTextNode('\u00D7')
    span.className = 'close';

    li.append(span);
    span.append(cross);

    if (task.cheсked === true) {
        li.className = 'checked'
    } else if (state === 'completed') {
        li.style.display = 'none'
    }

    if (task.cheсked !== true) {
        counterNumber++
        counterNumberHtml.innerText = counterNumber.toString()
    }


}

Object.keys(tasksList).forEach((node) => {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.append(txt);


});


list.addEventListener('dblclick', function (ev) {

    if (ev.target.tagName === 'LI' || ev.target.tagName === 'LABEL') {

        let i = 0

        let edit = ev.target.children[1]
        let label = ev.target.children[0]

        edit.style.display = 'inline'
        label.style.display = 'none'
        ev.target.children[2].style.display = 'none'
        edit.focus()

        for (i; i < ev.target.parentElement.children.length; i++) {
            if (ev.target.parentElement.children[i] === ev.target)
                break
        }

        function editSave() {
            ev.target.children[2].style.display = ''
            label.innerText = edit.value
            itemsArray[i].text = edit.value
            label.style.display = ''

            edit.style.display = "none"

            localStorage.clear()
            localStorage.setItem('items', JSON.stringify(itemsArray))
        }

        edit.addEventListener('keydown' || 'blur', function (e) {
            if (e["keyCode"] === 13) {
                editSave()
            }
        })
        edit.addEventListener('blur', function (event) {
            editSave()
        });
    }
});


list.addEventListener('click', function (ev) {

    if (ev.target.tagName === 'LI' || ev.target.tagName === 'LABEL') {
        if (ev.target.tagName === 'LABEL') ev.target.parentElement.classList.toggle('checked');
        else ev.target.classList.toggle('checked');
        const lis = document.querySelectorAll('li')


        for (let i = 0; i < lis.length; i++) {
            if (lis[i] === ev.target) {
                if (itemsArray[i].cheсked === false) {
                    itemsArray[i].cheсked = true
                    counterNumber--
                } else {
                    itemsArray[i].cheсked = false
                    counterNumber++
                }
            }
        }
        if (state === 'active' || state === 'completed') {
            ev.target.style.display = 'none'
        }
    } else if (ev.target.className === 'close') {
        console.dir(ev.target)
        for (let i = 0; i < close.length; i++) {
            if (close[i] === ev.target) {
                itemsArray.splice(i, 1);
            }
        }
        if (ev.target.parentElement.className !== 'checked') {
            counterNumber--
        }
        ev.target.parentElement.remove()

    }
    counterNumberHtml.innerText = counterNumber.toString()
    localStorage.clear()
    localStorage.setItem('items', JSON.stringify(itemsArray))

}, false);


(function () {
    document.querySelector('input').addEventListener('keydown', function (e) {
        if (e["keyCode"] === 13) {
            if (this.value !== '') {
                e.preventDefault()
                let task = new Task(this.value)
                itemsArray.push(task)
                localStorage.setItem('items', JSON.stringify(itemsArray))

                createIl(task)
            }
        }
    });
})();

data.forEach(task => {
    createIl(task)
})

const active = document.getElementById('btnActive');
const completed = document.getElementById('btnCompleted');
const all = document.getElementById('btnAll');

const inactiveElements = document.getElementsByClassName('checked');


active.addEventListener('click', function (ev) {
    Object.keys(tasksList).forEach((task) => {
        tasksList[task].style.display = ''
    });
    for (let i = 0; i < inactiveElements.length; i++) {
        inactiveElements[i].style.display = 'none'
    }
    all.className = '';
    active.className = 'chosen';
    completed.className = '';
    state = 'active'

});
all.addEventListener('click', function (ev) {
    Object.keys(tasksList).forEach((task) => {
        tasksList[task].style.display = ''
    });
    all.className = 'chosen';
    active.className = '';
    completed.className = '';
    state = 'all'
});

completed.addEventListener('click', function (ev) {
    Object.keys(tasksList).forEach((task) => {
        tasksList[task].style.display = ''
    });
    Object.keys(tasksList).forEach((task) => {
        if (tasksList[task].className !== 'checked') {
            tasksList[task].style.display = 'none'
        }
    });
    all.className = '';
    active.className = '';
    completed.className = 'chosen';
    state = 'completed'
});

const clearCompleted = document.getElementById('buttonClear');

clearCompleted.addEventListener('click', function (ev) {


    for (let i = inactiveElements.length - 1; i >= 0; i--) {

        inactiveElements[i].remove()
    }

    for (let i = itemsArray.length - 1; i >= 0; i--) {

        if (itemsArray[i].cheсked === true) itemsArray.splice(i, 1)
    }

    localStorage.clear()
    localStorage.setItem('items', JSON.stringify(itemsArray))

});


