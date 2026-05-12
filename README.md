# Blackjack

> Classic blackjack in the browser. Real card visuals from the Deck of Cards API, full multi-ace handling, hidden dealer hole card, and a dealer policy that hits on soft 17.

![Status](https://img.shields.io/badge/status-stable-success?style=flat-square)
![Stack](https://img.shields.io/badge/stack-vanilla%20JS-yellow?style=flat-square)

---

## Overview

A browser implementation of blackjack. Card data and imagery come from the public [Deck of Cards API](https://deckofcardsapi.com/) — everything else (game flow, ace logic, dealer AI, bust detection, end-state messages) is implemented from scratch in plain JavaScript.

## Features

- **Hit and stand** with proper button state management (disabled when not your turn or after game ends)
- **Hidden dealer hole card** — one of the dealer's cards is shown face-down (`back.png`) until the reveal at the end of the round, mirroring real blackjack
- **Multi-ace handling:** aces start as 11 and are downgraded to 1 one-by-one only when needed to avoid busting. Separate `aceCount` is tracked for player and dealer so multiple aces in a hand resolve correctly
- **Dealer AI with soft-17 rule:** dealer hits while value ≤ 16, *and* also hits on **soft 17** (17 that includes a flexible ace) — the "H17" rule used in most modern casinos
- **Paced dealer turn:** uses a Promise-based `sleep()` between cards so the dealer's plays feel deliberate rather than instant
- **Five distinct end states:** Win · Lose · Draw · You busted · Dealer busted
- **Reset button** to start a new round without reloading

## Stack

- HTML5 · CSS3 · JavaScript ES6+ (`async/await`)
- [Deck of Cards API](https://deckofcardsapi.com/) for shuffled decks and card images

## Project structure

```
blackjack/
├── index.html
├── css.css
├── js.js
└── /media        Card-back image
```

## Run locally

```bash
git clone https://github.com/zappytw/BlackJack.git
cd BlackJack
```

Open `index.html` in your browser. No build required.

## What I learned building this

- Modeling card-game state and turn order in plain JS without a framework
- Handling soft and hard ace values across multiple cards in the same hand
- Implementing a casino-faithful dealer policy (hit on soft 17)
- Pacing async operations with a Promise-based `sleep()` so the dealer's turn reads naturally to the user
- Coordinating disabled button states with game flow to prevent illegal actions

---

Built by **Joel Fayad** — Frontend Developer based in Colombia.
