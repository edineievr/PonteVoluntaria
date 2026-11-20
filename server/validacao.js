// Cada função devolve a mensagem do primeiro erro encontrado, ou null se estiver tudo certo.

const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarVoluntario(dados = {}) {
  const { nome, email, telefone } = dados;
  if (typeof nome !== "string" || nome.trim() === "") return "Nome é obrigatório";
  if (nome.length > 150) return "Nome deve ter no máximo 150 caracteres";
  if (typeof email !== "string" || email.trim() === "") return "E-mail é obrigatório";
  if (!FORMATO_EMAIL.test(email)) return "E-mail inválido";
  if (email.length > 100) return "E-mail deve ter no máximo 100 caracteres";
  if (telefone && String(telefone).length > 20) return "Telefone deve ter no máximo 20 caracteres";
  return null;
}
