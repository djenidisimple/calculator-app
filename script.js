let btn = document.querySelectorAll("button");
let screen = document.querySelector(".text-screen");
let cal = 0,pre = 0, value = [];
let result = true;

btn.forEach((button) => {
    button.addEventListener("click", function() {
        if (button.value == "del") {
            screen.innerHTML = screen.textContent.slice(0, -1);
        } else if (button.value == "=") {
            value = screen.textContent.match(/([-+]?\d+(?:\.\d+)?|[+\-*/])/g).join("");
            animateText(screen, eval(value));
            result = true;
        } else if (button.value == "reset") {
            animateText(screen, "");
        } else {
            if (result) {
                result = removeScreen(result, screen);
                setTimeout(function(){
                    screen.innerHTML += button.value;
                }, 500);
            } else {
                screen.innerHTML += button.value;
            }
        }
        screen.innerText = deleteFormatedNumber(screen.textContent);
        screen.innerText = formatedNumber(screen.textContent);
    });
});

const removeScreen = (result, screen) => {
    if (result) {
        animateText(screen, "");
        return !result;
    }
    return result;
}

const animateText = (screen, value) => {
    screen.classList.add("animation-text-toGoUp");
    setTimeout(function() {
        screen.innerHTML = value;
        screen.innerText = deleteFormatedNumber(screen.textContent);
        screen.innerText = formatedNumber(screen.textContent);
        screen.classList.remove("animation-text-toGoUp");
    },500);
}

const formatedNumber = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const deleteFormatedNumber = (value) => {
    return value.split(",").join("");
}

const changeTheme = () => {
    // code here
}