// Contact form interaction
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.className = "error-message";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.className = "error-message";
        return;
    }

    formMessage.textContent = "Thank you! Your message has been received.";
    formMessage.className = "success-message";
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