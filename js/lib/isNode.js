function isNode(target) {
    return typeof Node === "object" && target instanceof Node;
}

function isNodeLike(target) {
    return target !== undefined 
        && typeof target === "object" 
        && typeof target.nodeType === "number" 
        && typeof target.nodeName === "string";
}


// Returns true if the target is a DOM Node.
function identifiesAsNode(target) {
    return isNode(target) || isNodeLike(target);
}


export default identifiesAsNode;