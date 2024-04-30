const explainations = {
    "chem_fix": {
        title: "Chemische Stickstofffixierung",
        explaination: "Der Molekulare Stickstoff reagiert mit Sauerstoff, durch eine Blitzentladung entstehen Stickstoffoxide, welche dann durch Regenfall auf und in den Boden gelangen."
    }
}

function open_window(explaination) {
    document.getElementById("modal").style.display = "block";

    document.getElementById("modal-title").textContent = explainations[explaination].title;
    document.getElementById("modal-explaination").textContent = explainations[explaination].explaination;
}

function close_window() {
    document.getElementById("modal").style.display = "none";
}

document.addEventListener("keydown", close_window);