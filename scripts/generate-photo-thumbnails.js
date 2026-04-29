import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const photosDir = path.join(process.cwd(), 'public');

// Recursively get all files in a directory
const getFiles = (dir, filesList = []) => {
    if (!fs.existsSync(dir)) return filesList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath, filesList);
        } else {
            filesList.push(fullPath);
        }
    }
    return filesList;
};

const generateThumbnails = async () => {
    console.log('Scanning for WebP images in public directory...');
    const allFiles = getFiles(photosDir);
    
    // Only process .webp files that are not already thumbnails
    const imageFiles = allFiles.filter(f => 
        f.toLowerCase().endsWith('.webp') && !f.toLowerCase().endsWith('_thumb.webp')
    );
    
    let generatedCount = 0;
    
    for (const file of imageFiles) {
        const thumbPath = file.replace(/\.webp$/i, '_thumb.webp');
        
        if (!fs.existsSync(thumbPath)) {
            console.log(`Generating thumbnail: ${path.basename(thumbPath)}`);
            try {
                // Resize to max height of 600px, keeping aspect ratio
                await sharp(file)
                    .resize({ height: 600, withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(thumbPath);
                generatedCount++;
            } catch (err) {
                console.error(`Error generating thumbnail for ${file}:`, err);
            }
        }
    }
    
    console.log(`\nThumbnail Generation Complete! Created ${generatedCount} new thumbnails.`);
    console.log('Original files were kept untouched.');
};

generateThumbnails().catch(console.error);
