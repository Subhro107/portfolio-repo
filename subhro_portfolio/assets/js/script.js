document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const toggleBtn = document.createElement('button');
toggleBtn.textContent = '🌙'; // Dark mode ON by default
toggleBtn.style.position = 'fixed';
toggleBtn.style.top = '10px';
toggleBtn.style.right = '10px';
toggleBtn.style.zIndex = '9999';
toggleBtn.style.background = '#bb86fc';
toggleBtn.style.color = '#181818';
toggleBtn.style.border = 'none';
toggleBtn.style.padding = '10px 30px';
toggleBtn.style.borderRadius = '25px';
toggleBtn.style.cursor = 'pointer';
toggleBtn.style.fontWeight = 'bold';
toggleBtn.style.transition = 'background 0.3s, color 0.3s';

document.body.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    if (isDark) {
        toggleBtn.textContent = '🌙';
        toggleBtn.style.background = '#bb86fc';
        toggleBtn.style.color = '#181818';
    } else {
        toggleBtn.textContent = '☀️';
        toggleBtn.style.background = '#ffd600';
        toggleBtn.style.color = '#222';
    }
});

console.log("Portfolio loaded successfully!");

// Contact form handling
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('formStatus');
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.name.value,
                email: form.email.value,
                message: form.message.value
            })
        });
        
        const data = await response.json();
        status.textContent = data.message;
        status.style.color = response.ok ? '#4CAF50' : '#f44336';
        
        if (response.ok) form.reset();
    } catch (error) {
        status.textContent = 'Failed to send message';
        status.style.color = '#f44336';
    }
});

// Scroll reveal animation
function revealAboutSection() {
    const aboutSection = document.querySelector('#about');
    const triggerPoint = window.innerHeight / 1.3;
    
    function checkScroll() {
        const aboutTop = aboutSection.getBoundingClientRect().top;
        
        if (aboutTop < triggerPoint) {
            aboutSection.classList.add('reveal');
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load
}

// Initialize scroll reveal
document.addEventListener('DOMContentLoaded', revealAboutSection);
