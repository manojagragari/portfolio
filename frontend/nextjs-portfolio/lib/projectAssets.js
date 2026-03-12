const projectAssets = {
  'Android Calculator App': {
    screenshots: [
      '/projects/android-calculator-app/screenshots/01-calculator-ui.jpg',
      '/projects/android-calculator-app/screenshots/02-app-installed.jpg',
    ],
  },
  'Cricket Live & News Analytics App': {
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
    image: project.image || screenshots[0] || null,
  };
}