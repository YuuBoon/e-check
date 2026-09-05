/** Missing or blank translated fields retain the source-language content.
 * Arrays are complete localized units: never combine unrelated steps by index.
 */
export function withFallback<T>(source: T, translated: unknown): T {
  if (translated == null || (typeof translated === 'string' && !translated.trim())) return source
  if (Array.isArray(source)) {
    if (!Array.isArray(translated) || !translated.length) return source
    return translated as T
  }
  if (source !== null && typeof source === 'object' && typeof translated === 'object') {
    const result = { ...source } as Record<string, unknown>
    for (const [key, value] of Object.entries(translated)) {
      result[key] = withFallback(result[key], value)
    }
    return result as T
  }
  return translated as T
}
