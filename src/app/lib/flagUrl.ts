// Flag URL helper — returns a local override for states with updated flags,
// falls back to the CDN for all others.
const LOCAL_FLAG_OVERRIDES: Record<string, string> = {
  MS: '/flags/ms.png', // Mississippi adopted new magnolia flag in 2021
};

export function getFlagUrl(abbreviation: string): string {
  const upper = abbreviation.toUpperCase();
  if (LOCAL_FLAG_OVERRIDES[upper]) return LOCAL_FLAG_OVERRIDES[upper];
  return `https://cdn.jsdelivr.net/gh/hayleox/flags@master/svg/us/${abbreviation.toLowerCase()}.svg`;
}
