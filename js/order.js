const modal = document.querySelector(".modal");
const orderOpen = document.querySelector(".order-open");
const orderClose = document.querySelector(".order-close");

orderOpen.addEventListener('click', (e) => {
    e.preventDefault();
    modal.showModal();
})

orderClose.addEventListener('click', (e) => {
    e.preventDefault();
    modal.close();
})