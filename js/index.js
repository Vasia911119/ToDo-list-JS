import { openModal, closeModal } from "./modal.js";

const refs = {
  form: document.querySelector("[data-form]"),
  list: document.querySelector("[data-list]"),
  completeList: document.querySelector("[data-complete-list]"),
  filterButton: document.querySelector("[data-filter]"),
};

let index;
const toDo = [];
const complete = [];
const { form, list, completeList, filterButton } = refs;
const inputText = form.querySelector('input[name="task"]');

const mainSubmitHandler = (event) => handleSubmit(event, "main");
const editSubmitHandler = (event) => handleSubmit(event, "edit");

toggleEventListeners(false);

function toggleEventListeners(addEditListener) {
  if (addEditListener) {
    form.removeEventListener("submit", mainSubmitHandler);
    form.addEventListener("submit", editSubmitHandler);
  } else {
    form.removeEventListener("submit", editSubmitHandler);
    form.addEventListener("submit", mainSubmitHandler);
  }
}

function handleSubmit(event, value) {
  event.preventDefault();

  const categoryValue = getSelectedValue("category");
  const timeValue = getSelectedValue("time");

  // const inputText = form.querySelector('input[name="task"]');
  const taskValue = inputText.value;

  inputText.value = "";

  if (categoryValue && timeValue && taskValue) {
    closeModal();
    if (value === "main") {
      toDo.push({ categoryValue, timeValue, taskValue });
    }
    if (value === "edit") {
      toDo[index] = { categoryValue, timeValue, taskValue };
    }
    getMarkup();
  }
  toggleEventListeners(false);
}

function getSelectedValue(name) {
  const select = form.querySelector(`select[name="${name}"]`);
  const selectedOption = select.options[select.selectedIndex];
  const value = selectedOption.text;
  return value;
}

list.addEventListener("click", (event) => {
  const listItem = event.target.closest("li");
  if (!listItem) return;

  if (event.target.dataset.action === "edit") {
    edit(listItem);
  } else if (event.target.dataset.action === "done") {
    done(listItem);
  } else if (event.target.dataset.action === "del") {
    del(listItem);
  }
});

completeList.addEventListener("click", (event) => {
  const complelistItem = event.target.closest("li");
  if (!complelistItem) return;

  if (event.target.dataset.action === "edit") {
    edit(complelistItem);
  } else if (event.target.dataset.action === "done") {
    done(complelistItem);
  } else if (event.target.dataset.action === "del") {
    del(complelistItem);
  }
});

function edit(item) {
  openModal();
  toggleEventListeners(true);
  index = item.getAttribute("data-key");
  const spans = item.querySelectorAll("span");
  const categoryValue = spans[0].textContent;
  const timeValue = spans[1].textContent;
  const taskValue = spans[2].textContent;
  const categorySelect = form.querySelector('select[name="category"]');
  const timeSelect = form.querySelector('select[name="time"]');
  // const inputText = form.querySelector('input[name="task"]');
  inputText.value = taskValue;

  // Знаходження відповідних опцій в селекті та встановлення значень
  for (const option of categorySelect.options) {
    if (option.textContent === categoryValue) {
      categorySelect.value = option.value;
      break;
    }
  }

  for (const option of timeSelect.options) {
    if (option.textContent === timeValue) {
      timeSelect.value = option.value;
      break;
    }
  }
}

function done(item) {
  const spans = item.querySelectorAll("span");
  const categoryValue = spans[0].textContent;
  const timeValue = spans[1].textContent;
  const taskValue = spans[2].textContent;
  complete.push({ categoryValue, timeValue, taskValue });
  del(item);
}

function del(item) {
  const index = item.getAttribute("data-key");
  const parentDataset = item.parentNode.dataset;
  const attributeNames = Object.keys(parentDataset);

  attributeNames.includes("list") && toDo.splice(index, 1);
  attributeNames.includes("completeList") && complete.splice(index, 1);

  getMarkup();
}

function getMarkup() {
  const listItems = toDo.map((el, index) => {
    return `<li data-key=${index}>
      <span>${el.categoryValue}</span>
      <span>${el.timeValue}</span>
      <span>${el.taskValue}</span>
      <button data-action="edit">Edit</button>
      <button data-action="done">Done</button>
      <button data-action="del">X</button>
    </li>`;
  });

  const completeListItems = complete.map((el, index) => {
    return `<li data-key=${index}>
    <span>${el.categoryValue}</span>
    <span>${el.timeValue}</span>
    <span>${el.taskValue}</span>
    <button data-action="edit" disabled>Edit</button>
    <button data-action="done" disabled>Done</button>
    <button data-action="del">X</button>
  </li>`;
  });

  list.innerHTML = listItems.join("");
  completeList.innerHTML = completeListItems.join("");
}

filterButton.addEventListener("click", filterTasks);
function filterTasks() {
  inputText.classList.add("visually-hidden");
  openModal();
  inputText.classList.remove("visually-hidden");
}
