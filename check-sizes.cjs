const fs = require('fs');
const { execSync } = require('child_process');
const dir = './public/thumbnails/';
fs.readdirSync(dir).forEach(f => {
    if (f.endsWith('.webp')) {
        try {
            const out = execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ${dir}${f}`).toString().trim();
            console.log(f, out);
        } catch (e) { }
    }
});
