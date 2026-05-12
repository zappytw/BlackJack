# Blackjack

> Classic blackjack implemented from scratch in vanilla JavaScript. Full deck management, hit/stand mechanics, dealer logic, and scoring.

![Status](https://img.shields.io/badge/status-stable-success?style=flat-square)
![Stack](https://img.shields.io/badge/stack-vanilla%20JS-yellow?style=flat-square)

---

## Overview

A browser implementation of the casino game blackjack. No libraries, no frameworks — just a deck, a dealer, and the rules. Built as an exercise in modeling game state and turn-based logic in plain JavaScript.

## Features

- 52-card deck with proper suit and value distribution
- Player actions: hit and stand
- Dealer AI follows standard blackjack rules (hits until 17+)
- Ace handling (counts as 1 or 11 depending on hand value)
- Win, loss, and push detection
- Game restart without page reload

## Stack

- HTML5 · CSS3 · JavaScript ES6+
- Zero dependencies

## Project structure

```
blackjack/
├── index.html
├── css.css
├── js.js
└── /media        Card and UI assets
```

## Run locally

```bash
git clone https://github.com/zappytw/BlackJack.git
cd BlackJack
```

Open `index.html` in your browser.

## What I learned building this

- Modeling card-game state with simple data structures
- Implementing rule-based AI (dealer behavior)
- Handling special cases like the dual value of aces
- Keeping UI and game logic decoupled

---

Built by **Joel Fayad** — Frontend Developer based in Colombia.
