import exifr from 'exifr';
import fs from 'fs/promises';
import path from 'path';

const PUBLIC_DIR = './public';
const CATEGORIES = ['Events', 'Outdoors', 'Portrait', 'Sports'];
const OUTPUT_FILE = './public/photo-metadata.json';

async function getFilesRecursively(dir) {
    let results = [];
    const list = await fs.readdir(dir, { withFileTypes: true });
    for (const file of list) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            results = results.concat(await getFilesRecursively(fullPath));
        } else if (/\.(jpg|jpeg)$/i.test(file.name)) {
            results.push(fullPath);
        }
    }
    return results;
}

function formatShutterSpeed(exposureTime) {
    if (!exposureTime) return null;
    if (exposureTime >= 1) return `${exposureTime}s`;
    const denominator = Math.round(1 / exposureTime);
    return `1/${denominator}s`;
}

async function extractAllMetadata() {
    console.log('🚀 Starting Metadata Extraction...');
    const metadataMap = {};
    let count = 0;

    for (const cat of CATEGORIES) {
        const catPath = path.join(PUBLIC_DIR, cat);
        try {
            // Check if folder exists
            await fs.access(catPath);
            const files = await getFilesRecursively(catPath);
            
            console.log(`\n📁 Category: ${cat} (${files.length} JPGs found)`);

            for (const file of files) {
                try {
                    const data = await exifr.parse(file, {
                        pick: ['Make', 'Model', 'ExposureTime', 'FNumber', 'ISO', 'FocalLength', 'LensModel']
                    });

                    if (data) {
                        // Key format: "Portrait/IMG_7234" (no extension)
                        const relativePath = path.relative(PUBLIC_DIR, file).replace(/\\/g, '/');
                        const key = relativePath.replace(/\.[^/.]+$/, "");
                        
                        metadataMap[key] = {
                            model: data.Model || null,
                            make: data.Make || null,
                            shutter: formatShutterSpeed(data.ExposureTime),
                            aperture: data.FNumber ? `f/${data.FNumber}` : null,
                            iso: data.ISO ? `ISO ${data.ISO}` : null,
                            focal: data.FocalLength ? `${data.FocalLength}mm` : null,
                            lens: data.LensModel || null
                        };
                        count++;
                        process.stdout.write('.');
                    }
                } catch (err) {
                    console.error(`\n❌ Error parsing ${file}:`, err.message);
                }
            }
        } catch (err) {
            console.warn(`\n⚠️  Skipping ${cat}: Folder not found or inaccessible.`);
        }
    }

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(metadataMap, null, 2));
    console.log(`\n\n✅ Success! Extracted metadata for ${count} photos.`);
    console.log(`💾 Saved to: ${OUTPUT_FILE}`);
}

extractAllMetadata();
