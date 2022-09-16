import BaseSearchResults from "./search-results";

import PubSub from "pubsub-js";
import { SEARCH_REQUESTED, SEARCH_RESULTS_RESPONDED, SEARCH_ADS_RESPONDED } from '../message-topics.js';

import { clearBusy, renderBusy } from "../lib/busy.js";


const PlaceholderResult = {
    title: 'Loading&hellip;', 
    price: 0.00, 
    rating: 0.0, 
    summary: '&hellip;'
};

export default class BaseSeparatedSearchResults extends BaseSearchResults {
    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.isConnected) return;

        this.searchRequestedToken = PubSub.subscribe(SEARCH_REQUESTED, () => renderBusy(this));
        
        this.searchResultsRespondedToken = PubSub.subscribe(SEARCH_RESULTS_RESPONDED, (topic, searchResults) => {
            clearBusy(this);
            this.renderResults(searchResults);
        });

        this.searchAdsRespondedToken = PubSub.subscribe(SEARCH_ADS_RESPONDED, (topic, winningAds) => {
            clearBusy(this);
            this.renderAds(winningAds);
        });
    }

    disconnectedCallback() {
        PubSub.unsubscribe(this.searchRequestedToken);
        PubSub.unsubscribe(this.searchResultsRespondedToken);
        PubSub.unsubscribe(this.searchAdsRespondedToken);
    }


    buildPlaceholderItem() {
        const item = this.buildResultItem(PlaceholderResult, true);
        item.className = 'placeholder';
        return item;
    }

    renderResults() {
        throw new Error('The renderResults() method must be overridden.');
    }

    renderAds() {
        throw new Error('The renderAds() method must be overridden.');
    }
}
