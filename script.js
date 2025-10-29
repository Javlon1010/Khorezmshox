// Mobil menyu boshqaruvi
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Navigatsiya havolalari uchun silliq skroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Mobil menyu ochiq bo'lsa yopish
            document.querySelector('.nav-links').classList.remove('active');
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
document.addEventListener('DOMContentLoaded', function() {
    const selectedBranch = localStorage.getItem('selectedBranch');
    if (selectedBranch) {
        document.querySelector(`.branch-card[data-branch="${selectedBranch}"]`).classList.add('selected');
    }
});

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

// Dark/Light mode
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

// Sahifa yuklanganda bajariladigan funksiyalar
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initThemeToggle();
});