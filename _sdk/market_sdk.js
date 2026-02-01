/**
 * MarketSDK - Real-time Market Data Simulation
 * Provides mock data for financial assets, economic events, and market status.
 * @namespace MarketSDK
 */
window.MarketSDK = {
    /**
     * Connection status of the market feed.
     * @type {string}
     */
    status: 'CONNECTED',

    /**
     * Mock Asset Data
     * @type {Array<Object>}
     */
    assets: [
        { id: 'BTC-USD', name: 'Bitcoin', price: 95432.10, change: 1250.50, changeP: 1.32, vol: 45000000000, marketCap: 1800000000000, type: 'Crypto', sentiment: 'Bullish', history: [] },
        { id: 'ETH-USD', name: 'Ethereum', price: 5432.10, change: -45.20, changeP: -0.82, vol: 15000000000, marketCap: 650000000000, type: 'Crypto', sentiment: 'Neutral', history: [] },
        { id: 'AAPL', name: 'Apple Inc.', price: 245.50, change: 2.10, changeP: 0.86, vol: 50000000, marketCap: 3500000000000, type: 'Stocks', sentiment: 'Bullish', history: [] },
        { id: 'TSLA', name: 'Tesla Inc.', price: 412.30, change: 12.50, changeP: 3.12, vol: 80000000, marketCap: 1200000000000, type: 'Stocks', sentiment: 'Bullish', history: [] },
        { id: 'EUR/USD', name: 'Euro / US Dollar', price: 1.1250, change: 0.0005, changeP: 0.04, vol: 100000000000, marketCap: 0, type: 'Forex', sentiment: 'Neutral', history: [] },
        { id: 'XAU/USD', name: 'Gold Spot', price: 2450.00, change: 15.20, changeP: 0.62, vol: 30000000000, marketCap: 12000000000000, type: 'Commodities', sentiment: 'Bullish', history: [] },
        { id: 'NVDA', name: 'NVIDIA Corp', price: 1250.40, change: 45.20, changeP: 3.75, vol: 60000000, marketCap: 3100000000000, type: 'Stocks', sentiment: 'Bullish', history: [] },
        { id: 'SOL-USD', name: 'Solana', price: 345.20, change: 12.40, changeP: 3.72, vol: 4000000000, marketCap: 150000000000, type: 'Crypto', sentiment: 'Bullish', history: [] }
    ],

    /**
     * Mock Economic Events
     * @type {Array<Object>}
     */
    events: [
        { time: '08:30', country: 'USA', event: 'Non-Farm Payrolls', impact: 'High', forecast: '180K' },
        { time: '09:00', country: 'EU', event: 'ECB President Speaks', impact: 'High', forecast: '-' },
        { time: '10:30', country: 'UK', event: 'GDP Growth Rate', impact: 'Medium', forecast: '0.2%' },
        { time: '14:00', country: 'JP', event: 'BOJ Core CPI', impact: 'Low', forecast: '2.1%' }
    ],

    /**
     * Subscribers
     */
    subscribers: [],
    statusSubscribers: [],

    /**
     * Initialize the Market SDK
     */
    init: function() {
        console.log('Market SDK initialized');
        this.generateHistory();
        this.startSimulation();
    },

    /**
     * Generate mock history for charts
     */
    generateHistory: function() {
        const now = Date.now();
        this.assets.forEach(asset => {
            asset.history = [];
            let price = asset.price;
            for (let i = 100; i > 0; i--) {
                price = price * (1 + (Math.random() * 0.02 - 0.01));
                asset.history.push({ t: now - i * 60000, y: price });
            }
        });
    },

    /**
     * Get all assets
     * @returns {Array<Object>} List of assets
     */
    getAssets: function() {
        return this.assets;
    },

    /**
     * Get a specific asset by ID
     * @param {string} id - Asset ID
     * @returns {Object|undefined} Asset object
     */
    getAsset: function(id) {
        return this.assets.find(a => a.id === id);
    },

    /**
     * Get economic events
     * @returns {Array<Object>} List of events
     */
    getEvents: function() {
        return this.events;
    },

    /**
     * Subscribe to market data updates
     * @param {Function} callback - Function to call with updated assets
     * @returns {Function} Unsubscribe function
     */
    subscribe: function(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(cb => cb !== callback);
        };
    },

    /**
     * Subscribe to connection status updates
     * @param {Function} callback - Function to call with status string
     * @returns {Function} Unsubscribe function
     */
    subscribeStatus: function(callback) {
        this.statusSubscribers.push(callback);
        // Immediate callback with current status
        callback(this.status);
        return () => {
            this.statusSubscribers = this.statusSubscribers.filter(cb => cb !== callback);
        };
    },

    /**
     * Start the live data simulation
     */
    startSimulation: function() {
        if (this.simulationInterval) clearInterval(this.simulationInterval);
        
        this.simulationInterval = setInterval(() => {
            if (this.status !== 'CONNECTED') return;

            this.assets.forEach(asset => {
                const move = (Math.random() * 0.01 - 0.004);
                asset.price = asset.price * (1 + move);
                asset.change = asset.price - asset.history[0].y; // Simple mock change vs start
                asset.changeP = (asset.change / asset.history[0].y) * 100;
                
                // Add new history point
                asset.history.push({ t: Date.now(), y: asset.price });
                if (asset.history.length > 100) asset.history.shift();
            });
            
            // Notify Subscribers
            this.subscribers.forEach(cb => cb(this.assets));

            // Legacy direct calls (fallback)
            if (window.updateAssetListValues) {
                window.updateAssetListValues(this.assets);
            }
            if (window.updateChartRealtime && window.currentAssetId) {
                const asset = this.getAsset(window.currentAssetId);
                if(asset) window.updateChartRealtime(asset);
            }
        }, 1000);
    },

    /**
     * Simulate stream reconnection
     */
    startStream: function() {
        console.log('Market Stream: Connecting...');
        this.updateStatus('CONNECTING');
        
        setTimeout(() => {
            this.updateStatus('CONNECTED');
            console.log('Market Stream: Connected');
        }, 1500);
    },

    /**
     * Update internal status and notify subscribers
     */
    updateStatus: function(newStatus) {
        this.status = newStatus;
        this.statusSubscribers.forEach(cb => cb(this.status));
    }
};

// Auto-init if loaded
if (document.readyState === 'complete') {
    window.MarketSDK.init();
} else {
    window.addEventListener('load', () => window.MarketSDK.init());
}
