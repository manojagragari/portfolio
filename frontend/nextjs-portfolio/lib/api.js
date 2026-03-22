import axios from 'axios';
import {
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

function normalizeAchievement(item) {
  return {
    ...item,
    cover_image: resolveMediaUrl(item.cover_image),
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
  try {
    const result = await apiFn();
    return result;
  } catch {
    return fallback;
  }
}

export async function getProjects(category = null) {
  return safeFetch(async () => {
    const params = category ? { category } : {};
    const { data } = await apiClient.get('/api/projects/', { params });
    return data.map(normalizeProject).map(enrichProjectAssets);
  }, []);
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
    return data.map(normalizeCertification);
  }, staticCertifications);
}

export async function getAchievements() {
  return safeFetch(async () => {
    const { data } = await apiClient.get('/api/achievements/');
    return data.map(normalizeAchievement);
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

export async function getGitHubRepos(username = 'manojagragari') {
  return safeFetch(async () => {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      { timeout: 5000 }
    );
    return data;
  }, []);
}
