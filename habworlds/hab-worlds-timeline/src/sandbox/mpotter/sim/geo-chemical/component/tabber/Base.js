'use strict';
tm.add ('component.Tabber', ['tm.Base'], function (o, p, d) {
    o.setup = function (config) {
        // Setup data
        d.id = config.id;
        d.headerId = d.id + '-tabs';
        d.tabId = d.headerId + '-tab'
        d.contentId = d.headerId + '-content'
        d.selector = config.selector;
        d.tabList = [];

        // Create dom
        tm.html ('component.Tabber', {
            selector: d.selector,
            append: true,
            data: {
                id: d.id,
                headerId: d.headerId
            }
        })

        // Store dom
        d.dom = $ ('#' + d.id);
        d.headerDom = $ ('#' + d.id + '-header');
        d.contentDom
        $ (d.selector).append (d.dom);
    }

    o.addManyTabs = function (list) {
        var key, item, tabList;

        tabList = []
        for (key in list) {
            item = list [key]
            tabList.push (o.addTab (item));
        }

        return tabList
    }

    o.addTab = function (data) {
        var content, contentId, contentSelector, key, newData, tab, tabId, tabSelector;

        // Start creation of tab header
        key = d.tabList.length;
        tabId = d.tabId + '-' + key
        tabSelector = '#' + tabId;

        tm.html ('component.tabber.tab.Header', {
            selector: '#' + d.headerId,
            append: true,
            data: {
                dataName: tabId,
                id: tabId,
                key: key,
                title: data.title
            }
        })

        contentId = d.contentId + '-' + key
        contentSelector = '#' + contentId

        tm.html ('component.tabber.tab.Content', {
            selector: '#' + d.headerId,
            append: true,
            data: {
                dataName: tabId,
                id: contentId,
                key: key
            }
        })

        // Append tab and content to respective areas
        tab = $ (tabSelector);
        content = $ (contentSelector)

        content.append (data.content)

        d.headerDom.append (tab);
        d.dom.append (content)

        // // Active new tabs
        tab.tab ();
        content.tab ();

        if (data.onActive) {
            tab.click (data.onActive)
        }

        // Store content and new data
        newData = {
            name: data.title,
            tab: tab,
            tabId: tabId,
            tabSelector: tabSelector,
            content: content,
            contentId: contentId,
            contentSelector: contentSelector,
            onActive: data.onActive
        }

        d.tabList.push (newData)

        return newData;
    }

    o.changeTab = function (tab) {
        d.tabList [tab].tab.click ();
    }
})
