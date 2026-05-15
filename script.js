// ========== ТЕМА ==========
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeToggle.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
});

// ========== КУРСОР — ПЛАВНОЕ ПОДСВЕЧИВАНИЕ ==========
const cursor = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Эффект нажатия
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursor.style.background = 'rgba(124, 58, 237, 0.3)';
});
document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'transparent';
});

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

// ========== АНИМИРОВАННЫЕ СЧЁТЧИКИ ==========
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
                    current += Math.ceil(target / 50);
                    el.innerText = current + (el.dataset.suffix || '');
                }
            }, 30);
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
document.getElementById('callbackForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.querySelector('.form-message');
    msg.innerText = '✅ Заявка принята!';
    setTimeout(() => msg.innerText = '', 2000);
    e.target.reset();
});

// ========== ОПИСАНИЯ ФИШЕК ==========
const descriptions = {
    "Плавный скролл": "Анимация при клике на меню — страница плавно прокручивается к нужному блоку. Заказчики любят это за «дорогой» вид сайта.",
    "Таймер акции": "Обратный отсчёт до дедлайна. Конверсия вырастает на 30-40%.",
    "Адаптив": "Красиво на телефоне, планшете и ноутбуке. База.",
    "Смена темы": "Тёмная/светлая тема одним кликом — клиенты в восторге.",
    "Модалка": "Всплывающее окно с формой. Собирает заявки без отвлечения.",
    "Анимированные счётчики": "Цифры «едут» от 0 до цели при скролле. Отлично для портфолио.",
    "Аккордеон FAQ": "Вопросы-ответы по клику. Экономит место, выглядит аккуратно.",
    "Слайдер отзывов": "Листаемые отзывы. Социальное доказательство.",
    "Карта": "Карта с адресом — доверие к компании.",
    "Форма с имитацией": "Сбор заявок с валидацией. Легко подключить на почту/ТГ.",
    "Быстрая загрузка": "Влияет на позиции в Google/Яндекс. Моя гордость."
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

// ========== ФОН КАНВАС (КОСМОС) ==========
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.3;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.speed = 0.02 + Math.random() * 0.03;
    }
    update() {
        this.alpha += this.speed;
        if (this.alpha > 1 || this.alpha < 0.2) this.speed *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 200, ${this.alpha * 0.8})`;
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < 300; i++) stars.push(new Star());
}
initStars();

function drawNebula() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (document.body.classList.contains('light')) {
        gradient.addColorStop(0, '#e8f0ff');
        gradient.addColorStop(1, '#d4e2fc');
    } else {
        gradient.addColorStop(0, '#05070a');
        gradient.addColorStop(0.4, '#0a0f1f');
        gradient.addColorStop(0.7, '#0d1225');
        gradient.addColorStop(1, '#05070a');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawNebulaClouds() {
    for (let i = 0; i < 5; i++) {
        const x = (Date.now() * 0.02 + i * 200) % (canvas.width + 400) - 200;
        const y = canvas.height * 0.5 + Math.sin(Date.now() * 0.001 + i) * 80;
        const gradient = ctx.createRadialGradient(x, y, 30, x, y, 200);
        gradient.addColorStop(0, `rgba(124, 58, 237, ${0.08 + Math.sin(Date.now() * 0.001 + i) * 0.03})`);
        gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function animateBg() {
    drawNebula();
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    drawNebulaClouds();
    requestAnimationFrame(animateBg);
}
animateBg();

// Перерисовка при смене темы
const observerTheme = new MutationObserver(() => {
    animateBg();
});
observerTheme.observe(document.body, { attributes: true });