import PubSub from "pubsub-js";
import { SEARCH_REQUESTED, SEARCH_RESPONDED } from '../message-topics.js';

import { clearBusy, renderBusy } from "../lib/busy.js";


export default class BaseSearchResults extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.isConnected) return;

        this.searchRequestedToken = PubSub.subscribe(SEARCH_REQUESTED, () => renderBusy(this));
        
        this.searchRespondedToken = PubSub.subscribe(SEARCH_RESPONDED, (topic, data) => {
            clearBusy(this);
            this.renderResults(data);
        });
    }

    disconnectedCallback() {
        PubSub.unsubscribe(this.searchRequestedToken);
        PubSub.unsubscribe(this.searchRespondedToken);
    }


    buildPlaceholderItem() {
        const item = document.createElement('li');
        item.innerHTML = '[ placeholder ]';
        return item;
    }

    buildResultItem(result, isSponsored) {
        const item = document.createElement('li');
        
        const section = document.createElement('section');
        item.appendChild(section);

        if (isSponsored) {
            const sponsored = document.createElement('div');
            sponsored.textContent = 'Sponsored';
            sponsored.title = 'This ad is being shown to you based on the product\'s relevance to your search.';
            section.appendChild(sponsored);
        }

        const heading = document.createElement('h3');
        heading.textContent = result.title;
        section.appendChild(heading);

        const rating = document.createElement('star-rating');
        rating.value = result.rating;
        section.appendChild(rating);

        const price = document.createElement('div');
        price.className = 'price';
        price.textContent = `${result.price}`;
        section.appendChild(price);

        const summary = document.createElement('p');
        summary.innerHTML = result.summary;
        section.appendChild(summary);

        return item;
    }

    buildSearchResultItem(searchResult) {
        return this.buildResultItem(searchResult, false);
    }

    buildWinningAdItem(winningAd) {
        return this.buildResultItem(winningAd, true);
    }

    renderResults() {
        throw new Error('The renderResults() method must be overridden.');
    }
}
