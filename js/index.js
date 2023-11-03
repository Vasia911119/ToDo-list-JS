const refs = {
  form: document.querySelector("[data-form]"),
  list: document.querySelector("[data-list]"),
};
import { closeModal } from "./modal.js";

const toDo = [];
const form = refs.form;

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

  const listItem = document.createElement("li");
  listItem.className = "list-item";
  listItem.innerHTML = `
    <span>${categoryValue}</span>
    <span>${timeValue}</span>
    <span>${taskValue}</span>
    <button onclick="edit()">Edit</button>
    <button onclick="done()">Done</button>
    <button onclick="del()">X</button>
  `;

  window.edit = function edit() {};

  window.done = function done() {};

  window.del = function del() {};

  refs.list.appendChild(listItem);

  inputText.value = "";

  categoryValue && timeValue && taskValue && closeModal();

  toDo.push({ categoryValue, timeValue, taskValue });
});
