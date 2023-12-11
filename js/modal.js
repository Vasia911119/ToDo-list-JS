const modalRefs = {
  openModalBtn: document.querySelector("[data-modal-open]"),
  closeModalBtn: document.querySelector("[data-modal-close]"),
  modal: document.querySelector("[data-modal]"),
};

const classList = modalRefs.modal.classList;

export const openModal = function () {
  classList.remove("is-hidden");
  modalRefs.openModalBtn.removeEventListener("click", openModal);
  modalRefs.closeModalBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", handleEscapeKey);
  document.addEventListener("click", handleClickOutside);
};

modalRefs.openModalBtn.addEventListener("click", openModal);

export const closeModal = function () {
  classList.add("is-hidden");
  modalRefs.openModalBtn.addEventListener("click", openModal);
  modalRefs.closeModalBtn.removeEventListener("click", closeModal);
  document.removeEventListener("keydown", handleEscapeKey);
  document.removeEventListener("click", handleClickOutside);
};

// Closing the modal when the Escape key is pressed
const handleEscapeKey = function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
};

// Closing the modal when clicking outside of it
const handleClickOutside = function (e) {
  if (e.target === modalRefs.modal) {
    closeModal();
  }
};
