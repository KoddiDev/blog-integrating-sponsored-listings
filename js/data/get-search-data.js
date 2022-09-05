import delay from '../lib/delay.js';
import { acmeSlingshotProducts, acmeSlingshotWinningAds } from "./acme-slingshot-store";


// NOTE: Currently, we're ignoring search parameters as this is a simulation.

export async function getConsolidatedSearchData(searchParameters, delayInMilliseconds = 0, excludeWinningAds = false) {
    const searchResults = await getSearchProducts(searchParameters);
    const winningAds = await getSearchWinningAds(searchParameters, delayInMilliseconds);

    return {
        searchResults, 
        winningAds: excludeWinningAds ? [] : winningAds
    };
}

export async function getSearchProducts(searchParameters, delayInMilliseconds = 0) {
    if (delayInMilliseconds > 0) {
        await delay(delayInMilliseconds);
    }

    return acmeSlingshotProducts;
}

export async function getSearchWinningAds(searchParameters, delayInMilliseconds = 0) {
    if (delayInMilliseconds > 0) {
        await delay(delayInMilliseconds);
    }

    return acmeSlingshotWinningAds;
}
