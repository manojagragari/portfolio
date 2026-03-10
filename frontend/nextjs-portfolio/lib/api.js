import axios from 'axios';
import {
  projects as staticProjects,
  skills as staticSkills,
  certifications as staticCertifications,
  achievements as staticAchievements,
  hobbies as staticHobbies,
} from './data';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

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
    return data;
  }, category ? (staticProjects[category] || []) : Object.values(staticProjects).flat());
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
    return data;
  }, staticCertifications);
}

export async function getAchievements() {
  return safeFetch(async () => {
    const { data } = await apiClient.get('/api/achievements/');
    return data;
  }, staticAchievements);
}

export async function getHobbies() {
  return safeFetch(async () => {
    const { data } = await apiClient.get('/api/hobbies/');
    return data;
  }, staticHobbies);
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
