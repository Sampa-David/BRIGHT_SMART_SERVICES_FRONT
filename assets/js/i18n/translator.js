// Fonction pour changer la langue
function changeLanguage(lang) {
    // Sauvegarder la préférence de langue
    localStorage.setItem('preferred-language', lang);
    
    // Mettre à jour l'indicateur de langue actuelle
    const currentLangElements = document.querySelectorAll('.current-lang');
    currentLangElements.forEach(el => {
        el.textContent = lang.toUpperCase();
    });
    
    // Appliquer les traductions
    const translations = lang === 'fr' ? frTranslations : enTranslations;
    document.documentElement.lang = lang;
    
    // Mettre à jour les éléments traduits
    updateTranslations(translations);
}

// Fonction pour mettre à jour les traductions dans la page
function updateTranslations(translations) {
    // Mettre à jour la navigation
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = translations;
        
        // Parcourir l'objet de traduction pour trouver la bonne valeur
        for (const k of keys) {
            if (translation.hasOwnProperty(k)) {
                translation = translation[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return;
            }
        }
        
        // Appliquer la traduction
        if (typeof translation === 'string') {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.tagName === 'OPTION') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
            
            // Mettre à jour les titres pour l'accessibilité
            if (element.hasAttribute('title')) {
                element.title = translation;
            }
        }
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Charger la langue préférée ou utiliser le français par défaut
    const preferredLanguage = localStorage.getItem('preferred-language') || 'fr';
    changeLanguage(preferredLanguage);

    // Gérer la fermeture du menu déroulant en cliquant en dehors
    document.addEventListener('click', (e) => {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target) && !e.target.matches('.language-selector')) {
                dropdown.style.display = 'none';
            }
        });
    });

    // Empêcher la propagation des clics dans le menu déroulant
    document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});