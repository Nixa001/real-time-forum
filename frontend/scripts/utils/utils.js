
export function createSound(name) {
    var audio = document.createElement("audio");
    audio.id = "myAudio";
    audio.src = "../frontend/assets/sound/" + name;
    document.body.appendChild(audio);
}

export function playSound() {
    var audio = document.getElementById("myAudio");
    audio.play();
    setTimeout(function () {
        audio.remove();
    }, 800);
}

export function createDiv(className) {
    const div = document.createElement('div');
    div.className = className;
    return div;
}
export function createImage(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    return img;
}
export function createText(tagName, text) {
    const element = document.createElement(tagName);
    element.innerHTML = text;
    return element;
}
export function createInput(type, name, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    input.className = 'input-field';
    return input;
}
export function createLink(href, className) {
    const linkElement = document.createElement('a');
    linkElement.href = href;
    linkElement.className = className; // Ajoutez la classe si nécessaire
    return linkElement;
}
export function createForm(action, method) {
    const formElement = document.createElement('form');
    formElement.action = action;
    formElement.method = method;
    return formElement;
}
