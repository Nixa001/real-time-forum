
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