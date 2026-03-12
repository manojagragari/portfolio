const projectAssets = {
  'Tesla Global Performance & Sustainability Dashboard': {
    coverImage: '/projects/tesla-dashboard/cover.png',
    imageFit: 'cover',
  },
  'Personal Learning & Notes Platform': {
    coverImage: '/projects/notes-platform/cover.png',
    imageFit: 'contain',
  },
  'Android Calculator App': {
    coverImage: '/projects/android-calculator-app/cover.png',
    imageFit: 'contain',
    screenshots: [
      '/projects/android-calculator-app/screenshots/01-calculator-ui.jpg',
      '/projects/android-calculator-app/screenshots/02-app-installed.jpg',
    ],
  },
  'Cricket Live & News Analytics App': {
    coverImage: '/projects/cricket-live-news-analytics-app/cover.png',
    imageFit: 'cover',
    screenshots: [
      '/projects/cricket-live-news-analytics-app/screenshots/01-home.jpg',
      '/projects/cricket-live-news-analytics-app/screenshots/02-teams.jpg',
      '/projects/cricket-live-news-analytics-app/screenshots/03-live-matches-1.jpg',
      '/projects/cricket-live-news-analytics-app/screenshots/04-live-matches-2.jpg',
      '/projects/cricket-live-news-analytics-app/screenshots/05-news-1.jpg',
      '/projects/cricket-live-news-analytics-app/screenshots/06-news-2.jpg',
      '/projects/cricket-live-news-analytics-app/screenshots/07-news-3.jpg',
    ],
  },
};

export function enrichProjectAssets(project) {
  const assetConfig = projectAssets[project.title];
  if (!assetConfig) {
    return project;
  }

  const screenshots = assetConfig.screenshots || [];
  return {
    ...project,
    screenshots,
    cover_image: assetConfig.coverImage || null,
    image_fit: assetConfig.imageFit || 'cover',
    image: project.image || assetConfig.coverImage || screenshots[0] || null,
  };
}