import BaseSearchResults from "./search-results";


class ConsolidatedSearchResults extends BaseSearchResults {
    constructor() {
        super();
    }

    renderResults(data) {
        const { searchResults, winningAds } = data; 
        
        const fragment = document.createDocumentFragment();
        const list = document.createElement('ol');
        list.className = 'search-results';
        fragment.appendChild(list);

        const products = this.positionAdsAmongSearchResults(winningAds, searchResults);
        for (const product of products) {
            const item = product.isAd 
                ? this.buildWinningAdItem(product) 
                : this.buildSearchResultItem(product);
            list.appendChild(item);
        }

        this.replaceChildren(fragment);
    }

    positionAdsAmongSearchResults(winningAds, searchResults) {
        const AdIndexOffset = 5;

        const products = [];
        let placementIndex = 0;
        for (let index = 0; index < winningAds.length; index++) {
            const ad = winningAds[index];

            products.push(
                { ...ad, isAd: true },
                ...searchResults.slice(placementIndex, placementIndex + AdIndexOffset)
            );

            placementIndex += AdIndexOffset;
        }

        products.push(...searchResults.slice(placementIndex));

        return products;
    }
}


customElements.define("consolidated-search-results", ConsolidatedSearchResults);
