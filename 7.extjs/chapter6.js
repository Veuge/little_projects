Ext.onReady(function(){
    Ext.QuickTips.init();

    var mySimpleStore = ({
        type: "array",
        fields: ["name"],
        data: [
            ["John Lennon"],
            ["Paul McCartney"],
            ["Ringo Starr"],
            ["George Harrison"]
        ]
    });

    var remoteJsonStore = Ext.create("Ext.data.JsonStore", {
        storeId: "people",
        fields: [
            "fullName",
            "id"
        ],
        proxy: {
            type: "jsonp",
            url: "http://extjsinaction.com/dataQuery.php",
            reader: {
                type: "json",
                root: "records",
                totalProperty: "totalCount"
            }
        }
    });

    var fpItems = [
        {
            fieldLabel: "Alpha only",
            allowBlank: false,
            emptyText: "This is empty",
            maskRe: /[a-z]/i,
            msgTarget: "side"
        },
        {
            fieldLabel: "Simple 3 to 7 characters",
            allowBlank: false,
            msgTarget: "under",
            minLength: 3,
            maxLength: 7
        },
        {
            fieldLabel: "Special characters",
            msgTarget: "qtip",
            regex: /[a-zA-Z0-9]/ig
        },
        {
            fieldLabel: "Web only with VType",
            vtype: "url",
            msgTarget: "side"
        },
        {
            fieldLabel: "Password",
            allowBlank: false,
            inputType: "password"
        },
        {
            fieldLabel: "File",
            allowBlank: false,
            xtype: "filefield"
        },
        {
            xtype: "combo",
            fieldLabel: "Select a name",
            store: mySimpleStore,
            displayField: "name",
            typeAhead: true,
            typeAheadDelay: 100,
            mode: "local"
        },
        {
            xtype: "numberfield",
            fieldLabel: "Only numbers",
            allowBlank: false,
            decimalPrecision: 3,
            minValue: 0.1,
            maxValue: 5,
            step: .1
        },
        {
            xtype: "combo",
            queryType: "remote",
            fieldLabel: "Search by name",
            width: 320,
            forceSelection: true,
            displayField: "fullName",
            valueField: "id",
            minChars: 1,
            triggerAction: "all",
            store: remoteJsonStore
        }
    ];

    var fp = Ext.create("Ext.form.Panel", {
        renderTo: Ext.getBody(),
        width: 400,
        height: 240,
        title: "Text fields",
        frame: true,
        bodyStyle: "padding: 5px;",
        labelWidth: 126,
        defaultType: "textfield",
        autoScroll: true,
        defaults: {
            msgTarget: "side",
            anchor: "-20"
        },
        items: fpItems
    });
});
