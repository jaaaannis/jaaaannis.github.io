const rules = `
    <li>+ wird hochgestellt, es sei denn ein Leerzeichen ist davor</li>
    <li>- wird hochgestellt</li>
    <li>Zahlen werden tiefgestellt. Ist ein Leerzeichen davor: normale Zahl. Ist ein +/- dahinter: Hochgestellt</li>
    <li>-> wird zu →</li>
    <li><-> wird zu ⇌</li>
    <li>1/2 wird zu ½</li>
    <li>Buchstaben bleiben unverändert</li>
    <li></li>
    <li>"H2O + HCl <-> Cl- + H3O+" würde also zu "H₂O + HCl ⇌ Cl⁻ + H₃O⁺" werden</li>
`

const rulesManuel = `
    <li>Das Zeichen nach einem ^ wird hochgestellt</li>
    <li>Das Zeichen nach einem _ wird tiefgestellt</li>
`

var SUPERSCRIPTS = {
    ' ': ' ',
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
    'a': 'ᵃ',
    'b': 'ᵇ',
    'c': 'ᶜ',
    'd': 'ᵈ',
    'e': 'ᵉ',
    'f': 'ᶠ',
    'g': 'ᵍ',
    'h': 'ʰ',
    'i': 'ⁱ',
    'j': 'ʲ',
    'k': 'ᵏ',
    'l': 'ˡ',
    'm': 'ᵐ',
    'n': 'ⁿ',
    'o': 'ᵒ',
    'p': 'ᵖ',
    'r': 'ʳ',
    's': 'ˢ',
    't': 'ᵗ',
    'u': 'ᵘ',
    'v': 'ᵛ',
    'w': 'ʷ',
    'x': 'ˣ',
    'y': 'ʸ',
    'z': 'ᶻ',
    '+': '⁺',
    '-': '⁻'
}
var SUBSCRIPTS = {
    ' ': ' ',
    '0': '₀',
    '1': '₁',
    '2': '₂',
    '3': '₃',
    '4': '₄',
    '5': '₅',
    '6': '₆',
    '7': '₇',
    '8': '₈',
    '9': '₉',
    'a': 'ₐ',
    'e': 'ₑ',
    'h': 'ₕ',
    'i': 'ᵢ',
    'j': 'ⱼ',
    'k': 'ₖ',
    'l': 'ₗ',
    'm': 'ₘ',
    'n': 'ₙ',
    'o': 'ₒ',
    'p': 'ₚ',
    'r': 'ᵣ',
    's': 'ₛ',
    't': 'ₜ',
    'u': 'ᵤ',
    'v': 'ᵥ',
    'x': 'ₓ'
}

function toSuperScript(x) {
  return x.split('').map(function(c) {
    if(c in SUPERSCRIPTS) {
      return SUPERSCRIPTS[c]
    }
    return c
  }).join('')
}

function toSubScript(x) {
    return x.split('').map(function(c) {
      if(c in SUBSCRIPTS) {
        return SUBSCRIPTS[c]
      }
      return c
    }).join('')
}


let manuelMode = false;

window.addEventListener('input', function (evt) {

    if(evt.target.id == "input") {
        on_text_change(evt.target.value)
    }

    if(evt.target.id == "manual-mode") {
        console.log(evt)
        set_manual(evt.target.checked)
    }

});

function set_manual(manual) {
    manuelMode = manual;

    this.document.getElementById("rules").innerHTML = manual? rulesManuel: rules;

    on_text_change(this.document.getElementById("input").value);
}

function on_text_change(input) {
    let output = ""
    if(!manuelMode) {
        output = input
            .replaceAll("1/2","½")
            .replaceAll(/[0-9][+-]/g, match => toSuperScript(match))
            .replaceAll("<->","⇌")
            .replaceAll("->","→")
            .replaceAll("+","⁺")
            .replaceAll(" ⁺"," +")
            .replaceAll("-","⁻")
            .replaceAll(/(?!^)(?<!\s)[0-9]/g, match => toSubScript(match))
    }else {
        output = input
            .replaceAll(/_./g, match => toSubScript(match.replace("_","")))
            .replaceAll(/\^./g, match => toSubScript(match.replace("^","")))
    }
    

    if(input == "") {
        output = "Deine Formel";
    }

    this.document.getElementById("formula").innerText = output;
}

function copy() {
    navigator.clipboard.writeText(this.document.getElementById("formula").innerText)
}