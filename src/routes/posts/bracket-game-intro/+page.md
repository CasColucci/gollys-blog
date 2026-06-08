---
n: 2
title: "Bracket Game: What It Is and Why I'm Building It"
date: "2026-06-08T13:00:00-05:00"
long: "June 8, 2026"
excerpt: "What is this bracket game I keep talking about? And what's the plan with it anyway? Here's my explanation to catch you up to speed on where I'm at with it, and where I'm going. "
tags: ["gamedev", "react", "asp.net", "signalr"]
project: "bracket-game"
stage: "growing"
img: false
---

# Bracket Game: What It Is and Why I'm Building It

<br>
What is this bracket game I keep talking about? And what's the plan with it anyway? Here's my explanation to catch you up to speed on where I'm at with it, and where I'm going. 
<br><br>

## What's The Inspiration?

A while ago, my wife and I ran our own paper bracket when deciding what musical we felt was technically the best we'd ever seen (Fiddler On The Roof won).
<br>
It was a silly little exercise that joyously took up about two hours of our day as we debated back and forth over the merits of lyricism over general tune-catchiness. It was a blast, and it got me thinking: what if I made a tool exactly for this purpose?
<br><br>
I'm also fan of JackBox games, and wonder why the formula of "lobby room with phone access for a game" wasn't more widespread, being such a straightforward system with a lot of applications.
<br><br>
With the above two ideas in my head, I set forth on this quest to figure out just how to make this thing.
<br><br>

## What's The Plan?

I had attempted to make something similar in the past. My unfinished tool "Dungeons and Dreams" was a test of trying to make web sockets work in a lobby for a GM and their players.
<br>
It was a fun project, to be sure, but one I had very little knowledge behind. It's been about five years since then, so I'm glad to say I've learned quite a bit in the interim. Servers, for example, are no longer this horrifyingly scary concept that I stumbled through like a newborn deer.
<br><br>
The planned flow of the application is this:

- A lobby system that allows users to join a game via access codes
- Players can see who is in the game, who is the host, and the current state of the game
- The host can start the game
- The host then chooses the category for the bracket (Such as "best musical") and the number of items
- The players all suggest items for the bracket until the decided number of items is reached
- The players see all options and prioritize the ones they think are most likely to win (seeding\*)
- The bracket is run in head-to-head matchups (highest vs lowest score in the seed), players vote on the best for each round.
  - This may have timers associated with them but this feature should be removable
- This repeats until a winner is crowned and, after the finale screen (showing the winner, near-winners, and any other stats), the players are returned to the lobby
- The data is recorded in the lobby and shared as game history

\*Seeding is important, but may possibly be turned off by the host. Otherwise high-performing candidates may be voted off early. This actually was a major reason the original bracket my wife and I ran took so long: we were frequently re-ordering the bracket because big-hitters were being voted off early while options we felt didn't "deserve" to last as long were making it through to late brackets.
<br>

## What's The Stack?

<br>
For the backend, I'm a C# developer first and foremost so ASP.NET was a no-brainer. I chose to go with a minimal API to keep things light. I don't need anything exceptionally complex with extra structure. 
<br><br>
As for the frontend, I'm a big fan of SvelteKit/Svelte (that's what this blog is made in!). However, React is something I'm very familiar with from using it often in college, yet I haven't touched it in a while. I figured it was time to stretch my React legs again.
<br><br>
For the database-layer, I am most familiar with Microsoft SQL Server, but have been very interested in PostgreSQL and have used it on a few test projects. That was my choice, with Entity Framework Core for ORM.
<br><br>
Lastly, for my real-time web functionality, I chose the obvious option of SignalR. 
<br><br>

## What's Done So Far?

<br>
As of June 8th, 2026 (the day I'm writing this post) The basic setup for all the libraries/project scaffolding is complete! Entity models, enums, and initial database creation as well. Some Dependency Injection setup work, and a SignalR hub scaffolded. 
<br><br>
In the meantime, the frontend has been laid out with pages for joining games, hosting games, and the game view itself started. 
<br><br>

## What's Next?

<br>
Well, first there's an issue that's been plaguing me and it's that the pixel font I had for it is showing distorted on FireFox, specifically on my work Windows 10 computer but not on Chrome, or on my Linux computer (which uses FireFox). I hate issues like these because they're often the type to derail me for a while, but once I sort this out (or give up and switch fonts) it's game-time again!
<br><br>
What's next when that's sorted is SignalR work: getting the page to add the player to the hub, updating all players when a new one joins, and lobby cleanup for empty lobbies. 
<br><br>
As for the dev log updates, I'll likely make them similarly to this! I like talking through my development process and putting it down in writing helps me to logic through the next steps, as well as acknowledge the work I've done. I'm a newer developer, but I hope discussing my journey and process helps someone out there! :3
