// ========== ТЕМА ==========
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeToggle.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
});

// ========== КУРСОР ==========
const cursor = document.querySelector('.cursor-glow');
if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// ========== ПЛАВНЫЙ СКРОЛЛ ==========
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== ТАЙМЕР ==========
function startTimer() {
    const target = new Date();
    target.setDate(target.getDate() + 3);
    target.setHours(23, 59, 59, 999);
    setInterval(() => {
        const diff = target - new Date();
        if (diff <= 0) return;
        document.getElementById('days').innerText = String(Math.floor(diff / 86400000)).padStart(2, '0');
        document.getElementById('hours').innerText = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
        document.getElementById('minutes').innerText = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        document.getElementById('seconds').innerText = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    }, 1000);
}
startTimer();

// ========== СЧЁТЧИКИ ==========
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.dataset.target;
            let current = 0;
            const timer = setInterval(() => {
                if (current >= target) clearInterval(timer);
                else {
                    current += Math.ceil(target / 40);
                    el.innerText = current + (el.dataset.suffix || '');
                }
            }, 25);
            observer.unobserve(el);
        }
    });
});
counters.forEach(c => observer.observe(c));

// ========== СЛАЙДЕР ==========
let slideIndex = 0;
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.review-card');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
if (track && slides.length) {
    next.addEventListener('click', () => {
        slideIndex = (slideIndex + 1) % slides.length;
        track.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
    prev.addEventListener('click', () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        track.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
}

// ========== АККОРДЕОН ==========
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
    });
});

// ========== МОДАЛКА ==========
const modal = document.getElementById('modal');
document.querySelectorAll('.modal-open').forEach(btn => {
    btn.addEventListener('click', () => modal.style.display = 'flex');
});
document.querySelector('.modal-close').addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

// ========== ФОРМЫ ==========
const form = document.getElementById('callbackForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = document.querySelector('.form-message');
        msg.innerText = '✅ Заявка принята!';
        setTimeout(() => msg.innerText = '', 2000);
        form.reset();
    });
}

// ========== ФИШКИ ==========
const descriptions = {
    "Плавный скролл": "Анимация при клике на меню — страница плавно прокручивается.",
    "Таймер акции": "Обратный отсчёт до дедлайна. Конверсия вырастает на 30-40%.",
    "Адаптив": "Красиво на телефоне, планшете и ноутбуке.",
    "Смена темы": "Тёмная/светлая тема одним кликом.",
    "Модалка": "Всплывающее окно с формой.",
    "Анимированные счётчики": "Цифры «едут» от 0 до цели при скролле.",
    "Аккордеон FAQ": "Вопросы-ответы по клику.",
    "Слайдер отзывов": "Листаемые отзывы клиентов.",
    "Карта": "Карта с адресом — доверие к компании.",
    "Форма с имитацией": "Сбор заявок с валидацией.",
    "Быстрая загрузка": "Влияет на позиции в Google/Яндекс."
};

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
        const name = card.getAttribute('data-feature');
        const desc = descriptions[name] || "Обсудим индивидуально.";
        const popup = document.getElementById('featurePopup');
        popup.innerHTML = `<strong>✨ ${name}</strong><br>${desc}`;
        popup.classList.add('show');
        popup.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

// ========== КАНВАС (ОПТИМИЗИРОВАН) ==========
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 120; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        speed: 0.008 + Math.random() * 0.015
    });
}

function drawBackground() {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (document.body.classList.contains('light')) {
        grad.addColorStop(0, '#e8f0ff');
        grad.addColorStop(1, '#d4e2fc');
    } else {
        grad.addColorStop(0, '#05070a');
        grad.addColorStop(1, '#0a0f1f');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 0.8 || s.alpha < 0.2) s.speed *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 200, ${s.alpha * 0.7})`;
        ctx.fill();
    });
}

function animate() {
    drawBackground();
    requestAnimationFrame(animate);
}
animate();

const themeObserver = new MutationObserver(() => drawBackground());
themeObserver.observe(document.body, { attributes: true });