const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const failureModal = document.getElementById('failureModal');
const closeFailureModal = document.getElementById('closeFailureModal');

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the form from submitting the default way
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const submitButton = document.querySelector('button[type="submit"]');

    const formData = {
        name: name,
        email: email
    };
    // Disable the submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Отправка...';

    try {
        const response = await fetch('https://mail-server-xi.vercel.app/mail-electro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Setting the headers to accept JSON
            },
            body: JSON.stringify(formData), // Convert the form data to JSON
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result)
            modal.classList.remove('hidden');
        } else {
            failureModal.classList.remove('hidden');
            console.log(result)
        } 
    } catch (error) {
        failureModal.classList.remove('hidden');
        console.error("Error submitting the form:", error);
        // Handle the error, show a message to the user
    } finally {
        // Re-enable the submit button once the request is done
        submitButton.disabled = false;
        submitButton.textContent = 'ОТПРАВИТЬ ЗАЯВКУ'; // Reset the button text
    }
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden'); // Hide the modal and remove backdrop
});

closeFailureModal.addEventListener('click', () => {
    failureModal.classList.add('hidden');
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
if (event.target === modal) {
    modal.classList.add('hidden'); // Hide the modal when clicking on backdrop
}
if (event.target == failureModal) {
    failureModal.classList.add('hidden');
  }
});