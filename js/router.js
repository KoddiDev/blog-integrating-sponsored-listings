import PubSub from 'pubsub-js';
import { ROUTE } from './message-topics.js';

import home from './views/home.js';
import consolidated from './views/consolidated.js';


const routes = {
    '/': { title: 'Home', render: home },
    '/consolidated': { title: 'Consolidated Calls', render: consolidated }
};


function route() {
    let view = routes[location.pathname];
    if (view) {
        document.title = `Demo: ${view.title}`;
        app.innerHTML = view.render();
        PubSub.publish(ROUTE);
    } else {
        history.replaceState('', '', '/');
        route();
    }
}


export default route;