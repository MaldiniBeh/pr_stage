$(function () {
  $('.button').click(function () {
    alert('ok')
    var buttonId = $(this).attr('id');
    $('#modal-container').removeAttr('class').addClass(buttonId);
    $('body').addClass('modal-active');
  })

  $('#modal-container').click(function () {
    $(this).addClass('out');
    $('body').removeClass('modal-active');
  });
})
