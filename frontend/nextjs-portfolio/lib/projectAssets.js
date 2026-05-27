const LOCAL_PROJECTS_BASE = '/projects';
const DEFAULT_PLACEHOLDER = '/projects/image-unavailable.svg';

function buildLocalPath(folder, fileName) {
  if (!folder || !fileName) {
    return null;
  }
  return `${LOCAL_PROJECTS_BASE}/${folder}/${fileName}`;
}

function normalizeAssetConfig(config = {}) {
  if (!config) {
    return { coverImage: null, screenshots: [], imageFit: 'cover' };
  }

  const imageFit = config.imageFit || 'cover';

  // New direct-file format: { folder, coverFile, screenshotFiles }
  if (config.folder) {
    const coverImage = config.coverFile
      ? buildLocalPath(config.folder, config.coverFile)
      : null;
    const screenshots = Array.isArray(config.screenshotFiles)
      ? config.screenshotFiles
        .map((fileName) => buildLocalPath(config.folder, `screenshots/${fileName}`))
        .filter(Boolean)
      : [];
    return { coverImage, screenshots, imageFit };
  }

  // Backward compatibility for existing absolute local paths.
  return {
    coverImage: config.coverImage || null,
    screenshots: Array.isArray(config.screenshots) ? config.screenshots : [],
    imageFit,
  };
}

const projectAssets = {
  'Cricket Live & News Analytics App': {
    folder: 'cricket-live-news-analytics-app',
    coverFile: 'cover.jpeg',
    imageFit: 'cover',
    screenshotFiles: [
      '01.jpeg',
      '02.jpeg',
      '03.jpeg',
      '04.jpeg',
      '05.jpeg',
      '06.jpeg',
      '07.jpeg',
    ],
  },
  'Android Calculator App': {
    folder: 'android-calculator-app',
    coverFile: 'cover.png',
    imageFit: 'cover',
    screenshotFiles: [
      '01-calculator-ui.jpg',
      '02-app-installed.jpg',
    ],
  },
  'Campus Feedback App': {
    folder: 'campus-feedback-app',
    coverFile: 'cover.jpg',
    imageFit: 'cover',
    screenshotFiles: [
      '01.jpg',
      '02.jpg',
      '03.jpg',
      '04.jpg',
      '05.jpg',
      '06.jpg',
      '07.jpg',
      '08.jpg',
    ],
  },
  'MediConnect24-7': {
    folder: 'mediconnect24-7',
    coverFile: 'cover.svg',
    imageFit: 'cover',
    screenshotFiles: [],
  },
  'Tesla Global Performance & Sustainability Dashboard': {
    folder: 'tesla-dashboard',
    coverFile: 'cover.jpg',
    imageFit: 'cover',
    screenshotFiles: [
      '01.jpg',
      '02.jpg',
      '03.jpg',
      '04.jpg',
      '05.jpg',
      '06.jpg',
      '07.jpg',
    ],
  },
  'Personal Learning & Notes Platform': {
    folder: 'notes-platform',
    coverFile: 'cover.jpg',
    imageFit: 'cover',
    screenshotFiles: [
      '01.png',
      '02.png',
      '03.png',
      '04.png',
      '05.png',
      '06.png',
      '07.png',
      '08.png',
      '09.png',
      '10.png',
      '11.png',
      '12.png',
      '13.png',
      '14.png',
    ],
  },
  'Electro Shop Management System': {
    folder: 'electro-shop',
    coverFile: 'cover.jpg',
    imageFit: 'cover',
    screenshotFiles: [
      '01.png',
      '02.png',
      '03.png',
      '04.png',
      '05.png',
      '06.png',
      '07.png',
      '08.png',
      '09.png',
      '10.png',
    ],
  },
  'Job Portal & Internship Portal': {
    folder: 'job-portal-internship',
    coverFile: 'cover.jpeg',
    imageFit: 'cover',
    screenshotFiles: [
      '01.png',
      '02.png',
      '03.png',
      '04.png',
      '05.png',
      '06.png',
    ],
  },
  'Tesla Vehicle Deliveries – Predictive Analytics & Machine Learning Dashboard': {
    folder: 'tesla-vehicle-deliveries',
    coverFile: 'cover.jpg',
    imageFit: 'cover',
    screenshotFiles: [
      '01.jpg',
      '02.png',
      '03.png',
      '04.png',
      '05.png',
      '06.png',
      '07.png',
      '08.png',
      '09.png',
      '10.png',
      '11.png',
      '12.png',
      '13.png',
    ],
  },
  'International Tourism Data Visualization': {
    folder: 'international-tourism-data-visualization',
    coverFile: 'cover.jpg',
    imageFit: 'cover',
    screenshotFiles: [
      '01.jpg',
      '02.jpg',
      '03.jpg',
      '04.jpg',
      '05.jpg',
      '06.jpg',
      '07.jpg',
    ],
  },
  'Tourism Data Dashboard in Excel': {
    folder: 'tourism-data-dashboard-excel',
    coverFile: 'cover.png',
    imageFit: 'cover',
    screenshotFiles: [
      '01.jpg',
      '02.jpg',
      '03.jpg',
      '04.jpg',
      '05.jpg',
      '06.jpg',
      '07.jpg',
    ],
  },
  'Online Exam Interface (Frontend)': {
    folder: 'online-exam-interface',
    coverFile: 'cover.jpeg',
    imageFit: 'cover',
    screenshotFiles: [
      '01.png',
      '02.png',
      '03.png',
      '04.png',
      '05.png',
      '06.png',
      '07.png',
      '08.png',
      '09.png',
      '10.png',
    ],
  },
  'Secure File Management System (CSE316)': {
    folder: 'secure-file-management',
    coverFile: 'cover.jpeg',
    imageFit: 'cover',
    screenshotFiles: [
      '01.png',
      '02.png',
      '03.png',
      '04.png',
      '05.png',
      '06.png',
      '07.png',
      '08.png',
      '09.png',
      '10.png',
      '11.png',
      '12.png',
      '13.png',
    ],
  },
};

