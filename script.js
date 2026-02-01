// Binary Matrix Rain Background
function createBinaryMatrix() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'binary-canvas';
    
    // Insert canvas into cyber-grid
    const cyberGrid = document.querySelector('.cyber-grid');
    if (cyberGrid) {
        cyberGrid.appendChild(canvas);
    }
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Binary characters (0 and 1)
    const binary = '01';
    
    // Font settings
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    // Array to track drop position for each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Start at random heights
    }
    
    // Draw function
    function draw() {
        // Add slight transparency for trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text style - red color
        ctx.fillStyle = '#ff0000';
        ctx.font = fontSize + 'px monospace';
        
        // Draw binary characters
        for (let i = 0; i < drops.length; i++) {
            // Random binary character (0 or 1)
            const text = binary[Math.floor(Math.random() * binary.length)];
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset drop to top randomly after it reaches bottom
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Increment Y coordinate
            drops[i]++;
        }
    }
    
    // Animate
    setInterval(draw, 50);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Additional binary rain on sides (more density)
function createDenseBinaryRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.08';
    canvas.style.pointerEvents = 'none';
    
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0000';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = Math.random() > 0.5 ? '0' : '1';
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Terminal Typing Effect
const terminalTexts = [
    '> Initializing security protocols...',
    '> Running vulnerability scan...',
    '> Analyzing threat vectors...',
    '> Deploying firewall configurations...',
    '> System secured. No intrusions detected.',
    '> Standing by for security operations...'
];

let currentTextIndex = 0;
let currentCharIndex = 0;

function typeTerminalText() {
    const terminalElement = document.getElementById('terminalText');
    
    if (currentCharIndex < terminalTexts[currentTextIndex].length) {
        terminalElement.textContent += terminalTexts[currentTextIndex][currentCharIndex];
        currentCharIndex++;
        setTimeout(typeTerminalText, 50);
    } else {
        setTimeout(() => {
            currentTextIndex = (currentTextIndex + 1) % terminalTexts.length;
            currentCharIndex = 0;
            terminalElement.textContent = '';
            typeTerminalText();
        }, 3000);
    }
}

// Security Scan Status
const scanStatuses = [
    'Analyzing threat vectors...',
    'Checking for vulnerabilities...',
    'Scanning network ports...',
    'Detecting anomalies...',
    'Running intrusion detection...',
    'System secure. No threats found.'
];

let statusIndex = 0;

function updateScanStatus() {
    const scanStatus = document.getElementById('scanStatus');
    if (scanStatus) {
        scanStatus.textContent = scanStatuses[statusIndex];
        statusIndex = (statusIndex + 1) % scanStatuses.length;
    }
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                document.getElementById('navLinks').classList.remove('active');
            }
        });
    });
});

// Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get submit button
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'ENCRYPTING MESSAGE...';
            submitButton.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            try {
                // Send to backend API
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Show success message
                    alert('✅ Message encrypted and sent securely!\n\nYou will receive:\n• Confirmation email immediately\n• Response within 24 hours\n\nThank you for contacting 0xKEY Cyber Defense Systems.');
                    
                    // Reset form
                    this.reset();
                } else {
                    throw new Error(result.error || 'Failed to send message');
                }
                
            } catch (error) {
                console.error('Error:', error);
                alert('⚠️ Failed to send message.\n\nPlease check:\n• Backend server is running\n• Network connection is active\n\nOr contact directly at: security@0xkey.com');
            } finally {
                // Restore button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and other elements
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    const whyCards = document.querySelectorAll('.why-card');
    
    // Set initial state
    [...serviceCards, ...whyCards].forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add glitch effect on hover for service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const title = this.querySelector('.service-title');
            if (title) {
                title.style.animation = 'glitch-anim 0.3s ease';
                setTimeout(() => {
                    title.style.animation = '';
                }, 300);
            }
        });
    });
});

// Random glitch effect on logo
function randomGlitch() {
    const logo = document.querySelector('.logo');
    if (logo && Math.random() < 0.1) { // 10% chance every interval
        logo.style.textShadow = `
            ${Math.random() * 4 - 2}px 0 var(--neon-red),
            ${Math.random() * 4 - 2}px 0 var(--primary-red)
        `;
        setTimeout(() => {
            logo.style.textShadow = '0 0 20px var(--neon-red)';
        }, 100);
    }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    createBinaryMatrix();
    createDenseBinaryRain();
    typeTerminalText();
    setInterval(updateScanStatus, 3000);
    setInterval(randomGlitch, 5000);
});

// Add typing effect to contact form inputs
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--neon-red)';
            this.style.boxShadow = '0 0 20px rgba(255, 0, 60, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = 'rgba(255, 0, 60, 0.3)';
                this.style.boxShadow = 'none';
            }
        });
    });
});

// Add cyber scan animation on page load
window.addEventListener('load', function() {
    setTimeout(() => {
        const scanLine = document.querySelector('.scan-line');
        if (scanLine) {
            scanLine.style.opacity = '0.6';
        }
    }, 500);
});

// Binary Matrix Rain - Active (see createBinaryMatrix and createDenseBinaryRain functions above)

// Add console easter egg
console.log('%c⚠️ SECURITY WARNING ⚠️', 'color: #ff0000; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #ff0000;');
console.log('%cThis is a browser feature intended for developers.', 'color: #ff0000; font-size: 14px;');
console.log('%cIf someone told you to copy-paste something here, it is a scam.', 'color: #ff0000; font-size: 14px;');
console.log('%c[0xKEY Security Systems - All access monitored]', 'color: #ff0000; font-size: 12px; font-family: monospace;');