# Which Card

**Live:** https://which-card.pages.dev

A simple web app to help you find the best credit card for every purchase. Track your cards, compare cashback rates across categories, and maximize your rewards.

## Features

- Add and manage your credit cards with custom reward categories
- Search by category (groceries, gas, dining, travel, etc.) to find the best card
- Track rotating quarterly bonus categories
- Export/import your card data for backup
- Works offline - all data stored locally in your browser

## Running Locally

No build step required. Just open `index.html` in your browser:

```bash
open index.html
```

Or serve with any static file server:

```bash
# Python
python3 -m http.server 8000

# Node.js (npx)
npx serve
```

Then visit `http://localhost:8000`

## Keyboard Shortcuts

- `⌘K` or `/` - Focus search
- `n` - Add new card
- `Esc` - Close modal or clear search
