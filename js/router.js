import PubSub from 'pubsub-js';
import { ROUTE } from './message-topics.js';

import isString from './lib/isString.js';
import isNode from './lib/isNode.js';
import { renderBusy } from './lib/busy.js';
import renderHTMLString from './lib/renderHTMLString';
import renderNode from './lib/renderNode.js';

import home from './views/home.js';
import consolidated from './views/consolidated.js';
import consolidatedFast from './views/consolidated-fast.js';


const routes = {
    '/': { title: 'Home', render: home },
    '/consolidated': { title: 'Consolidated Calls', render: consolidated },
    '/consolidated/fast-results': { title: 'Consolidated Calls - Fast Results', render: consolidatedFast }
};

function renderView(view) {
    const app = document.getElementById('app');
    renderBusy(app);

    const viewOutput = view?.render();
    
    if (isString(viewOutput)) {
        renderHTMLString(app, viewOutput);
    } else if (isNode(viewOutput)) {
        renderNode(target, viewOutput);
    }
}


function route() {
    let view = routes[location.pathname];
    if (view) {
        document.title = `Demo: ${view.title}`;
        renderView(view);
        PubSub.publish(ROUTE);
    } else {
        history.replaceState('', '', '/');
        route();
    }
}


export default route;