import home from './views/home.js';
import consolidated from './views/consolidated.js';


const routes = {
    '/': { title: 'Home', render: home },
    '/consolidated': { title: 'Consolidated Calls', render: consolidated }
};

function fireEvent() {
    const event = new Event('route');
    document.dispatchEvent(event);
}

function route() {
    let view = routes[location.pathname];
    if (view) {
        document.title = view.title;
        app.innerHTML = view.render();
        fireEvent();
    } else {
        history.replaceState('', '', '/');
        route();
    }
}


export default route;