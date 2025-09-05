#!/usr/bin/env bash
set -euo pipefail

# normalize_images.sh
# Renomeia/converte imagens dentro das pastas 001..041 para o padrão:
#   001.webp, 002.webp, 003.webp, 004.webp
# - Aceita fontes: .webp .jpg .jpeg .png .heic (case-insensitive)
# - Converte para WebP com cwebp (qualidade 80, mantém EXIF) quando necessário
# - Evita sobrescrever: faz backup .bak se o alvo já existir
# - DRY RUN: defina DRY_RUN=1 para apenas mostrar o que faria
# - Uso:  ./normalize_images.sh [PASTA_RAIZ]
#
# Requisitos:
#   - cwebp (brew install webp) 
#   - (opcional) imagemagick+libheif se planeja converter HEIC -> JPEG -> WebP antes (não é obrigatório aqui)
#
# Exemplo:
#   DRY_RUN=1 ./normalize_images.sh               # simula na pasta atual
#   ./normalize_images.sh /caminho/para/imagens   # executa de fato

ROOT="${1:-.}"
START=1
END=41

dry_run() {
  if [[ "${DRY_RUN:-0}" == "1" ]]; then
    echo "[DRY] $*"
  else
    eval "$@"
  fi
}

has_cmd() { command -v "$1" >/dev/null 2>&1; }

if ! has_cmd cwebp; then
  echo "Erro: cwebp não encontrado. Instale com: brew install webp (macOS) ou sudo apt-get install webp (Linux)" >&2
  exit 1
fi

# Normaliza extensão para minúsculo
lower_ext() {
  local f="$1"
  echo "${f##*.}" | tr '[:upper:]' '[:lower:]'
}

pad3() {
  printf "%03d" "$1"
}

for n in $(seq $START $END); do
  folder="$(pad3 "$n")"
  dir="$ROOT/$folder"
  if [[ ! -d "$dir" ]]; then
    echo "↪️  Pasta não encontrada, pulando: $dir"
    continue
  fi

  echo "📂 Pasta: $dir"

  # Se já existe o conjunto final, pula
  if [[ -f "$dir/001.webp" && -f "$dir/002.webp" && -f "$dir/003.webp" && -f "$dir/004.webp" ]]; then
    echo "   ✅ Já normalizada (001.webp..004.webp). Pulando."
    continue
  fi

  # Coleta candidatos (apenas nível atual da pasta)
  # Usamos globbing com nullglob seguro para zsh/bash
  shopt -s nullglob 2>/dev/null || true
  candidates=( "$dir"/*.[Ww][Ee][Bb][Pp] "$dir"/*.[Jj][Pp][Gg] "$dir"/*.[Jj][Pp][Ee][Gg] "$dir"/*.[Pp][Nn][Gg] "$dir"/*.[Hh][Ee][Ii][Cc] )
  shopt -u nullglob 2>/dev/null || true

  # Ordena alfabeticamente para consistência
  IFS=$'\n' candidates=( $(printf "%s\n" "${candidates[@]}" | LC_ALL=C sort) )
  unset IFS

  # Remove arquivos já normalizados da lista, se existirem parcialmente
  tmp=()
  for f in "${candidates[@]}"; do
    base="$(basename "$f")"
    case "$base" in
      001.webp|002.webp|003.webp|004.webp) ;;
      *) tmp+=( "$f" );;
    esac
  done
  candidates=( "${tmp[@]}" )

  count=${#candidates[@]}
  if (( count < 4 )); then
    echo "   ⚠️  Encontrados $count candidatos (precisa de ao menos 4). Pulando."
    continue
  fi

  # Seleciona os 4 primeiros candidatos
  targets=( "001.webp" "002.webp" "003.webp" "004.webp" )

  for i in {0..3}; do
    src="${candidates[$i]}"
    tgt="$dir/${targets[$i]}"

    # backup se alvo existe
    if [[ -f "$tgt" ]]; then
      dry_run "mv -f \"$tgt\" \"$tgt.bak\""
    fi

    ext="$(lower_ext "$src")"
    if [[ "$ext" == "webp" ]]; then
      if [[ "$src" != "$tgt" ]]; then
        dry_run "cp -f \"$src\" \"$tgt\""
      else
        echo "   • Já está no nome alvo: $(basename "$tgt")"
      fi
    else
      # converte para webp
      dry_run "cwebp -q 80 -metadata exif \"$src\" -o \"$tgt\" >/dev/null"
    fi

    echo "   → $(basename "$src")  ⇒  $(basename "$tgt")"
  done

  echo "   ✅ Pasta normalizada.\n"
done

echo "🏁 Concluído."
