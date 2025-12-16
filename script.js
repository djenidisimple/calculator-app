let btn = document.querySelectorAll("button");
let screen = document.querySelector(".text-screen");
let cal = 0,pre = 0, value = [];
let result = true;
let round = document.querySelectorAll(".round");
let body = document.querySelector("body");
let limite = document.querySelector(".limite");

const savedTheme = localStorage.getItem('calculator-theme') || 1;
round.forEach((r) => r.style.opacity = "0");
round[parseInt(savedTheme) - 1].style.opacity = "1";
body.setAttribute("data-theme", savedTheme);

btn.forEach((button) => {
    button.addEventListener("click", function() {
        if (button.value == "del") {
            screen.innerHTML = screen.textContent.slice(0, -1);
            if (screen.textContent.length == 0) {
                screen.innerText = "0";
                result = true;
            }
        } else if (button.value == "=") {
            value = screen.textContent.match(/([-+]?\d+(?:\.\d+)?|[+\-*/])/g).join("");
            animateText(screen, limite, eval(value), true);
            result = true;
        } else if (button.value == "reset") {
            animateText(screen, limite, "0");
        } else {
            if (result) {
                result = removeScreen(result, limite, screen);
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

const removeScreen = (result, limite, screen) => {
    if (result) {
        animateText(screen, limite, "");
        return !result;
    }
    return result;
}

const animateText = (screen, limite, value, resultat=false) => {
    screen.classList.add("animation-text-toGoUp");
    setTimeout(function() {
        screen.innerHTML = value;
        screen.innerText = deleteFormatedNumber(screen.textContent);
        screen.innerText = formatedNumber(screen.textContent);
        if ((limite.scrollWidth < screen.clientWidth) && resultat) {
            limite.style.justifyContent = "flex-start";
        } else {
            limite.style.justifyContent = "flex-end";
        }
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
