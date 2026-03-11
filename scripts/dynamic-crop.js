import fs from 'fs';
import path from 'path';
import https from 'https';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegStatic);

const TEMP_VIDEOS_DIR = path.join(process.cwd(), '.temp_videos');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const THUMBNAILS_DIR = path.join(PUBLIC_DIR, 'thumbnails');

if (!fs.existsSync(TEMP_VIDEOS_DIR)) fs.mkdirSync(TEMP_VIDEOS_DIR, { recursive: true });

async function downloadFile(url, dest) {
    if (fs.existsSync(dest)) return;
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => file.close(resolve));
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

function getCropDimensions(videoPath) {
    return new Promise((resolve, reject) => {
        let crop = '';
        ffmpeg(videoPath)
            // Look significantly into the video to avoid black intro screens
            .setStartTime(2)
            .outputOptions(['-vf cropdetect=24:16:0', '-vframes 15', '-f null'])
            .on('end', () => resolve(crop))
            .on('error', reject)
            .on('stderr', stderrLine => {
                const match = stderrLine.match(/crop=([0-9]+:[0-9]+:[0-9]+:[0-9]+)/);
                if (match) {
                    crop = match[1];
                }
            })
            .save('-');
    });
}

function generateDynamicCroppedThumbnail(videoPath, thumbnailPath, cropStr) {
    return new Promise((resolve, reject) => {
        const pngPath = thumbnailPath.replace('.webp', '.png');

        ffmpeg(videoPath)
            .screenshots({
                timestamps: [4],
                filename: path.basename(pngPath),
                folder: path.dirname(pngPath)
            }).on('end', () => {

                ffmpeg(pngPath)
                    .videoFilters([`crop=${cropStr}`])
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
    const reelsMetadataPath = path.join(PUBLIC_DIR, 'reels-metadata.json');
    const reelsMetadata = JSON.parse(fs.readFileSync(reelsMetadataPath, 'utf8'));

    const targetIds = ['01', '04', '07', '10'];

    for (const id of targetIds) {
        const reel = reelsMetadata.find(r => r.id === id);
        if (!reel) continue;

        console.log(`Processing Reel ${id}...`);
        const tempVideoPath = path.join(TEMP_VIDEOS_DIR, `${id}.mp4`);
        const thumbnailPath = path.join(THUMBNAILS_DIR, `${id}.webp`);

        await downloadFile(reel.videoUrl, tempVideoPath);

        const crop = await getCropDimensions(tempVideoPath);
        console.log(`Detected crop for Reel ${id}: ${crop}`);

        if (crop) {
            await generateDynamicCroppedThumbnail(tempVideoPath, thumbnailPath, crop);
            console.log(`Generated dynamically cropped thumbnail for Reel ${id}`);
        } else {
            console.log(`Failed to detect crop for Reel ${id}`);
        }
    }

    fs.rmdirSync(TEMP_VIDEOS_DIR, { recursive: true });
    console.log('Done!');
}

main().catch(console.error);
