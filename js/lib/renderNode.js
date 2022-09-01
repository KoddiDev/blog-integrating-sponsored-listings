import identifiesAsElement from './isElement.js';
import identifiesAsNode from './isNode.js';
import { clearBusy } from './busy.js';


export default function renderNode(target, node) {
    if (!identifiesAsElement(target)) return;
    if (!identifiesAsNode(node)) return;

    clearBusy(target);
    target.appendChild(node);
}
