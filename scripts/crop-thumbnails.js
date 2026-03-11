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

function generateCroppedThumbnail(videoPath, thumbnailPath) {
    return new Promise((resolve, reject) => {
        const pngPath = thumbnailPath.replace('.webp', '.png');
        // We know the videos are likely 1080x1920 with letterboxing, or similar.
        // Let's use ffmpeg's crop filter. Assuming the content is roughly 16:9 or 9:16 centered
        // Actually, if it's a 9:16 video letterboxed into 16:9, or 16:9 letterboxed into 9:16...
        // Let's crop it to the center 9:16 ratio.
        // If the video is 1920x1080, 9:16 area in center is 607x1080.
        // If the video is 1080x1920, the whole thing is 9:16. Let's assume the user means it has black on top/bottom or left/right.
        // We can use the 'crop' filter: crop=ih*9/16:ih if horizontal, or iw:iw*16/9 if vertical.
        // Or we can just use an auto-crop filter using cropdetect?
        // Let's use a standard 9:16 crop from the center.

        ffmpeg(videoPath)
            .screenshots({
                timestamps: [4],
                filename: path.basename(pngPath),
                folder: path.dirname(pngPath)
            }).on('end', () => {
                // Now crop the generated png to 9:16 and convert to webp
                // 1080x1920 is 9:16 format. If the video is 1920x1080, a 9:16 crop is 608x1080.
                ffmpeg(pngPath)
                    .videoFilters([
                        'crop=min(iw\\,ih*9/16):min(ih\\,iw*16/9)'
                    ])
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

    // The vertical ones the user mentioned. Let's just do 01, 04, 07, 10
    const targetIds = ['01', '04', '07', '10'];

    for (const id of targetIds) {
        const reel = reelsMetadata.find(r => r.id === id);
        if (!reel) continue;

        console.log(`Processing Reel ${id}...`);
        const tempVideoPath = path.join(TEMP_VIDEOS_DIR, `${id}.mp4`);
        const thumbnailPath = path.join(THUMBNAILS_DIR, `${id}.webp`);

        await downloadFile(reel.videoUrl, tempVideoPath);
        await generateCroppedThumbnail(tempVideoPath, thumbnailPath);

        fs.unlinkSync(tempVideoPath);
        console.log(`Generated cropped thumbnail for Reel ${id}`);
    }

    fs.rmdirSync(TEMP_VIDEOS_DIR);
    console.log('Done!');
}

main().catch(console.error);
