import BaseSearchResults from "./search-results";


class ConsolidatedSearchResults extends BaseSearchResults {
    constructor() {
        super();
    }

    renderResults(data) {
        const fragment = document.createDocumentFragment();
        
        const list = document.createElement('ol');
        list.className = 'search-results';
        fragment.appendChild(list);

        const { searchResults, winningAds } = data;
        
        list.appendChild(this.buildWinningAdItem(winningAds[0]));

        for (let i = 0; i < Math.min(5, searchResults.length); i++) {
            const searchResult = searchResults[i];
            list.appendChild(this.buildResultItem(searchResult));
        }
        
        list.appendChild(this.buildWinningAdItem(winningAds[1]));

        for (let i = 5; i < searchResults.length; i++) {
            const searchResult = searchResults[i];
            list.appendChild(this.buildResultItem(searchResult));
        }

        this.replaceChildren(fragment);
    }
}


customElements.define("consolidated-search-results", ConsolidatedSearchResults);
