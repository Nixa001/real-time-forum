
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

export function createParagraph(className, text) {
    const p = document.createElement('p');
    p.className = className;
    p.innerHTML = text;
    return p;
}

export function createHeading(tagName, text) {
    const heading = document.createElement(tagName);
    heading.innerHTML = text;
    return heading;
}


export function createInput(type, name, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    input.className = 'input-field';  
    return input;
}