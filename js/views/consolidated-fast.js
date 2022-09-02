import PubSub from "pubsub-js";
import { SEARCH_REQUESTED, SEARCH_RESPONDED } from "../message-topics";

import { acmeSlingshotProducts, acmeSlingshotWinningAds } from "../acme-slingshot-data";


function View() {
    function simulateSearch() {
        PubSub.publish(SEARCH_RESPONDED, {
            searchResults: acmeSlingshotProducts,
            winningAds: acmeSlingshotWinningAds
        });
    }

    return {
        title: 'Consolidated Calls - Fast Results',

        render: function () {
            return `
                <hgroup>
                    <h2>Consolidated Calls</h2>
                    <h3>Fast Results</h3>
                </hgroup>
                <p>
                    In this scenario, submitting the search form below will <strong>simulate</strong> a single, 
                    consolidated call to the server.
                    The response will be fast enough for our UX requirements, 
                    so we will see search results and winning ads come back together.
                </p>
                
                <hr>
                
                <search-form></search-form>
                <consolidated-search-results></consolidated-search-results>
            `;
        },

        onSetup: function () {
            this.searchRequestedToken = PubSub.subscribe(SEARCH_REQUESTED, () => simulateSearch());
        },

        onTeardown: function () {
            PubSub.unsubscribe(this.searchRequestedToken);
        }
    };
}


export default View;
