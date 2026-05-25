import path from "path";

function normalizeToken(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function toTitleCaseWord(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toLocaleUpperCase("pt-BR") + value.slice(1).toLocaleLowerCase("pt-BR");
}

function tokenizeRepositoryName(value: string) {
  return value
    .replace(/-site$/i, "")
    .split(/[-_\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitBrandWords(value: string) {
  return value
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function resolveBrandNameFromRepository(baseBrandName: string, repositoryPath = process.cwd()) {
  const repositoryName = path.basename(repositoryPath.trim());
  const repositoryTokens = tokenizeRepositoryName(repositoryName);

  if (repositoryTokens.length === 0) {
    return baseBrandName;
  }

  const preferredWords = splitBrandWords(baseBrandName);
  const preferredByNormalized = new Map(preferredWords.map((word) => [normalizeToken(word), word]));

  return repositoryTokens
    .map((token) => {
      const preferredWord = preferredByNormalized.get(normalizeToken(token));
      return preferredWord ?? toTitleCaseWord(token);
    })
    .join(" ");
}
