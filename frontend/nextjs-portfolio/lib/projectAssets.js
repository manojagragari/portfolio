const projectAssets = {
  'Tesla Global Performance & Sustainability Dashboard': {
    coverImage: '/projects/tesla-dashboard/cover.png',
    imageFit: 'cover',
  },
  'Personal Learning & Notes Platform': {
    coverImage: '/projects/notes-platform/cover.png',
    imageFit: 'cover',
  },
  'Android Calculator App': {
    coverImage: '/projects/android-calculator-app/cover.png',
    imageFit: 'cover',
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

  const backendScreenshots = Array.isArray(project.screenshots) ? project.screenshots : [];
  const configScreenshots = Array.isArray(assetConfig.screenshots) ? assetConfig.screenshots : [];
  const screenshots = backendScreenshots.length > 0 ? backendScreenshots : configScreenshots;
  const backendPrimaryImage = project.cover_image || project.image || assetConfig.coverImage || null;

  return {
    ...project,
    screenshots,
    cover_image: backendPrimaryImage,
    image_fit: project.image_fit || assetConfig.imageFit || 'cover',
    image: backendPrimaryImage,
  };
}