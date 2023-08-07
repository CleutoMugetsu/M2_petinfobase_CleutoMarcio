export function toast(message, color) {
  Toastify({
    text: message,
    duration: 3000,
    closr: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color,
      color: "white",
    },
  }).showToast();
}

export const green = "green";
export const red = "red";
