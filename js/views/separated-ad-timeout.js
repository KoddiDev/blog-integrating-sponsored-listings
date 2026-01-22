import PubSub from "pubsub-js";
import { SEARCH_REQUESTED, SEARCH_RESULTS_RESPONDED, SEARCH_ADS_RESPONDED } from "../message-topics";

import { getSearchProducts, getSearchWinningAds } from '../data/get-search-data.js';
import delay from '../lib/delay.js';


function View() {
    const AdTimeoutMs = 3000;
    const AdResponseDelayMs = 5000;

    async function simulateSearch(searchParameters) {
        getSearchProducts(searchParameters, 400)
            .then(products => PubSub.publish(SEARCH_RESULTS_RESPONDED, products));

        // Simulate an ad service that is slow/unreliable.
        // The ad request would take 5 seconds, but we timeout after 3 seconds.
        Promise.race([
            getSearchWinningAds(searchParameters, AdResponseDelayMs),
            delay(AdTimeoutMs).then(() => { throw new Error('Ad request timeout'); })
        ])
            .then(winningAds => PubSub.publish(SEARCH_ADS_RESPONDED, winningAds))
            .catch(() => PubSub.publish(SEARCH_ADS_RESPONDED, []));
    }

    return {
        title: 'Separated Calls - Ad Timeout',

        render: function () {
            return `
                <hgroup>
                    <h2>Separated Calls</h2>
                    <h3>Ad Timeout</h3>
                </hgroup>
                <p>
                    This scenario demonstrates <strong>graceful degradation</strong> when the ad service
                    is slow or unresponsive. The search results return quickly (400ms), but the ad service
                    would take 5 seconds to respond. We set a generous 3-second timeout for ads.
                </p>
                <p>
                    With separated calls, this timeout doesn't hurt the user experience because search
                    results are already displayed. When the timeout occurs, the placeholders are simply
                    removed. Users still have a complete experience, even when ads fail.
                </p>
                <p>
                    <strong>Key benefit:</strong> In a consolidated approach, you'd either wait 5 seconds
                    (terrible UX) or set a short timeout and lose revenue. With separated calls, you can
                    afford longer timeouts without impacting perceived performance.
                </p>

                <hr>

                <search-form></search-form>
                <separated-static-search-results usePlaceholders></separated-static-search-results>
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
