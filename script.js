document.addEventListener('DOMContentLoaded', function() {
    // Initialiser tous les carrousels d'images
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        const navButtons = carousel.querySelector('.carousel-nav');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        
        // N'afficher les boutons de navigation que s'il y a plus d'une image
        if (images.length <= 1) {
            if (navButtons) {
                navButtons.style.display = 'none';
            }
        } else {
            if (navButtons) {
                navButtons.style.display = 'flex';
            }
            
            // Cacher toutes les images sauf la première
            for (let i = 1; i < images.length; i++) {
                images[i].style.display = 'none';
            }
            
            let currentIndex = 0;
            
            // Fonction pour afficher l'image actuelle
            function showImage(index) {
                // Cacher toutes les images
                for (let i = 0; i < images.length; i++) {
                    images[i].style.display = 'none';
                }
                // Afficher l'image actuelle
                images[index].style.display = 'block';
                
                // Mettre à jour l'attribut aria-label pour l'accessibilité
                carousel.setAttribute('aria-label', 'Image ' + (index + 1) + ' sur ' + images.length);
            }
            
            // Fonction pour aller à l'image précédente
            function goToPrevImage() {
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = images.length - 1;
                }
                showImage(currentIndex);
            }
            
            // Fonction pour aller à l'image suivante
            function goToNextImage() {
                currentIndex++;
                if (currentIndex >= images.length) {
                    currentIndex = 0;
                }
                showImage(currentIndex);
            }
            
            // Événement pour le bouton précédent
            if (prevBtn) {
                prevBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    goToPrevImage();
                });
            }
            
            // Événement pour le bouton suivant
            if (nextBtn) {
                nextBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    goToNextImage();
                });
            }
            
            // Ajouter la navigation au clavier pour l'accessibilité
            carousel.setAttribute('tabindex', '0');
            carousel.setAttribute('role', 'region');
            carousel.setAttribute('aria-label', 'Image 1 sur ' + images.length);
            
            carousel.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    goToPrevImage();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    goToNextImage();
                }
            });
        }
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Vérifier si tous les champs sont remplis
            if (name && email && subject && message) {
                // Créer un élément de message de confirmation
                const confirmationMessage = document.createElement('div');
                confirmationMessage.className = 'confirmation-message';
                confirmationMessage.innerHTML = `
                    <div class="confirmation-content">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message envoyé !</h3>
                        <p>Merci ${name}, votre message a été envoyé avec succès. Nous vous répondrons bientôt.</p>
                        <button id="closeConfirmation" class="submit-btn">Fermer</button>
                    </div>
                `;
                
                // Ajouter le message à la page
                document.body.appendChild(confirmationMessage);
                
                // Ajouter un événement pour fermer le message
                document.getElementById('closeConfirmation').addEventListener('click', function() {
                    document.body.removeChild(confirmationMessage);
                    // Réinitialiser le formulaire
                    contactForm.reset();
                });
            }
        });
    }
});