const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const certPath = path.join(__dirname, 'certs', 'ca.pem');

if (!fs.existsSync(certPath)) {
    console.error('Сертификат не найден. Сначала выполните npm run generate-cert');
    process.exit(1);
}

try {
    // Для Windows
    if (process.platform === 'win32') {
        execSync(`certutil -addstore -f "ROOT" "${certPath}"`, { stdio: 'inherit' });
    }
    // Для macOS
    else if (process.platform === 'darwin') {
        execSync(`security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain "${certPath}"`, { stdio: 'inherit' });
    }
    // Для Linux
    else {
        execSync(`sudo cp "${certPath}" /usr/local/share/ca-certificates/`, { stdio: 'inherit' });
        execSync('sudo update-ca-certificates', { stdio: 'inherit' });
    }
    console.log('Сертификат успешно установлен в доверенные');
} catch (error) {
    console.error('Ошибка при установке сертификата:', error.message);
    process.exit(1);
} 