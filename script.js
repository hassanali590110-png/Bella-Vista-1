"use strict";

/* ==================================================
   BELLA VISTA RESTAURANT
   COMPLETE JAVASCRIPT
================================================== */


/* ==================================================
   1. MOBILE MENU
================================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        const isActive = navLinks.classList.toggle("active");

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

    });

}


/* ==================================================
   2. CLOSE MOBILE MENU AFTER CLICK
================================================== */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navLinks) {

            navLinks.classList.remove("active");

        }

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Toggle navigation menu"
            );

        }

    });

});


/* ==================================================
   3. CLOSE MENU WHEN CLICKING OUTSIDE
================================================== */

document.addEventListener("click", function (event) {

    if (!menuToggle || !navLinks) {
        return;
    }

    const clickedInsideMenu =
        navLinks.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Toggle navigation menu"
        );

    }

});


/* ==================================================
   4. SMOOTH SCROLL
================================================== */

const smoothLinks =
    document.querySelectorAll('a[href^="#"]');

smoothLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* ==================================================
   5. BOOKING FORM
   SEND RESERVATION TO WHATSAPP
================================================== */

const bookingForm =
    document.getElementById("booking-form");

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* Get Form Values */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();

            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();

            const date =
                document
                    .getElementById("date")
                    .value;

            const time =
                document
                    .getElementById("time")
                    .value;

            const guests =
                document
                    .getElementById("guests")
                    .value;


            /* Validate Form */

            if (
                !name ||
                !phone ||
                !date ||
                !time ||
                !guests
            ) {

                alert(
                    "Please fill in all booking details."
                );

                return;

            }


            /* WhatsApp Message */

            const message =
                `Hello Bella Vista Restaurant,

I would like to request a table reservation.

Name: ${name}
Phone: ${phone}
Date: ${date}
Time: ${time}
Guests: ${guests}

Thank you.`;


            /* WhatsApp Number */

            const whatsappNumber =
                "923001234567";


            /* WhatsApp URL */

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


            /* Open WhatsApp */

            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );


            /* Reset Form */

            bookingForm.reset();

        }
    );

}


/* ==================================================
   6. SCROLL REVEAL ANIMATION
================================================== */

const animatedElements =
    document.querySelectorAll(
        ".offer-card, " +
        ".menu-category, " +
        ".popular-card, " +
        ".why-card, " +
        ".gallery-item, " +
        ".review-card"
    );


function revealElements() {

    animatedElements.forEach(
        function (element) {

            const elementPosition =
                element.getBoundingClientRect().top;

            const screenPosition =
                window.innerHeight - 80;


            if (
                elementPosition <
                screenPosition
            ) {

                element.classList.add("show");

            }

        }
    );

}


window.addEventListener(
    "scroll",
    revealElements,
    { passive: true }
);

revealElements();


/* ==================================================
   7. ESCAPE KEY CLOSE MOBILE MENU
================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            navLinks
        ) {

            navLinks.classList.remove(
                "active"
            );

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Toggle navigation menu"
                );

            }

        }

    }
);


/* ==================================================
   8. CURRENT YEAR
================================================== */

const copyright =
    document.querySelector(
        ".copyright"
    );

if (copyright) {

    copyright.textContent =
        `© ${new Date().getFullYear()} Bella Vista Restaurant. All Rights Reserved.`;

}


/* ==================================================
   9. SET MINIMUM BOOKING DATE
   PREVENT PAST DATES
================================================== */

const dateInput =
    document.getElementById("date");

if (dateInput) {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    dateInput.setAttribute(
        "min",
        today
    );

}


/* ==================================================
   10. WEBSITE LOADED
================================================== */

console.log(
    "Bella Vista Restaurant website loaded successfully."
);