import PubSub from 'pubsub-js';
import { ROUTE } from '../message-topics.js';

import route from '../router.js';


class AppNav extends HTMLElement {
    constructor() {
        super();

        const menuItems = [
            { title: 'Introduction', href: '/' },
            { isDivider: true },
            { 
                title: 'Consolidated Calls', href: '/consolidated',
                menuItems: [
                    { title: 'Fast Results', href: '/consolidated/fast-results' }
                ]
            },
            { 
                title: 'Separated Calls', href: '/separated',
                menuItems: []
            }
        ];
        
        this.menuItems = menuItems;
        this.render();
    }

    connectedCallback() {
        if (!this.isConnected) return;
        this.routeSubToken = PubSub.subscribe(ROUTE, () => this.handleRoute());
    }

    disconnectedCallback() {
        PubSub.unsubscribe(this.routeSubToken);
    }

    
    render() {
        const nav = document.createElement('nav');
        const menuItemList = this.buildMenuItemList(this.menuItems);
        nav.appendChild(menuItemList);
        this.appendChild(nav);
    }


    buildMenuItemList(menuItems) {
        const itemList = document.createElement('ul');

        for (const menuItem of menuItems) {
            const item = menuItem.isDivider ? this.buildDividerItem() : this.buildLinkItem(menuItem);
            itemList.appendChild(item);

            if (menuItem?.menuItems?.length > 0) {
                const subItemList = this.buildMenuItemList(menuItem.menuItems);
                item.appendChild(subItemList);
            }
        }

        return itemList;
    }

    buildDividerItem() {
        const item = document.createElement('li');
        const rule = document.createElement('hr');
        item.appendChild(rule);

        return item;
    }

    buildLinkItem(menuItem) {
        const item = document.createElement('li');
        
        const link = document.createElement('a');
        link.href = menuItem.href;
        link.className = 'secondary';
        link.text = menuItem.title;
        item.appendChild(link);

        return item;
    }

    handleRoute() {
        const navLinks = this.querySelectorAll('a');
        for (const link of navLinks) {
            if (link.matches(`[href='${location.pathname}']`)) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        }

        const matchingLink = this.querySelector(`a[href='${location.pathname}']`);
        matchingLink?.setAttribute('aria-current', 'page');
    }
}


customElements.define("app-nav", AppNav);
