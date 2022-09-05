import './components/nav.js';
import './components/search-form.js';
import './components/search-results-consolidated.js';
import './components/star-rating.js';

import route from './router.js';


window.addEventListener('popstate', route);
window.addEventListener('DOMContentLoaded', route);

document.addEventListener('click', (event) => {
    if (event.target.matches('a:not([href*="//"])')) {
        event.preventDefault();
        history.pushState('', '', event.target.href);
        route();
    }
});