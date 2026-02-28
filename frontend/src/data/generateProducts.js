import fs from 'fs';

const categories = ['Medicines', 'Medical Devices', 'Antibiotics', 'Supplements'];
const manufacturers = [
    'Square Pharmaceuticals Ltd.',
    'Beximco Pharmaceuticals Ltd.',
    'Incepta Pharmaceuticals Ltd.',
    'Renata Limited',
    'Eskayef Pharmaceuticals Ltd.',
    'ACME Laboratories Ltd.',
    'Opsonin Pharma Limited',
    'Aristopharma Ltd.'
];

const medicineNames = ['Napa', 'Seclo', 'Maxpro', 'Finix', 'Sergel', 'Losectil', 'Bextram', 'Calbo', 'Odmon', 'Esonix', 'Fexo', 'Alatrol', 'Monas', 'Comet', 'Normens', 'Bizoran', 'Camlosart', 'Osartil', 'Angilock', 'Indever'];
const antibioticNames = ['Cef-3', 'Moxacil', 'Amoxil', 'Azithromycin', 'Zimax', 'Ciprofloxacin', 'Cifloxin', 'Levoflox', 'Fluclox', 'Ceftriaxone'];
const deviceNames = ['Digital Thermometer', 'First Aid Kit', 'Blood Pressure Monitor', 'Glucometer', 'Pulse Oximeter', 'Nebulizer', 'Hot Water Bag', 'Weighing Scale', 'Surgical Mask', 'Sterile Gloves'];
const supplementNames = ['Vitamin C', 'Vitamin D3', 'Multivitamin', 'Calcium + D3', 'Iron Supplement', 'Omega 3', 'Zinc Tablet', 'B-Complex', 'Protein Powder', 'Folic Acid'];

let products = [];
let idCounter = 1;

function generateItems(names, category, baseDesc, basePrice, basePack) {
    names.forEach(name => {
        // Generate 3 variants per name to reach ~120 total products easily
        const variants = ['Low Dose', 'Standard', 'High Dose'];
        variants.forEach((variant) => {
            const isDevice = category === 'Medical Devices';
            const prodName = isDevice ? `${name} (${variant === 'Standard' ? 'Basic' : variant === 'Low Dose' ? 'Mini' : 'Pro'})` : `${name} ${variant === 'Low Dose' ? '250mg' : variant === 'Standard' ? '500mg' : '1000mg'}`;

            const price = basePrice + Math.floor(Math.random() * 50);
            const stock = Math.random() > 0.15; // 85% chance to be in stock

            products.push({
                id: idCounter++,
                name: prodName,
                category: category,
                description: baseDesc,
                details: `This is a high-quality ${category.toLowerCase()} manufactured according to the best pharmaceutical standards. Always read the label and follow the directions for use. If symptoms persist, talk to your health professional.`,
                price: `৳${price}.00 ${isDevice ? '' : '/ strip'}`,
                manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
                inStock: stock,
                packSize: basePack
            });
        });
    });
}

generateItems(medicineNames, 'Medicines', 'Relief for common ailments and symptoms.', 20, '10 tablets per strip');
generateItems(antibioticNames, 'Antibiotics', 'Effective treatment for bacterial infections.', 50, '10 capsules per strip');
generateItems(deviceNames, 'Medical Devices', 'Reliable medical instruments and health monitors.', 150, '1 unit');
generateItems(supplementNames, 'Supplements', 'Daily dietary supplements for better health.', 80, '30 tablets');

const fileContent = `// Automatically generated product data

export const products = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('f:/Areas/Development/Projects/React/imanpharma/frontend/src/data/products.js', fileContent);
console.log('Successfully generated products.js with ' + products.length + ' products.');
