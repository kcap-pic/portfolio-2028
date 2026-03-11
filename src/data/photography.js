// We statically analyze the public directory using import.meta.glob during Vite's build step.
// We only need the file path keys (e.g. `/public/Sports/Baseball/IMG_1.jpg`),
// which we map to public-relative paths (e.g. `Sports/Baseball/IMG_1.jpg`) for serving.
const imagesRaw = import.meta.glob('/public/**/*.{jpg,jpeg,png,webp}');

// Pre-compute a set of all webp files to easily check for optimized duplicates
const webpFiles = new Set(Object.keys(imagesRaw).filter(p => p.toLowerCase().endsWith('.webp')));

// Define our top-level categories metadata and their intended order
const categoryMetadata = {
    "Sports": { id: "sports", title: "Sports", subtitle: "Action & Emotion" },
    "Events": { id: "events", title: "Events", subtitle: "Capturing the moment" },
    "Outdoors": { id: "outdoors", title: "Outdoors", subtitle: "Nature & Light" },
    "Portrait": { id: "portrait", title: "Portrait", subtitle: "Faces & Stories" }
};

// Data structure to hold parsed hierarchy
const rawData = {};

Object.keys(imagesRaw).forEach(assetPath => {
    // Deduplication: If this is a jpg/png, and a optimized webp exists, skip the raw file
    if (/\.(jpg|jpeg|png)$/i.test(assetPath)) {
        const webpPath = assetPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        if (webpFiles.has(webpPath)) {
            return; // Skip this file, we will render the webp version instead
        }
    }

    // Strip "/public/" from the key to get the public-relative path, e.g. "Sports/Baseball/IMG_1.webp"
    const cleanedPath = assetPath.replace('/public/', '');
    const pathParts = cleanedPath.split('/');

    // If it's a root-level file like vite.svg or a standalone cover, ignore it here
    if (pathParts.length < 2) return;

    const categoryFolder = pathParts[0]; // "Sports", "Events"

    // Only process folders that match our known categories. (Ignore unexpected folders)
    if (!categoryMetadata[categoryFolder]) return;

    if (!rawData[categoryFolder]) {
        rawData[categoryFolder] = {
            metadata: categoryMetadata[categoryFolder],
            cover: null, // Will try to find "Cover.jpg" or take the first image
            subcategories: {} // e.g., "Baseball", "Root" (for files directly in category)
        };
    }

    const catData = rawData[categoryFolder];

    // If it's directly inside the category folder (e.g. /public/Events/IMG_1.jpg)
    if (pathParts.length === 2) {
        const fileName = pathParts[1].toLowerCase();

        // Define Cover image (prioritize files named cover)
        if (fileName.includes('cover')) {
            catData.cover = cleanedPath;
            return; // Covers usually aren't kept in the gallery list to avoid duplicates
        }

        if (!catData.subcategories['']) catData.subcategories[''] = [];
        catData.subcategories[''].push(cleanedPath);
    }
    // If it's inside a sub-folder (e.g. /public/Sports/Baseball/IMG_1.jpg)
    else if (pathParts.length >= 3) {
        const subCatName = pathParts[1]; // "Baseball"
        if (!catData.subcategories[subCatName]) {
            catData.subcategories[subCatName] = [];
        }
        catData.subcategories[subCatName].push(cleanedPath);
    }
});

// Transform the parsed data map into the exact nested Array shape the UI expects
export const photographyCategories = Object.keys(categoryMetadata)
    .filter(catName => rawData[catName]) // Only output categories that actually have files
    .map(catName => {
        const data = rawData[catName];

        // Convert the subcategories object into the `rows` array format
        const rows = Object.entries(data.subcategories)
            .filter(([_, photos]) => photos.length > 0)
            .map(([title, photos]) => {
                // Sort photos alphabetically so they are predictable
                const sortedPhotos = photos.sort();
                return { title, photos: sortedPhotos };
            });

        // Determine a cover image: If no explicit 'Cover.jpg' was found, use the very first photo available
        let coverImg = data.cover;
        if (!coverImg && rows.length > 0 && rows[0].photos.length > 0) {
            coverImg = rows[0].photos[0];
        }

        return {
            id: data.metadata.id,
            title: data.metadata.title,
            subtitle: data.metadata.subtitle,
            cover: coverImg,
            rows: rows
        };
    });
