import './components/nav.js';
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