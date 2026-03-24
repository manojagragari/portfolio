import axios from 'axios';
import {
  projects as staticProjects,
  skills as staticSkills,
  certifications as staticCertifications,
  achievements as staticAchievements,
  hobbies as staticHobbies,
  education as staticEducation,
  contact as staticContact,
} from './data';
import { enrichProjectAssets } from './projectAssets';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

const PROJECTS_CACHE_TTL_MS = 5 * 60 * 1000;
let cachedProjects = null;
let cachedProjectsAt = 0;
let projectsRequestPromise = null;

function normalizeTextKey(value) {
  if (!value || typeof value !== 'string') {
    return '';
  }
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

const certificationTitleAliases = {
  'master generative ai': 'master generative ai generative ai tools',
  'c with oops': 'c with oops programming language',
};

const staticCertificationMap = staticCertifications.reduce((acc, cert) => {
  const key = normalizeTextKey(cert.title);
  if (key) {
    acc[key] = cert;
  }
  return acc;
}, {});

const staticAchievementMap = staticAchievements.reduce((acc, achievement) => {
  const key = normalizeTextKey(achievement.title);
  if (key) {
    acc[key] = achievement;
  }
  return acc;
}, {});

const achievementTitleAliases = {
  'top 5 university hackathon': 'top 5 university hackathon',
  'working prototype in 24 hours': 'working prototype in 24 hours',
};

function resolveMediaUrl(url) {
  if (!url || typeof url !== 'string') {
    return url;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/')) {
    return `${API_BASE}${url}`;
  }
  return `${API_BASE}/${url}`;
}

function normalizeProject(project) {
  const galleryImages = Array.isArray(project.gallery_images)
    ? project.gallery_images.map((img) => ({ ...img, image: resolveMediaUrl(img.image) }))
    : [];

  return {
    ...project,
    image: resolveMediaUrl(project.image),
    gallery_images: galleryImages,
    screenshots: galleryImages.map((img) => img.image).filter(Boolean),
  };
}

function normalizeCertification(cert) {
  return {
    ...cert,
    cover_image: resolveMediaUrl(cert.cover_image),
    cert_image: resolveMediaUrl(cert.cert_image),
  };
}

function enrichCertification(cert) {
  const normalized = normalizeCertification(cert);
  const rawKey = normalizeTextKey(cert.title);
  const aliasKey = certificationTitleAliases[rawKey];
  let fallback = staticCertificationMap[rawKey] || (aliasKey ? staticCertificationMap[aliasKey] : null);

  if (!fallback && rawKey.includes('c with oops')) {
    fallback = staticCertifications.find((item) => normalizeTextKey(item.title).includes('c with oops')) || null;
  }

  if (!fallback) {
    return normalized;
  }

  return {
    ...normalized,
    // Prefer stable static assets when available; API values are kept as fallback.
    cover_image: fallback.cover_image || normalized.cover_image,
    cert_image: fallback.cert_image || normalized.cert_image,
    url: normalized.url || fallback.url,
  };
}

function normalizeAchievement(item) {
  const supportiveImages = Array.isArray(item.supportive_images)
    ? item.supportive_images.map((imageUrl) => resolveMediaUrl(imageUrl))
    : [];

  return {
    ...item,
    cover_image: resolveMediaUrl(item.cover_image),
    supportive_images: supportiveImages,
  };
}

function enrichAchievement(item) {
  const normalized = normalizeAchievement(item);
  const key = normalizeTextKey(item.title);
  const aliasKey = achievementTitleAliases[key];
  let fallback = staticAchievementMap[key] || (aliasKey ? staticAchievementMap[aliasKey] : null);

  if (!fallback) {
    fallback = staticAchievements.find((achievement) => {
      const staticKey = normalizeTextKey(achievement.title);
      return staticKey && (key.includes(staticKey) || staticKey.includes(key));
    }) || null;
  }

  if (!fallback) {
    return normalized;
  }

  return {
    ...normalized,
    cover_image: fallback.cover_image || normalized.cover_image,
    supportive_images: Array.isArray(fallback.supportive_images) && fallback.supportive_images.length
      ? fallback.supportive_images
      : normalized.supportive_images,
    reference_url: normalized.reference_url || fallback.reference_url,
  };
}

function normalizeProfile(profile) {
  if (!profile) {
    return profile;
  }
  return {
    ...profile,
    profile_image: resolveMediaUrl(profile.profile_image),
    cover_banner: resolveMediaUrl(profile.cover_banner),
  };
}

async function safeFetch(apiFn, fallback) {
  const delays = [600, 1400, 2600];
  for (let attempt = 0; attempt <= delays.length; attempt += 1) {
    try {
      const result = await apiFn();
      return result;
    } catch {
      if (attempt === delays.length) {
        return fallback;
      }
      await new Promise((resolve) => {
        setTimeout(resolve, delays[attempt]);
      });
    }
  }

  return fallback;
}

function normalizeCategory(value) {
  if (!value || typeof value !== 'string') {
    return '';
  }
  return value.toLowerCase().trim();
}

function filterProjectsByCategory(projectList, category) {
  if (!category) {
    return projectList;
  }

  const wantedCategory = normalizeCategory(category);
  return projectList.filter((project) => normalizeCategory(project.category) === wantedCategory);
}

function sortProjects(projectList) {
  return [...projectList].sort((a, b) => {
    const orderA = Number.isFinite(a?.order) ? a.order : Number.MAX_SAFE_INTEGER;
    const orderB = Number.isFinite(b?.order) ? b.order : Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return String(a?.title || '').localeCompare(String(b?.title || ''));
  });
}

function getStaticProjects(category = null) {
  const groupedProjects = staticProjects && typeof staticProjects === 'object'
    ? Object.values(staticProjects)
    : [];

  const flattenedProjects = groupedProjects.flatMap((group) => (Array.isArray(group) ? group : []));
  const filteredProjects = filterProjectsByCategory(flattenedProjects, category);

  return sortProjects(filteredProjects).map(enrichProjectAssets);
}

async function fetchAllProjectsFromApi() {
  const now = Date.now();

  if (cachedProjects && (now - cachedProjectsAt) < PROJECTS_CACHE_TTL_MS) {
    return cachedProjects;
  }

  if (projectsRequestPromise) {
    return projectsRequestPromise;
  }

  projectsRequestPromise = apiClient
    .get('/api/projects/')
    .then(({ data }) => {
      const normalizedProjects = Array.isArray(data)
        ? data.map(normalizeProject).map(enrichProjectAssets)
        : [];

      cachedProjects = sortProjects(normalizedProjects);
      cachedProjectsAt = Date.now();
      return cachedProjects;
    })
    .finally(() => {
      projectsRequestPromise = null;
    });

  return projectsRequestPromise;
}

export async function getProjects(category = null) {
  return safeFetch(async () => {
    const allProjects = await fetchAllProjectsFromApi();
    return filterProjectsByCategory(allProjects, category);
  }, getStaticProjects(category));
}

export async function getSkills() {
  return safeFetch(async () => {
    const { data } = await apiClient.get('/api/skills/');
    return data;
  }, staticSkills);
}

export async function getCertifications() {
  return safeFetch(async () => {
    const { data } = await apiClient.get('/api/certifications/');
    return data.map(enrichCertification);
  }, staticCertifications);
}

export async function getAchievements() {
  return safeFetch(async () => {
    const { data } = await apiClient.get('/api/achievements/');
    return data.map(enrichAchievement);
  }, staticAchievements);
}

export async function getHobbies() {
  return safeFetch(async () => {
    const { data } = await apiClient.get('/api/hobbies/');
    return data;
  }, staticHobbies);
}

export async function getEducation() {
  return safeFetch(async () => {
    const { data } = await apiClient.get('/api/education/');
    return data;
  }, staticEducation);
}

export async function getContactMethods() {
  return safeFetch(async () => {
    const { data } = await apiClient.get('/api/contact/');
    return data;
  }, staticContact);
}

export async function getProfile() {
  return safeFetch(async () => {
    const { data } = await apiClient.get('/api/profile/');
    return normalizeProfile(data);
  }, null);
}

export async function submitContactMessage(payload) {
  const { data } = await apiClient.post('/api/contact-messages/', payload);
  return data;
}

export async function getGitHubRepos(username = 'manojagragari') {
  return safeFetch(async () => {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      { timeout: 5000 }
    );
    return data;
  }, []);
}
