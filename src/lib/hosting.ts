export const staticHosting = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

export function assetPath(path: string): string {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return prefix && !path.startsWith(`${prefix}/`) ? `${prefix}${path}` : path;
}
