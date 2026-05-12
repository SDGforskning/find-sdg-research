export function getLocaleFromPathname(pathname) {
  if (!pathname) {
    return 'no'
  }

  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'no'
}
