import BaseSeparatedSearchResults from "./search-results-separated";


class SeparatedStaticSearchResults extends BaseSeparatedSearchResults {
    constructor() {
        super();
    }

    renderResults(searchResults) {
        const fragment = document.createDocumentFragment();
        
        const list = document.createElement('ol');
        list.className = 'search-results';
        fragment.appendChild(list);

        for (const product of searchResults) {
            const item = this.buildSearchResultItem(product);
            list.appendChild(item);
        }

        this.replaceChildren(fragment);
    }

    renderAds(winningAds) {
        // TODO: Wait until the search results have rendered.

        const list = this.querySelector('ol');
        const searchResultCount = list.childElementCount;

        const ads = this.determinePlacementForAds(winningAds, searchResultCount);
        for (let index = 0; index < ads.length; index++) {
            const ad = ads[index];
            const resultItem = list.childNodes[ad.placementIndex + index];

            const item = this.buildWinningAdItem(ad);
            list.insertBefore(item, resultItem);
        }
    }

    determinePlacementForAds(winningAds, searchResultCount) {
        const AdIndexOffset = 5;

        let placementIndex = 0;
        const ads = winningAds.map(winningAd => {
            const ad = { ...winningAd, placementIndex: placementIndex };
            placementIndex = Math.min(placementIndex + AdIndexOffset, searchResultCount);

            return ad;
        });

        return ads;
    }
}


customElements.define("separated-static-search-results", SeparatedStaticSearchResults);
