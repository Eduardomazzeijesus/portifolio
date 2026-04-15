/*
 * DESIGN PHILOSOPHY: Neomorfismo Escuro com Acento Ciano
 * Arquivo: script.js - Lógica interativa do portfólio
 */

// ─── DATA ──────────────────────────────────────────────────────────────────────
const SKILLS = [
    { name: "HTML5", level: 90, icon: "🌐" },
    { name: "CSS3", level: 82, icon: "🎨" },
    { name: "JavaScript", level: 75, icon: "⚡" },
    { name: "Python", level: 65, icon: "🐍" },
    { name: "Git & GitHub", level: 70, icon: "🔧" },
    { name: "Lógica de Programação", level: 88, icon: "🧠" },
    { name: "SQL Básico", level: 60, icon: "🗄️" },
    { name: "Figma (UI/UX)", level: 55, icon: "✏️" },
];

const PROJECTS = [
    {
        title: "Jokempo",
        desc: "Um pedra, papel e tesoura clássico ...",
        tags: ["HTML", "CSS", "JavaScript"],
        emoji: "🎯",
        url: "https://seuusuario.github.io/calculadora"
    },
    {
        title: "Pata Amiga",
        desc: "Um site para cuidar do seu pet...",
        tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
        emoji: "🐶",
        url: "https://seuusuario.github.io/cadastro"
    },
    {
        title: "Clinica",
        desc: "Uma clinica expecializada em cuidar de vc...",
        tags: ["HTML", "CSS", "JavaScript"],
        emoji: "🩺",
        url: "https://seuusuario.github.io/quiz"
    },
    {
        title: "Academia de jiu-jitsu",
        desc: "Um site de academia de Jiu-jitsu...",
        tags: ["HTML", "CSS", "JavaScript"],
        emoji: "🥋",
        url: "https://seuusuario.github.io/conversor"
    },
    {
        title: "Team Cruz",
        desc: "Primeira versão...",
        tags: ["HTML", "CSS",],
        emoji: "🤼‍♂️",
        url: "https://seuusuario.github.io/portfolio"
    },
    {
        title: "Jogo da Memória",
        desc: "Jogo em desenvolvimento...",
        tags: ["HTML", "CSS", "JavaScript"],
        emoji: "🃏",
        url: "https://seuusuario.github.io/memoria"
    }
];

const TIMELINE = [
    {
        year: "2026 – Atual",
        title: "3º Ano — Ensino Médio",
        subtitle: "Escola SESI e SENAI",
        desc: "Cursando o último ano do ensino médio com foco em desenvolvimento de sistemas. Aprofundamento em algoritmos, banco de dados, programação orientada a objetos e sites.",
    },
    {
        year: "2025",
        title: "2º Ano Ensino Médio— Desenvolvimento Web",
        subtitle: "Curso Técnico em Desenvolvimento de Sistemas",
        desc: "Módulo de desenvolvimento web front-end: HTML5, CSS3, JavaScript. Primeiro contato com frameworks e versionamento com Git.",
    },
    {
        year: "2025",
        title: "2º Ano Ensino Médio  — Fundamentos",
        subtitle: "Curso Técnico em Desenvolvimento de Sistemas",
        desc: "Introdução à lógica de programação, algoritmos, fluxogramas e primeiros passos com Python. Base sólida em raciocínio computacional.",
    },
    {
        year: "2024",
        title: "Início da Jornada",
        subtitle: "Visualizando ",
        desc: "Primeiros experimentos com código aos 15 anos, minha primeira experiencia foi apenas vendo as pessoas codando. O começo de tudo.",
    },
];

// ─── TYPEWRITER EFFECT ─────────────────────────────────────────────────────────
const typewriterTexts = [
    "Desenvolvedor Front-End",
    "Estudante de TI",
    "Criador de Soluções",
    "Apaixonado por Código",
];

let typewriterIdx = 0;
let typewriterDisplayed = "";
let typewriterDeleting = false;

