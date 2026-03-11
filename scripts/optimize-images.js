import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const photosDir = path.join(process.cwd(), 'public');

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

const optimizeImages = async () => {
    console.log('Scanning for images in public directory...');
    const allFiles = getFiles(photosDir);
    const imageFiles = allFiles.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    
    let converted = 0;
    
    for (const file of imageFiles) {
        const ext = path.extname(file);
        const webpPath = file.replace(new RegExp(`${ext}$`, 'i'), '.webp');
        
        if (!fs.existsSync(webpPath)) {
            console.log(`Converting: ${path.basename(file)} -> WebP`);
            try {
                await sharp(file)
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                converted++;
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
    
    console.log(`\nOptimization Complete! Converted ${converted} new images to WebP.`);
    console.log('Original high-res files were kept untouched.');
};

optimizeImages().catch(console.error);
