'use strict';
tm.add ('tm.Base', function (o, p, d) {
    o.setup = function () {
        p.child = {
            list: [],
            alias: {},
        };

        d.child = p.child;

        p.parent = {
            list: [],
            alias: {},
        }
        
        d.parent = p.parent;
    }
    o.add = function (child) {
        p.child.list.push (child);
        child.setParent (o);
        return o;
    }
    o.getChild = function (index) {
        if (tm.getType (index) == 'String') {
            return p.child.alias [index];
        }
        else {
            return p.child.list [index];
        }
    }
    o.getParent = function (name) {
        if (name) {
            return p.parent.alias [name];
        }
        else {
            return p.parent.list [0];
        }
    }
    o.setParent = function (parent) {
        p.parent.list [0] = parent;
        return o;
    }
})
