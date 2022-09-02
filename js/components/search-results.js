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

    buildResultItem(searchResult) {
        const item = document.createElement('li');
        item.innerHTML = `${searchResult.title} for ${searchResult.price}`;
        return item;
    }

    buildWinningAdItem(winningAd) {
        const item = document.createElement('li');
        item.innerHTML = `SPONSORED :: ${winningAd.title} for ${winningAd.price}`;
        return item;
    }

    renderResults() {
        throw new Error('The renderResults() method must be overridden.');
    }
}
