(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  refs.openModalBtn.addEventListener("click", openModal);

  const classList = refs.modal.classList;

  // Closing the modal when the Escape key is pressed
  function handleEscapeKey(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  }

  // Closing the modal when clicking outside of it
  function handleClickOutside(e) {
    if (e.target === refs.modal) {
      closeModal();
    }
  }

  function openModal() {
    classList.remove("is-hidden");
    refs.openModalBtn.removeEventListener("click", openModal);
    refs.closeModalBtn.addEventListener("click", closeModal);
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleClickOutside);
  }

  function closeModal() {
    classList.add("is-hidden");
    refs.openModalBtn.addEventListener("click", openModal);
    refs.closeModalBtn.removeEventListener("click", closeModal);
    document.removeEventListener("keydown", handleEscapeKey);
    document.removeEventListener("click", handleClickOutside);
  }
})();
