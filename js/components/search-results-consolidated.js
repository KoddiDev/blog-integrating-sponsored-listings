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

        const firstWinningAd = winningAds.shift();
        if (firstWinningAd) {
            list.appendChild(this.buildWinningAdItem(firstWinningAd));
        }

        for (let i = 0; i < Math.min(5, searchResults.length); i++) {
            const searchResult = searchResults[i];
            list.appendChild(this.buildResultItem(searchResult));
        }
        
        const secondWinningAd = winningAds.shift();
        if (secondWinningAd) {
            list.appendChild(this.buildWinningAdItem(secondWinningAd));
        }

        for (let i = 5; i < searchResults.length; i++) {
            const searchResult = searchResults[i];
            list.appendChild(this.buildResultItem(searchResult));
        }

        this.replaceChildren(fragment);
    }
}


customElements.define("consolidated-search-results", ConsolidatedSearchResults);
