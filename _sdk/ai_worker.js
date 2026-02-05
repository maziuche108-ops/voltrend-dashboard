/**
 * TechCronch AI Worker
 * Dedicated Web Worker for handling intensive ML tasks off the main thread.
 */

const STATE = {
    isInitialized: false,
    models: {}
};

self.onmessage = async (e) => {
    const { id, type, payload } = e.data;

    try {
        // Auto-initialize if needed
        if (!STATE.isInitialized && type !== 'INIT') {
            await initializeEngine();
        }

        switch (type) {
            case 'INIT':
                await initializeEngine();
                self.postMessage({ id, success: true, data: 'Engine Online' });
                break;
            case 'HEALTH_CHECK':
                const health = await getHealth();
                self.postMessage({ id, success: true, data: health });
                break;
            case 'PROCESS':
                const result = await processContent(payload);
                self.postMessage({ id, success: true, data: result });
                break;
            default:
                throw new Error(`Unknown command: ${type}`);
        }
    } catch (error) {
        self.postMessage({ id, success: false, error: error.message });
    }
};

async function initializeEngine() {
    if (STATE.isInitialized) return;
    console.log('[AI Worker] Initializing Neural Engine...');
    await new Promise(r => setTimeout(r, 800)); // Simulate load time
    STATE.isInitialized = true;
    STATE.models = { sentiment: 'Sentiment_v4', threat: 'Threat_v2' };
    console.log('[AI Worker] Engine Online.');
}

async function getHealth() {
    return {
        status: STATE.isInitialized ? 'ONLINE' : 'OFFLINE',
        latency: 24, // ms
        models: Object.values(STATE.models)
    };
}

async function processContent(task) {
    console.log(`[AI Worker] Processing task: ${task.type}`);
    
    // Simulate processing delay
    await new Promise(r => setTimeout(r, 400));

    // Mock Logic from original guardian_ml.js
    if (task.type === 'sentiment') {
        const isPositive = task.content.toLowerCase().includes('good') || task.content.toLowerCase().includes('bullish');
        return {
            result: {
                label: isPositive ? 'POSITIVE' : 'NEUTRAL',
                score: isPositive ? 0.89 : 0.55
            }
        };
    }

    if (task.type === 'summary') {
        return {
            result: {
                text: "AI analysis indicates this content focuses on emerging technology trends with a high degree of confidence."
            }
        };
    }

    // Default Threat Scan
    return {
        result: {
            threatFound: false,
            confidence: 0.99
        }
    };
}
