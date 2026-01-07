document.addEventListener('DOMContentLoaded', () => {
    // Console Ready
    console.log('System Status: Online');

    // --- Hero Badge Typing Logic ---
    const texts = ['whoami', 'cat profile.txt', 'ls skills/'];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    const typingElement = document.getElementById('typing-text');

    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        if (typingElement) {
            typingElement.textContent = letter;
        }

        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // Pause before next phrase
        } else {
            setTimeout(type, 100);
        }
    })();

    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // --- Terminal Section Animation Logic ---
    const terminalBody = document.getElementById('terminal-body');

    // The sequence of commands to type
    const terminalSequence = [
        { cmd: 'whoami', output: 'yallanuru_kishan_sai', delay: 2000 },
        { cmd: 'cat profile.txt', output: 'Cybersecurity Graduate | Network & Defense Security Enthusiast', delay: 2000 },
        { cmd: 'ls skills/', output: 'vulnerability_assessment network_security web_security digital_forensics', delay: 2000 },
        { cmd: 'cat status.txt', output: 'Ready for SOC Analyst & Security Engineer roles', delay: 2000 }
    ];

    async function typeText(element, text, speed = 50) {
        return new Promise(resolve => {
            let i = 0;
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    // Function to create the styled prompt line
    function createPromptLine() {
        const line = document.createElement('div');
        line.className = 'input-line';
        line.innerHTML = `
            <span class="user-host">K1sh4n_s4i@portfolio</span>
            <span class="separator">:</span>
            <span class="path">~</span>
            <span class="prompt-symbol">$</span>
            <span class="command"></span>
            <span class="cursor"></span>
        `;
        terminalBody.appendChild(line);
        return line;
    }

    async function runTerminal() {
        if (!terminalBody) return;
        terminalBody.innerHTML = ''; // Clear existing

        for (const step of terminalSequence) {
            // 1. Create Line & Type Command
            const line = createPromptLine();
            const commandSpan = line.querySelector('.command');

            // Hide previous cursors
            const cursors = terminalBody.querySelectorAll('.cursor');
            cursors.forEach((c, index) => {
                if (index < cursors.length - 1) c.style.display = 'none';
            });

            await typeText(commandSpan, step.cmd);

            // 2. Pause briefly after typing
            await new Promise(r => setTimeout(r, 500));

            // 3. Show Output (if any)
            if (step.output) {
                const outputDiv = document.createElement('div');
                outputDiv.className = 'output';
                outputDiv.textContent = step.output;
                terminalBody.appendChild(outputDiv);
            }

            // 4. Wait for specified delay before next command
            await new Promise(r => setTimeout(r, step.delay));
        }

        // Final Prompt with blinking cursor
        const finalLine = createPromptLine();

        // Hide all cursors except the last one
        const cursors = terminalBody.querySelectorAll('.cursor');
        cursors.forEach((c, index) => {
            if (index < cursors.length - 1) c.style.display = 'none';
        });
    }

    // Start Terminal Animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runTerminal();
                observer.disconnect(); // Run once
            }
        });
    }, { threshold: 0.5 });

    if (terminalBody) {
        observer.observe(terminalBody);
    }
});
