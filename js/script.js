const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filter = document.getElementById("filter");

form.addEventListener("submit", addTodo);
filter.addEventListener("change", filterTodo);

function addTodo(e) {
  e.preventDefault();

  // Validasi
  if (todoInput.value === "" || dateInput.value === "") {
    alert("To-do dan tanggal wajib diisi!");
    return;
  }

  const li = document.createElement("li");

  // Isi todo + tombol aksi
  li.innerHTML = `
    <span class="text">
      ${todoInput.value}
      <br><small>${dateInput.value}</small>
    </span>

    <div class="actions">
      <button class="check">✓</button>
      <button class="delete">✕</button>
      <button class="trash">🗑</button>
    </div>
  `;

  /* SELESAI */
  li.querySelector(".check").addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  /* BATAL SELESAI */
  li.querySelector(".delete").addEventListener("click", () => {
    li.classList.remove("completed");
  });

  /* HAPUS TODO */
  li.querySelector(".trash").addEventListener("click", () => {
    li.remove();

    if (todoList.children.length === 0) {
      document.getElementById("empty").style.display = "block";
    }
  });

  todoList.appendChild(li);
  document.getElementById("empty").style.display = "none";

  // Reset input
  todoInput.value = "";
  dateInput.value = "";
}

/* FILTER TODO */
function filterTodo(e) {
  const todos = todoList.children;

  for (let todo of todos) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        todo.style.display = todo.classList.contains("completed")
          ? "flex"
          : "none";
        break;

      case "uncompleted":
        todo.style.display = !todo.classList.contains("completed")
          ? "flex"
          : "none";
        break;
    }
  }
}

/* AUTO SELESAI BERDASARKAN TANGGAL */
function autoCheckByDate() {
  const todos = document.querySelectorAll("#todo-list li");
  const today = new Date().setHours(0, 0, 0, 0);

  todos.forEach(todo => {
    const dateText = todo.querySelector("small").innerText;
    const todoDate = new Date(dateText).setHours(0, 0, 0, 0);

    if (todoDate < today) {
      todo.classList.add("completed");
    }
  });
}

/* CEK OTOMATIS SAAT TODO BARU MASUK */
const observer = new MutationObserver(autoCheckByDate);
observer.observe(todoList, { childList: true });
