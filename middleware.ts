import { NextRequest } from 'next/server';
import { locales } from 'nextra/locales';

export async function middleware(req: NextRequest) {
  const pathIsStaticFile = req.nextUrl.pathname.startsWith('/static/');
  if (pathIsStaticFile) {
    return;
  }
  return locales(req);
}