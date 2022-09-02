import PubSub from "pubsub-js";
import { SEARCH_REQUESTED } from '../message-topics.js';


class SearchForm extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `
            <section>
                <h3>Search the Acme Store</h3>
                <form>
                    <input type="search" placeholder="Search terms" value="coyote slingshot" readonly>
                    
                    <div class="grid">
                        <label for="minPrice">Min Price: $20.00
                            <input type="range" min="1" max="500" value="20" id="minPrice" readonly disabled>
                        </label>
                        <label for="maxPrice">Max Price: $450.00
                            <input type="range" min="1" max="500" value="450" id="maxPrice" readonly disabled>
                        </label>
                    </div>
                    
                    <button type="submit">Search</button>
                </form>
            </section>
        `;

        this.addEventListener('submit', event => {
            event.preventDefault();
            PubSub.publish(SEARCH_REQUESTED);
        });
    }
}


customElements.define("search-form", SearchForm);