const toDoFrom = document.querySelector(".js-toDoForm"),
  toDoInput = toDoFrom.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {

  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  
  const cleanToDos = toDos.filter(function (toDo) {
  return toDo.id !== parseInt(li.id);
  });
  console.log(cleanToDos);
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
   const date = new Date();
   const year = date.getFullYear();
   const month = date.getMonth() + 1;
   const day = date.getDate();
   const dayofweek = date.getDay();

const dayname = ['일','월','화','수','목','금','토'];

   const minutes = date.getMinutes();
   const hours = date.getHours();
   const seconds = date.getSeconds();
  const newId = toDos.length + 1;
  const delBtnCL = "delBtn";
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  delBtn.classList.add(delBtnCL);
  span.innerText = `[${year}년${month}월${day}일[${dayname[dayofweek]}] ${hours}:${minutes}:${seconds}] ${text}`;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parsedToDos = JSON.parse(loadedTodos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoFrom.addEventListener("submit", handleSubmit);
}

init();
