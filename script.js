document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    // Custom Cursor Setup
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursorDot = document.createElement('div');
        const cursorOutline = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        cursorOutline.className = 'cursor-outline';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            outlineX += distX * 0.15; // easing
            outlineY += distY * 0.15;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Add hover effect to interactive elements
        const interactives = document.querySelectorAll('a, button, .glass, .theme-toggle');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // Scroll Progress Bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    // Navbar & Scroll Progress
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        // Nav background
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');

        // Progress bar
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    });

    // Reveal Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 3D Tilt Effect on Cards (Vanilla JS)
    if (window.matchMedia("(pointer: fine)").matches) {
        const tiltCards = document.querySelectorAll('.skill-category, .contact-card, .about-text, .education-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                // Calculate rotation based on cursor distance from center
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.zIndex = "10";
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.zIndex = "1";
                card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), z-index 0.5s';
            });
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none'; // remove transition for smooth follow
            });
        });
    }

    // Typing effect logic for hero visual
    const codeBlock = document.querySelector('.language-java');
    if (codeBlock) {
        const codeHTML = `class Developer {
    <span class="hljs-title">String</span> name = <span class="hljs-string">"Mai Thi Ngoc Han"</span>;
    <span class="hljs-title">String</span>[] stack = {<span class="hljs-string">"Java"</span>, <span class="hljs-string">"Vert.x"</span>, <span class="hljs-string">"C#"</span>, <span class="hljs-string">"SQL"</span>};
    
    <span class="hljs-keyword">void</span> buildBackend() {
        <span class="hljs-comment">// Delivering production healthcare systems</span>
        System.out.println(<span class="hljs-string">"Robust APIs & Scalable DBs"</span>);
    }
}`;
        // Set HTML but keep hidden, then fade in for a more polished look
        codeBlock.innerHTML = codeHTML;
        codeBlock.style.opacity = '0';
        codeBlock.style.transform = 'translateY(10px)';
        codeBlock.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s';
        
        setTimeout(() => {
            codeBlock.style.opacity = '1';
            codeBlock.style.transform = 'translateY(0)';
        }, 100);
    }
});
