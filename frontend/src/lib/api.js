const DEFAULT_API_BASE_URL = "/api";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/$/, "");

async function requestJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let message = `API request failed with status ${response.status}`;

    try {
      const errorBody = await response.json();

      message =
        errorBody?.message || errorBody?.detail || errorBody?.error || message;
    } catch {
      try {
        const text = await response.text();
        if (text) {
          message = text;
        }
      } catch {
        // Ignore parsing failures and keep the default message.
      }
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function fetchProjects(limit = 6) {
  const response = await requestJson(`/projects?size=${limit}`);
  return response?.content ?? [];
}

export async function fetchBlogPosts(limit = 3) {
  const response = await requestJson(`/blogs?size=${limit}`);
  return response?.content ?? [];
}

export async function fetchBlogPost(slug) {
  return requestJson(`/blogs/${slug}`);
}

export async function sendContactMessage(payload) {
  return requestJson("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function formatDateTR(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
