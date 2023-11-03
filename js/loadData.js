let dataUrl;

if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  dataUrl = "../data/data.json";
} else {
  dataUrl =
    "https://github.com/Vasia911119/ToDo-list-JS/blob/main/data/data.json";
}

fetch(dataUrl)
  .then((response) => response.json())
  .then((data) => {
    const categorySelect = document.querySelector('select[name="category"]');
    const timeSelect = document.querySelector('select[name="time"]');

    data.categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.value;
      option.textContent = category.name;

      if (category.value === "initial") {
        option.setAttribute("disabled", true);
        option.setAttribute("selected", true);
      }

      categorySelect.appendChild(option);
    });

    data.times.forEach((time) => {
      const option = document.createElement("option");
      option.value = time.value;
      option.textContent = time.name;

      if (time.value === "initial") {
        option.setAttribute("disabled", true);
        option.setAttribute("selected", true);
      }

      timeSelect.appendChild(option);
    });
  })
  .catch((error) => console.error("Помилка завантаження файлу JSON:", error));
