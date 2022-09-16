import identifiesAsElement from "./isElement";


export function clearBusy(target) {
    if (!identifiesAsElement(target)) return;

    target.removeAttribute('aria-busy');
}

export function renderBusy(target) {
    if (!identifiesAsElement(target)) return;

    target.replaceChildren();
    target.setAttribute('aria-busy', 'true');
}
