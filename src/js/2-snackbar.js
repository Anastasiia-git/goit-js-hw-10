import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = event.target.elements.delay.value;
  const state = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {

      setTimeout(() => {
        if(state === "fulfilled") {
          resolve(delay);
        } else {
          reject(delay);
        }
    }, delay)
  });


promise

.then((delay) => {
  iziToast.success({
    title: "",
    messageSize: "16px",
    backgroundColor: "green",
    messageColor: "white",
    message: ` Fulfilled promise in ${delay}ms`,
    position: 'topRight',
  });
})

.catch((delay) => {
  iziToast.error({
    title: "",
    messageSize: "16px",
    backgroundColor: "red",
    messageColor: "white",
    message: `Rejected promise in ${delay}ms`,
    position: "topRight",
  });
});
}