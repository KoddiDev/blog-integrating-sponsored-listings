import BaseSearchResults from "./search-results";


class ConsolidatedSearchResults extends BaseSearchResults {
    constructor() {
        super();
    }

    renderResults(data) {
        const { searchResults, winningAds } = data; 
        const ads = winningAds.map(ad => ({ ...ad, isAd: true }));

        const products = [
            ads.shift(),
            ...searchResults.slice(0, 5),
            ads.shift(),
            ...searchResults.slice(5),
            ads.shift()
        ];

        const fragment = document.createDocumentFragment();
        
        const list = document.createElement('ol');
        list.className = 'search-results';
        fragment.appendChild(list);

        for (const product of products) {
            const item = product.isAd 
                ? this.buildWinningAdItem(product) 
                : this.buildSearchResultItem(product);
            list.appendChild(item);
        }

        this.replaceChildren(fragment);
    }
}


customElements.define("consolidated-search-results", ConsolidatedSearchResults);
