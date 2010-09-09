$(document).ready(function(){
  $('#goals-image').mouseover(function() {
   $('#goals-text').slideDown("fast");
  });
  $('#goals-image').mouseout(function() {
   $('#goals-text').slideUp("fast");
  });
  $('#human-image').mouseover(function() {
   $('#human-text').slideDown("fast");
  });
  $('#human-image').mouseout(function() {
   $('#human-text').slideUp("fast");
  });
  $('.people').each( function() {
    $(this).mouseover(function() {
       setOtherImageOpacity($(this).attr('id'));
    });
    $(this).click(function() {
       var activePortrait = $(".active-people-portrait");
       if (activePortrait != null)
         activePortrait.hide();
       $("#" + $(this).attr('id') + "-text").show();
       $("#" + $(this).attr('id') + "-text").addClass("active-people-portrait");
    });    
  });  
  $('#people-images').mouseout(function() {
    $('.people').each( function() {
      setOtherImageOpacity("all");
    });
  });
  $("#filter-title").click(function() {
    var filterChooserDiv = $("#filter-chooser")
    if (filterChooserDiv.is(":hidden"))
      filterChooserDiv.slideDown("slow");
    else
      filterChooserDiv.slideUp("slow");
  });  
  $("area").click(function() {
    applyFilter($(this).attr('id'))
  });
});

function applyFilter(className) {
  if (hasFilter(className))
    return;
  var acitveClass = "people-image-active";
  $("#filter-list").append('<div class="filter-list-position"><div class="' + className + '"><div style="float:left">&gt; ' + className + '</div><div class="x-button">X</div></div></div>');
  $('.people').each( function() {
    if ($(this).hasClass(className)) {
      $(this).show();
      $(this).addClass(acitveClass)
    }
    else if (!$(this).hasClass(acitveClass)){
      $(this).hide();
      $(this).removeClass(acitveClass);
    }
  });    
  //Set functionality to remove filter
  $('div.x-button').each( function() {
      $(this).click(function() {
        removeFilter($(this).parent().attr('class'));
        $(this).parent().parent().remove();
        if ($("#filter-list").children().size() == 0)
          clearAllFilter();
      });
  });
}

function hasFilter(className){
  var hasClass = false;
  $('span.x-button').each( function() {
    if ($(this).parent().hasClass(className))
      hasClass = true;
  });
  return hasClass;  
}

function removeFilter(className) {
  var acitveClass = "people-image-active";
  $('.people').each( function() {
    if ($(this).hasClass(acitveClass) && $(this).hasClass(className)) {
      $(this).hide();
      $(this).removeClass(acitveClass);    
    }
  });
}

function clearAllFilter() {
  var acitveClass = "people-image-active";
  $('.people').each( function() {
    $(this).show();
    $(this).removeClass(acitveClass)
  });
}

function setOtherImageOpacity(activeElementId){
  $('.people').each( function() {
    $(this).dequeue(); 
    if ($(this).attr('id') == activeElementId || activeElementId == "all")
      $(this).animate({opacity: "1.0"}, 500);    
    else
      $(this).animate({opacity: "0.2"}, 500);    
  });
}