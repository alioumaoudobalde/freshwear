// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé, initialisation du JavaScript...');

    // ==========================================
    // 1. HEADER SCROLL EFFECT
    // ==========================================
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.98)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            }
        }
    });

    // ==========================================
    // 2. MENU HAMBURGER MOBILE
    // ==========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileMenuToggle && navLinks) {
        console.log('Menu hamburger trouvé, initialisation...');

        // Créer l'overlay
        const menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        body.appendChild(menuOverlay);

        function toggleMobileMenu() {
            console.log('Toggle menu mobile');
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            // Empêcher le scroll quand le menu est ouvert
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        }

        function closeMobileMenu() {
            console.log('Fermeture menu mobile');
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.style.overflow = '';
        }

        // Fermer le menu quand on clique sur l'overlay
        menuOverlay.addEventListener('click', closeMobileMenu);
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        

        // Fermer le menu quand on clique sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
                
                // Navigation fluide
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            });
        });

        // Fermer le menu avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Fermer le menu lors du redimensionnement de la fenêtre
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    } else {
        console.error('Elements du menu hamburger non trouvés:', {
            mobileMenuToggle: !!mobileMenuToggle,
            navLinks: !!navLinks
        });
    }

    // ==========================================
    // 3. HERO IMAGE SLIDER
    // ==========================================
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const imageLabel = document.getElementById('imageLabel');
    const slideBtn = document.getElementById('slideBtn');

    if (image1 && image2 && imageLabel && slideBtn) {
        console.log('Slider d\'images trouvé, initialisation...');
        
        let currentImage = 1;

        function switchImage() {
            if (currentImage === 1) {
                image1.classList.remove('active');
                image2.classList.add('active');
                imageLabel.textContent = 'APRÈS';
                currentImage = 2;
            } else {
                image2.classList.remove('active');
                image1.classList.add('active');
                imageLabel.textContent = 'AVANT';
                currentImage = 1;
            }
        }

        // Auto-switch every 4 seconds
        setInterval(switchImage, 4000);

        // Manual switch on button click
        slideBtn.addEventListener('click', switchImage);
    } else {
        console.log('Elements du slider non trouvés:', {
            image1: !!image1,
            image2: !!image2,
            imageLabel: !!imageLabel,
            slideBtn: !!slideBtn
        });
    }

    // ==========================================
    // 4. ABOUT SECTION EXPAND/COLLAPSE
    // ==========================================
    const readMoreBtn = document.getElementById('readMoreBtn');
    const expandableContent = document.getElementById('expandableContent');

    if (readMoreBtn && expandableContent) {
        console.log('Section About trouvée, initialisation...');
        
        let isExpanded = false;

        readMoreBtn.addEventListener('click', function() {
            if (!isExpanded) {
                expandableContent.classList.add('expanded');
                readMoreBtn.classList.add('expanded');
                const span = readMoreBtn.querySelector('span');
                if (span) span.textContent = 'Voir moins';
                isExpanded = true;
            } else {
                expandableContent.classList.remove('expanded');
                readMoreBtn.classList.remove('expanded');
                const span = readMoreBtn.querySelector('span');
                if (span) span.textContent = 'En savoir plus';
                isExpanded = false;
            }
        });
    } else {
        console.log('Elements de la section About non trouvés:', {
            readMoreBtn: !!readMoreBtn,
            expandableContent: !!expandableContent
        });
    }

    // ==========================================
    // 5. CONTACT FORM
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        console.log('Formulaire de contact trouvé, initialisation...');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (name && email && message) {
                // Create WhatsApp message
                const whatsappMessage = `Bonjour Fresh Footwear 25!%0A%0ANom: ${encodeURIComponent(name.value)}%0AEmail: ${encodeURIComponent(email.value)}%0A%0AMessage: ${encodeURIComponent(message.value)}`;
                
                // Redirect to WhatsApp
                window.open(`https://wa.me/33767811647?text=${whatsappMessage}`, '_blank');
                
                // Reset form
                this.reset();
                alert('Merci pour votre message ! Vous allez être redirigé vers WhatsApp.');
            }
        });
    } else {
        console.log('Formulaire de contact non trouvé');
    }

    // ==========================================
    // 6. INTERSECTION OBSERVER ANIMATIONS
    // ==========================================
    
    // Options pour l'Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer principal pour les animations générales
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Appliquer les animations aux cartes de service
    document.querySelectorAll('.service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Gallery Images Lazy Loading
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    if (galleryImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                    observer.unobserve(img);
                }
            });
        }, { threshold: 0.1 });

        galleryImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.8)';
            img.style.transition = 'all 0.6s ease';
            imageObserver.observe(img);
        });
    }

    // Gallery Items Animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        galleryItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px) scale(0.9)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            galleryObserver.observe(item);
        });
    }

    // About Features Animation
    const aboutFeatures = document.querySelectorAll('.feature-item');
    
    if (aboutFeatures.length > 0) {
        const featuresObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.3 });

        aboutFeatures.forEach((feature, index) => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateX(50px)';
            feature.style.transition = `all 0.6s ease ${index * 0.2}s`;
            featuresObserver.observe(feature);
        });
    }

    // ==========================================
    // 7. SMOOTH SCROLLING POUR NAVIGATION
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('JavaScript entièrement initialisé !');
});

// ==========================================
// 8. GESTION D'ERREURS GLOBALE
// ==========================================
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript détectée:', e.error);
});

console.log('Script JavaScript chargé !');