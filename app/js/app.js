"use strict";

document.addEventListener("DOMContentLoaded", function () {
    mobileBurgerMenu('.js-burger-opener', '.js-mobile-nav');
    new Tabs('.js-tab-nav', '.js-tab');
    new OpenClose('.js-open-close', '.js-opener', '.js-close', true);
});

function mobileBurgerMenu(openerSelector, holderSelector, activeClass = 'mobile-nav-active') {
    if (!document.querySelector(openerSelector) || !document.querySelector(holderSelector)) return;

    const holder = document.querySelector(holderSelector);
    const opener = holder.querySelector(openerSelector);
    const body = document.querySelector('body');

    opener.addEventListener('click', (event) => {
        event.preventDefault();
        if (!body.classList.contains(activeClass)) {
            body.classList.add(activeClass);
        } else {
            body.classList.remove(activeClass);
        }
    });
}

class Tabs {
    constructor(navSelector, tabsSelector) {
        this.nav = document.querySelector(navSelector);
        this.links = this.nav.querySelectorAll('a');
        this.tabs = document.querySelectorAll(tabsSelector);
        this.linkActiveClass = 'active';

        this.init();
    }

    init() {
        this.displayCurrentTab(0);
        this.attachEvents();
        this.links[0].classList.add(this.linkActiveClass);
    }

    displayCurrentTab(current) {
        for (let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].style.display = (current === i) ? "block" : "none";
        }
        document.querySelector('body').classList.remove('mobile-nav-active');
    }

    clearActiveClass() {
        this.links.forEach(item => {
            item.classList.remove(this.linkActiveClass)
        });
    }

    attachEvents() {
        this.nav.addEventListener("click", event => {
            if (event.target.className === "js-tab-link") {
                for (let i = 0; i < this.links.length; i++) {
                    if (event.target === this.links[i]) {
                        this.clearActiveClass();
                        this.displayCurrentTab(i);
                        event.target.classList.add(this.linkActiveClass);
                        break;
                    }
                }
            }
        });
    }
}

class OpenClose {
    constructor(holders, opener, closeBtn, hideOnClickOutside, focus = false) {
        if (!document.querySelectorAll(holders)) return;

        this.holders = document.querySelectorAll(holders);
        this.opener = opener;
        this.closeBtn = closeBtn;
        this.hideOnClickOutside = hideOnClickOutside;
        this.focus = focus;

        this.attachEvents();
    }

    attachEvents() {
        this.holders.forEach((currentEl) => {
            const opener = currentEl.querySelector(this.opener);
            opener.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();

                if (currentEl.classList.contains('active')) {
                    this.removeClass(currentEl);
                } else {
                    this.addClass(currentEl);
                    if (this.focus !== false) {
                        let elToFocus = currentEl.querySelector(this.focus);

                        if (elToFocus != null) {
                            elToFocus.focus();
                        }
                    }
                }

                if (this.hideOnClickOutside) {
                    //hide other drop if open
                    this.holders.forEach((item) => {
                        if (item.classList.contains('active') && item !== currentEl) {
                            this.removeClass(item);
                        }
                    });
                }
            });

            const closeBtn = currentEl.querySelector(this.closeBtn);
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.removeClass(currentEl);
                });
            }

            if (this.hideOnClickOutside) {
                //hide drop on click outside
                document.addEventListener('click', (el) => {
                    if (!currentEl.contains(el.target)) {
                        this.removeClass(currentEl);
                    }
                });
            }
        });
    }

    addClass(e) {
        e.classList.add('active');
    }

    removeClass(e) {
        e.classList.remove('active');
    }
}