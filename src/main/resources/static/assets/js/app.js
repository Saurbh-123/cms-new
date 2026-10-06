/* App helpers: sidebar, active link, DataTable, SweetAlert */
const App = {
  toast(icon, title){            // App.toast('success','Saved')
    Swal.fire({toast:true,position:'top-end',icon,title,showConfirmButton:false,timer:2200,timerProgressBar:true});
  },
  confirm(text='This cannot be undone.', btn='Yes'){   // App.confirm('Delete?').then(ok=>{ if(ok) ... })
    return Swal.fire({title:'Are you sure?',text,icon:'warning',showCancelButton:true,confirmButtonText:btn,confirmButtonColor:'#dc3545'}).then(r=>r.isConfirmed);
  }
};
$(function(){
  const b = document.body;
  // Sidebar toggle (remembered on desktop)
  if(localStorage.getItem('sb')==='1' && innerWidth>=768) b.classList.add('sb-collapsed');
  $('#sbToggle').on('click',function(){
    if(innerWidth<768) b.classList.toggle('sb-open');
    else{ b.classList.toggle('sb-collapsed'); localStorage.setItem('sb', b.classList.contains('sb-collapsed')?1:0); }
  });
  // Active menu link by file name (replace with server-side in PHP if you like)
  const cur = location.pathname.split('/').pop() || 'dashboard.html';
  $('.sidebar .nav-link').each(function(){ if($(this).attr('href')===cur){ $(this).addClass('active');
    $(this).closest('.sub').addClass('show').prev('.nav-toggle').attr('aria-expanded','true').addClass('active'); }});
  $('.nav-toggle').on('click',function(){ if(b.classList.contains('sb-collapsed')){ b.classList.remove('sb-collapsed'); localStorage.setItem('sb',0); }});
  // DataTable: add class="datatable" to any table
  if($.fn.DataTable) $('table.datatable').DataTable({
    dom:"<'dt-top'<'dt-l'l>f>t<'dt-bottom'ip>", autoWidth:false, pageLength:10, lengthMenu:[10,25,50,100],
    language:{search:'',searchPlaceholder:'Search...',lengthMenu:'_MENU_',info:'_START_-_END_ of _TOTAL_',infoEmpty:'No records',
      paginate:{previous:'<i class="bi bi-chevron-left"></i>',next:'<i class="bi bi-chevron-right"></i>'}}
  });
  // Select2: add class="select2" to any <select>  (optional data-placeholder="...")
  if($.fn.select2) $('select.select2').each(function(){
    const ph=$(this).data('placeholder');
    $(this).select2({theme:'bootstrap-5',width:'100%',placeholder:ph||undefined,allowClear:!!ph,closeOnSelect:!this.multiple});
  });
  // Logout with confirm: <button class="btn-logout" data-url="/logout">
  $(document).on('click','.btn-logout',function(){
    const url = this.dataset.url || 'login.html';
    Swal.fire({title:'Logout?',text:'You will be signed out.',icon:'question',showCancelButton:true,confirmButtonText:'Logout'})
      .then(r=>{ if(r.isConfirmed) location.href = url; });
  });
  // Delete with confirm: <button data-delete data-url="/delete/5">
  $(document).on('click','[data-delete]',function(){
    const url=this.dataset.url;
    App.confirm('This record will be deleted.','Delete').then(ok=>{ if(ok){ App.toast('success','Deleted'); /* location.href=url or $.post(url) */ }});
  });
});

// Tooltips + popovers: data-bs-toggle="tooltip" title="..."  /  data-bs-toggle="popover" data-bs-content="..."
$(function(){
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el=>new bootstrap.Tooltip(el));
  document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el=>new bootstrap.Popover(el));
});
