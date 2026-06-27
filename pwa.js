document.write(
    '<!-- PWA Meta Tags -->' +
    ' <meta name="theme-color" content="#1d4ed8">' +
    '<meta name="description" content="Gérez vos Adachi, njangi et tontines en toute transparence">' +
    '<meta name="apple-mobile-web-app-capable" content="yes">' +
    '<meta name="apple-mobile-web-app-status-bar-style" content="default">' +
    '<meta name="apple-mobile-web-app-title" content="Tontine Facile">' +
    '<!-- Manifest -->' +
    '<link rel="manifest" href="/manifest.json">' +
    '<!-- Icônes (ajoute-les dans un dossier /icons/) -->' +
    '<link rel="icon" href="icons/icon-192x192.png" type="image/png" sizes="192x192">' +
    '<link rel="apple-touch-icon" href="icons/icon-192x192.png" sizes="192x192">' +
    '<!-- Service Worker -->');
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker enregistré !', reg))
            .catch(err => console.log('Échec enregistrement SW :', err));
    });
}