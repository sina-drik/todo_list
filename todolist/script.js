const todoinput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filtertodo = document.querySelector('.filter-todo');

todobutton.addEventListener('click', addtodo);
todolist.addEventListener('click', completeORremoveitem);
filtertodo.addEventListener('click', filterTasks);
document.addEventListener('DOMContentLoaded', loaditems);

function addtodo(event) {

    event.preventDefault();
    let tododiv = document.createElement('div');
    tododiv.classList.add('todo');
    let newtodo = document.createElement('li');
    newtodo.innerText = todoinput.value;
    savelocaltodo(todoinput.value);
    todoinput.value = '';

    newtodo.classList.add('todo-item');
    tododiv.appendChild(newtodo);
    todolist.appendChild(tododiv)

    const compeletedbtn = document.createElement('button');
    compeletedbtn.classList.add('complete-btn');
    compeletedbtn.innerHTML = `<i class="fas fa-check"></i>`;
    tododiv.appendChild(compeletedbtn);

    const trashbtn = document.createElement('button');
    trashbtn.classList.add('trash-btn');
    trashbtn.innerHTML = `<i class="fas fa-trash"></i>`;
    tododiv.appendChild(trashbtn);
}

function savelocaltodo(add_item) {
    let todos;
    if (localStorage.getItem('items') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('items'));
    }
    todos.push(add_item);
    localStorage.setItem('items', JSON.stringify(todos))
}
function completeORremoveitem(event) {
    let parentitem = event.target.parentElement
    let childitem = event.target
    let itemtext = parentitem.children[0].innerText;
    if (childitem.classList == 'trash-btn') {
        parentitem.remove();
        deleteItem(itemtext)
    } else if (childitem.classList == 'complete-btn') {
        parentitem.classList.toggle('completed');
    }

}
function deleteItem(item) {
    let x = localStorage.getItem('items');
    let recievedarray = JSON.parse(x);
    let itemindex = recievedarray.indexOf(item)
    if (recievedarray.indexOf(item) >= 0) {
        recievedarray.splice(itemindex, 1)
    }
    localStorage.setItem('items', JSON.stringify(recievedarray))
}
function filterTasks(item) {
    let filtervalue = item.target.value
    let todoparent = todolist.childNodes;
    todoparent.forEach(function (li) {
        switch (filtervalue) {
            case 'all':
                li.style.display = 'flex'
                break;
            case 'completed':
                if (li.classList.contains('completed')) {
                    li.style.display = 'flex';
                } else {
                    li.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (li.classList.contains('completed')) {
                    li.style.display = 'none';
                } else {
                    li.style.display = 'flex';
                }
                break;
        }
    })
}
function loaditems() {
    let todos;
    if (localStorage.getItem('items') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('items'));
    }
    todos.forEach(function (item) {
        let tododiv = document.createElement('div');
        tododiv.classList.add('todo');
        let newtodo = document.createElement('li');
        newtodo.innerText = item
        newtodo.classList.add('todo-item');
        tododiv.appendChild(newtodo);
        todolist.appendChild(tododiv)
        const compeletedbtn = document.createElement('button');
        compeletedbtn.classList.add('complete-btn');
        compeletedbtn.innerHTML = `<i class="fas fa-check"></i>`;
        tododiv.appendChild(compeletedbtn);
    
        const trashbtn = document.createElement('button');
        trashbtn.classList.add('trash-btn');
        trashbtn.innerHTML = `<i class="fas fa-trash"></i>`;
        tododiv.appendChild(trashbtn);
    })
}
// let existingEntries = JSON.parse(localStorage.getItem("list_items") || '[]');

// // Add item if it's not already in the array, then store array again
// if (!existingEntries.includes(add_item)) {
//   existingEntries.push(add_item);
//   localStorage.setItem("list_items", JSON.stringify(existingEntries));
// }else{
//    // or tell user it's already there
//    console.log(add_item + ' already exists')
// }

// localStorage.clear()
// localStorage.clear()
// let todos;
    // if(localStorage.getItem('todos')==null){
    //     todos=[];
    // }else{
    //     todos=JSON.parse(localStorage.getItem('todos'))
    // }
    // todos.push(todo);
    // localStorage.setItem('todos',JSON.stringify(todos))





