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
    references: z
      .array(z.object({ title: z.string(), url: z.url().optional() }))
      .default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z
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
      registerKey: z.string().optional(),
      draft: z.boolean().default(false),
    })
    .refine((p) => p.repository.visibility !== 'public' || !!p.repository.url, {
      message: 'repository.url is required when repository.visibility is "public"',
      path: ['repository', 'url'],
    })
    .refine((p) => p.demo !== 'public' || !!p.demoUrl, {
      message: 'demoUrl is required when demo is "public"',
      path: ['demoUrl'],
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experience' }),
  schema: z.object({
    title: z.string({ error: 'title is required' }).min(1, 'title is required'),
    role,
    personallyDid,
    facts: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

export const collections = { articles, projects, experience };
