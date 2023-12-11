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

const getMarkup = function (firstRef, secondRef) {
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

  firstRef.innerHTML = listItems.join("");
  secondRef.innerHTML = completeListItems.join("");
};

const handleSubmit = function (event, value) {
  event.preventDefault();

  const categoryValue = getSelectedValue("category");
  const timeValue = getSelectedValue("time");
  const taskValue = inputText.value;

  inputText.value = "";

  if (categoryValue && timeValue && taskValue) {
    closeModal();
    switch (value) {
      case "main":
        toDo.push({ categoryValue, timeValue, taskValue });
        break;
      case "edit":
        toDo[index] = { categoryValue, timeValue, taskValue };
        break;
    }
    getMarkup(list, completeList);
  }
  toggleEventListeners(false, form);
};

const getSelectedValue = function (name) {
  const select = form.querySelector(`select[name="${name}"]`);
  const selectedOption = select.options[select.selectedIndex];
  const value = selectedOption.text;
  return value;
};

const mainSubmitHandler = (event) => handleSubmit(event, "main");
const editSubmitHandler = (event) => handleSubmit(event, "edit");

const toggleEventListeners = function (addEditListener, ref) {
  if (addEditListener) {
    ref.removeEventListener("submit", mainSubmitHandler);
    ref.addEventListener("submit", editSubmitHandler);
  } else {
    ref.removeEventListener("submit", editSubmitHandler);
    ref.addEventListener("submit", mainSubmitHandler);
  }
};

toggleEventListeners(false, form);

const clickHandle = function (event) {
  const listItem = event.target.closest("li");
  if (!listItem) return;

  const edit = function (item) {
    openModal();
    toggleEventListeners(true, form);
    index = item.getAttribute("data-key");
    const spans = item.querySelectorAll("span");
    const categoryValue = spans[0].textContent;
    const timeValue = spans[1].textContent;
    const taskValue = spans[2].textContent;
    const categorySelect = form.querySelector('select[name="category"]');
    const timeSelect = form.querySelector('select[name="time"]');
    inputText.value = taskValue;

    // Finding the appropriate options in the select and setting the values
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
  };

  const done = function (item) {
    const spans = item.querySelectorAll("span");
    const categoryValue = spans[0].textContent;
    const timeValue = spans[1].textContent;
    const taskValue = spans[2].textContent;
    complete.push({ categoryValue, timeValue, taskValue });
    del(item);
  };

  const del = function (item) {
    const index = item.getAttribute("data-key");
    const parentDataset = item.parentNode.dataset;
    const attributeNames = Object.keys(parentDataset);

    attributeNames.includes("list") && toDo.splice(index, 1);
    attributeNames.includes("completeList") && complete.splice(index, 1);

    getMarkup(list, completeList);
  };

  switch (event.target.dataset.action) {
    case "edit":
      edit(listItem);
      break;
    case "done":
      done(listItem);
      break;
    case "del":
      del(listItem);
      break;
  }
};

list.addEventListener("click", clickHandle);
completeList.addEventListener("click", clickHandle);

// filterButton.addEventListener("click", filterTasks);
// function filterTasks() {
//   inputText.classList.add("visually-hidden");
//   openModal();
//   inputText.classList.remove("visually-hidden");
// }
