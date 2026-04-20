const BASE_URL = "http://localhost:8080";

export async function request(path, options = {}) {
  const res = await fetch(BASE_URL + path, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error("Erro na requisição");
  }

  return res.json();
}