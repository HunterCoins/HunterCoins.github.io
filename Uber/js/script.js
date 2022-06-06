window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })

    // Modal 

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    })
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation').fadeOut('slow');
    })
    
    $('.feed-form').validate( {
        rules: {
            name: "required",
            phone: {
                required: true,
                minlength: 10
              },
            email: {
                required: true,
                email: true
            }

        },
        messages: {
            name: "Пожалуйста, введите своё имя",
            phone: {
                required: "Пожалуйста, введите свой номер телефона",
                minlength: jQuery.validator.format("Введите не менее {0} символов!")
              },
            email: {
              required: "Пожалуйста, введите свою почту",
              email: "Неправильно введет адрес почты"
            }
          }
    });

    $('input[name=phone]').mask("+380 (99) 999-9999")
})

