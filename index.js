const formEl = document.getElementById("form");
const listGroup = document.getElementById("listGroup")
const modal = document.getElementById("modal")
const modalForm = document.getElementById("modal-form")
const modalClose = document.getElementById("modalClose")
const modalOverflov = document.getElementById("modal-overflov")





let editItemidx ;

//check
let todos = JSON.parse(localStorage.getItem("list")) ?
  JSON.parse(localStorage.getItem("list"))
  : [];

if(todos.length) showTodos()

// show todos 
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"))
  listGroup.innerHTML = ""
  todos.forEach((item ,idx )=> {
    listGroup.innerHTML += `
      <li>
        <p class="${item.completed ? "completed" : ""} li-text" onclick="setCompileted(${item.id})">${item.text}</p>
        <div class="icon_img">
          <img width="20px" height="20px" onclick=(changeItem(${idx})) src="./images/change_img.png" alt="change_img">
          <img width="25px" height="20px" onclick=(deleteItem(${item.id})) src="./images/dalete_img.png" alt="dalete_img">
        </div>
      </li>
    `
  });

}

// get todos
formEl.addEventListener("submit", (e) => {
  e.preventDefault()
  const todoText = document.getElementById("formInput").value.trim();
  formEl.reset()
  if (todoText.length) {
    todos.push({
      text: todoText,
      id: Date.now(),
      completed: false
    })
    setTodos()
  } else {
    showMessage("danger-text", "Plase , Enter some text...")
  }

  showTodos()
})


//set todos LocalStorage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos))
}

// show message
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 2000);
}

//delete item 
function deleteItem(id){
  const deletedTodos = todos.filter((item) => {
    return id !== item.id
  })
  todos = deletedTodos
  setTodos()
  showTodos()
}

//setCompileted
function setCompileted (id){
  const completedTodos = todos.map((item)=>{
    if(id === item.id){
      return {...item , completed : !item.completed}
    }else{
      return {...item}
    }
  })
  todos = completedTodos
  setTodos()
  showTodos()
}


// change form 
modalForm.addEventListener("submit" , (e)=>{
  e.preventDefault()
  const todoText = document.getElementById("modalInput").value.trim();
  modalForm.reset()
  if (todoText.length) {
    todos.splice(editItemidx , 1 ,{
      text: todoText,
      id: Date.now(),
      completed: false
    })
    setTodos()
    showTodos()
    close()
  } else {
    showMessage("modal-danger-text", "Change , Enter some text...")
  }
})

//changeItem
function changeItem (idx){
  open()
  editItemidx = idx
}

function open() {
  modal.classList.remove("hidden")
  modalOverflov.classList.remove("hidden")
}
function close() {
  modal.classList.add("hidden")
  modalOverflov.classList.add("hidden")
}

modalClose.addEventListener("click",close)