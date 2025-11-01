// Mobil menyu boshqaruvi
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menyu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Silliq scroll funksiyasi
    function smoothScroll(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Mobil menyu yopish
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    }

    // Navigatsiya havolalari uchun silliq scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                smoothScroll(targetId);
            }
        });
    });

    // Hero bo'limidagi tugmalar
    const heroButtons = document.querySelectorAll('.hero-btns .btn');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                smoothScroll(targetId);
            } else if (this.textContent.includes('Kurslarni Ko\'rish')) {
                smoothScroll('#courses');
            } else if (this.textContent.includes('Konsultatsiya')) {
                smoothScroll('#registration');
            }
        });
    });

    // Filial tanlash
    document.querySelectorAll('.branch-select').forEach(btn => {
        btn.addEventListener('click', function() {
            const branch = this.dataset.branch;
            
            // Barcha filiallardan tanlangan klassini olib tashlash
            document.querySelectorAll('.branch-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Tanlangan filialga klass qo'shish
            this.closest('.branch-card').classList.add('selected');
            
            // Tanlangan filialni saqlash
            localStorage.setItem('selectedBranch', branch);
            
            alert('Siz ' + this.closest('.branch-card').querySelector('h3').textContent + ' ni tanladingiz!');
        });
    });

    // Sahifa yuklanganda tanlangan filialni ko'rsatish
    const selectedBranch = localStorage.getItem('selectedBranch');
    if (selectedBranch) {
        const selectedCard = document.querySelector(`.branch-card[data-branch="${selectedBranch}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
    }

    // Scroll animatsiyalari
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Kuzatishni boshlash
        document.querySelectorAll('.course-card, .pricing-card, .benefits-content, .stat-item, .telegram-content').forEach(el => {
            observer.observe(el);
        });
    }

    // Tema almashish
    function initThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Tema almashish';
        
        document.querySelector('.navbar').appendChild(themeToggle);
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Saqlangan temani yuklash
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Dasturni ishga tushirish
    initScrollAnimations();
    initThemeToggle();
});

// Hash change bo'lganda ham ishlashi uchun
window.addEventListener('hashchange', function() {
    const targetId = window.location.hash;
    if (targetId) {
        setTimeout(() => {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});
