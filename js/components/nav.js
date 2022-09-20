import PubSub from 'pubsub-js';
import { ROUTE } from '../message-topics.js';


class AppNav extends HTMLElement {
    constructor() {
        super();

        const menuItems = [
            { title: 'Introduction', href: '/' },
            { isDivider: true },
            { 
                title: 'Consolidated Calls', href: '/consolidated',
                menuItems: [
                    { title: 'Fast Results', href: '/consolidated/fast-results' },
                    { title: 'Slow Results', href: '/consolidated/slow-results' }
                ]
            },
            { 
                title: 'Separated Calls', href: '/separated',
                menuItems: [
                    { title: 'Content Shift', href: '/separated/content-shift' },
                    { title: 'Placeholders', href: '/separated/placeholders' }
                ]
            }
        ];
        
        this.menuItems = menuItems;
    }

    connectedCallback() {
        if (!this.isConnected) return;
        this.render();
        this.routeSubToken = PubSub.subscribe(ROUTE, () => this.handleRoute());
    }

    disconnectedCallback() {
        PubSub.unsubscribe(this.routeSubToken);
    }

    
    render() {
        if (this._isRendered) return;

        const nav = document.createElement('nav');
        const menuItemList = this.buildMenuItemList(this.menuItems);
        nav.appendChild(menuItemList);
        this.appendChild(nav);

        this._isRendered = true;
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
    }
}


customElements.define("app-nav", AppNav);
