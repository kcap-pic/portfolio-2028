import fs from 'fs';
import path from 'path';
import https from 'https';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegStatic);

const TEMP_VIDEOS_DIR = path.join(process.cwd(), '.temp_videos');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

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
        ffmpeg(videoPath)
            // sample 10 frames from 4 seconds in to detect crop
            .outputOptions(['-vf cropdetect=24:16:0', '-vframes 10', '-f null'])
            .on('end', () => resolve('ok'))
            .on('error', reject)
            .on('stderr', stderrLine => {
                const match = stderrLine.match(/crop=([0-9]+:[0-9]+:[0-9]+:[0-9]+)/);
                if (match) {
                    resolve(match[1]); // e.g. "608:1080:656:0"
                }
            })
            .save('-'); // dummy output
    });
}

async function main() {
    const reelsMetadataPath = path.join(PUBLIC_DIR, 'reels-metadata.json');
    const reelsMetadata = JSON.parse(fs.readFileSync(reelsMetadataPath, 'utf8'));

    const targetIds = ['01', '04', '07', '10'];

    for (const id of targetIds) {
        const reel = reelsMetadata.find(r => r.id === id);
        if (!reel) continue;

        const tempVideoPath = path.join(TEMP_VIDEOS_DIR, `${id}.mp4`);
        await downloadFile(reel.videoUrl, tempVideoPath);

        try {
            const crop = await getCropDimensions(tempVideoPath);
            console.log(`Reel ${id} ideal crop is: crop=${crop}`);
        } catch (e) {
            console.error(`Error on Reel ${id}: `, e.message);
        }
    }
}

main().catch(console.error);
