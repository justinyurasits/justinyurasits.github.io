// Content schemas. The build fails, naming the file and the field, when a required field
// is missing or invalid (JYC-CAP-02, JYC-CAP-04, JYC-CAP-05, JYC-CAP-07).
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const CATEGORIES = ['Enterprise AI & Product Leadership', 'AI for Construction'] as const;
export const ROLES = ['built', 'led', 'both'] as const;
export const MATURITY = ['live', 'beta', 'prototype', 'experiment', 'in-development'] as const;
export const DEMO = ['public', 'on-request', 'none'] as const;
export const REPO_VISIBILITY = ['public', 'private-own', 'confidential'] as const;

const oneOf = (field: string, values: readonly string[]) =>
  `${field} must be exactly one of: ${values.map((v) => `"${v}"`).join(', ')}`;

const role = z.enum(ROLES, { error: oneOf('role', ROLES) });
const personallyDid = z
  .string({ error: 'personallyDid is required: one line on what Justin personally did' })
  .trim()
  .min(1, 'personallyDid is required: one line on what Justin personally did');

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string({ error: 'title is required' }).min(1, 'title is required'),
    description: z.string({ error: 'description is required' }).min(1, 'description is required'),
    date: z.coerce.date({ error: 'date is required, as YYYY-MM-DD' }),
    category: z.enum(CATEGORIES, { error: oneOf('category', CATEGORIES) }),
    tags: z.array(z.string()).default([]),
    draft: z.boolean({ error: 'draft is required: true or false' }),
    // Shown in the featured sections (the homepage and the writing library).
    featured: z.boolean().default(false),
    updated: z
      .object({
        date: z.coerce.date({ error: 'updated.date is required, as YYYY-MM-DD' }),
        substantive: z.boolean({ error: 'updated.substantive is required: true or false' }),
      })
      .optional(),
    relatedProjects: z.array(reference('projects')).default([]),
    // Old site addresses this article replaces, e.g. ["/tribal-knowledge.html"]. Once it's
    // published, those addresses redirect to it (JYC-CAP-09).
    replaces: z.array(z.string().regex(/^\/.*\.html$/, 'replaces entries are old addresses like "/tribal-knowledge.html"')).default([]),
    references: z
      .array(z.object({ title: z.string(), url: z.url().optional() }))
      .default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) => z
    .object({
      title: z.string({ error: 'title is required' }).min(1, 'title is required'),
      summary: z.string({ error: 'summary is required' }).min(1, 'summary is required'),
      problem: z.string({ error: 'problem is required' }).min(1, 'problem is required'),
      role,
      personallyDid,
      maturity: z.enum(MATURITY, { error: oneOf('maturity', MATURITY) }),
      demo: z.enum(DEMO, { error: oneOf('demo', DEMO) }),
      demoUrl: z.url().optional(),
      repository: z.object(
        {
          visibility: z.enum(REPO_VISIBILITY, { error: oneOf('repository.visibility', REPO_VISIBILITY) }),
          url: z.url().optional(),
        },
        { error: 'repository is required, with visibility: public, private-own or confidential' },
      ),
      // Evidence for a project with no public repository (JYC-CAP-05): at least one of these.
      screenshots: z.array(z.object({ src: image(), alt: z.string().min(1, 'every screenshot needs alt text') })).default([]),
      walkthroughUrl: z.url().optional(),
      architecture: z.string().optional(),
      // Confidential work: Justin confirms the case study names no client and shows no
      // client documents, data or identifying screenshots.
      confidentialityReviewed: z.boolean().optional(),
      // The register product or workflow this project is, so its status is checked against
      // content/facts.json, e.g. "products.documentWorkbench".
      registerKey: z.string().optional(),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    })
    .refine((p) => p.repository.visibility !== 'public' || !!p.repository.url, {
      message: 'repository.url is required when repository.visibility is "public"',
      path: ['repository', 'url'],
    })
    .refine((p) => p.repository.visibility === 'public' || !p.repository.url, {
      message: 'repository.url is only for a public repository; remove it',
      path: ['repository', 'url'],
    })
    .refine((p) => p.demo !== 'public' || !!p.demoUrl, {
      message: 'demoUrl is required when demo is "public"',
      path: ['demoUrl'],
    })
    .refine((p) => p.repository.visibility === 'public' || p.screenshots.length > 0 || !!p.walkthroughUrl || !!p.architecture, {
      message: 'a project with no public repository needs evidence: screenshots, walkthroughUrl or architecture',
      path: ['screenshots'],
    })
    .refine((p) => p.repository.visibility !== 'confidential' || p.confidentialityReviewed === true, {
      message: 'confidential work needs confidentialityReviewed: true, once no client name, document, data or identifying screenshot is shown',
      path: ['confidentialityReviewed'],
    }),
});

// An experience entry's employer, role title and dates are register facts (JYC-CAP-07), so
// the entry names them by key and the page renders them from content/facts.json, where the
// facts check verifies them. The first fact is the entry's heading.
const experience = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experience' }),
  schema: z.object({
    facts: z
      .array(z.string(), { error: 'facts is required: register keys for the employer, role and dates' })
      .min(1, 'facts is required: register keys for the employer, role and dates'),
    role,
    personallyDid,
    order: z.number().default(0),
  }),
});

export const collections = { articles, projects, experience };
