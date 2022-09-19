import BaseSeparatedSearchResults from "./search-results-separated";


class SeparatedStaticSearchResults extends BaseSeparatedSearchResults {
    constructor() {
        super();
    }

    get usePlaceholders() {
        return this.hasAttribute('usePlaceholders');
    }

    set usePlaceholders(value) {
        this.setAttribute('usePlaceholders', '');
    }

    renderResults(searchResults) {
        const ExpectedAdCount = 3;

        const fragment = document.createDocumentFragment();
        
        const list = document.createElement('ol');
        list.className = 'search-results';
        fragment.appendChild(list);

        for (const product of searchResults) {
            const item = this.buildSearchResultItem(product);
            list.appendChild(item);
        }

        if (this.usePlaceholders) {
            const placeholders = Array(ExpectedAdCount).fill({ isPlaceholder: true });
            this.insertListItemsAtAdPositions(placeholders, searchResults.length, list);
        }

        this.replaceChildren(fragment);
    }

    renderAds(winningAds) {
        // TODO: Wait until the search results have rendered.

        const list = this.querySelector('ol');
        const searchResultCount = list.childElementCount;

        if (this.usePlaceholders) {
            this.replacePlaceholderListItems(winningAds, searchResultCount, list);
            
            // Remove any remaining placeholders (we may have expected more ads than we actually received).
            const remainingPlaceholders = this.querySelectorAll('li.placeholder');
            for (const placeholder of remainingPlaceholders) {
                placeholder.remove();
            }
        } else {
            this.insertListItemsAtAdPositions(winningAds, searchResultCount, list);
        }
    }

    insertListItemsAtAdPositions(winningAds, searchResultCount, list) {
        const ads = this.determinePlacementForAds(winningAds, searchResultCount);
        for (let index = 0; index < ads.length; index++) {
            const ad = ads[index];
            const resultItem = list.childNodes[ad.placementIndex + index];

            const item = ad.isPlaceholder 
                ? this.buildPlaceholderItem()
                : this.buildWinningAdItem(ad);
            list.insertBefore(item, resultItem);
        }
    }

    replacePlaceholderListItems(winningAds, searchResultCount, list) {
        const ads = this.determinePlacementForAds(winningAds, searchResultCount);
        for (let index = 0; index < ads.length; index++) {
            const ad = ads[index];
            const resultItem = list.childNodes[ad.placementIndex + index];

            const item = this.buildWinningAdItem(ad);
            if (resultItem.matches('.placeholder')) {
                list.replaceChild(item, resultItem);
            } else {
                list.insertBefore(item, resultItem);
            }
        }
    }

    determinePlacementForAds(ads, searchResultCount) {
        const AdIndexOffset = 5;

        let placementIndex = 0;
        const placedAds = ads.map(ad => {
            const placedAd = { ...ad, placementIndex: placementIndex };
            placementIndex = Math.min(placementIndex + AdIndexOffset, searchResultCount);

            return placedAd;
        });

        return placedAds;
    }
}


customElements.define("separated-static-search-results", SeparatedStaticSearchResults);
