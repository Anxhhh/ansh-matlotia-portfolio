console.log("Portfolio loaded. Welcome.");

document.addEventListener('DOMContentLoaded', () => {
    /* Scroll Reveal Animation */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .project-placeholder-visual').forEach(el => {
        observer.observe(el);
    });

    /* Smooth Scroll for Nav Links */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    /* Custom Cursor Logic */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    // Only active on non-touch devices
    if (matchMedia('(pointer:fine)').matches) {
        window.addEventListener('mousemove', function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Simple lag for outline via CSS transition or JS. 
            // Using keyframes is faster, but JS gives precise 'magnetic' feel.
            // For now, let's use the 'animate' method for high performance trace.

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover Effects
        const interactiveElements = document.querySelectorAll('a, button, .project-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });

            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    } else {
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    }

    /* Parallax Effect */
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;

                // Parallax Logic
                parallaxElements.forEach(el => {
                    const speed = el.getAttribute('data-parallax');
                    const yPos = (scrolled * speed);
                    el.style.transform = `translateY(${yPos}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });

    /* Mobile Menu Logic */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Optional: Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when link is clicked
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }


    /* Local Time Logic */
    function updateTime() {
        const timeDisplay = document.getElementById('local-time');
        if (timeDisplay) {
            const now = new Date();
            const options = { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' };
            timeDisplay.textContent = now.toLocaleTimeString([], options) + " IST";
        }
    }
    setInterval(updateTime, 1000);
    updateTime(); // Initial call
});
