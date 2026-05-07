export { middleware as proxy } from 'nextra/locales'

export const config = {
  // Ignore API, Next internals and all static files (anything with an extension)
  matcher: [
    '/((?!api|_next/static|_next/image|_pagefind|.*\\..*).*)'
  ]
}