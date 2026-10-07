# Campus Lost & Found

A plain HTML, CSS and JavaScript frontend inspired by the visible Bolt prototype. No npm installation, framework or extra folders are needed.

## Run in VS Code

1. Put index.html, style.css and script.js together in your campus-lost-found folder.
2. Replace the earlier versions of these three files. Keep any existing Firebase files separately; this frontend does not load them.
3. Right-click index.html and choose Open with Live Server, or open index.html directly in your browser.
4. Report an item and open Browse Items to see it immediately.

## Image URLs

Paste a publicly accessible direct image URL into Image URL. The form shows a preview. The image appears on the listing card and in View Details. A broken or blocked image URL falls back to a category icon. URLs pointing to Google search results, webpages, private Drive files or local computer files will not work as item images. Some image hosts block embedding; use another direct link in that case.

## Included

- Navy gradient hero matching the observed reference layout
- Separate Home, Browse Items, Report Item and How It Works views
- Responsive navigation and item cards
- Keyword, lost/found, category, location and date filters
- Form validation and image previews
- Contact names, optional time, click-to-call/email where valid
- Accessible native details dialog with Escape support
- Browser localStorage persistence, compatible with the earlier storage key
- Clearly identified sample reports without real contact information

## Storage limitation

Reports are stored only in the current browser and origin. Other students will not see them from other devices until a shared backend, such as Firestore, is connected. Returned Items counts existing reports with status "returned"; this frontend has no owner login or return-status editor.

## Team integration

The frontend works independently without Sahana's files. Connect the team's shared data layer later by replacing the load/save operations in script.js. Keep database authorization in the backend, rather than trusting frontend checks.
