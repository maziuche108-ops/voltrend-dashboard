/**
 * DataSDK - Mock Data Service
 * Provides mock data for articles, comments, and user history.
 * @namespace DataSDK
 */
window.dataSdk = {
    /**
     * Initialize the Data SDK
     * @param {Object} config - Configuration object
     */
    init: async (config) => {
        console.log('Mock dataSdk.init', config);
    },

    /**
     * Create a new item in a collection
     * @param {Object} item - Item to create
     * @param {string} collection - Collection name
     * @returns {Promise<Object>} Created item with ID
     */
    create: async (item, collection) => { 
        console.log('Mock dataSdk.create', collection, item);
        return { id: Date.now() };
    },

    /**
     * Get items from a collection
     * @param {string} collection - Collection name
     * @returns {Promise<Array<Object>>} List of items
     */
    getCollection: async (collection) => { 
        console.log('Mock dataSdk.getCollection', collection); 
        if (collection === 'market_data') {
            return [
                { symbol: 'BTC/USD', trend: 'up', price: '$95,432.10', change: '+5.2%' },
                { symbol: 'ETH/USD', trend: 'down', price: '$3,210.50', change: '-1.8%' },
                { symbol: 'NVDA', trend: 'up', price: '$1,102.00', change: '+3.4%' },
                { symbol: 'TSLA', trend: 'up', price: '$250.00', change: '+1.2%' }
            ];
        }
        if (collection === 'events') {
            return [
                { id: 1, name: "Global AI Summit 2026", date: "Oct 15, 2026", location: "San Francisco, CA", type: "Conference", category: "Conference", impact: "High", country: "US", image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80" },
                { id: 2, name: "DeFi World Hackathon", date: "Nov 02, 2026", location: "London, UK", type: "Hackathon", category: "Hackathon", impact: "Medium", country: "UK", image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&w=800&q=80" },
                { id: 3, name: "Future of Fintech Webinar", date: "Sep 28, 2026", location: "Online", type: "Webinar", category: "Webinar", impact: "Low", country: "Global", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80" },
                { id: 4, name: "CyberSecurity Expo", date: "Dec 10, 2026", location: "New York, NY", type: "Conference", category: "Conference", impact: "High", country: "US", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" },
                { id: 5, name: "Blockchain Summit", date: "Jan 15, 2027", location: "Singapore", type: "Conference", category: "Conference", impact: "High", country: "Global", image: "https://images.unsplash.com/photo-1516245834210-c4c14278733f?auto=format&fit=crop&w=800&q=80" }
            ];
        }
        return []; 
    },

    /**
     * Get all articles
     * @returns {Promise<Array<Object>>} List of articles with sentiment analysis
     */
    getArticles: async () => { 
        console.log('Mock dataSdk.getArticles');
        return [
            { 
                id: 1, 
                title: "The AI Singularity is Nearer Than You Think", 
                category: "AI", 
                excerpt: "New breakthroughs in LLMs suggest AGI might be achieved by 2027, according to top researchers.", 
                image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
                authorName: "Dr. Sarah Connor",
                readTime: "8 min read",
                sentiment: "Positive",
                likes: 124
            },
            { 
                id: 2, 
                title: "Crypto Markets Rebound After Regulation News", 
                category: "Crypto", 
                excerpt: "Bitcoin and Ethereum surge as new global framework for digital assets is announced.", 
                image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80",
                authorName: "Satoshi N.",
                readTime: "4 min read",
                sentiment: "Positive",
                likes: 892
            },
            { 
                id: 3, 
                title: "Quantum Computing: The End of Encryption?", 
                category: "Tech", 
                excerpt: "How post-quantum cryptography is racing to secure the internet before it's too late.", 
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
                authorName: "Alice Bob",
                readTime: "6 min read",
                sentiment: "Negative"
            },
            { 
                id: 4, 
                title: "Cybersecurity in 2026: Zero Trust is Not Enough", 
                category: "Security", 
                excerpt: "Why behavioral analytics and AI-driven defense mechanisms are the new standard for enterprise security.", 
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
                authorName: "Mr. Robot",
                readTime: "5 min read",
                sentiment: "Neutral"
            },
            { 
                id: 5, 
                title: "The Rise of DeFi 2.0", 
                category: "Crypto", 
                excerpt: "Decentralized Finance is evolving with real-world asset tokenization and institutional adoption.", 
                image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
                authorName: "Vitalik B.",
                readTime: "7 min read",
                sentiment: "Positive"
            },
            { 
                id: 6, 
                title: "Sustainable Tech: Green Energy in Data Centers", 
                category: "Startups", 
                excerpt: "How startups are solving the massive energy consumption problem of AI training clusters.", 
                image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
                authorName: "Elon M.",
                readTime: "4 min read",
                sentiment: "Positive"
            },
            { 
                id: 7, 
                title: "Neural Interfaces: Connecting Brains to Cloud", 
                category: "Tech", 
                excerpt: "The latest trials in BCI technology show promising results for memory augmentation.", 
                image: "https://images.unsplash.com/photo-1555617778-02518510b9fa?auto=format&fit=crop&w=800&q=80",
                authorName: "Neo A.",
                readTime: "9 min read",
                sentiment: "Neutral"
            },
            { 
                id: 8, 
                title: "Security Alert: XSS Vulnerability Test", 
                category: "Security", 
                excerpt: "This article contains a simulated XSS payload to test the Guardian SDK sanitization protocols. <script>alert('XSS Payload Executed!')</script> <img src=x onerror=alert('IMG XSS')>", 
                image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80",
                authorName: "Red Team",
                readTime: "1 min read",
                sentiment: "Negative"
            },
            { 
                id: 9, 
                title: "Quantum Computing: The End of RSA Encryption?", 
                category: "Tech", 
                excerpt: "New breakthroughs in qubit stability put current encryption standards at risk sooner than expected.", 
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
                authorName: "Dr. Q",
                readTime: "8 min read",
                sentiment: "Negative"
            },
            { 
                id: 10, 
                title: "The Metaverse Real Estate Bubble Burst", 
                category: "Crypto", 
                excerpt: "Virtual land prices plummet as user retention rates hit all-time lows in major platforms.", 
                image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
                authorName: "Satoshi N.",
                readTime: "6 min read",
                sentiment: "Negative"
            }
        ]; 
    },

    /**
     * Get a specific item by ID
     * @param {string} collection - Collection name
     * @param {string|number} id - Item ID
     * @returns {Promise<Object>} Found item or undefined
     */
    getItem: async (collection, id) => {
        // Simple mock for article detail
        const articles = await window.dataSdk.getArticles();
        return articles.find(a => a.id == id);
    },

    /**
     * Add article to reading history
     * @param {string|number} id - Article ID
     */
    addToHistory: (id) => console.log('Mock addToHistory', id),

    /**
     * Get recommended articles
     * @param {string|number} id - Current article ID
     * @returns {Promise<Array<Object>>} List of recommended articles
     */
    getRecommendations: async (id) => {
        console.log('Mock dataSdk.getRecommendations', id);
        const articles = await window.dataSdk.getArticles();
        return articles.filter(a => a.id != id).slice(0, 3);
    },

    /**
     * Get comments for an article
     * @param {string|number} articleId - Article ID
     * @returns {Promise<Array<Object>>} List of comments
     */
    getComments: async (articleId) => {
        console.log('Mock dataSdk.getComments', articleId);
        return [
            { id: 101, articleId: articleId, author: 'Alice', text: 'Great read! very insightful.', __createdAt: Date.now() - 100000, status: 'approved' },
            { id: 102, articleId: articleId, author: 'Bob', text: 'I disagree with the point about AGI.', __createdAt: Date.now() - 50000, status: 'approved' }
        ];
    },

    /**
     * Add a comment to an article
     * @param {Object} comment - Comment object
     * @returns {Promise<Object>} Result object
     */
    addComment: async (comment) => {
        console.log('Mock dataSdk.addComment', comment);
        return { success: true };
    },

    /**
     * Like or unlike an article
     * @param {string|number} articleId - Article ID
     * @returns {Promise<Object>} Updated stats
     */
    likeArticle: async (articleId) => {
        console.log('Mock dataSdk.likeArticle', articleId);
        return { success: true, likes: Math.floor(Math.random() * 1000) + 1 };
    }
};
