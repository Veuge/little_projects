Ext.define('Playground.view.subjects.SubjectsGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.grd-subjects',
    itemId: 'grdSubjects',
    store: 'Playground.store.Subjects',
    title: 'Subjects Grid',

    stripeRows: true,

    columns: [
        {
            text: 'ID',
            flex: 1,
            dataIndex: 'id'
        },
        {
            text: 'NAME',
            flex: 2,
            dataIndex: 'name'
        },
        {
            text: 'DESCRIPTION',
            flex: 2,
            dataIndex: 'description'
        },
        {
            text: 'CREDITS',
            flex: 2,
            dataIndex: 'credits'
        },
        {
            text: 'CLASSROOM',
            flex: 2,
            dataIndex: 'classroom_id'
        },
        {
            text: 'CAREER',
            flex: 2,
            dataIndex: 'career_id',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                console.log(view);
                var career = record.getCareer();
                return "->" + career.get('name');
            }
        }
    ]
});