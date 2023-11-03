const refs = {
  form: document.querySelector("[data-form]"),
  list: document.querySelector("[data-list]"),
  completeList: document.querySelector("[data-complete-list]"),
};
import { closeModal } from "./modal.js";

const toDo = [];
const complete = [];
const { form, list, completeList } = refs;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  function getSelectedValue(name) {
    const select = form.querySelector(`select[name="${name}"]`);
    const selectedOption = select.options[select.selectedIndex];
    const value = selectedOption.text;
    return value;
  }

  const categoryValue = getSelectedValue("category");
  const timeValue = getSelectedValue("time");

  const inputText = form.querySelector('input[name="task"]');
  const taskValue = inputText.value;

  inputText.value = "";

  categoryValue && timeValue && taskValue && closeModal();

  toDo.push({ categoryValue, timeValue, taskValue });

  getMarkup();
});

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

// Функції для обробки подій
function edit(item) {
  console.log("Edit", item);
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
