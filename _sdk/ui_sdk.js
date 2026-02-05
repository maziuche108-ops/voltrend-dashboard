
/**
 * UI SDK - Centralized User Interface Enhancement System
 * Provides standardized button behaviors, feedback, and accessibility features.
 */

window.uiSdk = {
    init: () => {
        console.log('UI SDK Initialized');
        // Initialize global styles for enhanced UI elements if not present
        window.uiSdk.injectStyles();
        // Auto-enhance buttons with data-ui-enhance attribute
        setTimeout(window.uiSdk.autoEnhance, 100);
    },

    config: {
        analyticsEnabled: true,
        defaultLoadingText: 'Processing...',
        tooltipDelay: 300
    },

    // Inject required CSS for spinners, tooltips, etc.
    injectStyles: () => {
        const styleId = 'ui-sdk-styles';
        if (document.getElementById(styleId)) return;

        const css = `
            .ui-btn-loading {
                position: relative;
                pointer-events: none;
                opacity: 0.8;
                cursor: not-allowed !important;
            }
            .ui-btn-loading::after {
                content: "";
                position: absolute;
                width: 1em;
                height: 1em;
                top: 50%;
                left: 50%;
                margin-top: -0.5em;
                margin-left: -0.5em;
                border: 2px solid rgba(255,255,255,0.5);
                border-radius: 50%;
                border-top-color: #fff;
                animation: ui-spin 1s linear infinite;
            }
            .ui-btn-text-hidden {
                visibility: hidden;
            }
            @keyframes ui-spin {
                to { transform: rotate(360deg); }
            }
            
            /* Tooltip Styles */
            [data-ui-tooltip] {
                position: relative;
            }
            [data-ui-tooltip]::before {
                content: attr(data-ui-tooltip);
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(-5px);
                background: #333;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.2s;
                z-index: 1000;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            }
            [data-ui-tooltip]:hover::before {
                opacity: 1;
            }
            
            /* Keyboard Shortcut Badge */
            .ui-shortcut-badge {
                font-size: 10px;
                background: rgba(255,255,255,0.2);
                padding: 1px 4px;
                border-radius: 3px;
                margin-left: 6px;
                opacity: 0.7;
            }
        `;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = css;
        document.head.appendChild(style);
    },

    /**
     * Enhance a specific button with additional capabilities
     * @param {HTMLElement|string} elementOrId 
     * @param {Object} options 
     */
    enhanceButton: (elementOrId, options = {}) => {
        const btn = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId;
        if (!btn) {
            console.warn(`UI SDK: Button not found`, elementOrId);
            return;
        }

        // 1. Accessibility
        if (options.ariaLabel) btn.setAttribute('aria-label', options.ariaLabel);
        if (options.role) btn.setAttribute('role', options.role);
        
        // 2. Tooltip
        if (options.tooltip) {
            btn.setAttribute('data-ui-tooltip', options.tooltip);
            // Append shortcut hint to tooltip if exists
            if (options.shortcut) {
                btn.setAttribute('data-ui-tooltip', `${options.tooltip} (${options.shortcut})`);
            }
        }

        // 3. Keyboard Shortcut
        if (options.shortcut) {
            window.addEventListener('keydown', (e) => {
                // Simple parser: assumes 'Ctrl+S' format
                const parts = options.shortcut.toLowerCase().split('+');
                const key = parts[parts.length - 1];
                const ctrl = parts.includes('ctrl');
                const alt = parts.includes('alt');
                const shift = parts.includes('shift');

                if (e.key.toLowerCase() === key && 
                    e.ctrlKey === ctrl && 
                    e.altKey === alt && 
                    e.shiftKey === shift) {
                    e.preventDefault();
                    btn.click();
                    // Visual feedback
                    btn.classList.add('ring-2', 'ring-offset-2', 'ring-brand');
                    setTimeout(() => btn.classList.remove('ring-2', 'ring-offset-2', 'ring-brand'), 200);
                }
            });
        }

        // 4. Interaction Logic (Loading, Confirm, Analytics, Debounce)
        const originalOnClick = btn.onclick; // Capture inline handler
        
        // Remove inline handler to manage execution flow
        btn.onclick = null;
        
        btn.addEventListener('click', async (e) => {
            e.preventDefault(); // Prevent default to handle logic first
            
            // Check disabled state
            if (btn.disabled || btn.classList.contains('ui-btn-loading')) return;

            // Analytics
            if (options.analyticsEvent) {
                console.log(`[Analytics] Event: ${options.analyticsEvent}`, {
                    timestamp: new Date().toISOString(),
                    elementId: btn.id,
                    text: btn.innerText
                });
                // In a real app, send to backend here
            }

            // Confirmation
            if (options.confirmMessage) {
                if (!confirm(options.confirmMessage)) return;
            }

            // Loading State
            if (options.loading) {
                const originalText = btn.innerHTML;
                btn.classList.add('ui-btn-loading');
                btn.classList.add('text-transparent'); // Hide text but keep size
                
                try {
                    // Execute Handler
                    if (options.onClick) {
                        await options.onClick(e);
                    } else if (originalOnClick) {
                        await originalOnClick.call(btn, e);
                    }
                } catch (err) {
                    console.error('Button Action Failed:', err);
                    if (window.showToast) window.showToast('Action failed: ' + err.message, 'error');
                } finally {
                    // Restore State
                    setTimeout(() => {
                        btn.classList.remove('ui-btn-loading');
                        btn.classList.remove('text-transparent');
                    }, 500); // Minimum loading time for UX
                }
            } else {
                // No loading state required
                try {
                    if (options.onClick) {
                        options.onClick(e);
                    } else if (originalOnClick) {
                        originalOnClick.call(btn, e);
                    }
                } catch (err) {
                    console.error('Button Action Failed:', err);
                }
            }
        });
        
        // Mark as enhanced
        btn.setAttribute('data-ui-enhanced', 'true');
    },

    // Helper to auto-enhance based on attributes
    autoEnhance: () => {
        document.querySelectorAll('[data-ui-enhance]').forEach(btn => {
            if (btn.getAttribute('data-ui-enhanced')) return;
            
            window.uiSdk.enhanceButton(btn, {
                loading: btn.getAttribute('data-ui-loading') === 'true',
                confirmMessage: btn.getAttribute('data-ui-confirm'),
                analyticsEvent: btn.getAttribute('data-ui-analytics'),
                tooltip: btn.getAttribute('data-ui-tooltip-text'),
                shortcut: btn.getAttribute('data-ui-shortcut')
            });
        });
    }
};

// Initialize immediately
window.uiSdk.init();
