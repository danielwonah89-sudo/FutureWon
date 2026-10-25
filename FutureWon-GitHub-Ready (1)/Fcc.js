/* =================================
   FUTUREWON — WEBSITE INTERACTIONS
================================= */

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close the menu after clicking a navigation link

    const navigationLinks = navLinks.querySelectorAll("a");

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("is-open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });

    // Close the menu when switching to desktop width

    window.addEventListener("resize", function () {
        if (window.innerWidth > 760) {
            navLinks.classList.remove("is-open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }
    });
}

// AUTOMATIC FOOTER YEAR

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
```

/* PROJECT CARD INTERACTIONS */

const projectDetails = {
    web: {
        label: "PROJECT 01 / DIGITAL SKILLS",
        title: "Build for the web",
        description:
            "Plan and build a simple website. Practise HTML, CSS, responsive layouts, and the basics of JavaScript as you turn an idea into a working page.",
        next:
            "Suggested next step: choose a small website idea and sketch its homepage."
    },
    creative: {
        label: "PROJECT 02 / CREATIVE WORK",
        title: "Create with purpose",
        description:
            "Develop a creative piece such as a short video, a poster, or a social media campaign. Focus on clear communication and a consistent visual style.",
        next:
            "Suggested next step: create one piece of work and prepare it for your portfolio."
    },
    ideas: {
        label: "PROJECT 03 / PROBLEM SOLVING",
        title: "Make an idea useful",
        description:
            "Identify a problem people experience, explore possible solutions, and plan a small project that demonstrates how your idea could help.",
        next:
            "Suggested next step: write down the problem, who it affects, and one practical solution."
    }
};

const projectButtons = document.querySelectorAll("[data-project]");
const projectDetail = document.getElementById("project-detail");
const projectDetailLabel = document.getElementById("project-detail-label");
const projectDetailTitle = document.getElementById("project-detail-title");
const projectDetailDescription = document.getElementById("project-detail-description");
const projectDetailNext = document.getElementById("project-detail-next");
const projectDetailClose = document.getElementById("project-detail-close");

if (
    projectButtons.length &&
    projectDetail &&
    projectDetailLabel &&
    projectDetailTitle &&
    projectDetailDescription &&
    projectDetailNext
) {
    projectButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const project = projectDetails[button.dataset.project];

            if (!project) return;

            projectDetailLabel.textContent = project.label;
            projectDetailTitle.textContent = project.title;
            projectDetailDescription.textContent = project.description;
            projectDetailNext.textContent = project.next;
            projectDetail.hidden = false;

            projectDetail.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "nearest"
            });
        });
    });

    if (projectDetailClose) {
        projectDetailClose.addEventListener("click", function () {
            projectDetail.hidden = true;
        });
    }
}

/* SUBTLE SCROLL REVEAL */

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {
    const revealItems = document.querySelectorAll(
        ".hero-copy, .hero-art, .section-heading, " +
        ".path-card, .feature-content, .feature-aside, " +
        ".opportunity-panel, .build-copy, .build-statement, " +
        ".purpose-section > *, .project-card"
    );

    revealItems.forEach(function (item) {
        item.classList.add("reveal-ready");
    });

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealItems.forEach(function (item) {
        revealObserver.observe(item);
    });
}


/* CONTACT FORM VALIDATION */

    
/* FUTUREWON CONTACT FORM */
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton
            ? submitButton.textContent
            : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        formStatus.textContent = "Sending your message...";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Message submission failed.");
            }

            formStatus.textContent =
                "Thank you! Your message has been submitted successfully.";

            contactForm.reset();
        } catch (error) {
            formStatus.textContent =
                "We couldn't send your message. Please check your connection and try again.";
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}


