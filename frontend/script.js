// 💬 Typing Animation Setup
const typedTextSpan = document.getElementById("typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
  "Web Developer",
  "Prompt Designer",
  "Software Developer"
];

let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 60);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(() => {
      typedTextSpan.classList.add("animate__fadeIn"); // animation on each loop
      type();
    }, 1000);
  }
}

// 🚀 Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Start typing animation
  setTimeout(() => {
    typedTextSpan.classList.add("animate__fadeIn"); // optional fade on load
    type();
  }, 1000);

  // 📬 Handle contact form submission
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      try {
        const response = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Message sent successfully!");
          form.reset();
        } else {
          alert("❌ Failed to send message: " + (data.error || "Unknown error"));
        }
      } catch (error) {
        alert("⚠️ Network error: " + error.message);
      }
    });
  }
});
