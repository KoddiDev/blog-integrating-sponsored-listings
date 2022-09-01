import PubSub from "pubsub-js";
import { SEARCH_REQUESTED, SEARCH_RESPONDED } from '../message-topics.js';


export default class BaseSearchResults extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.isConnected) return;

        this.searchRequestedToken = PubSub.subscribe(SEARCH_REQUESTED, () => this.renderLoading());
        
        this.searchRespondedToken = PubSub.subscribe(SEARCH_RESPONDED, () => {
            this.renderLoading(false);
            this.renderResults();
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

    buildResultItem() {
        const item = document.createElement('li');
        item.innerHTML = '[ result item ]';
        return item;
    }

    buildWinningAdItem() {
        const item = document.createElement('li');
        item.innerHTML = '[ winning ad ]';
        return item;
    }


    renderLoading(isLoading = true) {
        this.replaceChildren();

        isLoading 
            ? this.setAttribute('aria-busy', 'true') 
            : this.removeAttribute('aria-busy');
    }

    renderResults() {
        
    }
}
