const lenis = new Lenis()

lenis.on('scroll', (e) => {
    console.log(e)
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)



function initAccordion(itemSelector, headerSelector) {
    const items = document.querySelectorAll(itemSelector);
    const wwdMainImg = document.getElementById('wwd-main-img');

    items.forEach(item => {
        const header = item.querySelector(headerSelector);
        if (!header) return;

        header.addEventListener('click', () => {

            const isActive = item.classList.contains('active');


            items.forEach(i => i.classList.remove('active'));


            if (!isActive) {
                item.classList.add('active');

                // If this is a WWD item, swap the image
                if (item.classList.contains('wwd__item') && wwdMainImg) {
                    const newImgSrc = item.getAttribute('data-img');
                    if (newImgSrc) {
                        wwdMainImg.style.opacity = '0.5';
                        setTimeout(() => {
                            wwdMainImg.src = newImgSrc;
                            wwdMainImg.style.opacity = '1';
                        }, 150);
                    }
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    initAccordion('.wwd__item', '.wwd__header');


    initAccordion('.faq__item', '.faq__header');


    initFdkSlider();
});


function initFdkSlider() {
    const track = document.getElementById('fdk-track');
    if (!track) return;

    const cards = Array.from(track.children);
    const prevBtn = document.querySelector('.fdk__controls .fdk__btn[aria-label="Previous"]');
    const nextBtn = document.querySelector('.fdk__controls .fdk__btn[aria-label="Next"]');
    const dotsContainer = document.querySelector('.fdk__dots');

    if (!prevBtn || !nextBtn || !dotsContainer || cards.length === 0) return;

    let currentIndex = 0;
    let cardsPerView = window.innerWidth > 900 ? 3 : 1;
    let totalPages = Math.ceil(cards.length / cardsPerView);

    function updateSlider() {
        if (window.innerWidth <= 900) {
            track.style.transform = '';
            dotsContainer.style.display = 'none';
            return;
        } else {
            dotsContainer.style.display = 'flex';
        }

        cardsPerView = 3;
        totalPages = Math.ceil(cards.length / cardsPerView);

        if (currentIndex >= totalPages) currentIndex = totalPages - 1;
        if (currentIndex < 0) currentIndex = 0;

        const targetCard = cards[currentIndex * cardsPerView];
        if (targetCard) {
            const offset = targetCard.offsetLeft;
            track.style.transform = `translateX(-${offset}px)`;
        }

        renderDots();
    }

    function renderDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = `fdk__dot ${i === currentIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalPages - 1;
        }
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalPages - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    });

    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(updateSlider, 100);
    });


    updateSlider();
}

document.addEventListener('DOMContentLoaded', () => {

    const radios = document.querySelectorAll('input[name="native_lang"]');
    const otherRadio = document.getElementById('langOtherRadio');
    const otherWrapper = document.getElementById('langOtherWrapper');
    const otherInput = document.getElementById('langOtherInput');

    if (radios.length > 0 && otherWrapper) {
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (otherRadio.checked) {
                    otherWrapper.style.display = 'block';
                    otherInput.setAttribute('required', 'required');
                    otherInput.focus();
                } else {
                    otherWrapper.style.display = 'none';
                    otherInput.removeAttribute('required');
                    otherInput.value = '';
                }
            });
        });
    }
});

function switchTab(btn, serviceId) {

    const tabsContainer = btn.closest('.service-row__tags');

    const contentContainer = document.getElementById(serviceId);

    const imgsContainer = document.getElementById(serviceId + '-imgs');

    if (!tabsContainer || !contentContainer || !imgsContainer) return;


    const buttons = tabsContainer.querySelectorAll('.service-tag');
    buttons.forEach(b => {
        b.classList.remove('service-tag--active');
        b.classList.add('service-tag--outlined');
    });


    btn.classList.remove('service-tag--outlined');
    btn.classList.add('service-tag--active');

    const targetId = btn.getAttribute('data-target');


    const contents = contentContainer.querySelectorAll('.service-row__tab-content');
    contents.forEach(c => {
        c.classList.remove('active');
        if (c.id === targetId) {
            c.classList.add('active');
        }
    });


    const images = imgsContainer.querySelectorAll('.service-row__img');
    images.forEach(img => {
        img.classList.remove('active');
        if (img.getAttribute('data-id') === targetId) {
            img.classList.add('active');
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');

    if (burger && nav && header) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            header.classList.toggle('menu-open');

            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
    }


    const dropdownToggles = document.querySelectorAll('.header__dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                const dropdownArea = toggle.parentElement;
                dropdownArea.classList.toggle('active');
            }
        });
    });
});
