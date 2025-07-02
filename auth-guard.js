// auth-guard.js
// Skrip ini akan "menjaga" setiap halaman

const isAuthorized = localStorage.getItem('obscura_authorized') === 'true';
const onPublicPage = window.location.pathname.endsWith('access.html') || window.location.pathname.endsWith('/');

if (!isAuthorized && !onPublicPage) {
    window.location.replace('access.html');
}
