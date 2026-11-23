---
title: 'Intent Design for Conversational Systems'
description: "A practitioner's guide to the decisions behind every voice bot and chatbot."
date: 2026-11-23
category: 'Enterprise AI & Product Leadership'
tags: ['Conversational AI', 'Intent Design']
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

Your AI understood exactly what the customer said. It still sent them to
the wrong department.

You call your bank to report a lost card. The automated system asks you
to repeat yourself twice and transfers you to the wrong department. When
you finally reach an agent, you have to explain everything all over
again.

Large language models (LLMs) have made it much easier for systems to
understand what customers mean. That raises a reasonable question: if
the AI understands what the customer wants, do we still need intents? We
do. Understanding a request isn't the same as knowing what the business
can do, which rules apply, or how to fulfill it safely.

That's the job of intent design: connecting what customers are trying to
accomplish with how the business fulfills those goals. Requests should
be organized around what the customer needs and what the business does
in response, not simply the words customers use to describe them.

I owned the conversational AI and intent-based routing workstream in a
major U.S. bank's move to an LLM-first voice system. The card examples
here are illustrative, not the bank's implementation.

This guide walks through five steps for designing intents, a worked
credit-card example, and how to handle requests that cross intent
boundaries.

# The basics

Every voice bot or chatbot runs the same loop on every turn: **listen →
understand → decide → respond.** The caller says something, the system
figures out what it means, decides what to do, and responds.

Before the system can fulfill a request, it needs to identify two
things:

**Intent:** What the customer is trying to accomplish. For example,
reporting a lost or stolen card.

**Slots:** The information needed to fulfill that intent, such as which
card is affected, whether it was lost or stolen, and where the
replacement should be sent. Some details come from the caller; others
can be retrieved from the bank's systems.

After interpreting the request, the system has five possible outcomes:

- **Fulfill:** The intent is clear, the required information is
  available, and the action is authorized.

- **Collect:** Required information is missing. Ask for it.

- **Clarify:** The request could match more than one intent. Ask which
  one the caller means.

- **Fall back:** The system can't determine what the caller wants. Ask
  them to rephrase or explain what it can help with.

- **Hand off:** The system can't or shouldn't handle the request.
  Explain the limitation and transfer to a person.

These decisions matter especially in voice. Every clarifying question
costs a full turn the caller has to sit through. An intent set that
forces unnecessary questions creates friction, even when the system
understands what the caller said.

# Understanding intents and slots

Before a conversational system can fulfill a request, it has to
translate what the customer says into something it can act on: the
customer's goal, and the information needed to accomplish it. The goal
is the _intent_: the job the system needs to complete.

Imagine a coffee shop where a customer says, "Can I get a large oat
latte?" This becomes:

- **Intent:** order a drink. The goal.

- **Slots:** size = large, milk = oat, drink = latte. The details needed
  to get the right drink to the customer. A slot the customer didn't
  mention, such as sweetener, is either asked for or filled with a
  default.

The list of intents a system supports is called the _intent set_. Each
intent defines the information, or _slots_, needed to fulfill it.
Requests outside the intent set may still be understood, but the system
needs a defined way to respond: ask for clarification, explain its
limitations, or hand off to a person.

# Making a decision

After interpreting the request, the system decides what happens next:

- **Is the intent clear, the required information available, and the
  action authorized?** Fulfill the request.

- **Missing a slot?** Ask for it. "What size?"

- **Unsure which intent?** Clarify. "Did you want to order, or check the
  status of an order?"

- **Can’t determine what the customer wants?** Fall back. Ask them to
  rephrase or explain what the system can help with.

- **Can't or shouldn't handle it?** Explain the limitation and hand off
  to a person.

These five outcomes form the basic decision framework. Conversation
design determines how the system moves between them while keeping the
conversation on track.

# Responding: why voice is harder to design than chat

Chat shows text the user can reread. Voice can't, and that shapes
everything about the design of voice systems. Consider these
characteristics:

- **Voice disappears.** The caller can't scroll back. Keep prompts short
  and talk about one thing at a time.

- **It's linear.** You can't show eight options at once. Three is about
  the limit most people can hold by voice.

