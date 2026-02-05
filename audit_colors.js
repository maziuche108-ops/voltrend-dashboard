const fs = require('fs');
const path = require('path');

const FILES_TO_AUDIT = [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'dashboard.html')
];

const FORBIDDEN_COLORS = [
    '#00f2ff',
    '#00F2FF',
    'rgb(0, 242, 255)',
    'rgba(0, 242, 255'
];

const REQUIRED_COLORS = [
    '#00d084',
    '#111111',
    '#f5f5f5'
];

let hasErrors = false;

console.log('Starting Color Audit...\n');

FILES_TO_AUDIT.forEach(file => {
    console.log(`Auditing ${path.basename(file)}...`);
    
    if (!fs.existsSync(file)) {
        console.error(`❌ File not found: ${file}`);
        hasErrors = true;
        return;
    }

    const content = fs.readFileSync(file, 'utf8');
    let fileErrors = 0;

    // Check for forbidden colors
    FORBIDDEN_COLORS.forEach(color => {
        if (content.includes(color)) {
            console.error(`  ❌ Found forbidden color: ${color}`);
            fileErrors++;
        }
    });

    // Check for required colors
    REQUIRED_COLORS.forEach(color => {
        if (!content.includes(color)) {
            console.warn(`  ⚠️  Missing core brand color: ${color}`);
        }
    });

    if (fileErrors === 0) {
        console.log('  ✅ No forbidden colors found.');
    } else {
        hasErrors = true;
    }
    console.log('');
});

if (hasErrors) {
    console.error('Audit FAILED: Forbidden colors detected.');
    process.exit(1);
} else {
    console.log('Audit PASSED: All files are compliant with the TechCronch color palette.');
    process.exit(0);
}
