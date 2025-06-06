# LearnSphere AI - AI-Driven Learning & Career Growth Platform Mockups

This repository contains interactive HTML mockups demonstrating the potential features of the LearnSphere AI platform. The goal is to showcase the user interface and functionality of various AI-driven tools designed for internal learning and career development within an organization.

## Features Demonstrated

The mockups cover the following AI-powered features:

1.  **Profile Enricher**: Reads résumés/CVs (Thai & English) or LinkedIn profiles to automatically populate employee profiles with skills, experience, and activities. Includes a validator bot to suggest standardized company taxonomy for manual entries.
2.  **Skill-Gap & Readiness Dashboards**: Visualizes critical skill gaps across teams/departments using heatmaps and dashboards. Includes views for department-level gaps, individual assessments, and strategic workforce analysis. Predicts succession readiness and employee flight risk.
3.  **Adaptive Learning Paths**: Creates personalized learning journeys (e.g., for SAP training) that adjust based on learner performance. Includes AI recommendations, skill tracking, and automated certificate issuance upon mastery.
4.  **Nudge Bot (Line/MS Teams Simulation)**: A simulated chatbot that sends smart reminders for course deadlines, offers TL;DR content summaries, and suggests relevant new courses based on user progress and profile.
5.  **Mentor & Gig Matching**: An AI engine that matches employees with suitable internal mentors or short-term development "gigs" (projects) based on their skills, development goals, and aspirations. Calculates match scores and provides reasons.
6.  **70-20-10 IDP Builder**: Automatically generates a draft Individual Development Plan (IDP) based on the 70-20-10 learning model (Experience, Exposure, Education), using employee profile data, skill gaps, aspirations, and available organizational resources (mentors, projects, courses).

## Technology Stack

*   **Frontend**: HTML, Tailwind CSS, vanilla JavaScript (for basic interactions and simulations)
*   **Internationalization (i18n)**: `i18next` library
    *   Supported Languages: English (en), Thai (th)
    *   Translation files located in `locales/en/translation.json` and `locales/th/translation.json`.
    *   HTML elements use `data-i18n` attributes for dynamic translation.

## Running the Mockups

1.  Clone this repository.
2.  Open the `index.html` file in your web browser to see the main landing page.
3.  Navigate to the `/mockups` directory.
4.  Open any of the `_demo.html` files (e.g., `skill_gap_demo.html`) directly in your web browser to view individual feature mockups.

**Note**: These are static mockups with simulated interactions. They do not connect to live AI models or backend systems. The focus is on demonstrating the potential user experience and the application of AI in a learning and development context.

## Internationalization

The project is configured to support multiple languages using `i18next`.
*   Language resources are stored in JSON format under the `locales/{lang}/translation.json` structure.
*   Text content within the HTML files is dynamically loaded based on the selected language using `data-i18n` attributes.
*   (Future enhancement: A language switcher can be added to allow users to change the display language).
