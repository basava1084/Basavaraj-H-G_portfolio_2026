# Basavaraj H G - Portfolio

Static site, no build step.

Files
- index.html  page markup
- styles.css  all styling (theme colors are CSS variables on body)
- script.js   all behaviour (intro lens cursor, hero, smooth scroll, 3D skills ring, pinned projects, voice)
- assets/     landing-photo.jpg, hero-cutout.webp, casual-photo.jpg

Run locally: open index.html in a browser (or `npx serve .`).
Deploy: drag this folder to Vercel or Netlify, or push it to GitHub Pages.

Edit your content
- Text and project links: index.html (search for class="pj" for projects).
- Hero speech lines: the `scn` array in script.js.
- Photos: replace the files in assets/ with the same names.
- Colors: the `body{--bg:...}` rules in styles.css.
