$(document).ready(function () {

    new WOW({
        animateClass: 'animate__animated'
    }).init();

    $('.product-img').magnificPopup({
        type: 'image',
    });

    let menu = $('.menu');

    function menuOpen () {
        menu.addClass('open');
    }

    function menuClose () {
        menu.removeClass('open');
    }

    $('#burger').on('click', menuOpen);

    $('.close').on('click', menuClose);

    $('.menu-item').on('click', menuClose);

    $('#about').on('click', () => {
        $('.advantages-section')[0].scrollIntoView({behavior: "smooth"});
    })

    function seeProduct () {
        $('.products')[0].scrollIntoView({behavior: "smooth"});
    }

    $('#products').on('click', seeProduct);
    $('.main-btn').on('click', seeProduct);

    function makeOrder () {
        $('.order-section')[0].scrollIntoView({behavior: "smooth"});
    }
    $('#order').on('click', makeOrder);

    $('.product-btn').click((e) => {
        $('#product').val($(e.target).parents('.product').find('.product-text-title').text());
        makeOrder();
    });

    let loader = $('.loader');
    function loaderOpen() {
        loader.css('display', 'flex');
    }

    function loaderClose() {
        loader.hide();
    }

    let product = $('#product');
    let name = $('#name');
    let phone = $('#phone');
    phone.inputmask({"mask": "(999) 999-9999"});


    function formValidation() {

        let hasError = false;

        $('.error-input').hide();

        if (!product.val()) {
            product.css('border-color', 'red');
            product.next().show();
            hasError = true;

        } else if (product.val()) {
            product.css('border-color', 'white');
        }

        if (!name.val()) {
            name.css('border-color', 'red');
            name.next().show();
            hasError = true;
        } else if (name.val()) {
            name.css('border-color', 'white');
        }
        if (!phone.val()) {
            phone.css('border-color', 'red');
            phone.next().show();
            hasError = true;
        } else if (phone.val()) {
            phone.css('border-color', 'white');
        }

        if (!hasError) {
            loaderOpen();
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: name.val(), phone: phone.val(), order: product.val()}
            })
                .done(function (msg) {
                    setTimeout(() => {
                        loaderClose();
                        console.log(msg);
                        if (msg.success) {
                            hideForm();
                        } else {
                            alert("Возникла ошибка");
                        }
                    }, 1000);
                });
            clearForm();

        }

        function clearForm() {
            product.val("");
            name.val("");
            phone.val("");
        }
    }

    function hideForm() {
        $('.order-title').remove();
        $('.order').remove();
        $('.order-success').show();
    }

    $('.order-btn').on('click', formValidation);

});