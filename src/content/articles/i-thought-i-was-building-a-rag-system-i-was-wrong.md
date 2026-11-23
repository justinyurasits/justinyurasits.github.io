---
title: 'I Thought I Was Building a RAG System. I Was Wrong.'
description: "Before I could test whether my AI found the right answers, I discovered the company's documents didn't agree on what the right answers were."
date: 2026-11-23
category: 'Enterprise AI & Product Leadership'
tags: ['AI Systems', 'Evaluation', 'Document Intelligence']
draft: false
featured: false
# relatedProjects: [project-file-name]
# references:
#   - title: "A source"
#     url: "https://example.com"
# After publishing, for a substantive correction (a typo fix needs nothing):
# updated:
#   date: YYYY-MM-DD
#   substantive: true
---

I set out to build a retrieval-augmented generation (RAG) system over a collection of 171 construction operations documents: standard operating procedures, contracts, forms, and company policies.

The plan was pretty straightforward.

Keyword search. Vector embeddings. Hybrid retrieval. Reranking. An LLM to generate answers grounded in the company's documents.

The goal was to give employees a way to ask questions about how the company operates and get reliable answers based on its own policies and procedures.

But before writing the retrieval code, I decided to build an evaluation set. I wanted a way to measure whether the system was finding the right information and producing correct answers.

That meant identifying what the right answers actually were.

And that's where the project started going in a direction I hadn't expected.

One of the first evaluation questions exposed a problem that better retrieval wasn't going to solve.

## The problem with the right answer

I put together 35 evaluation questions to test whether the system could find the right information. They covered four categories: exact document references, questions phrased the way someone in the field would ask, ordinary business questions, and questions the documents shouldn't be able to answer.

For each question, I needed to identify the correct answer and the authoritative document and section that supported it.

That's where I started running into problems.

Take a simple question: When are employees required to submit their time entries?

One operating procedure said time entries were due by 9 AM the following day.

A core business rule said within 48 hours.

So which one was correct?

I went a step further and checked how employees actually submitted their time. They were entering it weekly, on Fridays.

Now I had three different answers.

The problem wasn't determining which document was more relevant to the question. Both documents addressed the same requirement, and actual practice didn't match either one.

Was one rule outdated? Did they apply to different situations? Had the company changed its procedure without updating the documentation?

Those weren't questions an AI model could resolve on its own. Someone needed to establish which requirements applied and make sure the documents reflected that decision.

And this wasn't an isolated example. The first 35-question audit uncovered 14 contradictions.

## This wasn't an isolated problem

The time-entry requirement was just one example. As I worked through the documents, I kept finding problems that raised the same question: which information could the AI actually trust?

Some documents were outdated. Others contained incomplete procedures or conflicting business rules. And copies the AI had been working from had drifted from the originals.

In one case, the same type of work had a labor rate of $79 in one document and $90 in another. Both appeared to provide valid pricing information, but they couldn't both govern the same situation.

I also found important operating rules buried inside AI instructions rather than in authoritative company policy documents. The system was being told how the business should operate, but those instructions weren't necessarily supported by the company's documented policies.

A broader review eventually identified 432 potential problems requiring investigation.

Not all 432 were confirmed errors. Some were outdated versions, unclear requirements, or questions about which rules applied in different situations.

But the pattern was becoming clear.

The documents weren't just a source of information for the AI. They contained unresolved questions about how the business was supposed to operate.

And giving an AI system access to all of them wasn't going to resolve those questions.

## Why better retrieval wouldn't solve it

A RAG system is designed to find relevant information and use it to generate an answer. Better embeddings, chunking, and reranking can improve how accurately it finds that information.

But finding the right document isn't the same as finding the right answer.

Consider the time-entry example. A retrieval system might find the procedure requiring entries by 9 AM the next day. It might find the core rule allowing 48 hours. Or it might retrieve both.

All three outcomes could represent successful retrieval.

The problem is what happens next.