- **The ears make mistakes.** Both the caller and the speech recognition
  system can mishear, so confirm anything important: "That's a large oat
  latte, correct?"

- **Silence is ambiguous.** Did they not hear, not understand, or hang
  up? You need rules to handle it.

This raises the stakes for intent design. In voice, every clarifying
question costs a full turn the caller has to sit through, so an intent
set that forces unnecessary questions hurts far more on the phone than
in a chat window.

# Why intents have to be designed

People can express the same need in countless ways, but a business works
through a limited set of capabilities, processes and rules. Intent
design bridges the two by defining which customer goals the system
supports and how each one is fulfilled.

There are four reasons to design your intent set deliberately. Consider
them in the context of a credit card issuer:

1.  **Language is unlimited; actions are not.** A caller may say "My
    card is gone," "I left my wallet in an Uber," or "Someone took my
    purse." Each statement has to land on the same thing the card issuer
    can do: block the card and replace it. Without a defined intent,
    there is nothing to land on.

2.  **Every intent connects to something real.** A back-end action, a
    team, a queue, an order, a security rule. The intent is the label
    that tells the system how to _fulfill_ the customer's need.

3.  **The boundaries between intents aren't natural. Someone has to
    decide them.** Is "lost card" the same intent as "stolen card"?
    Nothing in the language answers that. It depends on how the card
    issuer handles each situation. If "stolen" triggers a fraud review
    and "lost" doesn't, they need different handling, either as separate
    intents or as a slot that changes the steps. That's a design
    decision, and getting it wrong creates misroutes or safety gaps.

4.  **You can't improve what you haven't categorized.** "How many
    callers wanted a replacement card, and how many finished without an
    agent?" is only answerable if replacement card is a defined intent.

# The basics of intent design

A conversational system needs explicit definitions of the intents it
serves and how each one is fulfilled. There are five key steps to
designing them well. We’ll use credit card problems as a running
example.

## 1. Define the intent

**Start from what users want, not how the company is organized.** Mine
the real sources: call transcripts, agent notes, contact-reason codes,
search logs. A small number of intents usually carries most of the
volume, so design those first.

**An intent is a goal plus a boundary.** Write a one-sentence
definition, then what it includes and what it excludes:

- **Report a lost or stolen card:** the caller needs to stop a missing
  card from being used and get a new one.

- **Includes:** lost, stolen.

- **Excludes:** a damaged card (a separate replacement intent), or a
  charge they didn't make (fraud).

The exclusions matter as much as the definition. Weak or missing
boundaries are where intent recognition fails.

**Pick the right granularity.** Use separate intents when customers have
different goals or when their requests need different fulfillment rules.
Use slots when the goal is shared and the differences can be handled by
extra steps within the same workflow. Too fine creates unnecessary
complexity; too coarse loses control.

**Name things consistently.** Use domain plus action:
card.report_lost_stolen, card.temporary_lock, account.transactions. A
clear naming convention makes gaps and overlaps easy to see.

## 2. Define how it is fulfilled

An intent only matters because the business does something with it. Once
you define an intent, define how the business fulfills it.

**What gets done, and who does it.** Each intent needs a _fulfillment
path_: the steps that complete the job, and whether back-end systems, an
agent or a third party carries them out. A lost credit card requires the
system to "block the card permanently and order a new card with a new
number."

**What must be true first.** Are there trust levels, eligibility checks
or identity verification steps that must be completed? These are part of
the fulfillment design.

**What information is needed.** Define the slots required to fulfill the
intent. For each slot, specify what values are allowed, whether it's
required, and where the information comes from. For example, a lost-card
request needs to identify the affected card and confirm where the
replacement should be sent. Some information comes from the caller;
other details can be retrieved from the bank's systems.

**What "done" means.** Define the conditions that make the intent
complete for both the business and the caller. On the system side, the
action is confirmed, not assumed: for a lost card, the old card is
blocked and a replacement order exists. On the caller side, the caller
knows the outcome and what happens next: "Your card is blocked, and a
new card is on the way."

**What happens next.** Does the situation require follow-on steps? For a
lost card, asking about recent charges and flagging stolen cards for
review are common next steps.

