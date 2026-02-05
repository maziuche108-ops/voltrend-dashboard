/**
 * Service Worker Registrar
 * Handles SW registration, updates, and error boundaries.
 */

(function() {
    if (!('serviceWorker' in navigator)) {
        console.warn('[ServiceWorker] Not supported in this browser.');
        return;
    }

    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('./sw.js', {
                scope: './'
            });

            console.log('[ServiceWorker] Registered with scope:', registration.scope);

            // Handle Updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                console.log('[ServiceWorker] New worker installing...');
                
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('[ServiceWorker] New version available. Refresh to update.');
                        if (window.showToast) window.showToast('Update Available. Refreshing...', 'info');
                    }
                });
            });

        } catch (error) {
            console.error('[ServiceWorker] Registration failed:', error);
        }
    });

    // Handle Controller Change (Refresh page when new SW takes over)
    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
    });

})();
