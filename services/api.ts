const API_BASE_URL = "https://randomuser.me/api/";

export async function fetchRandomUser() {
  try {
    const response = await fetch(`${API_BASE_URL}?results=1`);
    if (!response.ok) throw new Error("Erro ao buscar usuário");
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
}

export async function fetchRandomUsers(count: number = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}?results=${count}`);
    if (!response.ok) throw new Error("Erro ao buscar usuários");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
}
