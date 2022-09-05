class StarRating extends HTMLElement {
    constructor() {
        super();
    }

    get value() {
        return this.getAttribute('value');
    }

    set value(value) {
        this.setAttribute('value', value);
    }

    connectedCallback() {
        if (!this.isConnected) return;
        this.render();
    }

    render() {
        if (this._isRendered) return;

        this.innerHTML = `
            <div class="rating">
                <progress value="${this.value}" max="5">3.3 of 5.0</progress>
                <svg><use href="#fiveStars" /></svg>
            </div>
        `;

        this._isRendered = true;
    }
}


customElements.define("star-rating", StarRating);