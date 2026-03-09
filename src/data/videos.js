import reelsData from '../../public/reels-metadata.json';

const order = ['05', '02', '06', '01', '04', '07', '03', '08', '09', '10', '11'];

export const videosData = order.map(id => {
    const reel = reelsData.find(r => r.id === id);
    if (!reel) return null;
    return {
        id: reel.id,
        src: reel.videoUrl,
        thumbnail: reel.thumbnailUrl,
        title: `Reel ${reel.id}`,
        description: `Portfolio Reel ${reel.id}`
    };
}).filter(Boolean);
