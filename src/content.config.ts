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
  schema: ({ image }) => z.object({
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
    // The deck under the title (JYC-CAP-03). Without one, the description is the deck.
    deck: z.string().trim().min(1).optional(),
    // The cover the writing library shows when the article is featured (16:10).
    cover: z.object({ src: image(), alt: z.string().min(1, 'the cover needs alt text') }).optional(),
    // The two related articles Justin picks (JYC-CAP-03). Missing or unpublished picks are
    // filled with the newest published articles in the same category.
    relatedArticles: z.array(reference('articles')).default([]),
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
      // What a visitor can actually view, and what the build doesn't do (JYC-CAP-05).
      whatYouCanView: z
        .string({ error: 'whatYouCanView is required: what a visitor can view' })
        .trim()
        .min(1, 'whatYouCanView is required: what a visitor can view'),
      limitations: z
        .string({ error: 'limitations is required: what it doesn\'t do yet' })
        .trim()
        .min(1, 'limitations is required: what it doesn\'t do yet'),
      // Topics for the Demos & Builds filters, e.g. ["Agents", "Construction"].
      tags: z.array(z.string().trim().min(1)).default([]),
      // Leads the Demos & Builds page. Without one, the first by order leads.
      featured: z.boolean().default(false),
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

// Training classes (JYC-CAP-10). Every field a visitor reads is required, so the build
// fails, naming the file and the field, if one is missing. A class for another audience is
// a new file here, with no change to the page. No price, tuition or fee field: interest
// arrives by email.
const req = (field: string) => z.string({ error: `${field} is required` }).trim().min(1, `${field} is required`);
const classes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/classes' }),
  schema: z.object({
    title: req('title'),
    audience: req('audience'),
    level: req('level'),
    duration: req('duration'),
    format: req('format'),
    prerequisites: req('prerequisites'),
    schedule: req('schedule'),
    description: req('description'),
    leaveWith: z.array(z.string().trim().min(1), { error: 'leaveWith is required: what a participant leaves with' }).min(1, 'leaveWith is required: what a participant leaves with'),
    // A line under what they leave with, e.g. what it isn't.
    leaveWithNote: z.string().trim().min(1).optional(),
    // What the class covers, in order.
    covers: z.array(z.string().trim().min(1)).default([]),
    coversTitle: z.string().default('What it covers'),
    // How the class works, e.g. a fictional company everyone shares.
    formatNote: z.string().trim().min(1).optional(),
    // Where it sits in the path, e.g. "Understand and identify".
    fit: z.string().trim().min(1).optional(),
    // The group the class belongs to; construction first.
    audienceGroup: z.enum(['construction', 'enterprise']).default('construction'),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

// Experience entries live in the facts register (content/facts.json → experience), with
// their role, what Justin personally did and their achievements (Career Facts v5.7).

export const collections = { articles, projects, classes };
