export async function fetcher(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Erro HTTP: ${res.status}`);
  }

  try {
    return await res.json();
  } catch {
    throw new Error("Inválido");
  }
}
