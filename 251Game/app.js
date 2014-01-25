;(function() {
  var rows, cols, reds, greens, blues, total;
  function move(e) {
    var r = $(e.currentTarget).data('row'); 
    var c = $(e.currentTarget).data('col'); 
    var color = $(e.currentTarget).data('color');
    if(color = 'green') {
        $(e.currentTarget).toggleClass('green red').data('color', 'red');
        greens--;
        reds++; 
        var $up = $('#' + (r - 1) + '-' + c);
        var $right = $('#' + r + '-' + (c + 1));
        var $down = $('#' + (r + 1) + '-' + c);
        var $left = $('#' + r + '-' + (c - 1));
        var $neighbors = [$up, $right, $down, $left];
        $neighbors.forEach(function($elem, i, arr) {
          if($elem[0]) {
            if($elem.data('color') == 'green') {
              $elem.toggleClass('green blue').data('color', 'blue');
              if(greens > 0) { greens--;}
              blues++;
            } else if($elem.data('color') == 'blue') {
              $elem.toggleClass('blue green').data('color', 'green');
              if(blues > 0) { blues--; }
              greens++;
            }
          }
      });
      $('#reds').text(reds);
      $('#blues').text(blues);
      $('#greens').text(greens);
      if(total == reds) {alert("OMG YOU WON WAU!!!11!"); location.reload();}
      else if(greens == 0) {alert("you disappoint me."); location.reload();}
    }
  }
  function play(e) {
    e.preventDefault();
    rows = $('#rowsfield').val();
    cols = $('#colsfield').val();
    $('form').detach();
    for(var r = 0; r < rows; r++) {
      for(var c = 0; c < cols; c++) {
        $('#div-wrapper').append('<div id="' + r + '-' + c + '" class="blue"></div>');
        $('#' + r + '-' + c).data({row: r, col: c, color: 'blue'}).click(move);
      }
      $('#div-wrapper').append('<br>');
    }
    $('#0-0').removeClass('blue').addClass('green').data('color', 'green');
    reds = 0;
    greens = 1;
    blues = rows * cols - 1;
    total = rows * cols;
    $('#greens').text(greens);
    $('#blue').text(blues);
  }
  $(document).ready(function() {
    $('button').click(play);
  });
})();