An LLM could confidently answer using either document and provide a perfectly valid citation. It could even recognize the contradiction and explain it. But it wouldn't know which requirement actually governed unless that information had been established somewhere it could rely on.

**Relevance doesn't establish authority.**

And authority isn't the only consideration. A rule might be perfectly valid but apply only to a particular contract, project, jurisdiction, or type of work.

The system needs to know not just what a document says, but whether that document is current, authoritative, and applicable to the situation.

Those are business decisions that need to be reflected in the underlying knowledge.

A more capable model might do a better job identifying inconsistencies. It can't independently establish company policy where none has been clearly defined.

## So the project changed direction

Instead of moving ahead with retrieval, I started working on the knowledge foundation the system would depend on.

The first step was putting the original document collection under version control. I wanted to preserve the source material, track changes, and make it possible to see how the knowledge evolved.

I also converted 167 Word documents into a machine-readable format, with fidelity checks to make sure their contents were preserved.

But the bigger challenge wasn't converting files. It was establishing how the information should be organized and governed.

That meant working through several questions:

- **Authority:** Which documents and policies govern which business decisions?
- **Applicability:** Does a rule apply to this company, contract, jurisdiction, or type of work?
- **Version control:** Which documents are current, superseded, or retired?
- **Single source of truth:** Where should core operating rules live so they aren't duplicated across procedures, templates, and AI instructions?
- **Change control:** How do we make sure future updates are reviewed, traceable, and reflected wherever those rules are used?

I started separating core policies, operating procedures, and document definitions so each had a clear purpose. I also began consolidating business rules into governed policies with stable identifiers rather than leaving them scattered across the document collection.

The work is still ongoing. The original 35 evaluation questions haven't yet been scored against a working retrieval system.

But the exercise had already changed how I approached the project.

I was no longer just building a system that could find information in company documents. I was establishing which information the system could rely on in the first place.

## Why this matters beyond RAG

The same problem applies to almost any AI system that relies on a company's internal knowledge.

I'm building a system designed to generate more than 100 types of business documents for construction companies: scopes of work, change orders, contracts, estimates, and other operational documents.

Getting an LLM to produce a professional-looking document is relatively easy. I can generate something in five minutes that looks like it took hours to prepare.

But looking right and being right are two very different things.

Does the document follow the company's policies? Does it reflect the requirements of the applicable contract? Are the labor rates and other numbers correct? Is the system filling in missing information with assumptions or making decisions it doesn't have the authority to make?

Those questions aren't answered by better formatting or a more capable language model.

That's why, in the document system I'm building, the model doesn't determine pricing. It proposes the scope and quantities based on the available information, while a separate pricing process uses a governed rate table to calculate costs. The system rejects model-generated prices rather than treating them as authoritative.

That way, a discrepancy like the $79-versus-$90 labor rate gets resolved in one place instead of being carried into every generated document.

And the consequences go beyond giving someone an incorrect answer. A generated document might contain the wrong pricing, omit a contractual requirement, or instruct someone to follow an outdated procedure.

The more capable these systems become, the more work they can perform using the knowledge we give them. That makes the quality of that knowledge increasingly important.

The model can generate the document. But the business has to establish the rules that make it correct.

## A simple test before you build

If you're building an AI system that relies on your company's documents, there's a simple exercise worth doing before you start writing code.

Take ten questions your employees actually ask about how the business operates.

For each question, try to identify:

1. The correct answer.
2. The authoritative document and section that supports it.
3. Whether that document is current and the rule applies to the situation.
4. Whether another document provides a different answer.
5. Whether the documented requirement matches how the business actually operates.

You don't need embeddings, a vector database, or even an LLM to do this.

If you can't confidently establish the correct answer, you've already identified something worth fixing before asking AI to answer the question.

That's what happened in my project. I set out to evaluate how well a retrieval system could find information. Instead, the evaluation process exposed problems in the information itself.

The hardest part of building my RAG system wasn't getting the AI to find an answer.

It was establishing which answers the AI could actually trust.
