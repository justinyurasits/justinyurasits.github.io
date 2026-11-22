// The facts register: the one source for claims about Justin and his products
// (credentials, employers, roles, product status, product metrics). Product spec §5.
// Plain JavaScript so the build and the check scripts read the same schema.
import { readFileSync } from 'node:fs';
import { z } from 'astro/zod';

export const MATURITY = ['live', 'beta', 'prototype', 'experiment', 'in-development'];
export const DEMO = ['public', 'on-request', 'none'];

const status = {
  maturity: z.enum(MATURITY, { error: `maturity must be one of: ${MATURITY.join(', ')}` }),
  demo: z.enum(DEMO, { error: `demo must be one of: ${DEMO.join(', ')}` }),
};

const metric = z.object({
  key: z.string().min(1),
  task: z.string().min(1),
  before: z.string().min(1),
  after: z.string().min(1),
  // Required by §5. A missing basis is reported by the facts check: a warning through M0
  // and M1, a build failure from the M2.8 launch checks. So the schema leaves it optional.
  basis: z.string().min(1).optional(),
});

const product = z.union([
  z.object({ name: z.string().min(1), ...status, demoUrl: z.url().optional() }).strict(),
  z.object({ name: z.string().min(1), statusFrom: z.literal('workflows') }).strict(),
]);

const workflow = z.object({
  name: z.string().min(1),
  product: z.string().min(1),
  ...status,
  demoUrl: z.url().optional(),
}).strict().refine((w) => w.demo !== 'public' || !!w.demoUrl, {
  message: 'demoUrl is required when demo is "public"',
});

const fee = z.object({ duration: z.string(), fee: z.string() });

export const registerSchema = z.object({
  about: z.record(z.string(), z.string()),
  usage: z.string(),
  library: z.record(z.string(), z.union([z.string(), z.number()])),
  metrics: z.array(metric),
  products: z.record(z.string(), product),
  workflows: z.record(z.string(), workflow),
  // Justin's fees and service pricing. Never shown on a page (§5, no fees).
  fees: z.object({ pageFacing: z.literal(false) }).catchall(fee),
  banned: z.array(z.string()),
}).strict().superRefine((r, ctx) => {
  for (const [key, w] of Object.entries(r.workflows)) {
    if (!(w.product in r.products)) {
      ctx.addIssue({ code: 'custom', path: ['workflows', key, 'product'], message: `unknown product "${w.product}"` });
    }
  }
});

export function parseRegister(data) {
  const r = registerSchema.safeParse(data);
  if (!r.success) {
    const lines = r.error.issues.map((i) => `  content/facts.json → ${i.path.join('.')}: ${i.message}`);
    throw new Error(`The facts register doesn't match its schema:\n${lines.join('\n')}`);
  }
  return r.data;
}

export function loadRegister(path = new URL('../../content/facts.json', import.meta.url)) {
  return parseRegister(JSON.parse(readFileSync(path, 'utf8')));
}

// The fees, as strings, for the no-fees check.
export function feeValues(register) {
  return Object.entries(register.fees)
    .filter(([k]) => k !== 'pageFacing')
    .map(([, f]) => f.fee);
}

// A product's maturity and demo; for a product whose status comes from its workflows,
// the list of its workflows' values (spec §5 mapping).
export function productStatus(register, key) {
  const p = register.products[key];
  if ('statusFrom' in p) {
    return Object.entries(register.workflows)
      .filter(([, w]) => w.product === key)
      .map(([k, w]) => ({ key: k, name: w.name, maturity: w.maturity, demo: w.demo, demoUrl: w.demoUrl }));
  }
  return [{ key, name: p.name, maturity: p.maturity, demo: p.demo, demoUrl: p.demoUrl }];
}
