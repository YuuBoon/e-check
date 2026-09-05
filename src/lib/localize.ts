/** Missing or blank translated fields retain the source-language content.
 * Structured arrays (steps, results, images) retain source order and fields.
 */
export function withFallback<T>(source: T, translated: unknown): T {
  if (translated == null || (typeof translated === 'string' && !translated.trim())) return source
  if (Array.isArray(source)) {
    if (!Array.isArray(translated) || !translated.length) return source
    if (source.some((item) => item !== null && typeof item === 'object')) {
      return source.map((item, index) => withFallback(item, translated[index])) as T
    }
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
