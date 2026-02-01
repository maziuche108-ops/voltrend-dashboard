
/**
 * AI Service Validation Suite
 * Automated tests to verify AI Service integrity, performance, and compliance.
 */
window.AIValidator = {
    results: [],
    isRunning: false,

    /**
     * Run all validation suites
     */
    runAll: async function() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.results = [];
        this.notifyUpdate();

        try {
            await this.suiteConnectivity();
            await this.suiteFunctional();
            await this.suiteEdgeCases();
            await this.suiteLoad();
        } catch (e) {
            console.error('Validation Suite Crashed:', e);
            this.addResult('CRITICAL', 'Test Suite Runner', false, e.message);
        } finally {
            this.isRunning = false;
            this.notifyUpdate();
        }
    },

    /**
     * Suite 1: Connectivity & Health
     */
    suiteConnectivity: async function() {
        this.addHeader('Connectivity Checks');
        
        // Test 1: Service Initialization
        try {
            await window.GuardianML.init();
            this.addResult('INIT', 'Service Initialization', true, 'Service is ONLINE');
        } catch (e) {
            this.addResult('INIT', 'Service Initialization', false, e.message);
            return; // Stop if init fails
        }

        // Test 2: Health Endpoint
        const start = performance.now();
        try {
            const health = await window.GuardianML.getHealth();
            const latency = Math.round(performance.now() - start);
            
            if (health.status === 'ONLINE') {
                this.addResult('HEALTH', 'Health Endpoint', true, `Status: ${health.status}, Latency: ${latency}ms`);
            } else {
                this.addResult('HEALTH', 'Health Endpoint', false, `Unexpected Status: ${health.status}`);
            }
        } catch (e) {
            this.addResult('HEALTH', 'Health Endpoint', false, e.message);
        }
    },

    /**
     * Suite 2: Functional Logic (Inference)
     */
    suiteFunctional: async function() {
        this.addHeader('Functional Verification');

        // Test 1: Sentiment Analysis
        await this.runTest('FUNC_01', 'Sentiment Analysis', async () => {
            const res = await window.GuardianML.process({
                type: 'sentiment',
                content: 'The market is looking very bullish today!'
            });
            if (!res.result || !res.result.label) throw new Error('Missing result label');
            return `Detected: ${res.result.label} (Score: ${res.result.score.toFixed(2)})`;
        });

        // Test 2: Text Summarization
        await this.runTest('FUNC_02', 'Text Summarization', async () => {
            const res = await window.GuardianML.process({
                type: 'summary',
                content: 'Artificial Intelligence is rapidly evolving...'
            });
            if (!res.result || !res.result.text) throw new Error('Missing summary text');
            return 'Summary generated successfully';
        });
    },

    /**
     * Suite 3: Edge Cases & Error Handling
     */
    suiteEdgeCases: async function() {
        this.addHeader('Edge Cases & Validation');

        // Test 1: Invalid Request Format
        await this.runTest('ERR_01', 'Invalid JSON', async () => {
            try {
                await window.GuardianML.process(null);
                throw new Error('Should have failed');
            } catch (e) {
                if (e.code === 400) return 'Correctly rejected (400 Bad Request)';
                throw new Error(`Wrong error code: ${e.code}`);
            }
        });

        // Test 2: Unknown Model Type
        await this.runTest('ERR_02', 'Unknown Inference Type', async () => {
            try {
                await window.GuardianML.process({ type: 'magic_ball', content: 'test' });
                throw new Error('Should have failed');
            } catch (e) {
                if (e.code === 400) return 'Correctly rejected (400 Unknown Type)';
                throw new Error(`Wrong error code: ${e.code}`);
            }
        });

        // Test 3: Token Limit Exceeded
        await this.runTest('ERR_03', 'Payload Too Large', async () => {
            try {
                const largeText = 'A'.repeat(5001);
                await window.GuardianML.process({ type: 'summary', content: largeText });
                throw new Error('Should have failed');
            } catch (e) {
                if (e.code === 413) return 'Correctly rejected (413 Payload Too Large)';
                throw new Error(`Wrong error code: ${e.code}`);
            }
        });
    },

    /**
     * Suite 4: Load & Performance
     */
    suiteLoad: async function() {
        this.addHeader('Performance & Load');

        // Test 1: Concurrent Requests
        await this.runTest('PERF_01', 'Concurrency (5 reqs)', async () => {
            const start = performance.now();
            const promises = Array(5).fill(0).map((_, i) => 
                window.GuardianML.process({ type: 'classification', content: `Request ${i}` })
            );
            
            await Promise.all(promises);
            const duration = Math.round(performance.now() - start);
            const rps = (5 / (duration / 1000)).toFixed(2);
            
            if (duration > 2000) throw new Error(`Too slow: ${duration}ms`);
            return `Completed in ${duration}ms (${rps} RPS)`;
        });
    },

    // --- Helpers ---

    async runTest(id, name, fn) {
        try {
            const msg = await fn();
            this.addResult(id, name, true, msg);
        } catch (e) {
            this.addResult(id, name, false, e.message);
        }
    },

    addResult(id, name, passed, details) {
        this.results.push({
            id,
            name,
            passed,
            details,
            timestamp: new Date().toLocaleTimeString()
        });
        this.notifyUpdate();
    },

    addHeader(title) {
        this.results.push({ type: 'header', title });
        this.notifyUpdate();
    },

    notifyUpdate() {
        // Dispatch event for UI to re-render
        window.dispatchEvent(new CustomEvent('validation-update', { detail: this.results }));

        // Direct call to Dashboard UI if available
        if (typeof window.updateAIStats === 'function') {
            window.updateAIStats(this.results);
        }
    }
};
