import PubSub from "pubsub-js";
import { SEARCH_REQUESTED, SEARCH_RESPONDED } from "../message-topics";

function View() {
    function simulateSearch() {
        PubSub.publish(SEARCH_RESPONDED, {
            searchResults: [
                { title: 'Wooden Slingshot', price: 21.99, description: '' },
                { title: 'Plastic Slingshot', price: 34.99, description: '' },
                { title: 'Iron Slingshot', price: 74.99, description: '' },
                { title: 'Steel Slingshot', price: 99.99, description: '' },
            ],
            winningAds: [
                { title: 'Titanium Slingshot', price: 349.99, description: '' },
                { title: 'Golden Slingshot', price: 299.99, description: '' },
            ]
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
                <consolidated-fast-search-results></consolidated-fast-search-results>
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
