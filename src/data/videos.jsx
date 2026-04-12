import reelsData from './reels-metadata.json';

const order = ['05', '02', '06', '01', '04', '07', '03', '08', '09', '13', '11', '12', '10'];

export const videosData = order.map(id => {
    const reel = reelsData.find(r => r.id === id);
    if (!reel) return null;

    // Default placeholder text
    let story = "This video explores visual storytelling through dynamic composition and rhythmic editing. A study in motion and atmosphere.";
    let behindTheScenes = "Shot on location over two days, focusing on natural light and fast-paced tracking shots to capture raw energy.";

    // Specific text for the first few videos to showcase the design
    if (id === '13') {
        story = "A vibrant celebration of love and connection. We focused on warm color grading and intimate close-ups to capture genuine, unscripted emotions.";
        behindTheScenes = "Lighting was entirely practical, utilizing natural golden hour sun and soft diffusion to give the subjects a natural glow. All camera movements were smooth and dreamlike.";
    } else if (id === '05') {
        story = (
            <>
                Right after returning for my sophomore year, I was covering the "Week of Welcome" for The Hawkeye. The event was incredibly dark, and while the built-in flash on my Canon Rebel T7 was working, the photos were starting to look repetitive and "flashy." I realized that <strong>standard flash photography wasn't capturing the actual energy</strong> of the night.
            </>
        );
        behindTheScenes = (
            <>
                To compensate for the low light, I decided to experiment with <strong>slow shutter speeds</strong>. It was a challenge at first to get the timing and the motion right, but after a few attempts, it finally started clicking and I started getting these light motion.
                <br /><br />
                Since I had all these dynamic photos, I didn't want to just upload them as a basic gallery. I turned the photos into a <strong>high-energy reel</strong>, editing the shots with a trending TikTok sound.
            </>
        );
    } else if (id === '02') {
        story = (
            <>
                It was one of those slow, rainy summer days. My friend and I went out for <i>chai</i>, but later decided to make our own. I was just starting to learn <strong>Premiere Pro</strong> and wanted something to work with, so I decided to shoot with a <strong>14-year-old Canon Rebel T3i</strong> and a kit lens.
            </>
        );
        behindTheScenes = (
            <>
                I began by shooting the <i>chai</i>-making from a single, steady angle in the kitchen. Once the <i>chai</i> was ready, we moved to our backyard. I captured several different angles of us enjoying the tea, focusing on the <strong>atmosphere of the rainy afternoon</strong>.
                <br /><br />
                In the edit, I stitched these scenes together to create a small story. This project taught me a little <strong>sound design</strong>. I experimented with <strong>reverbing the music</strong> to create a more ambient feeling during transitions and how music can appeal to the emotion in a video.
            </>
        );
    } else if (id === '07') {
        story = (
            <>
                I’ve been fond of <strong>building PCs</strong> since I was a kid when my parents bought me my first custom build. After that PC served its time, they gave me this laptop. I used it for <strong>three years</strong>, and it was finally time for an <strong>upgrade</strong>.
            </>
        );
        behindTheScenes = (
            <>
                This was my <strong>very first project in Premiere Pro</strong>. I wanted to shoot multiple angles but didn’t have a tripod, so I placed my phone on a <strong>ceiling fan blade</strong> and balanced it with a <strong>shampoo bottle</strong> on the other blade to counter the rotation.
                <br /><br />
                Later in the edit, I realized there was a trend where people danced with phones glued to the ceiling or fans. I <strong>leaned into that style</strong>, syncing the upgrade to the trend and creating my first video in Premiere Pro.
            </>
        );
    }

    return {
        id: reel.id,
        src: reel.videoUrl,
        thumbnail: reel.thumbnailUrl,
        title: id === '05' ? "Week of Welcome: Slow Shutter at Silent Disco" : id === '02' ? "Unplanned Chai" : id === '07' ? "Laptop Upgrade" : `Reel ${reel.id}`,
        description: `Portfolio Reel ${reel.id}`,
        story,
        behindTheScenes
    };
}).filter(Boolean);
