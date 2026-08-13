# UX critique framework (general, always-on)

Adapted from the general "10 Point Checklist for UX Design Critiques," trimmed for this skill's
actual material — a static Claude Design prototype, not a shipped, tested, or animated product.
Always included in every audit run, regardless of what's in scope (unlike the checklist.design
files in `checklists/`, which are only included when the Select phase judges them applicable) —
these are structural/universal questions, not conditional on a specific component or flow
existing.

Dropped from the original 10 points, and why:
- **Mobile Responsiveness** — Zone builds web apps only.
- **Usability Testing** — requires real user research; out of scope for a design audit of a
  prototype.
- **Performance & Quality Assurance** (real handoff/testing) and the animation-timing part of
  **Interactions & Animations** — a Claude Design prototype isn't a shipped, deployed, or animated
  product; there's nothing to load-test, profile, or watch animate.

## Items

### Objectives & goals
Are the screen's objectives and goals clear from the design itself? Is it evident what the user is
meant to accomplish here, and what the product/business goal for this surface is?

### Information architecture & visual hierarchy
Assess the organization, readability, structure, and presentation of visual elements. Are labels,
menus, and structural elements easy to understand and navigate? Is there any redundancy that could
be removed for a better experience?

### Navigation
Is the navigation structure and its controls consistent, easy to understand, and intuitive? Does
every screen use the same navigational patterns to create a sense of cohesion? Is primary vs.
secondary navigation clear where more than one exists? Is it easy to move back and forth between
pages or levels?

### Visual design & branding
Colors, typography, imagery, and other elements essential to a cohesive experience. Are design
elements used consistently across screens? Are colors and fonts congruent with the brand's style?

### Labels and text
All labels and text use language appropriate for the intended user. Consistency in capitalization
and punctuation. Naming conventions are logical and make sense to users in terms of understanding
what each feature does.

### Accessibility & inclusivity
How well does the design accommodate people with physical and cognitive impairments — low vision,
color blindness, screen-reader use? Does it impose unnecessary barriers to a wider range of users?

### Interactions
Do interaction states (hover, focus, active, disabled) match user expectations? Does it feel
intuitive when a user interacts with a control? (Animation timing and perceived load performance
are out of scope for this framework — see note above.)
