import fs from 'fs';
import path from 'path';
import https from 'https';
import fetch from 'node-fetch'; // need to install node-fetch or use native fetch if node > 18
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegStatic);

const BUCKET_URL = "https://firebasestorage.googleapis.com/v0/b/portfolio-website-e190b.firebasestorage.app/o";
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const THUMBNAILS_DIR = path.join(PUBLIC_DIR, 'thumbnails');
const TEMP_VIDEOS_DIR = path.join(process.cwd(), '.temp_videos');

if (!fs.existsSync(THUMBNAILS_DIR)) fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
if (!fs.existsSync(TEMP_VIDEOS_DIR)) fs.mkdirSync(TEMP_VIDEOS_DIR, { recursive: true });

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

function generateThumbnail(videoPath, thumbnailPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .on('end', resolve)
            .on('error', reject)
            .screenshots({
                timestamps: [1],
                filename: path.basename(thumbnailPath),
                folder: path.dirname(thumbnailPath),
                size: '?x?' // original size
            })
            .outputOptions(['-vcodec libwebp']); // wait, screenshots doesn't support webp directly easily without custom output. Let's do a custom command.
    });
}

function generateThumbnailWebp(videoPath, thumbnailPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .screenshots({
                timestamps: [4], // Capture at 4 seconds to avoid black screens
                filename: path.basename(thumbnailPath).replace('.webp', '.png'),
                folder: path.dirname(thumbnailPath)
            }).on('end', () => {
                // Convert to webp
                const pngPath = path.join(path.dirname(thumbnailPath), path.basename(thumbnailPath).replace('.webp', '.png'));
                ffmpeg(pngPath)
                    .outputOptions(['-c:v libwebp', '-lossless 0', '-q:v 80'])
                    .output(thumbnailPath)
                    .on('end', () => {
                        fs.unlinkSync(pngPath);
                        resolve();
                    })
                    .on('error', reject)
                    .run();
            }).on('error', reject);
    });
}


async function main() {
    try {
        const response = await fetch(BUCKET_URL);
        const data = await response.json();

        // Filter and sort items numerically
        const items = data.items
            .filter(item => item.name.startsWith('Video and Reels/') && item.name.endsWith('.mp4'))
            .sort((a, b) => {
                const numA = parseInt(a.name.match(/(\d+)\.mp4$/)[1], 10);
                const numB = parseInt(b.name.match(/(\d+)\.mp4$/)[1], 10);
                return numA - numB;
            });

        const results = [];

        for (const item of items) {
            const fileName = path.basename(item.name); // e.g., "1.mp4"
            const numBase = fileName.replace('.mp4', '');
            const paddedNum = numBase.padStart(2, '0'); // e.g., "01"

            const tempVideoPath = path.join(TEMP_VIDEOS_DIR, fileName);
            const thumbnailName = `${paddedNum}.webp`;
            const thumbnailPath = path.join(THUMBNAILS_DIR, thumbnailName);

            // Get download URL
            const itemUrl = `${BUCKET_URL}/${encodeURIComponent(item.name)}`;
            const itemResponse = await fetch(itemUrl);
            const itemData = await itemResponse.json();
            const downloadToken = itemData.downloadTokens;
            const downloadUrl = `${itemUrl}?alt=media&token=${downloadToken}`;

            console.log(`Downloading ${fileName}...`);
            await downloadFile(downloadUrl, tempVideoPath);

            console.log(`Generating thumbnail for ${fileName}...`);
            await generateThumbnailWebp(tempVideoPath, thumbnailPath);

            // Add to results
            results.push({
                id: paddedNum,
                videoUrl: downloadUrl,
                thumbnailUrl: `/thumbnails/${thumbnailName}`
            });

            // Clean up temp video
            fs.unlinkSync(tempVideoPath);
        }

        fs.rmdirSync(TEMP_VIDEOS_DIR);

        // Save metadata
        fs.writeFileSync(path.join(PUBLIC_DIR, 'reels-metadata.json'), JSON.stringify(results, null, 2));
        console.log('Successfully generated thumbnails and metadata');

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
