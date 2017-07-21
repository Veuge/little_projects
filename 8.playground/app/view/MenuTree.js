Ext.define('playground.view.MenuTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.menutree',
    itemId: 'menuTree',
    title: 'Menu',
    store: {
        xtype: 'tree',
        root: {
            text: 'Root',
            expanded: true,
            children: [
                {
                    text: 'Careers',
                    leaf: true
                },
                {
                    text: 'Subjects',
                    leaf: true
                },
                {
                    text: 'Classrooms',
                    leaf: true
                },
                {
                    text: 'Students',
                    leaf: false,
                    children: [
                        {
                            text: 'Regular Students',
                            leaf: true
                        },
                        {
                            text: 'Scholarship Students',
                            leaf: true
                        }
                    ]
                },
            ]
        }
    }
})
