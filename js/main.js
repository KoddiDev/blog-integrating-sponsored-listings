import './components/nav.js';
import route from './router.js';


window.addEventListener('popstate', route);
window.addEventListener('DOMContentLoaded', route);
