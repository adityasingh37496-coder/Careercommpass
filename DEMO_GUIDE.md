# CareerCompass AI — Hackathon Demo Guide

## Start the app

From the project folder that contains `package.json`:

```powershell
npm.cmd ci
npm.cmd run dev
```

Open `http://localhost:3000`. Keep the terminal window open during the demo. Stop the app with **Ctrl+C** when finished.

## Quick walkthrough

1. On the landing page, select **Find my direction**.
2. On the profile form, select **Explore with sample profile**. This skips manual data entry and loads clearly labeled sample answers and sample scores.
3. On the results screen, show the top matches and expand **How matches are scored** to explain the transparent local rules.
4. Select **Dashboard**. Point out the match chart, skill assessment chart, and side-by-side comparison.
5. Move the **What if?** skill slider. Show that the preview rankings update, then press **Reset preview**. Explain that the preview does not change the profile or scores.
6. Return to results and select **View my guidance**. Show the priority skills, sample roadmap, and optional fictional resume-feedback example.

## Suggested short pitch

“CareerCompass AI helps students explore career directions from the skills and interests they already have. This prototype shows how a transparent matching flow can rank roles, explain skill gaps, and turn a next step into a small project plan. The dashboard lets someone compare options and preview how demonstrating a stronger skill could change their matches. Today’s results use local sample rules and content; the prototype does not call an AI service or store profile data.”

## If something goes wrong

- If the page is loading for the first time, wait for the terminal to show that Next.js is ready and the page request succeeds.
- If the app is stopped, return to the project folder and run `npm.cmd run dev` again.
- If the demo profile was edited, its preset sample scores are cleared so they do not look like the edited profile’s results. Return to the profile form and select **Explore with sample profile** to reload the walkthrough.

All profile data and what-if calculations stay in the current browser tab. Closing or refreshing the tab clears the current session.
