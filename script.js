/* ── Footer function ── */
window.addEventListener("scroll", function() { 
    const footer = document.querySelector("footer");
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
    if (atBottom) {
        footer.classList.add("visible");
    } else {
        footer.classList.remove("visible");
    }
});


/* ── Theme icon ── https://www.youtube.com/watch?v=_gKEUYarehE&t=220s*/
const toggle = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');

// saves user prefecrence
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    icon.className = 'fa-solid fa-moon';
}

toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    icon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


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

// ── Intersection Observer Settings ──
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


/* ── SVG scroll draw ── */
const drawPath = document.getElementById('draw-path');

if (drawPath) {
    const length = drawPath.getTotalLength();
    drawPath.style.strokeDasharray = length;
    drawPath.style.strokeDashoffset = length;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrolled / maxScroll;
        drawPath.style.strokeDashoffset = length * (1 - progress);
    });
}