// Redirect pages for the old /products/*.html addresses (JYC-CAP-09).
import type { APIRoute, GetStaticPaths } from 'astro';
import { movingAddresses } from '../../lib/old-addresses';
import { redirectPage } from '../../lib/redirect';

export const getStaticPaths: GetStaticPaths = async () =>
  (await movingAddresses())
    .filter((a) => a.from.startsWith('/products/'))
    .map((a) => ({ params: { old: a.from.slice('/products/'.length, -'.html'.length) }, props: { to: a.to } }));

export const GET: APIRoute = ({ props, site }) => redirectPage(props.to, site!);
