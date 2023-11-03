const modalRefs = {
  openModalBtn: document.querySelector("[data-modal-open]"),
  closeModalBtn: document.querySelector("[data-modal-close]"),
  modal: document.querySelector("[data-modal]"),
};

modalRefs.openModalBtn.addEventListener("click", openModal);

const classList = modalRefs.modal.classList;

// Closing the modal when the Escape key is pressed
function handleEscapeKey(e) {
  if (e.key === "Escape") {
    closeModal();
  }
}

// Closing the modal when clicking outside of it
function handleClickOutside(e) {
  if (e.target === modalRefs.modal) {
    closeModal();
  }
}

function openModal() {
  classList.remove("is-hidden");
  modalRefs.openModalBtn.removeEventListener("click", openModal);
  modalRefs.closeModalBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", handleEscapeKey);
  document.addEventListener("click", handleClickOutside);
}

export function closeModal() {
  classList.add("is-hidden");
  modalRefs.openModalBtn.addEventListener("click", openModal);
  modalRefs.closeModalBtn.removeEventListener("click", closeModal);
  document.removeEventListener("keydown", handleEscapeKey);
  document.removeEventListener("click", handleClickOutside);
}
