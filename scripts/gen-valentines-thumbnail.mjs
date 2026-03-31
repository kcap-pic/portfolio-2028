import { createWriteStream, unlinkSync, existsSync } from 'fs';
import { pipeline } from 'stream/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import sharp from 'sharp';
import ffmpegPath from 'ffmpeg-static';

const execAsync = promisify(exec);

const BUCKET = 'portfolio-website-e190b.firebasestorage.app';
const OBJECT = 'Video and Reels/Valentines.mp4';
const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(OBJECT)}?alt=media`;

const ROOT = 'd:/Portfolio/portfolio-app';
const TMP_VIDEO = `${ROOT}/tmp_val_v4.mp4`;
const TMP_FRAME = `${ROOT}/tmp_val_frame.png`;
const OUTPUT_WEBP = `${ROOT}/public/thumbnails/13.webp`;

async function run() {
    console.log('⬇️  Downloading Valentines from Firebase Storage...');
    console.log('   URL:', downloadUrl);
    const res = await fetch(downloadUrl);
    if (!res.ok) throw new Error(`Download failed: ${res.status} ${res.statusText}`);

    const fs = await import('fs');
    await pipeline(res.body, createWriteStream(TMP_VIDEO));
    const size = fs.statSync(TMP_VIDEO).size;
    console.log(`✅ Downloaded: ${(size / 1024 / 1024).toFixed(1)} MB`);

    console.log('🎞️  Extracting frame at t=2s...');
    await execAsync(`"${ffmpegPath}" -y -ss 2 -i "${TMP_VIDEO}" -frames:v 1 "${TMP_FRAME}"`);
    console.log('✅ Frame extracted');

    console.log('🗜️  Compressing to webp (quality 100)...');
    await sharp(TMP_FRAME).webp({ quality: 100, lossless: true }).toFile(OUTPUT_WEBP);
    const outSize = fs.statSync(OUTPUT_WEBP).size;
    console.log(`✅ Thumbnail saved: ${OUTPUT_WEBP} (${(outSize / 1024).toFixed(0)} KB)`);

    if (existsSync(TMP_VIDEO)) unlinkSync(TMP_VIDEO);
    if (existsSync(TMP_FRAME)) unlinkSync(TMP_FRAME);
    console.log('🧹 Temp files cleaned.');
}

run().catch(err => { console.error('❌', err.message); process.exit(1); });
