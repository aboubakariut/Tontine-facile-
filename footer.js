document.write(
    '<link rel="stylesheet" href="css/icon-font.min.css" />' +
    '<nav class="bottom-nav premium">' +
    '<a href="login.html" class="nav-item " data-page="home"><i class="fa fa-home"></i><span>Accueil</span></a>' +
    '<a href="dashboard.html" class="nav-item" data-page="tontines"><i class="fa fa-users"></i><span>Tontines</span></a>' +
    '<div class="fab-container">' +
    '<a href="create-tontine.html" class="fab" aria-label="Créer une tontine"><i class="fa fa-plus"></i></a>' +
    '</div>' +
    '<a href="notifications.html" class="nav-item" data-page="notifications">' +
    '<div class="icon-wrapper">' +
    '<i class="fa fa-bell"></i>' +
    '<span class="badge" id="notif-badge">3</span>' +
    '</div>' +
    '<span>Notifications</span>' +
    '</a>' +
    '<a href="profile.html" class="nav-item" data-page="profile">' +
    '<i class="fa fa-user-circle"></i>' +
    '<span>Profil</span>' +
    '</a>' +
    '</nav>');





// document.write(
//     '<link rel="stylesheet" href="css/icon-font.min.css" />' +
//     '<nav class="bottom-nav premium">' +
//     '<a href="login.html" class="nav-item ${location.pathname.includes(\'login.html\') || location.pathname === \'/\' || location.pathname === \'\' ? \'active\' : \'\'}" onclick="location.href=\'login.html\'" data-page="home"><i class="fa fa-home"></i><span>Accueil</span></a>' +
//     '<a href="dashboard.html" class="nav-item ${location.pathname.includes(\'dashboard.html\') ? \'active\' : \'\'}" onclick="location.href=\'dashboard.html\'" data-page="tontines"><i class="fa fa-users"></i><span>Tontines</span></a>' +
//     '<div class="fab-container">' +
//     '<a href="create-tontine.html" class="fab" aria-label="Créer une tontine"><i class="fa fa-plus"></i></a>' +
//     '</div>' +
//     '<a href="notifications.html" class="nav-item" data-page="notifications">' +
//     '<div class="icon-wrapper">' +
//     '<i class="fa fa-bell"></i>' +
//     '<span class="badge" id="notif-badge">3</span>' +
//     '</div>' +
//     '<span>Notifications</span>' +
//     '</a>' +
//     '<a href="profile.html" class="nav-item" data-page="profile">' +
//     '<i class="fa fa-user-circle"></i>' +
//     '<span>Profil</span>' +
//     '</a>' +
//     '</nav>');


// // navbar.js
// document.addEventListener('DOMContentLoaded', () => {
//     const navbarHTML = `
//     <nav class="bottom-nav premium">

//     <a href="login.html" class="nav-item ${location.pathname.includes('login.html') || location.pathname === '/' || location.pathname === '' ? 'active' : ''}" onclick="location.href='login.html'" data-page="home"><i class="fa fa-home"></i><span>Accueil</span></a>
//     <a href="dashboard.html" class="nav-item ${location.pathname.includes('dashboard.html') ? 'active' : ''}" onclick="location.href='dashboard.html'" data-page="tontines"><i class="fa fa-users"></i><span>Tontines</span></a>
//     <div class="fab-container">
//     <a href="create-tontine.html" class="fab ${location.pathname.includes('create-tontine.html') || location.pathname === '/' || location.pathname === '' ? 'active' : ''}" onclick="location.href='create-tontine.html'" aria-label="Créer une tontine"><i class="fa fa-plus"></i></a>
//     </div>
//     <a href="notifications.html" class="nav-item ${location.pathname.includes('notifications.html') ? 'active' : ''}" onclick="location.href='notifications.html'" data-page="notifications">
//     <div class="icon-wrapper">
//     <i class="fa fa-bell"></i>
//     <span class="badge" id="notif-badge">3</span>
//     </div>
//     <span>Notifications</span>
//     </a>
//     <a href="profile.html" class="nav-item ${location.pathname.includes('profile.html') ? 'active' : ''}" onclick="location.href='profile.html'" data-page="profile">
//     <i class="fa fa-user-circle"></i>
//     <span>Profil</span>
//     </a>
//     </nav>
//     `;

//     // document.body.insertAdjacentHTML('beforeend', navbarHTML);
//     // document.write(navbarHTML);
// });