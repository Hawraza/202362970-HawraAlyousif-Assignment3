// Contact form interaction with multi-step validation
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

// Validation rules
const namePattern = /^[A-Za-z\u0600-\u06FF\s]{2,}$/; // letters (English or Arabic) and spaces, at least 2
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // text@text.text with no spaces
const minMessageLength = 10;

// Display a feedback message under the form
function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = type;
}

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Step 1: make sure no field is empty
    if (name === "" || email === "" || message === "") {
        showFormMessage("Please fill in all fields.", "error-message");
        return;
    }

    // Step 2: check the name format
    if (!namePattern.test(name)) {
        showFormMessage("Name should contain letters only (at least 2 characters).", "error-message");
        return;
    }

    // Step 3: check the email format
    if (!emailPattern.test(email)) {
        showFormMessage("Please enter a valid email address (example: name@example.com).", "error-message");
        return;
    }

    // Step 4: check the message length
    if (message.length < minMessageLength) {
        showFormMessage(`Your message is too short. Please write at least ${minMessageLength} characters.`, "error-message");
        return;
    }

    // All checks passed: allow submission
    showFormMessage(`Thank you, ${name}! Your message has been received.`, "success-message");
    contactForm.reset();
});

// Project details interaction
const detailButtons = document.querySelectorAll(".details-btn");

detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const details = button.nextElementSibling;

        details.classList.toggle("show");

        if (details.classList.contains("show")) {
            button.textContent = "Hide Details";
        } else {
            button.textContent = "Show Details";
        }
    });
});

// Dark mode toggle with saved preference (state management)
const themeToggle = document.getElementById("theme-toggle");

// Apply the saved theme when the page loads
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
}

// Switch the theme and save the visitor's choice
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    }
});

// Quote section: fetch a random quote from an external API
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");

async function loadQuote() {
    // Show a loading state while waiting for the API
    quoteText.textContent = "Loading quote...";
    quoteText.classList.remove("quote-error");
    quoteAuthor.textContent = "";
    newQuoteBtn.disabled = true;

    try {
        const response = await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        quoteText.textContent = `“${data.quote}”`;
        quoteAuthor.textContent = `— ${data.author}`;
    } catch (error) {
        // Show a user-friendly message if the API fails
        quoteText.textContent = "Sorry, we couldn't load a quote right now. Please try again later.";
        quoteText.classList.add("quote-error");
        console.error(error);
    } finally {
        // Enable the button again whether the request succeeded or failed
        newQuoteBtn.disabled = false;
    }
}

newQuoteBtn.addEventListener("click", loadQuote);

// Load the first quote when the page opens
loadQuote();