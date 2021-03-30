"use strict";

document.addEventListener("DOMContentLoaded", function () {
    mobileBurgerMenu('.js-burger-opener', '.js-mobile-nav');
    new Tabs('.js-tab-nav', '.js-tab');
    new OpenClose({
        holders: '.js-open-close',
        close: '.js-close',
        hideOnClickOutside: true
    });
    new OpenClose({
        holders: '.js-advanced-openclose',
        hideOnClickOutside: false,
        addClassOnEnd: true
    });
    new OpenClose({
        holders: '.js-openclose-deposit',
        hideOnClickOutside: false,
        classToBody: 'deposit-active'
    });
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
    constructor(params) {
        if (!document.querySelectorAll(params.holders)) return;

        this.holders = document.querySelectorAll(params.holders);
        this.opener = params.opener ? params.opener : '.js-opener';
        this.closeBtn = params.close;
        this.hideOnClickOutside = params.hideOnClickOutside;
        this.addClassOnEnd = params.addClassOnEnd;
        this.classToBody = params.classToBody;
        this.activeClass = params.activeClass ? params.activeClass : 'active';
        this.finishClass = params.finishClass ? params.finishClass : 'finished';

        this.attachEvents();
    }

    attachEvents() {
        this.holders.forEach((currentEl) => {
            const opener = currentEl.querySelector(this.opener);
            opener.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();

                if (currentEl.classList.contains(this.activeClass)) {
                    this.removeClass(currentEl);
                    if (this.addClassOnEnd) {
                        this.removeFinishClass(currentEl)
                    }
                    if (this.classToBody) {
                        document.querySelector('body').classList.remove(this.classToBody);
                    }
                } else {
                    this.addClass(currentEl);
                    if (this.addClassOnEnd) {
                        this.addFinishClass(currentEl)
                    }
                    if (this.classToBody) {
                        document.querySelector('body').classList.add(this.classToBody);
                    }
                }

                if (this.hideOnClickOutside) {
                    //hide other drop if open
                    this.holders.forEach((item) => {
                        if (item.classList.contains(this.activeClass) && item !== currentEl) {
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
        e.classList.add(this.activeClass);
    }

    removeClass(e) {
        e.classList.remove(this.activeClass);
    }

    addFinishClass(e) {
        this.timeout = setTimeout(() => {
            if (e.classList.contains(this.activeClass)) {
                e.classList.add(this.finishClass);
            }
        }, 300);
    }

    removeFinishClass(e) {
        e.classList.remove(this.finishClass);
    }
}