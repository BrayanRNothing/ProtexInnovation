const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

try {
    console.log('Reading Excel file...');
    const wb = XLSX.readFile('Protex Innovations Products.xlsx');

    // Get the workbook media (images)
    if (wb.media && wb.media.length > 0) {
        console.log(`Found ${wb.media.length} images in the workbook`);

        // Create output directory if it doesn't exist
        const outputDir = path.join('public', 'IMGPRODUCTS');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Extract and save images
        wb.media.forEach((media, index) => {
            const ext = media.type || 'png';
            const filename = `excel-image-${index + 1}.${ext}`;
            const filepath = path.join(outputDir, filename);

            fs.writeFileSync(filepath, media.data);
            console.log(`Saved: ${filename}`);
        });

        console.log('\nAll images extracted successfully!');
    } else {
        console.log('No embedded images found in the workbook.');
        console.log('Trying alternative method...');

        // Try to extract from the Excel package
        const AdmZip = require('adm-zip');
        const zip = new AdmZip('Protex Innovations Products.xlsx');
        const zipEntries = zip.getEntries();

        let imageCount = 0;
        zipEntries.forEach(entry => {
            if (entry.entryName.includes('xl/media/')) {
                const outputDir = path.join('public', 'IMGPRODUCTS');
                if (!fs.existsSync(outputDir)) {
                    fs.mkdirSync(outputDir, { recursive: true });
                }

                const filename = path.basename(entry.entryName);
                const filepath = path.join(outputDir, filename);
                fs.writeFileSync(filepath, entry.getData());
                console.log(`Extracted: ${filename}`);
                imageCount++;
            }
        });

        console.log(`\nExtracted ${imageCount} images using ZIP method`);
    }

} catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
}
