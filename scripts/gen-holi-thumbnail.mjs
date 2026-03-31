/**
 * gen-holi-thumbnail.mjs
 * Downloads Holi V4 from Firebase Storage, extracts frame at 5s,
 * compresses to webp, saves as public/thumbnails/12.webp
 */

import { createWriteStream, unlinkSync, existsSync } from 'fs';
import { pipeline } from 'stream/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import ffmpegPath from 'ffmpeg-static';

const execAsync = promisify(exec);

// Firebase Storage — unauthenticated public download
const BUCKET = 'portfolio-website-e190b.firebasestorage.app';
const OBJECT = 'Video and Reels/Holi Final V4.mp4';
const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(OBJECT)}?alt=media`;

const ROOT = 'd:/Portfolio/portfolio-app';
const TMP_VIDEO = `${ROOT}/tmp_holi_v4.mp4`;
const TMP_FRAME = `${ROOT}/tmp_holi_frame.png`;
const OUTPUT_WEBP = `${ROOT}/public/thumbnails/12.webp`;

async function run() {
    console.log('⬇️  Downloading Holi V4 from Firebase Storage...');
    console.log('   URL:', downloadUrl);
    const res = await fetch(downloadUrl);
    if (!res.ok) throw new Error(`Download failed: ${res.status} ${res.statusText}`);

    await pipeline(res.body, createWriteStream(TMP_VIDEO));
    const size = (await import('fs')).statSync(TMP_VIDEO).size;
    console.log(`✅ Downloaded: ${(size / 1024 / 1024).toFixed(1)} MB`);

    console.log('🎞️  Extracting frame at t=5s...');
    await execAsync(`"${ffmpegPath}" -y -ss 5 -i "${TMP_VIDEO}" -frames:v 1 "${TMP_FRAME}"`);
    console.log('✅ Frame extracted');

    console.log('🗜️  Compressing to webp (quality 72)...');
    await sharp(TMP_FRAME).webp({ quality: 72 }).toFile(OUTPUT_WEBP);
    const outSize = (await import('fs')).statSync(OUTPUT_WEBP).size;
    console.log(`✅ Thumbnail saved: ${OUTPUT_WEBP} (${(outSize / 1024).toFixed(0)} KB)`);

    if (existsSync(TMP_VIDEO)) unlinkSync(TMP_VIDEO);
    if (existsSync(TMP_FRAME)) unlinkSync(TMP_FRAME);
    console.log('🧹 Temp files cleaned.');
}

run().catch(err => { console.error('❌', err.message); process.exit(1); });
