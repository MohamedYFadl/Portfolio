gsap.registerPlugin(ScrollTrigger);

// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 });
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    gsap.set(ring, { x: ringX, y: ringY });
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .tech-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { width: 20, height: 20, duration: .2 });
        gsap.to(ring, { width: 60, height: 60, opacity: 0.7, duration: .2 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { width: 12, height: 12, duration: .2 });
        gsap.to(ring, { width: 40, height: 40, opacity: 0.4, duration: .2 });
    });
});

// HERO ENTRANCE
const tl = gsap.timeline({ delay: 0.3 });
tl.to('#avail-badge', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .to('#hero-label', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .to('#hero-name', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .to('#hero-role', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .to('#hero-desc', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .to('#hero-actions', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');

// SCROLL REVEALS
gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
                trigger: el, start: 'top 88%',
                toggleActions: 'play none none none'
            },
            delay: (i % 4) * 0.08
        }
    );
});

gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.fromTo(el,
        { opacity: 0, x: -40 },
        {
            opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        }
    );
});

gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.fromTo(el,
        { opacity: 0, x: 40 },
        {
            opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        }
    );
});

// COUNTER ANIMATION
gsap.utils.toArray('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = target === 99 ? '%' : '+';
    ScrollTrigger.create({
        trigger: el, start: 'top 85%',
        onEnter: () => {
            gsap.to({ val: 0 }, {
                val: target, duration: 1.5, ease: 'power2.out',
                onUpdate: function () {
                    el.textContent = Math.round(this.targets()[0].val) + suffix;
                }
            });
        }
    });
});

// TECH CARD STAGGER
ScrollTrigger.create({
    trigger: '.tech-grid', start: 'top 80%',
    onEnter: () => {
        gsap.fromTo('.tech-card',
            { opacity: 0, scale: 0.8, y: 20 },
            {
                opacity: 1, scale: 1, y: 0, duration: 0.5,
                stagger: 0.06, ease: 'back.out(1.7)'
            }
        );
    }
});

// NAV SCROLL EFFECT
ScrollTrigger.create({
    start: 'top -80', end: 99999,
    toggleClass: { className: 'scrolled', targets: 'nav' }
});

// FORM SUBMIT
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
    btn.querySelector('span').textContent = 'Sending...';
    setTimeout(() => {
        btn.querySelector('span').textContent = '✓ Sent!';
        document.getElementById('form-msg').style.display = 'block';
        e.target.reset();
    }, 1200);
}

// PARALLAX HERO
gsap.to('.hero-grid', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
});

gsap.to('.hero-glow', {
    yPercent: 50, scale: 1.3, opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
});

// FLOATING ELEMENTS PARALLAX
gsap.to('.code1', {
    y: -80, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
});
gsap.to('.code2', {
    y: -120, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
});
gsap.to('.code3', {
    y: -60, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.8 }
});

// MOBILE MENU LOGIC
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-links a');

function toggleMenu() {
    const isOpen = menuToggle.classList.contains('open');
    menuToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');

    // Toggle the menu-open class on nav to remove background blur
    document.querySelector('nav').classList.toggle('menu-open');

    document.body.style.overflow = isOpen ? '' : 'hidden'; // Prevent scrolling when open
}

menuToggle.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// SCROLL TO TOP LOGIC
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight / 2) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ACTIVE NAVIGATION HIGHLIGHTING (SCROLL SPY)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-links a');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // trigger when 50% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            });
            // Add active class to corresponding links
            const id = entry.target.getAttribute('id');
            const activeLinks = document.querySelectorAll(`.nav-links a[href="#${id}"], .mobile-links a[href="#${id}"]`);
            activeLinks.forEach(link => {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            });
        }
    });
}, observerOptions);

sections.forEach(sec => observer.observe(sec));

// 3D CARD TILT EFFECT
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation amounts. Math.max/min to cap the rotation to a subtle effect.
        const rotateX = ((y - centerY) / centerY) * -5; // max ±5 deg rotation
        const rotateY = ((x - centerX) / centerX) * 5;  // max ±5 deg rotation

        // Apply transform via GSAP for smoothness
        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            ease: 'power1.out',
            duration: 0.3
        });
    });

    card.addEventListener('mouseleave', () => {
        // Reset card rotation on mouse leave
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            ease: 'power3.out',
            duration: 0.5
        });
    });
});