function updateTypewriter() {
    const current = typewriterTexts[typewriterIdx];
    const typewriterEl = document.getElementById("typewriter");

    if (!typewriterDeleting && typewriterDisplayed.length < current.length) {
        typewriterDisplayed = current.slice(0, typewriterDisplayed.length + 1);
        typewriterEl.innerHTML = `<span style="color: #00F5D4;">${typewriterDisplayed}</span><span style="display: inline-block; width: 2px; height: 1.1em; background: #00F5D4; margin-left: 2px; vertical-align: middle; animation: blink 1s step-end infinite;"></span>`;
        setTimeout(updateTypewriter, 80);
    } else if (!typewriterDeleting && typewriterDisplayed.length === current.length) {
        typewriterDeleting = true;
        setTimeout(updateTypewriter, 2000);
    } else if (typewriterDeleting && typewriterDisplayed.length > 0) {
        typewriterDisplayed = typewriterDisplayed.slice(0, -1);
        typewriterEl.innerHTML = `<span style="color: #00F5D4;">${typewriterDisplayed}</span><span style="display: inline-block; width: 2px; height: 1.1em; background: #00F5D4; margin-left: 2px; vertical-align: middle; animation: blink 1s step-end infinite;"></span>`;
        setTimeout(updateTypewriter, 40);
    } else if (typewriterDeleting && typewriterDisplayed.length === 0) {
        typewriterDeleting = false;
        typewriterIdx = (typewriterIdx + 1) % typewriterTexts.length;
        setTimeout(updateTypewriter, 500);
    }
}

// ─── PARTICLE CANVAS ───────────────────────────────────────────────────────────
function initParticleCanvas() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;

    const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.2,
        });
    }

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 245, 212, ${p.alpha})`;
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 245, 212, ${0.15 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", resize);
    };
}

// ─── NAVBAR SCROLL ─────────────────────────────────────────────────────────────
function initNavbarScroll() {
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

// ─── HAMBURGER MENU ────────────────────────────────────────────────────────────
function toggleMenu() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
}

// Close menu when a link is clicked
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links .nav-link");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            document.getElementById("hamburger").classList.remove("active");
            document.getElementById("navLinks").classList.remove("active");
        });
    });
});

// ─── SCROLL FUNCTIONS ──────────────────────────────────────────────────────────
function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ─── INTERSECTION OBSERVER FOR FADE-IN ─────────────────────────────────────────
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".fade-in-up").forEach((el) => {
        observer.observe(el);
    });
}

// ─── RENDER SKILLS ─────────────────────────────────────────────────────────────
function renderSkills() {
    const skillsGrid = document.getElementById("skillsGrid");
    skillsGrid.innerHTML = SKILLS.map((skill) => `
        <div class="neo-card skill-card fade-in-up">
            <div class="skill-header">
                <div class="skill-name">
                    <span class="skill-icon">${skill.icon}</span>
                    <span class="skill-title">${skill.name}</span>
                </div>
                <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="skill-bar-bg">
                <div class="skill-bar-fill" style="width: 0%;"></div>
            </div>
        </div>
    `).join("");

    // Animate skill bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const skillCard = entry.target;
                const skillLevel = parseInt(skillCard.querySelector(".skill-level").textContent);
                setTimeout(() => {
                    skillCard.querySelector(".skill-bar-fill").style.width = skillLevel + "%";
                }, 50);
                observer.unobserve(skillCard);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".skill-card").forEach((card) => {
        observer.observe(card);
    });
}

// ─── RENDER PROJECTS ───────────────────────────────────────────────────────────
function renderProjects() {
    const projectsGrid = document.getElementById("projectsGrid");
    projectsGrid.innerHTML = PROJECTS.map((project) => `
        <div class="neo-card project-card fade-in-up">
            <div class="project-header">
                <span class="project-emoji">${project.emoji}</span>
                <button class="project-link-btn">↗</button>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.desc}</p>
            <div class="project-tags">
                ${project.tags.map((tag) => `<span class="tech-tag">${tag}</span>`).join("")}
            </div>
        </div>
    `).join("");
}

// ─── RENDER TIMELINE ───────────────────────────────────────────────────────────
function renderTimeline() {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = TIMELINE.map((item, index) => `
        <div class="timeline-item fade-in-up">
            <div class="timeline-dot"></div>
            <div class="neo-card timeline-card">
                <div class="timeline-year">${item.year}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <div class="timeline-subtitle">${item.subtitle}</div>
                <p class="timeline-desc">${item.desc}</p>
            </div>
        </div>
    `).join("");
}

// ─── FORM SUBMISSION ───────────────────────────────────────────────────────────
function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");

    // Simulate sending
    form.style.display = "none";
    formSuccess.style.display = "flex";

    // Reset after 4 seconds
    setTimeout(() => {
        form.reset();
        form.style.display = "block";
        formSuccess.style.display = "none";
    }, 4000);
}

// ─── INITIALIZATION ────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all components
    initParticleCanvas();
    initNavbarScroll();
    updateTypewriter();
    renderSkills();
    renderProjects();
    renderTimeline();
    initIntersectionObserver();

    // Add fade-in-up class to sections
    document.querySelectorAll(".section").forEach((section) => {
        section.classList.add("fade-in-up");
    });

    initIntersectionObserver();
});

// ─── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href !== "#") {
            e.preventDefault();
            scrollTo(href);
        }
    });
});

