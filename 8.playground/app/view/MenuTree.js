Ext.define('playground.view.MenuTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.menutree',
    title: 'Menu',
    store: {
        xtype: 'tree',
        root: {
            text: 'Root',
            expanded: true,
            children: [
                { text: 'Child 1', leaf: true },
                { text: 'Child 2', leaf: true },
                { text: 'Child 3', leaf: true },
                { text: 'Child 4', leaf: true },
                { text: 'Child 5', leaf: true },
                { text: 'Child 6', leaf: true }
            ]
        }
    }

})
