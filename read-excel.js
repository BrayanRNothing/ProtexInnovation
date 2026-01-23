const XLSX = require('xlsx');
const fs = require('fs');

try {
    const wb = XLSX.readFile('Protex Innovations Products.xlsx');
    console.log('Sheet names:', wb.SheetNames);

    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(ws, { defval: '' });

    console.log('Total products:', data.length);
    console.log('\nColumns:', Object.keys(data[0] || {}));

    // Save to JSON for easier reading
    fs.writeFileSync('products-temp.json', JSON.stringify(data, null, 2));
    console.log('\nData saved to products-temp.json');

    // Also convert to CSV
    const csv = XLSX.utils.sheet_to_csv(ws);
    fs.writeFileSync('products-temp.csv', csv);
    console.log('Data saved to products-temp.csv');

} catch (error) {
    console.error('Error:', error.message);
}
