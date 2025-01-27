const rules = `
    <li>+ wird hochgestellt, es sei denn ein Leerzeichen ist davor</li>
    <li>- wird hochgestellt</li>
    <li>Zahlen werden tiefgestellt. Ist ein Leerzeichen davor: normale Zahl. Ist ein +/- dahinter: Hochgestellt</li>
    <li>-> wird zu →</li>
    <li>= / <-> wird zu ⇌</li>
    <li>1/2 wird zu ½</li>
    <li>... wird zu ┆ (für Zelldiagramme)</li>
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


let manualMode = false;

window.addEventListener('keypress', evt => {
    if(evt.target.id == "input" && evt.key == "Enter") {
        copy()
    }
})

window.addEventListener('input', function (evt) {

    if(evt.target.id == "input") {
        on_text_change(evt.target.value)
    }

    if(evt.target.id == "manual-mode") {
        set_manual(evt.target.checked)
    }

});

function get_history() {
    let history = JSON.parse(localStorage.getItem("history"))

    let history_list = []

    history.forEach((entry,i) => {
        history_list.push(`<li>${entry.formula} <button style="margin-left: 1rem" class="button" onclick="load_history_entry(${i})">import</button>  <button style="margin-left: 1rem" class="button" onclick="remove_history_entry(${i})">🗑️</button> </li>`)
    });

    let history_html = history_list.reverse().join("\n")

    this.document.getElementById("history").innerHTML = history_html;
}

function load_history_entry(entry_id) {
    let history_entry = JSON.parse(localStorage.getItem("history"))[entry_id]
    this.document.getElementById("input").value = history_entry.raw
    set_manual(history_entry.manual)
    on_text_change(history_entry.raw)
    add_to_history()
}

function add_to_history() {
    let raw_text = this.document.getElementById("input").value

    if(raw_text == "") return;
    
    let history = JSON.parse(localStorage.getItem("history"))

    if (!history) {
        history = []
    }

    let already_contained_index = history.findIndex(entry => entry.raw == raw_text && entry.manual == manualMode)

    if(already_contained_index >= 0) {
        history.splice(already_contained_index,1)
    }

    history.push({
        formula: this.document.getElementById("formula").innerText,
        raw: raw_text,
        manual: manualMode
    })

    localStorage.setItem("history", JSON.stringify(history))
    get_history()
}

function remove_history_entry(entry_id) {
    let history = JSON.parse(localStorage.getItem("history"))
    history.splice(entry_id,1)
    localStorage.setItem("history", JSON.stringify(history))
    get_history()
}

function set_manual(manual) {
    manualMode = manual;

    this.document.getElementById("manual-mode").checked = manual;

    this.document.getElementById("rules").innerHTML = manual? rulesManuel: rules;

    on_text_change(this.document.getElementById("input").value);
}

function on_text_change(input) {
    let output = ""
    if(!manualMode) {
        output = input
            .replaceAll("1/2","½")
            .replaceAll(/[0-9][+-]/g, match => toSuperScript(match))
            .replaceAll("<->","⇌")
            .replaceAll("=","⇌")
            .replaceAll("->","→")
            .replaceAll("+","⁺")
            .replaceAll(" ⁺"," +")
            .replaceAll("-","⁻")
            .replaceAll("...","┆")
            .replaceAll(/(?!^)(?<!\s)[0-9]/g, match => toSubScript(match))
    }else {
        output = input
            .replaceAll(/_./g, match => toSubScript(match.replace("_","")))
            .replaceAll(/\^./g, match => toSuperScript(match.replace("^","")))
    }
    

    if(input == "") {
        output = "Deine Formel";
    }

    this.document.getElementById("formula").innerText = output;
}

function copy() {
    navigator.clipboard.writeText(this.document.getElementById("formula").innerText)
    add_to_history()
}

window.onload = () => {
    set_manual(false)
    get_history()
}

