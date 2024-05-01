const explainations = {
    "chem_fix": {
        title: "Chemische Stickstofffixierung",
        explaination: "Die chemische Stickstofffixierung ist ein Prozess, bei dem elementarer Stickstoff (N₂) in verschiedene Stickstoffverbindungen, wie zum Beispiel Ammonium (NH₄⁺) oder Nitrat (NO₃⁻), umgesetzt wird. Dies geschieht unter anderem durch Blitzeinschläge oder Gewitter."
    },
    "bio_fix": {
        title: "Biologische Stickstofffixierung",
        explaination: "Die biologische Stickstofffixierung ist ein Prozess, bei dem bestimmte Bakterien Stickstoffgas aus der Luft in eine für Pflanzen nutzbare Form umwandeln. Zum Beispiel Ammonium (NH₄⁺) oder Nitrat (NO₃⁻). Diese Bakterien leben in symbiotischer Beziehung mit Pflanzen oder leben frei im Boden. Sie besitzen Enzyme, die Stickstoffmoleküle spalten und sie in organische Verbindungen umwandeln. Somit wird der Stickstoff aus der Luft für die Pflanzen verfügbar gemacht."
    },
    "plant": {
        title: "Pflanze",
        explaination: "Pflanzen nehmen Stickstoffverbindungen durch ihre Wurzeln auf und speichern diese. Stirbt eine Pflanze ab, setzt sie ihre Stickstoffverbindungen wieder frei."
    },
    "no3": {
        title: "NO₃⁻",
        explaination: "NO₃⁻ wird auch Nitrat genannt. Es wird von Pflanzenwurzeln aufgenommen, um das Pflanzenwachstum zu unterstützen."
    },
    "no2": {
        title: "NO₂⁻",
        explaination: "NO₂⁻ wird auch Nitrit genannt. Es ist eine Zwischenstufe des Kreislaufes. Es entsteht durch die Nitrifikation von Ammonium (NH₄⁺)."
    },
    "nh4": {
        title: "NH₄⁺",
        explaination: "NH₄⁺ wird auch Ammonium genannt. Es ist eine Stickstoffverbindung, die von Pflanzen direkt aufgenommen und verwendet werden kann. Ammonium wird auch in Düngemitteln genutzt."
    },
    "nitrifikation": {
        title: "Nitrifikation",
        explaination: "Die Nitrifikation ist ein biologischer Prozess, bei dem Ammonium (NH₄⁺) durch spezielle Bakterien zuerst in Nitrit (NO₂⁻) und dann weiter zu Nitrat (NO₃⁻) oxidiert wird. "
    },
    "ammonifikation": {
        title: "Ammonifikation",
        explaination: "Die Ammonifikation ist ein Prozess der Zersetzung organischer Substanzen durch Destruenten im Boden. Dabei wird organisch gebundener Stickstoff in Ammonium (NH₄⁺) umgewandelt."
    },
    "denitrifikation": {
        title: "Denitrifikation",
        explaination: "Die Denitrifikation ist ein biologischer Prozess, bei dem Stickstoffverbindungen wie Nitrat (NO₃⁻) und Nitrit (NO₂⁻) durch bestimmte Bakterien im Boden wieder in gasförmigen Stickstoff (N₂) umgewandelt werden. Somit wird wieder Stickstoff in die Atmosphäre freigesetzt und der Kreislauf schließt sich."
    },
    "biomass": {
        title: "Tote Biomasse",
        explaination: "Tote Biomasse bezeichnet organische Materialien, die nicht mehr lebend sind. Zum Beispiel abgestorbene Pflanzen und Tiere. Diese enthalten Stickstoffverbindungen, welche von Destruenten wieder in den Kreislauf eingeführt werden."
    },
    "tree": {
        title: "Baum",
        explaination: "Bäume nehmen Stickstoffverbindungen durch ihre Wurzeln auf und speichern diese. Stirbt ein Baum ab, setzt er seine Stickstoffverbindungen wieder frei."
    },
    "animal": {
        title: "Tier",
        explaination: "Tiere nehmen Stickstoff auf, indem sie pflanzliches Material konsumieren. Tiere geben den aufgenommenen Stickstoff sowohl in Form von Ausscheidungen als auch toter Biomasse zurück in den Kreislauf."
    },
    "harnstoff": {
        title: "Harnstoff",
        explaination: "Harnstoff ist eine Stickstoffverbindung, die zum Beispiel von Menschen und Tieren als Abfallprodukt des Stoffwechsels ausgeschieden wird. Harnstoff kann von Pflanzen leicht aufgenommen werden, da dieser durch ein Enzym in Ammonium (NH₄⁺) umgesetzt werden kann."
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