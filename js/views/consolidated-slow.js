import PubSub from "pubsub-js";
import { SEARCH_REQUESTED, SEARCH_RESPONDED } from "../message-topics";

import { getConsolidatedSearchData } from '../data/get-search-data.js';


function View() {
    async function simulateSearch(searchParameters) {
        const searchData = await getConsolidatedSearchData(searchParameters, 1500, true);
        PubSub.publish(SEARCH_RESPONDED, searchData);
    }

    return {
        title: 'Consolidated Calls - Slow Results',

        render: function () {
            return `
                <hgroup>
                    <h2>Consolidated Calls</h2>
                    <h3>Slow Results</h3>
                </hgroup>
                <p>
                    In this scenario, submitting the search form below will <strong>simulate</strong> a single, 
                    consolidated call to the server.
                    The winning ads response will be simulated as <strong>slow</strong>, 
                    therefore reaching the limit of our UX requirements. 
                    As a results, we will choose to not return any winning ads.
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