function normalizeTitleKey(title) {
  if (!title || typeof title !== 'string') {
    return '';
  }

  return title
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const projectAssetAliases = {
  'tesla vehicle deliveries predictive analytics machine learning dashboard':
    'Tesla Vehicle Deliveries – Predictive Analytics & Machine Learning Dashboard',
};

const normalizedProjectAssetKeyMap = Object.keys(projectAssets).reduce((acc, key) => {
  acc[normalizeTitleKey(key)] = key;
  return acc;
}, {});

function resolveProjectAssetConfig(title) {
  const direct = projectAssets[title];
  if (direct) {
    return direct;
  }

  const normalizedTitle = normalizeTitleKey(title);
  const aliasKey = projectAssetAliases[normalizedTitle];
  if (aliasKey && projectAssets[aliasKey]) {
    return projectAssets[aliasKey];
  }

  const normalizedKey = normalizedProjectAssetKeyMap[normalizedTitle];
  if (normalizedKey && projectAssets[normalizedKey]) {
    return projectAssets[normalizedKey];
  }

  return null;
}

export function enrichProjectAssets(project) {
  const assetConfig = normalizeAssetConfig(resolveProjectAssetConfig(project.title));
  const existingScreenshots = Array.isArray(project.screenshots) ? project.screenshots : [];
  const screenshots = assetConfig.screenshots.length > 0 ? assetConfig.screenshots : existingScreenshots;
  const primaryImage = assetConfig.coverImage || project.cover_image || project.image || DEFAULT_PLACEHOLDER;

  return {
    ...project,
    screenshots,
    cover_image: primaryImage,
    image_fit: assetConfig.imageFit || project.image_fit || 'cover',
    image: primaryImage,
  };
}