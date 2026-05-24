/* ============================================
   Portfolio Main JS — Sijo Varghese
   ============================================ */

/* ---------- Alpine.js: portfolio() ---------- */
function portfolio() {
    return {
        darkMode: true,
        init() {
            this.darkMode = localStorage.getItem('theme') !== 'light';
            this.$watch('darkMode', val =>
                localStorage.setItem('theme', val ? 'dark' : 'light')
            );
            const obs = new IntersectionObserver(
                entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
                { threshold: 0.1 }
            );
            document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
        }
    };
}

/* ---------- Alpine.js: experienceCounter() ---------- */

function experienceCounter() {
    return {
        count: 0,
        finalCount: 0,
        displayText: '',

        startCounter() {

            // Joining date
            const joiningDate = new Date('2020-02-20');

            // Current date
            const currentDate = new Date();

            // Calculate experience in years
            const diffTime = currentDate - joiningDate;

            this.finalCount = +(diffTime / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);

            // Animation settings
            const duration = 1000;
            const stepTime = 20;
            const increment = this.finalCount / (duration / stepTime);

            const timer = setInterval(() => {

                this.count += increment;

                if (this.count >= this.finalCount) {
                    this.count = this.finalCount;
                    clearInterval(timer);
                }

                this.updateDisplay();
            }, stepTime);
        },

        updateDisplay() {

            const rounded = Math.floor(this.count);

            // Check if decimal exists
            if (this.finalCount % 1 === 0) {
                this.displayText = `${rounded} Years of Experience`;
            } else {
                this.displayText = `${rounded}+ Years of Experience`;
            }
        }
    }
}



/* ---------- Alpine.js: contactForm() ---------- */
function contactForm() {
    return {
        name: '',
        phone: '',
        email: '',
        message: '',
        status: '',
        statusMessage: '',
        submit() {
            this.status = 'loading';
            fetch('https://formsubmit.co/ajax/sijovarghese808@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Name: this.name,
                    Phone: this.phone,
                    Email: this.email,
                    Message: this.message
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === 'true' || data.success === true) {
                        this.status = 'success';
                        this.statusMessage = 'Great!!! Email has been Successfully Sent. We will get in touch asap.';
                        this.name = '';
                        this.phone = '';
                        this.email = '';
                        this.message = '';
                    } else {
                        this.status = 'error';
                        this.statusMessage = data.message || 'Something went wrong. Please try again.';
                    }
                })
                .catch(() => {
                    this.status = 'error';
                    this.statusMessage = 'An error occurred while sending the email. Please try again.';
                });
        }
    };
}

/* ---------- Typed.js Init ---------- */
document.addEventListener('DOMContentLoaded', function () {

    // Fix: read text from a data attribute to avoid whitespace from multi-line HTML
    const typedSource = document.getElementById('typed-strings');
    const typedOutput = document.querySelector('.typed-text-output');

    if (typedSource && typedOutput) {
        const strings = typedSource.dataset.strings
            .split('|')
            .map(s => s.trim())
            .filter(Boolean);

        new Typed('.typed-text-output', {
            strings: strings,
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 400,
            smartBackspace: false,
            loop: true
        });
    }

    /* ---------- Back-to-Top ---------- */
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
