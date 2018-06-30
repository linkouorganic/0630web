function show_Data() {

    var form_element = document.getElementById('form');
    var QRcode = form_element[0].value;
    if (QRcode.length == 0) {
        alert('請輸入欲查詢的 QR code');
    }
    else {
        window.open('https://qrc.afa.gov.tw/blog/' + QRcode, '生產追溯查詢', config = 'height=900,width=700,toolbar=no')
    }
}




/**/
var scrolling = false;
$(window).on('scroll', function(){
	if( !scrolling ) {
		scrolling = true;
		(!window.requestAnimationFrame)
			? setTimeout(autoHideHeader, 250)
			: requestAnimationFrame(autoHideHeader);
	}
});

/*微電影*/
/*Youtube video auto-resizer script
 * Created by Skipser.com*/ 
$(document).ready(function() {
    if(typeof YOUTUBE_VIDEO_MARGIN == 'undefined') {
      YOUTUBE_VIDEO_MARGIN=5;
    }
    $('iframe').each(function(index,item) {
      if($(item).attr('src').match('https://www.youtube.com/embed/z9Ul9ccDOqE')) {
        var w=$(item).attr('width');
        var h=$(item).attr('height');
        var ar = h/w*100;
        ar=ar.toFixed(2);
        //Style iframe    
        $(item).css('position','absolute');
        $(item).css('top','0');
        $(item).css('left','0');    
        $(item).css('width','100%');
        $(item).css('height','100%');
        $(item).css('max-width',w+'px');
        $(item).css('max-height', h+'px');        
        $(item).wrap('<div style="max-width:'+w+'px;margin:0 auto; padding:'+YOUTUBE_VIDEO_MARGIN+'px;" />');
        $(item).wrap('<div style="position: relative;padding-bottom: '+ar+'%; height: 0; overflow: hidden;" />');
      }
    });
  });

  /*會員*/
  document.addEventListener("DOMContentLoaded", function(event) { 


    var acc = document.getElementsByClassName("accordion");
    var panel = document.getElementsByClassName('panel');
    
    for (var i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {
            var setClasses = !this.classList.contains('active');
            setClass(acc, 'active', 'remove');
            setClass(panel, 'show', 'remove');
    
            if (setClasses) {
                this.classList.toggle("active");
                this.nextElementSibling.classList.toggle("show");
            }
        }
    }
    
    function setClass(els, className, fnName) {
        for (var i = 0; i < els.length; i++) {
            els[i].classList[fnName](className);
        }
    }
    
    });
