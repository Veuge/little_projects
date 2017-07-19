Ext.define("playground.store.RegularStudents", {
    extend: "Ext.data.Store",

    model: "playground.model.RegularStudent",
    proxy: {
        type: "ajax",
        url: "http://10.100.1.85:8000/api/regulars",
        reader: {
            type: 'json',
            root: "data",
            totalProperty: "paginator.total"
        },
        writer: {
            writeRecordId: false,
            dateFormat: "Y-m-d"
        }
    },
    pageSize: 20
});
