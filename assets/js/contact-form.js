document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.php-email-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const loading = form.querySelector('.loading');
        const errorMessage = form.querySelector('.error-message');
        const sentMessage = form.querySelector('.sent-message');

        // Reset messages
        loading.style.display = 'block';
        errorMessage.style.display = 'none';
        sentMessage.style.display = 'none';
        submitButton.disabled = true;

        try {
            // Collecter les données du formulaire
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // Configuration de l'email (à adapter selon vos besoins)
            const emailContent = `
                Nouveau message de contact
                -----------------------
                Nom: ${data.name}
                Email: ${data.email}
                Service: ${data.service}
                Sujet: ${data.subject}
                Message: ${data.message}
            `;

            // Utiliser EmailJS pour envoyer l'email
            // Remplacez YOUR_SERVICE_ID, YOUR_TEMPLATE_ID et YOUR_USER_ID par vos identifiants EmailJS
            await emailjs.send(
                "YOUR_SERVICE_ID",
                "YOUR_TEMPLATE_ID",
                {
                    to_email: "njonoussistephen@gmail.com",
                    from_name: data.name,
                    from_email: data.email,
                    subject: data.subject,
                    message: emailContent
                },
                "YOUR_USER_ID"
            );

            // Succès
            loading.style.display = 'none';
            sentMessage.style.display = 'block';
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            loading.style.display = 'none';
            errorMessage.innerHTML = "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.";
            errorMessage.style.display = 'block';
        } finally {
            submitButton.disabled = false;
        }
    }
});