import { convertToNumberWithDefault } from "../lib/convertToSafeNumber";


class StarRating extends HTMLElement {
    constructor() {
        super();
    }

    get value() {
        return convertToNumberWithDefault(this.getAttribute('value'), 0);
    }

    set value(value) {
        if (!Number.isFinite(value)) {
            value = 0.0;
        }

        this.setAttribute('value', value);
    }

    connectedCallback() {
        if (!this.isConnected) return;
        this.render();
    }

    render() {
        if (this._isRendered) return;

        this.innerHTML = `
            <div class="rating" title="${this.value} out of 5.0">
                <progress value="${this.value}" max="5">${this.value} out of 5.0</progress>
                <svg><use href="#fiveStars" /></svg>
            </div>
        `;

        this._isRendered = true;
    }
}


customElements.define("star-rating", StarRating);