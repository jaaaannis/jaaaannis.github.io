const explainations = {
    "chem_fix": {
        title: "Chemische Stickstofffixierung",
        explaination: "Der Molekulare Stickstoff reagiert mit Sauerstoff, durch eine Blitzentladung entstehen Stickstoffoxide, welche dann durch Regenfall auf und in den Boden gelangen."
    },
    "bio_fix": {
        title: "Biologische Stickstofffixierung",
        explaination: "PLACEHOLDER"
    },
    "plant": {
        title: "Pflanze",
        explaination: "PLACEHOLDER"
    },
    "no3": {
        title: "NO₃⁻",
        explaination: "Auch Nitrat gennant."
    },
    "no2": {
        title: "NO₂⁻",
        explaination: "PLACEHOLDER"
    },
    "nh4": {
        title: "NH₄⁺",
        explaination: "PLACEHOLDER"
    },
    "nitrifikation": {
        title: "Nitrifikation",
        explaination: "PLACEHOLDER"
    },
    "ammonifikation": {
        title: "Ammonifikation",
        explaination: "PLACEHOLDER"
    },
    "denitrifikation": {
        title: "Denitrifikation",
        explaination: "PLACEHOLDER"
    },
    "biomass": {
        title: "tote Biomasse",
        explaination: "PLACEHOLDER"
    },
    "tree": {
        title: "Baum",
        explaination: "PLACEHOLDER"
    },
    "animal": {
        title: "Tier",
        explaination: "PLACEHOLDER"
    },
    "harnstoff": {
        title: "Harnstoff",
        explaination: "PLACEHOLDER"
    }
}




function open_window(explaination) {
    document.getElementById("modal").classList.add("modal-open")

    document.getElementById("modal-title").textContent = explainations[explaination].title;
    document.getElementById("modal-explaination").textContent = explainations[explaination].explaination;
}

function close_window() {    
    document.getElementById("modal").classList.remove("modal-open")
}

document.addEventListener("keydown", close_window);