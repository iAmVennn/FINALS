let lastScrollTop = 0;
let scrollDirection = 'up';
const notchSection = document.getElementById('notchSection');

function isMobileDevice() {
    return window.innerWidth <= 768;
}

function handleScroll() {
    if (!isMobileDevice()) {
        notchSection.classList.remove('scrolled-up', 'scrolled-down');
        return;
    }

    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        scrollDirection = 'down';
        notchSection.classList.add('scrolled-down');
        notchSection.classList.remove('scrolled-up');
    } else if (currentScroll < lastScrollTop || currentScroll <= 100) {
        scrollDirection = 'up';
        notchSection.classList.add('scrolled-up');
        notchSection.classList.remove('scrolled-down');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

let autoCollapseTimer;

function startAutoCollapseTimer() {
    if (!isMobileDevice()) return;
    
    clearTimeout(autoCollapseTimer);
    autoCollapseTimer = setTimeout(() => {
        if (notchSection.classList.contains('scrolled-up')) {
            notchSection.classList.add('auto-collapsed');
        }
    }, 3000);
}

function resetAutoCollapseTimer() {
    if (!isMobileDevice()) return;
    
    clearTimeout(autoCollapseTimer);
    notchSection.classList.remove('auto-collapsed');
    startAutoCollapseTimer();
}

let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
}

function finishTick() {
    ticking = false;
}

window.addEventListener('scroll', () => {
    requestTick();
    setTimeout(finishTick, 16);
    
    if (isMobileDevice()) {
        resetAutoCollapseTimer();
    }
});

window.addEventListener('resize', () => {
    handleScroll();
    if (isMobileDevice()) {
        resetAutoCollapseTimer();
    }
});

if (isMobileDevice()) {
    notchSection.addEventListener('touchstart', resetAutoCollapseTimer, { passive: true });
    notchSection.addEventListener('touchmove', resetAutoCollapseTimer, { passive: true });
}

handleScroll();
if (isMobileDevice()) {
    startAutoCollapseTimer();
}

document.addEventListener('touchstart', function() {}, { passive: true });
document.addEventListener('touchmove', function() {}, { passive: true });