**When to hand off, and with what.** Some intents always end with a
person. Others hand off when "done" can't be reached, such as when the
block succeeds but the replacement order fails. Either way, a good
handoff includes a summary of the conversation so the caller doesn't
have to repeat themselves.

**Let fulfillment decide the boundaries.** Fulfillment is also how you
decide where one intent ends and the next begins. A lost card and a
stolen card are fulfilled the same way, so they're one intent with a
slot for the reason. A damaged card keeps its number and isn't blocked,
so it's a separate intent, even though callers describe all three as a
problem with their card.

## 3. Teach the system to recognize it

Before the system can fulfill an intent, it has to recognize the
customer's goal from whatever they say. How that works depends on the
technology.

In traditional NLU systems, a trained classifier maps what the customer
says to one of the predefined intents. Recognition quality depends
heavily on the quality and coverage of labeled training examples.

In LLM-based systems, recognition can rely instead on written intent
descriptions, the conversation so far, and structured outputs. These
systems need far fewer training phrases, but they still need clear
intent definitions, boundaries and tests to behave reliably.

**Use real customer language.** Draw examples from call transcripts and
chat logs, not invented phrases. In NLU systems, these examples become
training data. In LLM-based systems, they sharpen intent boundaries and
become realistic test cases. For card.report_lost_stolen, that means the
full range of how people actually talk:

- Short: "Lost card."

- Long: "I was at a restaurant last night and I think I left my card on
  the table."

- Indirect: "My wallet's gone."

- Casual: "Can't find my card anywhere."

- For voice, the way speech recognition mishears it: "I lost my cart."

