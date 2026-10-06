/* Custom DataTable factory.  Usage:  App.dt('#myTable', {title:'Report', orientation:'landscape', ...any DataTables option}) */
(function($){
  if(!$.fn.DataTable) return;
  if($.fn.dataTable.Buttons){                       // plain "btn" classes so our colours apply
    $.fn.dataTable.Buttons.defaults.dom.container.className='dt-buttons';
    $.fn.dataTable.Buttons.defaults.dom.button.className='btn';
  }
  App.dt = function(sel, o){
    o = $.extend({}, o);
    const sticky = o.sticky; delete o.sticky;   // sticky:true => header + bottom bar stick while the PAGE scrolls
    if(sticky && o.scrollY===undefined) o.scrollY = false;
    const title = o.title || document.title.split('|')[0].trim();
    const exp = {columns:':visible:not(.no-export)'};  // add class "no-export" to the <th> to skip a column
    const buttons = [
      {extend:'excelHtml5',text:'<i class="bi bi-file-earmark-excel"></i> Excel',className:'btn-xl',title,exportOptions:exp},
      {extend:'pdfHtml5',text:'<i class="bi bi-file-earmark-pdf"></i> PDF',className:'btn-pdf',title,pageSize:'A4',
        orientation:o.orientation||'portrait',exportOptions:exp,
        customize:function(doc){
          doc.defaultStyle.fontSize=8; doc.pageMargins=[20,25,20,25];
          doc.styles.tableHeader.fillColor='#0f2a4a'; doc.styles.tableHeader.fontSize=8;
          doc.content[1].layout='lightHorizontalLines';
          doc.footer=function(p,c){return {text:p+' / '+c,alignment:'center',fontSize:7};};
        }},
      {extend:'csvHtml5',text:'<i class="bi bi-filetype-csv"></i> CSV',className:'btn-csv',title,exportOptions:exp},
      {extend:'print',text:'<i class="bi bi-printer"></i> Print',className:'btn-prt',title,exportOptions:exp}
    ];
    const t = $(sel).DataTable($.extend(true,{
      dom:"<'dt-top'<'dt-l'Bl>f>t<'dt-bottom'ip>",
      buttons:buttons,
      autoWidth:false,
      scrollY:'52vh',            // fixed header, body scrolls
      scrollCollapse:true,
      pageLength:15,
      lengthMenu:[[10,15,25,50,-1],[10,15,25,50,'All']],
      pagingType:'simple_numbers',
      columnDefs:[{targets:'no-sort',orderable:false}],   // class "no-sort" on <th>
      language:{search:'',searchPlaceholder:'Search records...',lengthMenu:'_MENU_',
        info:'_START_-_END_ of _TOTAL_',infoEmpty:'No records',infoFiltered:'(of _MAX_)',
        paginate:{previous:'<i class="bi bi-chevron-left"></i>',next:'<i class="bi bi-chevron-right"></i>'}}
    }, o));
    if(sticky) $(t.table().container()).addClass('dt-sticky-wrap');
    return t;
  };
})(jQuery);
