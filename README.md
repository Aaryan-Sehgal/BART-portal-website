# CSC 317 — Group Project Repository

**Milestones 2–4**

This repository will be used for **Group Project Milestones 2, 3, and 4**.
You have already completed **Milestone 1 (Site Design)** — now it’s time to begin implementing your design into the foundation of a working site.

---

## Project Goal — Full‑Stack Scope

Across all milestones, your project (ecommerce site, chatbot, data visualization/dashboard, etc.) must demonstrate a **full‑stack** implementation:

* **Front‑End:** HTML, CSS, and Front‑End JavaScript for the UI.
* **Back‑End:** Ubuntu VM running Node.js/Express with a PostgreSQL database.
* **State & Auth:** Active authentication against the database, session/state management, and data retrieval/manipulation that is presented in the UI.

Milestone 2 focuses on front‑end structure and minimal interactivity; Milestones 3 and 4 complete the back‑end, auth, database, and full functionality.

---

## Setup Instructions

1. **Accepting the Repository Invitation**
   Only **one** team member should accept the GitHub Classroom assignment link.
   That person will own the team repository and should **add all other teammates as collaborators** under **Settings → Collaborators**.

2. **Running Your Site**
   Your website must run through a **Node.js + Express** web server inside your **Ubuntu 24.04 virtual machine (VirtualBox guest)**.
   You will serve your static files (HTML, CSS, and images) from this Express server. **Every teammate should be able to run this.**

   After cloning, run:

   ```
   npm init -y
   npm install express
   node server.js
   ```

   To run the example `server.js`:

   ```js
   const express = require('express');
   const app = express();
   app.use(express.static('public'));
   app.listen(3000, () => console.log('Server running on port 3000'));
   ```

You are free to use the code here or completely replace it with your own.

---

## Milestone 2 — HTML, CSS, Front‑End JS

**Goal:**
Convert your **site design mock-ups** from Milestone 1 into real **HTML and CSS** code, plus **minimal Front‑End JavaScript**.

You will add more functionality (Back‑End JavaScript, database, APIs) in later milestones.

**Requirements:**

* Implement your site’s structure and styling using **HTML5 and CSS3**.
* Include **all pages** from your design:

  * Home page
  * Product or content pages
  * Navigation and intermediate pages
* Use placeholder images where needed (final images will come later).
* Ensure that all navigation links work correctly.
* The site should load and display correctly when served from your Express server.
* **Front‑End JS scope for M2:** Keep it minimal and client‑side only (e.g., DOM manipulation, basic event handling, simple form validation). **No server routes, database calls, or external APIs yet.**

---

## Project Organization

* **Directory structure:**
  Group related files into subdirectories for clarity. Example:

  ```
  public/
    index.html
    script.js <--- Front End JS goes here (under public/)
    products/
      item1.html
      item2.html
    css/
      style.css
    images/
      logo.png
      products/
  README.md
  server.js <--- Back End JS goes here (outside of public/)
  ```

* **Meaningful names:**
  Use clear, descriptive file names. URLs should make sense to the user.

* **Version control:**
  Commit regularly with meaningful messages. Demonstrate steady, collaborative progress.

---

## Submission

Each team submits **once** (only one submission per team):

1. **GitHub Repository:**
   Your project code should be in this repository.

   * Git tag your code with:

   ```
   git tag -a HTMLCSS -m "TAG HTMLCSS Version"
   git push origin --tags
   ```

2. **PDF Write-Up (on Canvas):**
   Upload one PDF including:

   * Team name
   * All team members and GitHub usernames
   * Repository link
   * Description of what you implemented
   * Problems encountered and how you solved them
   * Any known issues or incomplete features
   * Use of GenAI

> (Use the write-up template.)

---

## Presentation

You will present your working website on **presentation day**.
Be ready to demonstrate:

* Full site navigation
* Page layouts and design consistency
* CSS styling choices
* Team collaboration process

---

## Rubric (100 Points)

| Category                            | Points | Description                                                                  |
| ----------------------------------- | ------ | ---------------------------------------------------------------------------- |
| **Look & Feel**                     | 15     | Visual quality, fidelity to mock-ups, use of color, spacing, and typography. |
| **Completeness**                    | 15     | All planned pages and navigation paths implemented.                          |
| **Organization & Code Quality**     | 10     | Logical directory structure, readable HTML/CSS, clear naming.                |
| **Usability & Accessibility**       | 10     | Intuitive navigation, responsive design, proper alt text, readable contrast. |
| **Consistency**                     | 10     | Cohesive layout, fonts, and style across pages.                              |
| **Functionality**                   | 10     | All navigation links work, site runs correctly via Node/Express.             |
| **Problem Solving & Documentation** | 10     | Clear write-up describing issues, debugging steps, and solutions.            |
| **Presentation**                    | 10     | Engaging demo, teamwork evident, professional delivery.                      |
| **Would You Use This Site?**        | 10     | Overall polish, appeal, and usability from a user’s perspective.             |

**Total: 100 points**
*All team members receive the same grade. Teams are responsible for dividing the work equitably.*

---

## Coming Up Next

**Milestone 3 — Back‑End & Data (Preview):**

* Introduce **Back‑End JavaScript** with Express routes and controllers.
* Implement form handling and validation (server‑side), and dynamic updates via fetch/XHR from the client.
* Integrate **PostgreSQL** for persistence (CRUD) using a Node/Postgres client.
* Build basic REST API endpoints in Express (no advanced auth yet).

**Milestone 4 — Final Project:**

* Full functionality: robust database integration, API endpoints, **authentication and authorization**, and complete Front‑End behavior.
* Polished styling, mobile responsiveness, and accessibility.
* Final presentation and written reflection.
