import './components/nav.js';
import './components/search-form.js';
import './components/search-results-consolidated.js';
import './components/search-results-separated-static.js';
import './components/star-rating.js';

import route from './router.js';


window.addEventListener('popstate', route);
window.addEventListener('DOMContentLoaded', route);

document.addEventListener('click', event => {
    // Watch for internal links only (anything without //).
    if (event.target.matches('a:not([href*="//"])')) {
        event.preventDefault();
        history.pushState('', '', event.target.pathname);
        route();
    }
});