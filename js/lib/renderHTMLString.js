import isString from './isString.js';
import { clearBusy } from './busy.js';


export default function renderHTMLString(target, htmlString) {
    if (!isString(htmlString)) return;

    clearBusy(target);
    target.innerHTML = htmlString;
}
