class StarRating extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        const value = this.getAttribute('value');

        this.innerHTML = `
            <div class="rating">
                <progress value="${value}" max="5">3.3 of 5.0</progress>
                <svg><use href="#fiveStars" /></svg>
            </div>
        `;
    }
}


customElements.define("star-rating", StarRating);