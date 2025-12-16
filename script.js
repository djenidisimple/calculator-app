let btn = document.querySelectorAll("button");
let screen = document.querySelector(".text-screen");
let cal = 0,pre = 0, value = [];
let result = true;
let round = document.querySelectorAll(".round");
let body = document.querySelector("body");

const savedTheme = localStorage.getItem('calculator-theme') || 1;
round.forEach((r) => r.style.opacity = "0");
round[parseInt(savedTheme) - 1].style.opacity = "1";
body.setAttribute("data-theme", savedTheme);

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

round.forEach((r, index) => {
    r.addEventListener("click", function() {
        round.forEach((r) => { r.style.opacity = "0"; });
        r.style.opacity = "1";
        body.setAttribute('data-theme', index + 1);
        localStorage.setItem('calculator-theme', index + 1);
    });
});