Phrases written from a template ("I lost my card," "I have lost my
card," "My card is lost") all sound alike and train a brittle classifier
that fails on the first real caller.

**Add negative and overlapping examples at intent boundaries.** "My card
was stolen" belongs to card.report_lost_stolen, while "There's a charge
I didn't make" belongs to fraud.unauthorized_use. "My card was stolen
and they've been using it" involves both, so the system has to recognize
both goals rather than force the request into one.

**Watch for imbalanced training data.** If card.report_lost_stolen has
200 examples and card.replace_damaged has 15, a classifier tends to lean
toward the better-represented intent. Measure each intent separately and
add targeted examples where recognition is weak.

**Hold back a test set.** Keep a set of real, labeled phrases the system
never trains on, and score it against them. Grading a classifier on its
own training examples is like grading a student on the exact questions
they studied. Whether recognition uses a classifier or an LLM, this test
set is how you measure accuracy, find confusion between intents, and
check that changes didn't break anything.

## 4. Make it work in a conversation

Recognizing the intent is only the start. The system still has to have a
conversation that gets the job done.

**Collect and confirm information.** Once the required slots are
defined, design how the conversation gathers missing information and
confirms important details. Ask only for what the system doesn't already
know. For example, if the bank has multiple cards on file, the caller
can select one rather than read out a full card number. Before freezing
a card, the system should confirm both the card and the requested
action.

**Design the global intents.** Some requests have to work at any point
in any conversation: "help," "talk to a person," "start over," and
anything out of scope. A caller halfway through reporting a lost card
who says "can I just talk to someone" shouldn't be told to finish first.
Add a fallback for when nothing matches at all.

**Plan for overlap.** Identify the pairs of intents callers will mix up,
and design a clarifying question for each before launch, not after the
complaints arrive. Decide, too, what happens when a caller brings two
goals in one sentence. The example later in this guide shows five of
these designed answers.

**Not everything a caller says is an intent.** "Yes," "the second one"
and "same card" aren't customer goals. Their meaning depends on what was
just said. If "yes" were its own intent, then "Yes, and can you send me
a new one?" would be recognized as "yes," and the request for a new card
would be lost. The dialog, or the model, interprets these in context.

## 5. Maintain it

An intent set is never finished. Callers find new ways to say things,
products change, and the boundaries that made sense at launch drift.

**Measure what tells you something.** Four numbers matter most:

- how often the system picks the right intent on the held-back test set,
  and which pairs it confuses with each other;

- how often calls hit fallback;

- how often calls reach the wrong place, measured by agents transferring
  them on or reclassifying them;

- how often each intent is completed without a person.

If card.report_lost_stolen and fraud.unauthorized_use are confused with
each other on a significant share of test phrases, that boundary needs
work. The fix is a better definition, better negative examples, or a
designed clarifying question.

**Feed misses back.** Review the requests the system failed to recognize
or routed incorrectly. Some reveal gaps in training examples or intent
descriptions. Others expose unclear boundaries or missing intents. Each
one is a chance to improve recognition or the intent set itself.

**Govern changes.** Establish clear criteria for adding new intents so
the intent set doesn't grow unnecessarily. Each new intent should have a
distinct customer goal or fulfillment requirement, supporting customer
requests and test cases, a designated owner, and an update to the
conversation playbook. Requests that don't justify a new intent should
be handled through existing intents, slots, workflow changes, or
improved recognition.

# An example of defining intents

Let's put these principles into practice by designing intents for six
common credit card requests:

1.  "I lost my card."

2.  "My card got stolen."

3.  "My card is cracked and won't swipe."

4.  "There's a charge I didn't make."

5.  "Freeze my card."

6.  "Unfreeze my card, I found it."

How should the intents and slots be designed for these related
situations?

## Too coarse: one intent, card.problem

This intent captures everything, but now the system has to use a single
set of rules for all of these situations. Replacing a damaged card is
low risk. A fraud claim needs the card frozen and the call routed to a
fraud agent. Strict rules would make the damaged-card caller pass the
same verification and steps as the fraud caller. Loose rules would leave
fraud protection to chance.

**When intents are too coarse, you lose control of fulfillment and the
experience.**

## Too fine: one intent per sentence

card.lost, card.stolen, card.damaged, card.fraud, card.freeze and
card.unfreeze all become intents. That means six intents, six rule sets,
and six sets of training data and tests. Two problems emerge:

- **Duplicate work.** Lost and stolen do exactly the same thing: block
  the card and issue a new number. Freeze and unfreeze use the same tool
  in opposite directions. You build and maintain six rule sets where
  four would do.

- **Confusion.** "I lost my card, I think someone took it" splits the
  system between lost and stolen. Neither is clear, and the caller gets
  asked a clarifying question that doesn't matter, because both intents
  lead to the same outcome.

**When intents are too fine, you create confusion, unnecessary
conversation turns, and duplicate work.**

## Just right: draw boundaries around goals and fulfillment

To find the right boundaries, compare requests that sound similar or
belong to the same area, and ask whether they represent different
customer goals or need different fulfillment. Five factors decide it:

- **The action taken:** blocking a card is a different action from
  ordering a replacement with the same number.

- **The trust level required:** replacing a damaged card can be done
  with an identified caller, but blocking a lost card needs the caller’s
  identity to be verified.

- **Where the request goes:** a lost-card block finishes in
  self-service, while unauthorized use goes to the fraud team.

- **What happens to the account:** a freeze is reversible, but a block
  is permanent.

- **The risk if it goes wrong:** a mishandled fraud claim costs far more
  than a mishandled replacement card.

Group requests by what the business does to fulfill them, not by how
callers phrase them. If two requests lead to the same action, the same
level of trust, the same routing, the same change to the account and the
same risk, they belong in one intent, and the difference is a slot. Lost
and stolen are one intent with a reason slot. If any of those factors
differ, make separate intents. A damaged card keeps its number and keeps
working. A lost card is permanently blocked and replaced.

Here's the test applied to the card requests:

| **Pair**                          | **Different handling?**                                                                                            | **Decision**                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| Lost vs stolen                    | No. Both block the card for good and issue a new card number                                                       | Same intent, with a reason slot                      |
| Lost or stolen vs cracked         | Yes. A cracked card keeps its number and stays active until the new one arrives. No block, and a lower trust level | Separate intents                                     |
| Freeze vs unfreeze                | Same tool, opposite direction                                                                                      | Same intent, with an action slot                     |
| Lost card vs freeze               | Yes. A freeze is temporary and reversible; reporting a card lost is permanent                                      | Separate intents, with a designed offer between them |
| Lost card vs charge I didn't make | Yes. Different trust level, tools, queue and agent                                                                 | Separate intents                                     |

Applying these criteria produces four intents:

| **Intent**                  | **The caller wants…**                                     | **Covers**                                | **Doesn't cover (goes to)**                                                                                                                      |
| --------------------------- | --------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **card.report_lost_stolen** | To stop a missing card from being used, and get a new one | Lost, stolen                              | A damaged card (card.replace_damaged); a temporary lock while they look (card.temporary_lock); charges they didn't make (fraud.unauthorized_use) |
| **card.replace_damaged**    | A new card because the physical card doesn't work         | Cracked, bent, chip or stripe not reading | A missing card (card.report_lost_stolen)                                                                                                         |
| **card.temporary_lock**     | To lock or unlock a card temporarily                      | Freeze, unfreeze                          | Blocking it for good (card.report_lost_stolen)                                                                                                   |
| **fraud.unauthorized_use**  | To report card use they didn't authorize                  | Charges they didn't make                  | A purchase they made that went wrong (a dispute, outside this set)                                                                               |

Here's how the six customer requests map to the four intents and their
associated slots:

| **Caller says**                       | **Intent**              | **Slot**                  |
| ------------------------------------- | ----------------------- | ------------------------- |
| "I lost my card."                     | card.report_lost_stolen | reason = lost             |
| "My card got stolen."                 | card.report_lost_stolen | reason = stolen           |
| "My card is cracked and won't swipe." | card.replace_damaged    | (none needed)             |
| "There's a charge I didn't make."     | fraud.unauthorized_use  | Charge details to collect |
| "Freeze my card."                     | card.temporary_lock     | action = freeze           |
| "Unfreeze my card, I found it."       | card.temporary_lock     | action = unfreeze         |

Six ways of describing a card problem, four intents to build and
maintain, and every distinction that matters to fulfillment still
captured.

## Defining fulfillment and handoff

Each intent needs a defined fulfillment path: what the system does, what
verification is required, what counts as done, and when to hand off to a
person. The table shows how these differ across the four intents.

| **Intent**              | **How it gets done**                                                                                                       | **Trust level (1 = identified, 2 = verified)** | **Done when**                                                                             | **Hands off to a person when…**                                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| card.report_lost_stolen | Self-service: block the card permanently and issue a new card with a **new number**. If stolen, also flag for fraud review | 2                                              | The card is blocked, the replacement is ordered, and the caller knows when it will arrive | The caller reports charges they don't recognize (to fraud.unauthorized_use), the replacement order fails, or an address change fails verification |
| card.replace_damaged    | Self-service: order a new card with the **same number**. The current card keeps working until the new one arrives          | 1; 2 if the delivery address changes           | The replacement is ordered and the caller knows when it will arrive                       | The order fails, or an address change fails verification                                                                                          |
| card.temporary_lock     | Self-service: freeze or unfreeze                                                                                           | 2                                              | The card's status has changed and the caller has heard it confirmed                       | The caller can't pass verification                                                                                                                |
| fraud.unauthorized_use  | Self-service protection first (freeze the card, find the charge), then a fraud agent                                       | 2                                              | The card is protected and the call reaches a fraud agent with the context                 | Always, once the card is protected                                                                                                                |

## Defining and collecting the required information

Slots are the details fulfillment needs before it can act. Each intent
declares its slots up front: what values are allowed, where each value
comes from, whether it's required, and whether the caller must confirm
it. The "comes from" column matters most. Some details only the caller
can provide. Others the system already knows, and asking the caller for
them adds time and risk.

| **Intent**              | **Slot**         | **Allowed values**         | **Comes from**                                                                  | **Required?** | **Confirm?**                   |
| ----------------------- | ---------------- | -------------------------- | ------------------------------------------------------------------------------- | ------------- | ------------------------------ |
| card.report_lost_stolen | card             | The caller's cards on file | Caller picks from the system's list                                             | Yes           | Yes, before the block          |
| card.report_lost_stolen | reason           | lost, stolen               | Caller                                                                          | Yes           | No                             |
| card.report_lost_stolen | delivery address | Address on file            | System; the caller can change it (requires level 2)                             | Yes           | Yes, read it back              |
| card.replace_damaged    | card             | The caller's cards on file | Caller picks from the system's list                                             | Yes           | Yes                            |
| card.replace_damaged    | delivery address | Address on file            | System; the caller can change it (requires level 2)                             | Yes           | Yes, read it back              |
| card.temporary_lock     | card             | The caller's cards on file | Caller picks from the system's list                                             | Yes           | Yes                            |
| card.temporary_lock     | action           | freeze, unfreeze           | Caller                                                                          | Yes           | Yes, explicit yes              |
| fraud.unauthorized_use  | card             | The caller's cards on file | Caller picks from the system's list                                             | Yes           | Yes                            |
| fraud.unauthorized_use  | charge           | One transaction            | Caller gives hints (amount, merchant, date); the system finds the actual charge | Yes           | Yes, read back from the search |

When a required slot is missing, the system asks for it in the most
efficient way. For the card slot, that's a choice from what's on file
("Is this the card ending in 4417, or the one ending in 2290?"), not a
request to read out a card number.

Three rules sit behind this table. First, anything that decides _whose_
card or account is affected comes from the system, never from what the
caller says. Second, anything that changes money or access gets an
explicit confirmation before it happens. Third, confirmations are
combined: "Freeze the card ending in 4417?" confirms the card and the
action in one question, not two.

## Handling overlap

The four intents have clear boundaries, but real callers cross them.
Each crossing gets a designed answer, and each answer is a pattern
you'll use again:

- **Disambiguation: "There's a charge I didn't make."** This could be
  fraud or a dispute, and callers word both the same way. Designed
  question: "Did you make the purchase and something about it is wrong,
  or did someone else use your card?" If the answer is still unclear,
  treat it as fraud. Handling a dispute as fraud costs an agent a few
  minutes; handling fraud as a dispute leaves a compromised card open.

- **Multi-intent ordering: "My card got stolen and they've been using
  it."** That's two goals: stop further use of the card, and deal with
  the charges already made. Secure the card first, with
  fraud.unauthorized_use freezing it and finding the charges, then
  card.report_lost_stolen blocks it for good and orders the replacement,
  without repeating steps the caller has already done. Tell the caller
  what will happen: "First, let's make sure nobody can use your card.
  Then we'll take care of those charges and get you a new one."

- **Designed offer: "I lost my card."** The caller might find it, so a
  permanent block may be premature. Designed offer: "I can freeze it
  while you look, and you can unfreeze it if it turns up. Or I can block
  it now and send a new card with a new number. Which would you like?"
  The choice routes between card.temporary_lock (reversible) and
  card.report_lost_stolen (permanent).

- **Chaining: after a lost or stolen card is blocked.** Ask whether
  there are recent charges the caller doesn't recognize. A yes moves the
  call to fraud.unauthorized_use.

- **State check: "Unfreeze my card."** This only makes sense if the card
  is frozen, so the system checks the card's status before acting. If it
  isn't frozen, it says so. If the card was blocked as stolen, it can't
  be unfrozen at all, and the system explains that the new card is on
  its way.

Recognizing an intent is only part of the job. The system also needs
rules for what happens between intents.

# Where the design lives

Intent definitions alone don't make a reliable system. Fulfillment
rules, required information, security conditions, clarifying questions,
handoffs and recovery all have to be written down somewhere the whole
team works from.

That's the conversation playbook: the single source of truth that
designers, engineers, testers and the business build and test against.

# Closing: design before you build

Good intent design isn't about predicting every way a customer might
phrase a request. It's about understanding what customers need, knowing
what the business does to meet those needs, and drawing clear boundaries
between them.

Before adding an intent, ask:

- What is the customer trying to accomplish?

- What must the business do to fulfill that goal?

- Does this need a separate intent, or can an existing intent handle it
  with a slot or an extra step?

- What information, verification and system capabilities are required?

- How will we know the request was completed?

Large language models have changed how conversational systems interpret
language and manage conversations. But understanding what a customer
wants is not the same as knowing how to fulfill it safely and reliably.

**As language understanding improves, the quality of the intent and
fulfillment design underneath it matters more, not less.**
