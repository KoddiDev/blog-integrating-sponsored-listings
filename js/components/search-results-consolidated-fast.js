import BaseSearchResults from "./search-results";


class ConsolidatedFastSearchResults extends BaseSearchResults {
    constructor() {
        super();
    }

    renderResults() {
        const fragment = document.createDocumentFragment();
        
        const list = document.createElement('ol');
        fragment.appendChild(list);

        list.appendChild(this.buildWinningAdItem());
        list.appendChild(this.buildResultItem());
        list.appendChild(this.buildResultItem());
        list.appendChild(this.buildResultItem());
        list.appendChild(this.buildResultItem());
        list.appendChild(this.buildResultItem());
        list.appendChild(this.buildWinningAdItem());
        list.appendChild(this.buildResultItem());
        list.appendChild(this.buildResultItem());
        list.appendChild(this.buildResultItem());
        list.appendChild(this.buildResultItem());
        list.appendChild(this.buildResultItem());

        this.replaceChildren(fragment);
    }
}


customElements.define("consolidated-fast-search-results", ConsolidatedFastSearchResults);
