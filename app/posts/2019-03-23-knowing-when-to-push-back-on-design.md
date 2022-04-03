---
title: Knowing When to Push Back on a Design as a Developer
date: 2019-03-23T00:08:45.902Z
description: A cautionary tale of knowing when to push back on a design that makes sense, but implementation details have you asking if there's a better way.
---

## TLDR;

Ask questions. Don't write code just because it's an interesting challenge. You get paid to deliver value.

## The Setup

UI Bootstrap's [popover directive](https://github.com/angular-ui/bootstrap/tree/master/src/popover) makes popovers that appear over the trigger element extremely easy. However, a recent task involving line duplication in our data grid component asked for something a little different.

The design called for a context menu option duplicate a line multiple times. When the user clicks it, the menu closes and a number input opens over the row's menu button so the user can input how many duplicates.

I eventually found UI Bootstrap's tooltip positioning logic (popovers inherit from the tooltip service) assumes it opens over the trigger element. No bueno.

I considered bastardizing their modal service, but the extra css and hacks to position the element put me off. Instead, I created a factory to spit out popover instances that managed themselves. All the hairy logic is delegated to a helper service.

## But wait a second...

In the end, I wrote a substantial amount of code that passed review and works fine. Thing is, we're going to rework this feature to be a nested submenu off the context menu instead of a popover.

Turns out that clicking an option on the context menu on the far right of the screen and then having a popover open on the far left of the screen is a bit weird.

## The Mistake (Or #IDKJS)

Notice how I didn't really stop to ask whether there was another way? I thought that part of the design was weird but I got caught up in "making it work" because it'd been approved through numerous reviews. The challenge and opportunity to try some new knowledge also clouded my judgement.

I'd been working my way through Kyle Simpson's [YDKJS](https://github.com/getify/You-Dont-Know-JS) (highly recommend!). After completing [Behavior Delegation](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch6.md) I was stoked to try it out at work like any "good" developer. I wanted to write some clean and clever code. I didn't stop to think if I should.

## The Solution

Ask questions -- I know, this is drilled into our heads since we're little, but it bears repeating. It's intimidating to push back on a design, especially if you come in late in the game or it's "CEO-approved". I've been doing this 5 years and still don't do this enough. If you don't understand something in a design raise your hand.

Write code as a last resort -- After you've asked all the "why's" and "wtfs", see if there's something you can reuse. I did do this, but had this been more of a priority for me I might have asked more questions. Be lazy!

Remember, you get paid to deliver value and solve a client's problems. Sometimes this involves finding ways to not write code and saying a design doesn't make sense.
