document.write(
    '<div class="header-content">' +
    '<h2 class="h2">Tontine Facile</h2>' +
    '<button id="menu-toggle" class="menu-btn"> <i class="fa fa-bars" ></i></button>' +
    '</div>' +
    '<div id="sidebar" class="sidebar">' +
    '<div class="sidebar-header">' +
    '<h3>Menu</h3>' +
    '<button id="close-menu" class="close-btn"><i class="fa fa-x"></i>&times;</button>' +
    '</div>' +
    '<ul class="sidebar-menu">' +
    '<li><a href="login.html"><i class="fa fa-home"></i><span>Accueil</span></a></li>' +
    '<li><a href="dashboard.html"><i class="fa fa-users"></i><span>Mes Tontines</span></a></li>' +
    '<li><a href="create-tontine.html"><i class="fa fa-plus-circle"></i><span>Créer tontine</span></a></li>' +
    '<li><a href="rejoindre-tontine.html"><i class="fa fa-plus"></i><span>Rejoindre une tontine</span></a></li>' +
    '</li><li><a href="invitations.html"><i class="fa fa-user-plus"></i><span>Invitations</span></a></li>' +
    '<li><a href="recus.html"><i class="fa fa-registered"></i><span>Récus</span></a></li>' +
    '<li><a href="profile.html"><i class="fa fa-user"></i><span>Profil</span></a></li>' +
    '<li><a href="historique.html"><i class="fa fa-history"></i><span>Historique</span></a></li>' +
    '<li><a href="notifications.html"><i class="fa fa-bell"></i><span>Notifications</span></a></li>' +
    '<li><a href="notifications-preferences.html"><i class="fa fa-cog"></i><span>Parametres</span></a></li>' +
    '<li><a href="tutoriel.html"><i class="fa fa-book"></i><span>Tutoriel</span></a></li>' +
    '<li><a href="aide.html"><i class="fa fa-question-circle"></i><span>Aide</span></a></li>' +
    '<li><a href="faq.html"><i class="fa fa-question"></i><span>FAQ</span></a></li>' +
    '<li><a href="feedback.html"><i class="fa fa-comment"></i><span>Feedback</span></a></li>' +
    '<li><a href="about.html"><i class="fa fa-info-circle"></i><span>À propos</span></a></li>' +
    '<li><a href="legal.html"><i class="fa fa-gavel"></i><span>Mentions légales</span></a></li>' +
    '<li><a href="conditions.html"><i class="fa fa-bullhorn"></i><span>Conditions d\'utilisations</span></a></li>' +
    '<li><a href="#" id="logout"><i class="fa fa-right-from-bracket"></i><span>Déconnexion</span></a></li>' +
    '</ul>' +
    '</div>' +
    '<div id="overlay" class="overlay"></div>');
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('menu-toggle');
    const closeBtn = document.getElementById('close-menu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    function openMenu() {
        sidebar.classList.add('open');
        overlay.classList.add('show');
    }

    function closeMenu() {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
    }
    toggleBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    // Fermer avec touche Échap
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
    });
});
// Charger le thème au démarrage
document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme') || 'light';
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `css/${theme}.css`;
    link.id = 'theme-link';
    document.head.appendChild(link);
    // Mettre à jour le <select> si présent
    const select = document.getElementById('theme');
    if (select) select.value = theme;
});
// Fonction appelée quand on change le thème (dans le <select onchange>)
function setTheme(newTheme) {
    localStorage.setItem('theme', newTheme);
    // Recharger la page pour appliquer le nouveau CSS (solution la plus simple)
    window.location.reload();
}
// js/theme.js (ou dans <script> de la page préférences)
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');
    let currentTheme = localStorage.getItem('theme') || 'light';
    // Appliquer le thème initial
    applyTheme(currentTheme);
    // Fonction toggle
    window.toggleTheme = function() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    };

    function applyTheme(theme) {
        // Supprimer ancien lien thème
        document.querySelectorAll('link[data-theme]').forEach(el => el.remove());
        // Charger le bon fichier CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `css/${theme}.css`;
        link.setAttribute('data-theme', 'true');
        document.head.appendChild(link);
        // Mettre à jour l'icône et le label
        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            label.textContent = 'Sombre';
            document.body.classList.add('dark-mode');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            label.textContent = 'Clair';
            document.body.classList.remove('dark-mode');
        }
    }
    // Charger au démarrage
    applyTheme(currentTheme);
});