
// slider auto play
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 1500
    },
    speed: 800,
    effect: 'creative',
    creativeEffect: {
        prev: {
        translate: [0, 0, -400],
        },
        next: {
        translate: ['100%', 0, 0],
        },
    }
});

// language
i18n.init({
    resGetPath: '/languages/__lng__.json',
    debug: true,
    fallbackLng: false,
    load: 'unspecific'
}, function () {
    $('body').i18n();
});

const setSelected = (value) => {
    $(function() {
        $("#lang").val(value);
    });
}

// set default language
const lang = localStorage.getItem('lang');
if(lang === 'en') {
    $.i18n.setLng('en', function() {
        $('body').i18n();
        setSelected('en');
    });
} else {
    $.i18n.setLng('vi', function() {
        $('body').i18n();
        setSelected('vi');
    });
}


// set language when change selected
$('select').on('change', function() {
    if(this.value === 'vi') {
        $.i18n.setLng('vi', function() {
            $('body').i18n();
        });
        localStorage.setItem('lang', 'vi');
    } else if(this.value === 'en') {
        $.i18n.setLng('en', function() {
            $('body').i18n();
        });
        localStorage.setItem('lang', 'en');
    }
  });


// handle zoom image in detail product
function zoom(e){
    var zoomer = e.currentTarget;
    let x = e.offsetX/zoomer.offsetWidth*100
    let y = e.offsetY/zoomer.offsetHeight*100
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
}

const zoomer = document.querySelector('.zoom')
const childMap = document.querySelector('.child-address-detail');
const childMap2 = document.querySelector('.child-address-detail-p');
const iconClose = document.querySelector('.icon-close-map');
const iconClose2 = document.querySelector('.icon-close-map-2');
const sideBarHover = document.querySelector('.menu-item.bg_ok');
const translateElement = document.querySelector('.child-menu-item');
const wraper = document.querySelector('.wrapper-menu-item');
const navChild = document.querySelector('.nav-child');
const navHover = document.querySelector('.nav-item.show-child');

// handle events
iconClose && iconClose.addEventListener('click', () => {
    childMap.classList.add('hidden');
})

navHover && navHover.addEventListener('mouseover', () => {
    navChild.style.transform = 'scale(1)';
})
navHover && navHover.addEventListener('mouseout', () => {
    navChild.style.transform = 'scale(0)';
})

navChild && navChild.addEventListener('mouseover', () => {
    navChild.style.transform = 'scale(1)';
})
navChild && navChild.addEventListener('mouseout', () => {
    navChild.style.transform = 'scale(0)';
})

sideBarHover && sideBarHover.addEventListener('mouseover', () => {
    translateElement.style.transform = 'translateY(0)'
})
sideBarHover && sideBarHover.addEventListener('mouseout', () => {
    translateElement.style.transform = 'translateY(-84px)'
})

wraper && wraper.addEventListener('mouseover', () => {
    translateElement.style.transform = 'translateY(0)'
})
wraper && wraper.addEventListener('mouseout', () => {
    translateElement.style.transform = 'translateY(-84px)'
})

zoomer && zoomer.addEventListener('mousemove', (event) => {
    zoom(event)
})

iconClose2 && iconClose2.addEventListener('click', () => {
    childMap2.classList.add('hidden');
})
