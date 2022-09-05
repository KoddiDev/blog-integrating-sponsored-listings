class StarRating extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="rating">
                <progress value="3.3" max="5">3.3 of 5.0</progress>
                <svg><use href="#fiveStars" /></svg>
            </div>
        `;
    }
}


customElements.define("star-rating", StarRating);