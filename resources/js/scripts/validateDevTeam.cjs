const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const expectedHash = 'b0056cc99db951878dcfc0e8846c662a7163a274a24df64fcaf780329b289057';
const filePath = path.resolve(__dirname, '../Components/Developers.tsx');

const content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('usePage().props')) {
    console.warn('❌ Developers.tsx no longer uses usePage().props – it may be hardcoded!');
    process.exit(1);
}

const hash = crypto.createHash('sha256').update(content).digest('hex');

if (hash !== expectedHash) {
    console.warn('❌ Developers.tsx has been changed from the expected version!');
    process.exit(1);
}

console.log('✅ Developers.tsx integrity verified.');
