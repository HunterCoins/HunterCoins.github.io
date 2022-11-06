// const { array } = require("yargs");

window.addEventListener('DOMContentLoaded', () => {
    $(function(){
        $('.slider__inner-2, .slider__inner-1').slick({
            autoplay: true,
            speed: 4500,
            autoplaySpeed: 0,
            cssEase: 'linear',
            vertical: true,
            slidesToShow: 3,
            infinite: true,
            arrows: false,
            centerMode: true,
            pauseOnHover: false,
            draggable: false, 
            responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    autoplay: true,
                    speed: 4500,
                    autoplaySpeed: 0,
                    cssEase: 'linear',
                    vertical: false,
                    slidesToShow: 3,
                    infinite: true,
                    arrows: false,
                    centerMode: true,
                    pauseOnHover: false,
                    draggable: false, 
                  }
                }
              ]
        });
        $('.management__block-wrapper').slick({
          accessibility: false,
          draggable: true,
          arrows: false,
          dots: true,
        });
      });
    

    function hamburger(menu, item, hamburger) {
        const theMenu = document.querySelector(menu),
              menuItem = document.querySelectorAll(item),
              hamburgerBtn = document.querySelector(hamburger),
              interval = 100,
              whiteBtn = document.querySelector('.btn_white-header'),
              redBtn = document.querySelector('.btn_red-header');
  
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('hamburger_active');
            theMenu.classList.toggle('menu_active');

            menuItem.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.toggle('slide-in');
                }, interval * index);
            });

            whiteBtn.classList.toggle('scale');
            redBtn.classList.toggle('scale');
        });
  
        menuItem.forEach(item => {
          item.addEventListener('click', () => {
              hamburgerBtn.classList.toggle('hamburger_active');
              theMenu.classList.toggle('menu_active');

              menuItem.forEach(item => {
                item.classList.toggle('slide-in');
              });
              
              whiteBtn.classList.toggle('scale');
              redBtn.classList.toggle('scale');
          });
        });
    }
    hamburger('.menu__wrapper', '.menu__item', '.hamburger');

    function animation() {
      const animItems = document.querySelectorAll('._anim-items');

      if (animItems) {
        const animOnScroll = function() {
          for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i],
            animItemHeight = animItem.offsetHeight,
            animItemOffset = offset(animItem).top,
            animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
              animItemPoint = window.innerHeight - window.innerHeight / animStart;            
            }

            if ((window.scrollY > animItemOffset - animItemPoint) && 
            window.scrollY < (animItemOffset + animItemHeight)) {
              animItem.classList.add('_active');
            } else if (!animItem.classList.contains('_anim-no-hide')) {
              animItem.classList.remove('_active');
            }
          }
        };
        window.addEventListener('scroll', animOnScroll);

        const offset = function(el) {
          const rect = el.getBoundingClientRect(),
              scrollLeft = window.scrollX || document.documentElement.scrollLeft,
              scrollTop = window.scrollY || document.documentElement.scrollTop;
          return { top: rect.top + scrollTop, left: rect.left + scrollLeft};
        };
        animOnScroll();
      }
    }
    animation();

    function footerSpoller() {

      let _slideUp = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
          target.classList.add('_slide');
          target.style.transitionProperty = 'height, margin, padding';
          target.style.transitionDuration = duration + 'ms';
          target.style.height = target.offsetHeight + 'px';
          target.offsetHeight;
          target.style.overflow = 'hidden';
          target.style.height = 0;
          target.style.paddinTop = 0;
          target.style.paddinBottom = 0;
          target.style.marginTop = 0;
          target.style.marginBottom = 0;
          window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
          }, duration);
        }
      };

      let _slideDown = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
          target.classList.add('_slide');
          if(target.hidden) {
            target.hidden = false;
          }
          let height = target.offsetHeight;
          target.style.overflow = 'hidden';
          target.style.height = 0;
          target.style.paddinTop = 0;
          target.style.paddinBottom = 0;
          target.style.marginTop = 0;
          target.style.marginBottom = 0;
          target.offsetHeight;
          target.style.transitionProperty = 'height, margin, padding';
          target.style.transitionDuration = duration + 'ms';
          target.style.height = height + 'px';
          target.style.removeProperty('padding-top');
          target.style.removeProperty('padding-bottom');
          target.style.removeProperty('margin-top');
          target.style.removeProperty('margin-bottom');
          window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
          }, duration);
        }
      };

      let _slideToggle = (target, duration = 500) => {
        if (target.hidden) {
          return _slideDown(target, duration);
        } else {
          return _slideUp(target, duration);
        }
      };
      
      function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
          spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
          if(matchMedia.matches || !matchMedia) {
            spollersBlock.classList.add('_init');
            initSpollersBody(spollersBlock);
            spollersBlock.addEventListener('click', setSpollerAction);
          } else {
            spollersBlock.classList.remove('_init');
            initSpollersBody(spollersBlock, false);
            spollersBlock.removeEventListener('click', setSpollerAction);
          }
        });
      }

      function initSpollersBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length > 0) {
          spollerTitles.forEach(spollerTitle => {
            if (hideSpollerBody) {
              spollerTitle.removeAttribute('tabindex');
              if (!spollerTitle.classList.contains('_active')) {
                spollerTitle.nextElementSibling.hidden = true;
              }
            } else {
              spollerTitle.setAttribute('tabindex', '-1');
              spollerTitle.nextElementSibling.hidden = false; 
            }
          }); 
        }
      }

      function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
          const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]'),
                spollersBlock = spollerTitle.closest('[data-spollers]'),
                oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
          if (!spollersBlock.querySelectorAll('._slide').length) {
            if (oneSpoller && !spollerTitle.classList.contains('_active')) {
              hideSpollerBody(spollersBlock);
            }
            spollerTitle.classList.toggle('_active');
            _slideToggle(spollerTitle.nextElementSibling, 500);
            e.preventDefault();
          }
        }
      }

      function hideSpollerBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
        if (spollerActiveTitle) {
          spollerActiveTitle.classList.remove('_active');
          _slideUp(spollerActiveTitle.nextElementSibling, 500); 
        }
      }

      const spollersArray = document.querySelectorAll('[data-spollers]');
      if (spollersArray.length > 0) {
        const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
          return !item.dataset.spollers.split(",")[0];
        });

        if (spollersRegular.length > 0) {
          initSpollers(spollersRegular);
        }

        const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
          return item.dataset.spollers.split(",")[0];
        });
        
        
        if (spollersMedia.length > 0) {
          const breakpointsArray = [];
          spollersMedia.forEach(item => {
            const params = item.dataset.spollers,
                  breakpoint = {},
                  paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
          });


          let mediaQueries = breakpointsArray.map(function (item) {
            return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`;
          });
          mediaQueries = mediaQueries.filter(function (item, index, self) {
            return self.indexOf(item) === index;
          });
          

          mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(","),
                  mediaBreakpoint = paramsArray[1],
                  mediaType = paramsArray[2],
                  matchMedia = window.matchMedia(paramsArray[0]);
            
            const spollersArray = breakpointsArray.filter(function (item) {
              if (item.value === mediaBreakpoint && item.type === mediaType) {
                return true;
              }
            });

            matchMedia.addEventListener('change', () => {
              initSpollers(spollersArray, matchMedia);
            });
            initSpollers(spollersArray, matchMedia); 
          });
        }
      }
    }
    footerSpoller();
});


