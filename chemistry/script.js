const subscript = ["\u2080","\u2081","\u2082","\u2083","\u2084","\u2085","\u2086","\u2087","\u2088","\u2089"]
const superscript = ["\u2070","\u00B1","\u00B2","\u00B3","\u2074","\u2075","\u2076","\u2077","\u2078","\u2079"]

window.addEventListener('input', function (evt) {
    let input = evt.target.value;

    let output = input
        .replaceAll("1/2","½")
        .replaceAll(/[0-9][+]/g, match => superscript[match.replace("+","")] + "⁺")
        .replaceAll(/[0-9][-]/g, match => superscript[match.replace("-","")] + "⁻")
        .replaceAll("<->","⇌")
        .replaceAll("->","→")
        .replaceAll("+","⁺")
        .replaceAll(" ⁺"," +")
        .replaceAll("-","⁻")
        .replaceAll(/(?!^)(?<!\s)[0-9]/g, match => subscript[match])

    this.document.getElementById("formula").innerText = output;
});

function copy() {
    navigator.clipboard.writeText(this.document.getElementById("formula").innerText)
}