import PubSub from "pubsub-js";
import { SEARCH_REQUESTED, SEARCH_RESULTS_RESPONDED, SEARCH_ADS_RESPONDED } from "../message-topics";

import { getSearchProducts, getSearchWinningAds } from '../data/get-search-data.js';


function View() {
    async function simulateSearch(searchParameters) {
        getSearchProducts(searchParameters, 400)
            .then(products => PubSub.publish(SEARCH_RESULTS_RESPONDED, products));

        getSearchWinningAds(searchParameters, 1800)
            .then(winningAds => PubSub.publish(SEARCH_ADS_RESPONDED, winningAds));
    }

    return {
        title: 'Separated Calls - Content Shift',

        render: function () {
            return `
                <hgroup>
                    <h2>Separated Calls</h2>
                    <h3>Content Shift</h3>
                </hgroup>
                <p>
                    In this scenario, submitting the search form below will <strong>simulate</strong> two, 
                    separate calls to the server in parallel.
                    The winning ads response will be simulated to return a bit <strong>later</strong> 
                    than the search results. 
                    The winning ads will be inserted into the page after the search results are rendered. 
                    This will result in <strong>content shift</strong>; a poor user experience.
                </p>
                
                <hr>
                
                <search-form></search-form>
                <separated-static-search-results></separated-static-search-results>
            `;
        },

        onSetup: function () {
            this.searchRequestedToken = PubSub.subscribe(SEARCH_REQUESTED, (topic, data) => simulateSearch(data));
        },

        onTeardown: function () {
            PubSub.unsubscribe(this.searchRequestedToken);
        }
    };
}


export default View;
