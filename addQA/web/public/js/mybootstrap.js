
/*生產追溯查詢*/
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
$(window).on('scroll', function () {
    if (!scrolling) {
        scrolling = true;
        (!window.requestAnimationFrame)
            ? setTimeout(autoHideHeader, 250)
            : requestAnimationFrame(autoHideHeader);
    }
});


/*微電影*/
$(document).ready(function () {
    if (typeof YOUTUBE_VIDEO_MARGIN == 'undefined') {
        YOUTUBE_VIDEO_MARGIN = 5;
    }
    $('iframe').each(function (index, item) {
        if ($(item).attr('src').match('https://www.youtube.com/embed/z9Ul9ccDOqE')) {
            var w = $(item).attr('width');
            var h = $(item).attr('height');
            var ar = h / w * 100;
            ar = ar.toFixed(2);
            //Style iframe    
            $(item).css('position', 'absolute');
            $(item).css('top', '0');
            $(item).css('left', '0');
            $(item).css('width', '100%');
            $(item).css('height', '100%');
            $(item).css('max-width', w + 'px');
            $(item).css('max-height', h + 'px');
            $(item).wrap('<div style="max-width:' + w + 'px;margin:0 auto; padding:' + YOUTUBE_VIDEO_MARGIN + 'px;" />');
            $(item).wrap('<div style="position: relative;padding-bottom: ' + ar + '%; height: 0; overflow: hidden;" />');
        }
    });
});

/*會員*/
document.addEventListener("DOMContentLoaded", function (event) {
    var acc = document.getElementsByClassName("accordion");
    var panel = document.getElementsByClassName('panel');

    for (var i = 0; i < acc.length; i++) {
        acc[i].onclick = function () {
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

/*產品介紹*/
$(".js-select2").each(function () {
    $(this).select2({
        minimumResultsForSearch: 20,
        dropdownParent: $(this).next('.dropDownSelect2')
    });
})
/*產品介紹_購物車*/
$('.js-addwish-b2, .js-addwish-detail').on('click', function (e) {
    e.preventDefault();
});

$('.js-addwish-b2').each(function () {
    var nameProduct = $(this).parent().parent().find('.js-name-b2').html();
    $(this).on('click', function () {
        swal(nameProduct, "is added to wishlist !", "success");

        $(this).addClass('js-addedwish-b2');
        $(this).off('click');
    });
});

$('.js-addwish-detail').each(function () {
    var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();

    $(this).on('click', function () {
        swal(nameProduct, "is added to wishlist !", "success");

        $(this).addClass('js-addedwish-detail');
        $(this).off('click');
    });
});

/*---------------------------------------------*/

$('.js-addcart-detail').each(function () {
    var nameProduct = $(this).parent().parent().parent().parent().find('.js-name-detail').html();
    $(this).on('click', function () {
        swal(nameProduct, "is added to cart !", "success");
    });
});


//測試----------------------------------------------------------------------------------------------------------------------------------

//測試----------------------------------------------------------------------------------------------------------------------------------

/*新增訂單_商品新增按鈕*/
$(function () {
    //新增按鈕點擊
    $('#addPro').on('click', function () {
        $node = '<div class="form-group row sup-distriOrder-form"><label for="inputProName">商品名稱</label>'
            + '<input type="text" class="form-control" name="inputProName" id="inputProName">'
            + '<label for="inputNum">規格</label>'
            + '<input type="text" class="form-control" name="inputSpecific" id="inputSpecific">'
            + '<label for="inputNum">數量</label>'
            + '<input type="text" class="form-control" name="inputNum" id="inputNum">'
            + '<label for="inputPrice">價格</label>'
            + '<input type="text" class="form-control" name="inputPrice" id="inputPrice">'            
            + '<span class="removeDistri">删除</span></div>';
        //新表單添加到“新增”按鈕前面
        $(this).parent().after($node);
    });
    //删除按鈕點擊
    $('form').on('click', '.removePro', function () {
        $(this).parent().remove();
    });
});

/*分配訂單_供應商新增按鈕*/
$(function () {
    //新增按鈕點擊
    $('#addDistri').on('click', function () {
        $node = '<div class="form-group row">'
        + '<label for="inputProName">供應廠商</label>'
        + '<select id="selectDistri"><option value="yulin">語林有機農場</option><option value="yababy">芽寶寶有機農場</option></select>'
        + '<label for="inputNum">量</label>'
        + '<input type="text" class="form-control" name="inputNum" id="inputNum">'
        + '<span class="removeDistri">删除</span></div>';
        //新表單添加到“新增”按鈕前面
        $(this).parent().before($node);
    });
    //删除按鈕點擊
    $('form').on('click', '.removeDistri', function () {
        $(this).parent().remove();
    });
});

/*編輯分配訂單*/
jQuery(function ($) {
    $("#grid").shieldGrid({
        dataSource: {
            data: gridData,
            schema: {
                fields: {
                    id: { path: "id", type: Number },
                    age: { path: "age", type: Number },
                    company: { path: "company", type: String },
                    email: { path: "email", type: String },
                    address: { path: "address", type: String }
                }
            },
            aggregate: [
                { field: "age", aggregate: "average" }
            ]
        },
        navigation: true,
        sorting: {
            multiple: true
        },
        paging: {
            pageSize: 6,
            pageLinksCount: 8
        },
        editing: {
            enabled: true,
            type: "row"
        },
        selection: {
            type: "row",
            multiple: true,
            toggle: false
        },
        columns: [
            { field: "id", width: "70px", title: "ID" },
            { field: "age", title: "Age", width: "80px", footerTemplate: "Avg: {average:N2}" },
            { field: "company", width: "270px", title: "Company Name", footerTemplate: "US-based Companies", editable: false },
            { field: "email", title: "Email Address", width: "270px" },
            { field: "address", title: "Address" },
            {
                width: 150,
                title: " ",
                buttons: [
                    { commandName: "edit", caption: "Edit" },
                    { commandName: "delete", caption: "Delete" }
                ]
            }
        ],
        toolbar: [
            {
                buttons: [
                    { commandName: "insert", caption: "Add Record" }
                ],
                position: "top"
            }
        ]
    });
    // handle the Ctrl + G key pressed
    $(document).keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 71) {
            // focus the Grid by calling its focus() method
            // this should focus the first cell inside it
            $("#grid").swidget().focus();
            // do not propagate the event
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });
});

