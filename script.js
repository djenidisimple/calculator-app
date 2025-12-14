let btn = document.querySelectorAll("button");
let screen = document.querySelector(".screen");
let cal = 0,pre = 0, value = [];
// screen.innerHTML = "399,981";

btn.forEach((button) => {
    button.addEventListener("click", function() {
        if (button.value == "del") {
            screen.innerHTML = screen.textContent.slice(0, -1);
        } else if (button.value == "=") {
            value = screen.textContent.split(/(\d)/).slice(1, -1).join("");
            screen.innerHTML = eval(value);
        } else if (button.value == "reset") {
            screen.innerHTML = "";
        } else {
            screen.innerHTML += button.value;
        }
    });
})
