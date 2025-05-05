const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

const attrs = [
    { name: 'commonName', value: 'localhost' },
    { name: 'countryName', value: 'RU' },
    { name: 'organizationName', value: 'Development' },
    { name: 'organizationalUnitName', value: 'Development' }
];

const pems = selfsigned.generate(attrs, {
    algorithm: 'sha256',
    days: 365,
    keySize: 2048,
    extensions: [
        {
            name: 'basicConstraints',
            cA: true
        },
        {
            name: 'keyUsage',
            keyCertSign: true,
            digitalSignature: true,
            nonRepudiation: true,
            keyEncipherment: true,
            dataEncipherment: true
        },
        {
            name: 'subjectAltName',
            altNames: [
                {
                    type: 2,
                    value: 'localhost'
                },
                {
                    type: 7,
                    ip: '127.0.0.1'
                }
            ]
        }
    ]
});

const certsDir = path.join(__dirname, 'certs');
if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir);
}

fs.writeFileSync(path.join(certsDir, 'cert.pem'), pems.cert);
fs.writeFileSync(path.join(certsDir, 'key.pem'), pems.private);
fs.writeFileSync(path.join(certsDir, 'ca.pem'), pems.cert);

console.log('Сертификаты успешно сгенерированы в директории certs/'); 