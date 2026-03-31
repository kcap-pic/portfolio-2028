import reelsData from '../../public/reels-metadata.json';

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
        story = "A cinematic journey capturing the essence of urban life at dusk. The contrast between structural rigidity and fluid human motion serves as the core visual narrative, highlighted by the glowing streetlights and deep shadows.";
        behindTheScenes = "We used a custom-rigged gimbal to achieve the low-angle following shots. The biggest challenge was balancing the exposure between the intense practical lights and the fading twilight, which we solved by pushing the ISO and maintaining a wide aperture on prime lenses.";
    } else if (id === '02') {
        story = "Focusing on the quiet moments before the storm, this piece emphasizes stillness. The lack of dialogue forces the viewer to connect emotionally entirely through visual cues and subtle sound design.";
        behindTheScenes = "This was heavily inspired by minimalist cinema. We stripped down our crew to just three people and shot entirely on a 50mm lens to keep the perspective intimate and grounded. Sound was recorded purely wild, mixing atmospheric room tone with close-mic'd Foley.";
    }

    return {
        id: reel.id,
        src: reel.videoUrl,
        thumbnail: reel.thumbnailUrl,
        title: `Reel ${reel.id}`,
        description: `Portfolio Reel ${reel.id}`,
        story,
        behindTheScenes
    };
}).filter(Boolean);
