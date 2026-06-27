//  // Exemple : simuler login (juste pour le fun)
//  document.getElementById('loginForm').addEventListener('submit', e => {
//      e.preventDefault();
//      alert('Connexion simulée ! Direction dashboard...');
//      window.location.href = 'dashboard.html';
//  });
//  document.addEventListener('DOMContentLoaded', () => {
//      const currentPath = window.location.pathname.split('/').pop() || 'login.html';
//      document.querySelectorAll('.sidebar-menu a').forEach(link => {
//          const href = link.getAttribute('href');
//          if (href && href === currentPath) {
//              link.classList.add('active');
//          }
//          // Fermer sidebar quand on clique sur un lien (sauf déconnexion)
//          if (href && href !== '#') {
//              link.addEventListener('click', () => {
//                  document.getElementById('sidebar').classList.remove('open');
//                  document.getElementById('overlay').classList.remove('show');
//              });
//          }
//      });
//  });
//  document.addEventListener('DOMContentLoaded', () => {
//      const current = window.location.pathname.split('/').pop() || 'login.html';
//      document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
//          if (item.getAttribute('href') === current) {
//              item.classList.add('active');
//          }
//      });
//      // Pour le FAB, pas besoin d'active car c'est une action, pas une page
//  });
//  // active-nav.js
//  document.addEventListener('DOMContentLoaded', function() {
//      // Récupère le nom du fichier actuel (ex: "dashboard.html", "profile.html", etc.)
//      const currentPage = window.location.pathname.split('/').pop() || 'login.html';
//      // si on est à la racine, on considère index.html
//      // Sélectionne tous les liens de la navbar mobile
//      const navLinks = document.querySelectorAll('.bottom-nav .nav-item');
//      navLinks.forEach(link => {
//          // Récupère le href du lien (ex: "dashboard.html")
//          const linkPage = link.getAttribute('href');
//          // Compare (insensible à la casse et aux slashs finaux)
//          if (linkPage === currentPage || linkPage === './' + currentPage) {
//              link.classList.add('active');
//              // Optionnel : enlève la classe active des autres (au cas où)
//              navLinks.forEach(other => {
//                  if (other !== link) other.classList.remove('active');
//              });
//          }
//      });
//      // Debug optionnel (à supprimer plus tard)
//      // console.log('Page actuelle détectée :', currentPage);
//  });



//  // 

//  // Script pour ajouter la classe 'active' à l'élément de navigation de la page actuelle
//  document.addEventListener('DOMContentLoaded', function() {
//      // Récupérer le nom de la page actuelle (ex: 'dashboard.html')
//      //  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
//      const currentPage = window.location.pathname.split('/').pop();
//      // Sélectionner tous les éléments de navigation (ajuste la classe si nécessaire, ex: .nav-item pour bottom nav)
//      const navItems = document.querySelectorAll('.nav-item'); // ou '.sidebar-menu a' pour sidebar
//      navItems.forEach(item => {
//          const href = item.getAttribute('href');
//          // Comparer le href avec la page actuelle
//          if (href === currentPage) {
//              item.classList.add('active');
//          } else {
//              item.classList.remove('active');
//          }
//      });
//  });







// // js/active-nav.js (version améliorée)
// document.addEventListener('DOMContentLoaded', function() {
//     // Récupérer la fin de l'URL (nom du fichier + éventuels paramètres)
//     let currentPath = window.location.pathname;
//     // Enlever le slash initial si présent
//     if (currentPath.startsWith('/')) {
//         currentPath = currentPath.substring(1);
//     }
//     // Prendre seulement le nom du fichier (sans dossier ni paramètres)
//     currentPath = currentPath.split('/').pop().split('?')[0] || 'index.html';
//     // Normaliser : si on est à la racine, c'est index.html
//     if (currentPath === '') currentPath = 'index.html';
//     // Sélectionner tous les liens de navigation (bottom-nav ET sidebar)
//     const navLinks = document.querySelectorAll('.bottom-nav .nav-item a, .sidebar-menu a');
//     navLinks.forEach(link => {
//         let href = link.getAttribute('href');
//         // Nettoyer le href (enlever ./ ou / au début)
//         if (href.startsWith('./')) href = href.substring(2);
//         if (href.startsWith('/')) href = href.substring(1);
//         // Comparer exactement le nom du fichier
//         if (href === currentPath) {
//             link.classList.add('active');
//             // Optionnel : ajouter active au parent .nav-item si c'est la bottom nav
//             if (link.parentElement.classList.contains('nav-item')) {
//                 link.parentElement.classList.add('active');
//             }
//         } else {
//             link.classList.remove('active');
//             if (link.parentElement.classList.contains('nav-item')) {
//                 link.parentElement.classList.remove('active');
//             }
//         }
//     });
//     // Debug (à supprimer plus tard)
//     // console.log('Page détectée :', currentPath);
// });



document.addEventListener('DOMContentLoaded', function() {
    // Récupérer le nom de la page actuelle (ex: dashboard.html)
    let currentPath = window.location.pathname;
    // Nettoyage : enlever slash initial et dossiers
    if (currentPath.startsWith('/')) currentPath = currentPath.substring(1);
    currentPath = currentPath.split('/').pop().split('?')[0] || 'index.html';
    if (currentPath === '') currentPath = 'index.html';
    // === BOTTOM NAV ===
    // Sélectionne tous les <a> dans .bottom-nav
    document.querySelectorAll('.bottom-nav .nav-item a, .bottom-nav a.nav-item').forEach(link => {
        let href = link.getAttribute('href') || '';
        // Nettoyage href
        if (href.startsWith('./')) href = href.substring(2);
        if (href.startsWith('/')) href = href.substring(1);
        if (href === currentPath) {
            link.classList.add('active');
            // Ajoute active au parent .nav-item si présent
            if (link.parentElement && link.parentElement.classList.contains('nav-item')) {
                link.parentElement.classList.add('active');
            }
        } else {
            link.classList.remove('active');
            if (link.parentElement && link.parentElement.classList.contains('nav-item')) {
                link.parentElement.classList.remove('active');
            }
        }
    });
    // === SIDEBAR ===
    // Sélectionne tous les <a> dans .sidebar-menu
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        let href = link.getAttribute('href') || '';
        if (href.startsWith('./')) href = href.substring(2);
        if (href.startsWith('/')) href = href.substring(1);
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    // Debug (à supprimer après test)
    // console.log('Page actuelle détectée :', currentPath);
});