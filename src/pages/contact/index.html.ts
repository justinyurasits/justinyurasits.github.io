// /contact/ moved into the Work with me page's contact panel (site/design.md, 2026-11-23).
import type { APIRoute } from 'astro';
import { redirectPage } from '../../lib/redirect';

export const GET: APIRoute = ({ site }) => redirectPage('/work-with-me/#contact', site!);
