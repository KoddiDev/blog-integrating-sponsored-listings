function isElement(target) {
    return typeof HTMLElement === "object" && target instanceof HTMLElement;
}

function isElementLike(target) {
    return target !== undefined 
        && typeof target === "object" 
        && target.nodeType === 1 
        && typeof target.nodeName === "string";
}


// Returns true if the target is a DOM Element.
function identifiesAsElement(target) {
    return isElement(target) || isElementLike(target);
}


export default identifiesAsElement;