
/* ── Smooth momentum scroll ── */
let currentY = window.scrollY;
let targetY = window.scrollY;
let ease = 0.06;
let animating = false;

window.addEventListener('wheel', function(e) {
    e.preventDefault();
    targetY += e.deltaY;
    targetY = Math.max(0, Math.min(targetY, document.documentElement.scrollHeight - window.innerHeight));
    if (!animating) {
        animating = true;
        smoothScroll();
    }
}, { passive: false });

function smoothScroll() {
    currentY += (targetY - currentY) * ease;
    window.scrollTo(0, currentY);
    if (Math.abs(targetY - currentY) > 0.5) {
        requestAnimationFrame(smoothScroll);
    } else {
        currentY = targetY;
        window.scrollTo(0, currentY);
        animating = false;
    }
}

window.addEventListener('load', function() {
    currentY = window.scrollY;
    targetY = window.scrollY;
});

window.addEventListener('scroll', function() {
    if (!animating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
    }
});


/* ── Loader function ── */
document.body.style.overflow = 'hidden';
window.onload = function() {
    var loader = document.getElementById('loader');
    var paths = document.querySelectorAll('.loader-only-path');
    var lengths = [3000, 1000, 200, 2500, 800];

        setTimeout(function() {
            paths.forEach(function(path, i) {
                path.style.transition = 'stroke-dashoffset ' + (1.4 + i * 0.2) + 's cubic-bezier(0.4, 0, 0.2, 1)';
                path.style.strokeDashoffset = '0';
        });

        setTimeout(function() {
            paths.forEach(function(path, i) {
                path.style.transition = 'stroke-dashoffset ' + (1.2 + i * 0.15) + 's cubic-bezier(0.4, 0, 0.2, 1)';
                path.style.strokeDashoffset = lengths[i];
            });

            setTimeout(function() {
                loader.style.transition = 'opacity 0.8s ease';
                loader.style.opacity = '0';
                document.body.style.overflow = '';
                setTimeout(function() { loader.style.display = 'none'; }, 800);
            }, 1400);
        }, 1000);
    }, 400);
};


/* ── Header Logo ── */
window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        document.querySelector('#headerLogo').classList.add('visible');
    } else {
        document.querySelector('#headerLogo').classList.remove('visible');
    }
});

/* ── Header Logo ── */
const logoPaths = document.querySelectorAll('#headerLogo .loader-path');
const logoLengths = [3000, 1000, 200, 2500, 800];
let logoAnimating = false;

document.querySelector('#headerLogo').addEventListener('mouseenter', function() {
    if (logoAnimating) return;
    logoAnimating = true;

    // erase
    logoPaths.forEach(function(path, i) {
        path.style.transition = 'stroke-dashoffset ' + (0.6 + i * 0.1) + 's cubic-bezier(0.4, 0, 0.2, 1)';
        path.style.strokeDashoffset = logoLengths[i];
    });

    // rewrite
    setTimeout(function() {
        logoPaths.forEach(function(path, i) {
            path.style.transition = 'stroke-dashoffset ' + (0.6 + i * 0.1) + 's cubic-bezier(0.4, 0, 0.2, 1)';
            path.style.strokeDashoffset = '0';
        });

        setTimeout(function() {
            logoAnimating = false;
        }, 800);
    }, 1000);
});


/* ── Theme button ── */
const toggle = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    icon.className = 'fa-solid fa-moon';
}

toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    icon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
})


/* ── Typewriter effect Quote ── */
const div = document.querySelector(".quote");
const fullText = "The best way to predict the future is to build it.";
const highlights = ["predict", "future", "build"];

function textTypingEffect(element, text, i = 0) {
    if (i === 0) element.innerHTML = "";
    
    let currentFullString = text.substring(0, i + 1);
    let htmlContent = currentFullString;
    
    highlights.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        htmlContent = htmlContent.replace(regex, `<span class="highlight">${word}</span>`);
    });
    
    element.innerHTML = htmlContent;
    
    if (i < text.length - 1) {
        // You can increase '35' to make the typing itself slower
        setTimeout(() => textTypingEffect(element, text, i + 1), 35);
    }
}

// ── Intersection Observer Settings ── //
const observerOptions = {
    root: null, // use the viewport
    rootMargin: '0px 0px -50px 0px', // -50px means it triggers 50px AFTER it enters the view
    threshold: 0.5 // 50% of the element must be visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Added an extra 500ms delay here for safety
            setTimeout(() => {
                textTypingEffect(div, fullText);
            }, 1); 
            
            observer.disconnect(); // Stop watching once it starts
        }
    });
}, observerOptions);

if (div) {
    observer.observe(div);
}


/* ── Typewriter effect Quote 2 ── */
const citeDiv = document.querySelector(".cite");
const citeText = "The more we value things outside our control, the less control we have.";
const citeHighlights = ["outside", "control", "less"];

function citeTypingEffect(element, text, i = 0) {
    if (i === 0) element.innerHTML = "";
    
    let currentFullString = text.substring(0, i + 1);
    let htmlContent = currentFullString;
    
    // Apply highlights
    citeHighlights.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        htmlContent = htmlContent.replace(regex, `<span class="highlight">${word}</span>`);
    });
    
    element.innerHTML = htmlContent;
    
    if (i < text.length - 1) {
        setTimeout(() => citeTypingEffect(element, text, i + 1), 40); // Slightly slower speed (40ms)
    }
}

// ── Observer for the Second Quote ──
const citeObserverOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Triggers when it's 100px inside the screen
    threshold: 0.5 
};

const citeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Half-second pause before starting
            setTimeout(() => {
                citeTypingEffect(citeDiv, citeText);
            }, 1);
            
            citeObserver.disconnect(); 
        }
    });
}, citeObserverOptions);

// Only start observing if the element actually exists on the page
if (citeDiv) {
    citeObserver.observe(citeDiv);
}


/* ── About cards slide in ── */
const aboutCards = document.querySelectorAll('.about-card .about-content');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.4 });

aboutCards.forEach(card => cardObserver.observe(card));