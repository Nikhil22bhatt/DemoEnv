# Project Context

This is an AEM Edge Delivery Services (EDS) project using document-based authoring.
The site is a demo for Tata Elxsi — a technology services company.

## Tech Stack
- Pure vanilla JavaScript (no frameworks, no React, no libraries)
- Pure CSS (no preprocessors, no Tailwind)
- AEM EDS boilerplate (scripts/aem.js is the core runtime)

## Content Source
- Google Drive (document-based authoring)
- Word documents define page content
- Blocks are represented as tables in the Word doc — first merged row = block name

## Page: Blog Listing (index)
The homepage is a blog listing page with these blocks:
1. Hero — full-width banner with background image + heading + subtitle text
2. Tabs — horizontal navigation links to different insight categories
3. Cards (blog) — responsive grid of blog post cards with image, category tag, title, and Read More link

## EDS Block Conventions
- Each block lives in /blocks/{blockname}/{blockname}.js and .css
- JS exports: export default async function decorate(block) {}
- The block parameter is the DOM element containing the block content parsed from the Word doc
- Use createOptimizedPicture from scripts/aem.js for images
- Keep code minimal — EDS prioritizes performance and 100 Lighthouse score

## Brand
- Primary: #1B2A4A (dark navy)
- Accent: #0066CC (blue)
- Text: #333333
- Background: #FFFFFF
- Font: system font stack
