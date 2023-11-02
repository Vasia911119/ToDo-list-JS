const refs = {
  form: document.querySelector("[data-form]"),
  list: document.querySelector("[data-list]"),
};

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
  listItem.innerHTML = `<span>${categoryValue}</span><span>${timeValue}</span><span>${taskValue}</span>`;

  refs.list.appendChild(listItem);

  inputText.value = "";

  toDo.push({ categoryValue, timeValue, taskValue });
});
