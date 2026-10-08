# A. Rajesh — Student Portfolio

A fast, modern, responsive portfolio built with plain HTML, CSS and JavaScript — no build step, no frameworks.

## Features
- Dark / light theme toggle (remembers your choice)
- Animated hero with typing effect, glowing avatar and floating stat cards
- Count-up marks, animated progress bars, timeline for education
- Scroll-reveal animations, scroll progress bar, active-section nav, back-to-top
- Fully responsive with mobile menu; respects `prefers-reduced-motion`
- Contact form that opens the visitor's email app (works on GitHub Pages, no backend)

## Structure
```
├── index.html
├── css/
│   ├── style.css
│   └── vendor/bootstrap-icons/   (icon font, bundled locally)
├── js/
│   └── main.js
├── img/
│   └── favicon.svg
├── .nojekyll
└── README.md
```

## Deploy on GitHub Pages
1. Create a repository (e.g. `rajesh-portfolio`, or `<username>.github.io` for a root URL).
2. Upload all files and folders in this project (keep the structure above).
3. Go to **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. Your site goes live at `https://<username>.github.io/<repo>/` within a minute or two.

## Customise
- Text and marks: edit `index.html`
- Colours and fonts: edit the variables at the top of `css/style.css`
- Typing phrases: edit the `words` array in `js/main.js`

## Contact
rajeshambati187@gmail.com
