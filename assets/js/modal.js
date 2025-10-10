/**
 * Modal Service Handler
 * Gère les fonctionnalités des modals pour les services
 */

// Fonctions pour le modal de service individuel
function openServiceModal(serviceName) {
    const modal = document.getElementById('serviceModal');
    const serviceTitle = document.getElementById('serviceTitle');
    const emailOption = document.getElementById('emailOption');
    const whatsappOption = document.getElementById('whatsappOption');
    
    // Mettre à jour le titre
    serviceTitle.textContent = serviceName;
    
    // Mettre à jour les liens avec le service
    emailOption.href = `mailto:njonoussistephen@gmail.com?subject=Demande de service - ${serviceName}`;
    whatsappOption.href = `https://wa.me/237688661642?text=Bonjour, je suis intéressé par votre service : ${serviceName}`;
    
    // Afficher le modal
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Empêcher le défilement de la page
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Fonctions pour le modal de liste des services
function openServicesListModal() {
    const modal = document.getElementById('servicesListModal');
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function closeServicesListModal() {
    const modal = document.getElementById('servicesListModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Fonction pour filtrer les services
function filterServices(searchTerm) {
    const serviceItems = document.querySelectorAll('.service-item');
    const normalizedSearch = searchTerm.toLowerCase().trim();

    serviceItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const matches = title.includes(normalizedSearch) || description.includes(normalizedSearch);
        item.style.display = matches ? 'block' : 'none';
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Fermer les modals en cliquant en dehors
    window.onclick = function(event) {
        const serviceModal = document.getElementById('serviceModal');
        const servicesListModal = document.getElementById('servicesListModal');
        
        if (event.target == serviceModal) {
            closeServiceModal();
        }
        if (event.target == servicesListModal) {
            closeServicesListModal();
        }
    };
});