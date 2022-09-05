import PubSub from "pubsub-js";
import { SEARCH_REQUESTED, SEARCH_RESPONDED } from "../message-topics";

import { getConsolidatedSearchData } from '../data/get-search-data.js';


function View() {
    async function simulateSearch(searchParameters) {
        const searchData = await getConsolidatedSearchData(searchParameters, 400);
        PubSub.publish(SEARCH_RESPONDED, searchData);
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
                    The response will be <strong>fast</strong> enough for our UX requirements, 
                    so we will see search results and winning ads come back together.
                </p>
                
                <hr>
                
                <search-form></search-form>
                <consolidated-search-results></consolidated-search-results>
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
