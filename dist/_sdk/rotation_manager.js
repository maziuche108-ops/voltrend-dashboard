/**
 * RotationManager - Background Task Scheduler
 * Handles periodic execution of simulation tasks with lifecycle management.
 * @class RotationManager
 */
window.RotationManager = class RotationManager {
    /**
     * @param {Object} config - { interval: number, autoStart: boolean }
     */
    constructor(config = {}) {
        this.tasks = new Map();
        this.interval = config.interval || 5000;
        this.isRunning = false;
        this.timer = null;
        this.context = config.context || {};
        
        if (config.autoStart) this.start();
    }

    /**
     * Add a task to the rotation
     * @param {string} name - Task identifier
     * @param {Function} fn - Async function to execute
     */
    addTask(name, fn) {
        this.tasks.set(name, fn);
    }

    /**
     * Remove a task
     * @param {string} name - Task identifier
     */
    removeTask(name) {
        this.tasks.delete(name);
    }

    /**
     * Start the rotation loop
     */
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        console.log('[RotationManager] Started');
        this.loop();
    }

    /**
     * Pause the rotation
     */
    stop() {
        this.isRunning = false;
        if (this.timer) clearTimeout(this.timer);
        console.log('[RotationManager] Stopped');
    }

    /**
     * Main execution loop
     */
    loop() {
        if (!this.isRunning) return;

        // Execute all tasks concurrently
        const executions = Array.from(this.tasks.entries()).map(async ([name, fn]) => {
            try {
                await fn(this.context);
            } catch (e) {
                console.error(`[RotationManager] Task ${name} failed:`, e);
            }
        });

        Promise.allSettled(executions).then(() => {
            if (this.isRunning) {
                this.timer = setTimeout(() => this.loop(), this.interval);
            }
        });
    }
    
    /**
     * Cleanup resources
     */
    destroy() {
        this.stop();
        this.tasks.clear();
    }
};
