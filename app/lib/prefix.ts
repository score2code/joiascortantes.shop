// app/lib/prefix.ts
export const prefix =
  process.env.NODE_ENV === 'production' ? '/joiascortantes' : '';

export function withPrefix(url: string) {
  // não prefixa URLs absolutas (http/https ou //)
  if (/^https?:\/\//i.test(url) || url.startsWith('//')) return url;
  // garante / entre prefixo e caminho relativo
  return url.startsWith('/') ? `${prefix}${url}` : `${prefix}/${url}`;
}
