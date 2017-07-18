Ext.define("playground.store.RegularStudents", {
    extend: "Ext.data.Store",
    
    model: "playground.model.RegularStudent",
    proxy: {
        type: "ajax",
        url: "http://localhost:8000/api/regulars",
        reader: {
            type: 'json',
            root: "data"
        }
    },
    // autoLoad: true, 
    // pageSize: 20
});