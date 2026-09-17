# Anuja Indalkar — Personal Portfolio

A modern, responsive personal portfolio website for Anuja Tatya Indalkar, an M.Sc. Artificial
Intelligence & Data Science postgraduate student at Indira University. Built to showcase academic
background, technical skills, and projects to faculty and recruiters.

**Live site:** _add your GitHub Pages URL here after deployment_

---

## Features

- Fully responsive layout (320px – 1440px+): desktop, laptop, tablet, and mobile
- Sticky navbar with smooth scrolling, active-section highlighting, and a mobile hamburger menu
- Animated hero section with a canvas-based node network background and a typing-role animation
- Scroll-triggered fade/slide-up reveal animations throughout (respects `prefers-reduced-motion`)
- About, Skills, Education (timeline), Projects (with expandable details), Achievements,
  Certifications, "My Journey" timeline, Resume CTA, and Contact sections
- Contact form with client-side validation (no backend required)
- Accessible markup: semantic headings, alt text, visible focus states, keyboard-friendly nav
- No build tools or frameworks required — pure HTML5, CSS3, and vanilla JavaScript
- Ready to deploy directly on GitHub Pages

## Technologies

- HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript
- [Font Awesome](https://fontawesome.com/) (icons, via CDN)
- [Google Fonts](https://fonts.google.com/): Space Grotesk, Inter, JetBrains Mono

## Project Structure

```
portfolio/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── profile.jpg      ← add your hero photo here
│   └── about.jpg        ← add your About section photo here
├── assets/
│   └── resume.pdf        ← add your resume here
└── README.md
```

## Before You Deploy — Personalization Checklist

This project ships with real content where provided and clearly marked placeholders where it
wasn't. Update the following before publishing:

- [ ] Add your photo to `images/profile.jpg` (hero) and `images/about.jpg` (About section)
- [ ] Add your resume PDF to `assets/resume.pdf`
- [x] GitHub profile linked: [github.com/Anuja-Sirius-01](https://github.com/Anuja-Sirius-01)
      (footer, Contact section, and all three project cards). If you'd rather link each project
      to its own repo instead of your profile, update the `href` on the "GitHub" buttons in the
      Projects section of `index.html`.
- [ ] Add a live demo link for AstraShield if one is deployed
- [ ] Fill in the second certification's date and issuing organization in the Certifications
      section (`index.html`, search for `[Date]` and `[Organization]`)
- [ ] Double-check the email and LinkedIn links are correct

## Screenshots

_Add screenshots of the deployed site here once available, e.g.:_

```
![Hero section](screenshots/hero.png)
![Projects section](screenshots/projects.png)
```

## Running Locally

No build step is required.

1. Download or clone this folder.
2. Open `index.html` directly in a browser, **or** serve it locally for the best experience:

   ```bash
   # Python 3
   python -m http.server 8000

   # then visit http://localhost:8000
   ```

## Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `portfolio` or `yourusername.github.io`).
2. Push this project to the repository:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, select **Deploy from a branch**.
5. Choose the **main** branch and **/ (root)** folder, then **Save**.
6. Wait a minute or two — your site will be live at:

   - `https://YOUR_USERNAME.github.io/YOUR_REPO/` (standard repo), or
   - `https://YOUR_USERNAME.github.io/` (if the repo is named `YOUR_USERNAME.github.io`)

7. Update the resume/photo/link placeholders (see checklist above), commit, and push again —
   GitHub Pages redeploys automatically on every push to `main`.

All internal links use relative paths (e.g. `images/profile.jpg`, `assets/resume.pdf`), so the
site works correctly once deployed — no changes needed for GitHub Pages compatibility.

---

© 2026 Anuja T. Indalkar. All Rights Reserved.
Designed & Developed by Anuja T. Indalkar.
