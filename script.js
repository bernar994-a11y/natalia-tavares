/* ============================================
   NATÁLIA TAVARES – PREMIUM INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavigation();
    initFAQ();
    initWhatsAppFloat();
    initSmoothScroll();
    initParallax();
});

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.classList.contains('reveal--delay') ? 200 : 0;
                const stagger = Array.from(el.parentElement.children)
                    .filter(c => c.classList.contains('reveal'))
                    .indexOf(el) * 80;

                setTimeout(() => {
                    el.classList.add('visible');
                }, delay + stagger);

                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const links = menu.querySelectorAll('a');
    let lastScroll = 0;

    // Scroll behavior
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 60) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        lastScroll = scrollY;
    }, { passive: true });

    // Mobile toggle
    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
            menu.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

/* ============================================
   FAQ ACCORDION
   ============================================ */
function initFAQ() {
    const items = document.querySelectorAll('.faq__item');

    items.forEach(item => {
        const question = item.querySelector('.faq__question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            items.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
            });

            // Open clicked if wasn't active
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* ============================================
   WHATSAPP FLOAT BUTTON
   ============================================ */
function initWhatsAppFloat() {
    const btn = document.querySelector('.whatsapp-float');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });
    }, { threshold: 0.5 });

    const hero = document.getElementById('hero');
    if (hero) observer.observe(hero);
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   SUBTLE PARALLAX
   ============================================ */
function initParallax() {
    const shapes = document.querySelectorAll('.organic-shape');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                shapes.forEach((shape, i) => {
                    const speed = (i + 1) * 0.02;
                    shape.style.transform = `translateY(${scrollY * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}
