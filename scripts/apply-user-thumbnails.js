import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegStatic);

const THUMBNAILS_DIR = path.join(process.cwd(), 'Thumbnails');
const PUBLIC_THUMBNAILS_DIR = path.join(process.cwd(), 'public', 'thumbnails');

const filesToConvert = [
    { src: '4th (1).png', dest: '01.webp' },
    { src: '5th.png', dest: '04.webp' },
    { src: '6th.png', dest: '07.webp' }
];

async function convert(srcFile, destFile) {
    return new Promise((resolve, reject) => {
        ffmpeg(path.join(THUMBNAILS_DIR, srcFile))
            .outputOptions(['-c:v libwebp', '-lossless 0', '-q:v 80'])
            .output(path.join(PUBLIC_THUMBNAILS_DIR, destFile))
            .on('end', resolve)
            .on('error', reject)
            .run();
    });
}

async function main() {
    for (const file of filesToConvert) {
        console.log(`Converting ${file.src} to ${file.dest}...`);
        await convert(file.src, file.dest);
    }
}

main().catch(console.error);
