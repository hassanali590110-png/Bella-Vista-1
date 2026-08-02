"use strict";

/* ==================================================
   BELLA VISTA RESTAURANT
   COMPLETE JAVASCRIPT
   ================================================== */


/* ==================================================
   1. MOBILE MENU TOGGLE
   ================================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        const isActive = navLinks.classList.toggle("active");

        // Update aria attributes for accessibility
        menuToggle.setAttribute(
            "aria-expanded",
            isActive ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isActive
                ? "Close navigation menu"
                : "Toggle navigation menu"
        );

        // Change icon text
        menuToggle.textContent = isActive ? "✕" : "☰";

        // Prevent body scroll when menu is open (mobile)
        if (isActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

    });

}


/* ==================================================
   2. CLOSE MOBILE MENU AFTER LINK CLICK
   ================================================== */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute(
                "aria-label",
                "Toggle navigation menu"
            );
        }

        // Re-enable body scroll
        document.body.style.overflow = "";

    });

});


/* ==================================================
   3. CLOSE MENU WHEN CLICKING OUTSIDE
   ================================================== */

document.addEventListener("click", function (event) {

    if (!menuToggle || !navLinks) {
        return;
    }

    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-label", "Toggle navigation menu");

        // Re-enable body scroll
        document.body.style.overflow = "";

    }

});


/* ==================================================
   4. CLOSE MENU WITH ESCAPE KEY
   ================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape" && navLinks) {

        navLinks.classList.remove("active");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-label", "Toggle navigation menu");
        }

        // Re-enable body scroll
        document.body.style.overflow = "";

    }

});


/* ==================================================
   5. SMOOTH SCROLL FOR ANCHOR LINKS
   ================================================== */

const smoothLinks = document.querySelectorAll('a[href^="#"]');

smoothLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            // Close menu if open
            if (navLinks) {
                navLinks.classList.remove("active");
            }
            if (menuToggle) {
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            }

            // Smooth scroll
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Re-enable body scroll
            document.body.style.overflow = "";

        }

    });

});


/* ==================================================
   6. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
   ================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinksAll = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {

    let current = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinksAll.forEach(function (link) {
        link.classList.remove("active-link");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active-link");
        }
    });

}, { passive: true });


/* ==================================================
   7. BOOKING FORM - WHATSAPP RESERVATION
   ================================================== */

const bookingForm = document.getElementById("booking-form");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const guests = document.getElementById("guests").value;

        // Validate form
        if (!name || !phone || !date || !time || !guests) {
            alert("⚠️ Please fill in all booking details.");
            return;
        }

        // Create WhatsApp message
        const message = `Hello Bella Vista Restaurant,

I would like to request a table reservation.

📋 Reservation Details:
━━━━━━━━━━━━━━━━━━━━━
👤 Name: ${name}
📱 Phone: ${phone}
📅 Date: ${date}
🕐 Time: ${time}
👥 Guests: ${guests}
━━━━━━━━━━━━━━━━━━━━━

Thank you. 🙏`;

        // WhatsApp number (change to your number)
        const whatsappNumber = "923001234567";

        // WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp
        window.open(whatsappURL, "_blank", "noopener,noreferrer");

        // Reset form
        bookingForm.reset();

        // Show success message
        alert("✅ Your reservation request has been sent! We will contact you shortly.");

    });

}


/* ==================================================
   8. SCROLL REVEAL ANIMATIONS
   ================================================== */

const animatedElements = document.querySelectorAll(
    ".offer-card, " +
    ".menu-category, " +
    ".popular-card, " +
    ".why-card, " +
    ".gallery-item, " +
    ".review-card"
);

function revealElements() {

    animatedElements.forEach(function (element) {

        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight - 80;

        if (elementPosition < screenPosition) {
            element.classList.add("show");
        }

    });

}

// Use throttled scroll for better performance
let ticking = false;

window.addEventListener("scroll", function () {

    if (!ticking) {
        window.requestAnimationFrame(function () {
            revealElements();
            ticking = false;
        });
        ticking = true;
    }

}, { passive: true });

// Initial check on load
window.addEventListener("load", revealElements);
window.addEventListener("resize", revealElements);


/* ==================================================
   9. SET MINIMUM BOOKING DATE
   ================================================== */

const dateInput = document.getElementById("date");

if (dateInput) {

    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

}


/* ==================================================
   10. DYNAMIC COPYRIGHT YEAR
   ================================================== */

const copyright = document.querySelector(".copyright");

if (copyright) {

    const year = new Date().getFullYear();
    copyright.textContent = `© ${year} Bella Vista Restaurant. All Rights Reserved.`;

}


/* ==================================================
   11. IMAGE LAZY LOADING (for gallery)
   ================================================== */

if ("IntersectionObserver" in window) {

    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.removeAttribute("data-src");
                imageObserver.unobserve(img);

            }

        });

    });

    images.forEach(function (img) {
        imageObserver.observe(img);
    });

}


/* ==================================================
   12. CONSOLE WELCOME MESSAGE
   ================================================== */

console.log("%c🍽️ Bella Vista Restaurant", "font-size: 24px; font-weight: bold; color: #d4a017;");
console.log("%cDelicious Food. Beautiful Moments.", "font-size: 16px; color: #666666;");
console.log("%cWebsite loaded successfully! ✅", "font-size: 14px; color: #22c55e;");


/* ==================================================
   13. PREVENT FORM SUBMISSION ON ENTER KEY
   ================================================== */

const formInputs = document.querySelectorAll(".booking-form input, .booking-form select");

formInputs.forEach(function (input) {

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            event.preventDefault();
        }

    });

});


/* ==================================================
   14. PHONE INPUT FORMATTING (optional)
   ================================================== */

const phoneInput = document.getElementById("phone");

if (phoneInput) {

    phoneInput.addEventListener("input", function () {

        let value = this.value.replace(/\D/g, "");

        if (value.length > 0) {
            if (value.length <= 4) {
                this.value = value;
            } else if (value.length <= 7) {
                this.value = value.slice(0, 4) + "-" + value.slice(4);
            } else {
                this.value = value.slice(0, 4) + "-" + value.slice(4, 7) + "-" + value.slice(7, 11);
            }
        }

    });

}
