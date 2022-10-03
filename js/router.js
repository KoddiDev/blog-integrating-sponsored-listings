import PubSub from 'pubsub-js';
import { ROUTE } from './message-topics.js';

import isFunction from './lib/isFunction.js';
import isString from './lib/isString.js';
import isNode from './lib/isNode.js';
import { renderBusy } from './lib/busy.js';
import renderHTMLString from './lib/renderHTMLString';
import renderNode from './lib/renderNode.js';
import url from './lib/url.js';

import homeView from './views/home.js';

import consolidatedView from './views/consolidated.js';
import consolidatedMeetsRequirementsView from './views/consolidated-meets-requirements.js';
import consolidatedUnexpectedLatencyView from './views/consolidated-unexpected-latency.js';

import separatedView from './views/separated.js';
import separatedContentShiftView from './views/separated-content-shift.js';
import separatedPlaceholdersView from './views/separated-placeholders.js';


let currentView;

const definedRoutes = {
    '/': homeView,
    '/consolidated': consolidatedView,
    '/consolidated/meets-requirements': consolidatedMeetsRequirementsView,
    '/consolidated/unexpected-latency': consolidatedUnexpectedLatencyView,
    '/separated': separatedView,
    '/separated/content-shift': separatedContentShiftView,
    '/separated/placeholders': separatedPlaceholdersView
};

const routes = {};
for (const route in definedRoutes) {
    routes[url(route)] = definedRoutes[route];
}


function renderView(view) {
    if (view === undefined) return;

    runTeardownForView(currentView);
    currentView = view;

    const app = document.getElementById('app');
    renderBusy(app);

    runSetupForView(currentView);
    renderViewContents(app, currentView);
}

function runSetupForView(view) {
    if (isFunction(view?.onSetup)) {
        view?.onSetup();
    }
}

function runTeardownForView(view) {
    if (isFunction(view?.onTeardown)) {
        view?.onTeardown();
    }
}

function renderViewContents(target, view) {
    const viewOutput = view.render();

    if (isString(viewOutput)) {
        renderHTMLString(target, viewOutput);
    } else if (isNode(viewOutput)) {
        renderNode(target, viewOutput);
    }
}


function route() {
    let view = routes[location.pathname];
    if (view) {
        // Is the view a constructor?
        if (isFunction(view)) {
            view = view();
        }

        document.title = `Demo: ${view.title}`;
        renderView(view);
        PubSub.publish(ROUTE);
    } else {
        history.replaceState('', '', url('/'));
        route();
    }
}


export default route;