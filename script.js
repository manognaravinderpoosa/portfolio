// Form validation
document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Prevent form submission for validation
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Check if all fields are filled
    if (name === "" || email === "" || message === "") {
        alert("Please fill out all fields!");
    } else if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
    } else {
        // Send the form data to the backend via a POST request
        const formData = {
            name: name,
            email: email,
            message: message
        };

        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Message sent successfully! Thank you for contacting me.");
                document.getElementById('contactForm').reset(); // Clear the form
            } else {
                alert("There was an error sending your message. Please try again later.");
            }
        })
        .catch(error => {
            alert("There was an error sending your message. Please try again later.");
            console.error('Error:', error);
        });
    }
});

// Email validation function
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add a simple animation when scrolling to sections
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});

