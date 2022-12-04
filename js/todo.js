const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let todos = [];

function saveTodos() { // 할일을 디비에 저장
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos)); // 로컬스토리지에 스트링으로 변환하여 저장
}

function deleteTodo(event) { // 할일을 화면과 디비에서 삭제
    const li = event.target.parentElement; // 클릭한 삭제 button의 부모 li를 찾음
    li.remove(); // 화면에서 해당 li 삭제
    todos = todos.filter((todo) => todo.id !== parseInt(li.id)); // filter를 이용하여 id에 해당하는 오브젝트를 배열에서 삭제
    saveTodos(); // 로컬스토리지를 업데이트
}

function paintTodo(newTodoObj) {
    const li = document.createElement("li");
    li.id = newTodoObj.id;
    const span = document.createElement("span");
    span.innerText = newTodoObj.text;
    const button = document.createElement("button");
    button.innerText = "삭제";
    button.addEventListener("click", deleteTodo)
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    todos.push(newTodoObj); 
    paintTodo(newTodoObj);  
    saveTodos(); 
}

todoForm.addEventListener("submit", handleTodoSubmit);

const getTodos = localStorage.getItem(TODOS_KEY);

if(getTodos !== null) {
    const parsedTodos = JSON.parse(getTodos);
    todos = parsedTodos;
    parsedTodos.forEach(paintTodo);
}

