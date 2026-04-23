Good news: your palette is strong and already “enterprise + modern,” which is perfect for this product. I’m going to upgrade your PRD so:

- Claude can **design wireframes without guessing**
- Replit can **build without interpretation gaps**
- Your brand is **consistently applied everywhere**

------

# 🔥 UPDATED DESIGN SYSTEM (DROP-IN FOR PRD)

Replace your design section with this:

------

# 🎨 DESIGN SYSTEM (FINAL – PRODUCTION READY)

## 🏢 Brand Identity

**Brand:** Future Bridge Solutions
**Tone:**

- Enterprise-grade
- Trustworthy
- Modern
- Simple (Apple-level clarity)

------

## 🎨 COLOR SYSTEM

### Primary Colors

```css
--primary: #193359;        /* Deep Navy */
--secondary: #41A3D8;      /* Bright Blue */
--accent: #CB2D27;         /* Action Red */
--neutral: #77777A;        /* Mid Gray */
--background: #F8FAFC;     /* Light background */
--white: #FFFFFF;
```

------

## 🎯 Color Usage Rules (CRITICAL)

### 1. Primary (#193359)

Use for:

- Headers
- Navigation
- Primary buttons
- Key text

👉 This is your **trust color**

------

### 2. Secondary (#41A3D8)

Use for:

- Highlights
- Selected states
- Active options
- Links

👉 This is your **interaction color**

------

### 3. Accent (#CB2D27)

Use for:

- CTAs (sparingly)
- Errors
- Important actions (Submit / Finalize)

👉 This is your **conversion color**
⚠️ Do NOT overuse

------

### 4. Neutral (#77777A)

Use for:

- Labels
- Secondary text
- Dividers
- Disabled states

------

### 5. Background

```css
#F8FAFC or #FFFFFF
```

Clean, Apple-style minimalism

------

# 🔤 TYPOGRAPHY

### Headline Font

- **Manrope**
- Weight: 600–700

### Body Font

- **Inter**
- Weight: 400–500

------

### Scale

```css
H1: 32–40px
H2: 24–28px
Body: 14–16px
Label: 12px
```

------

# 🧩 COMPONENT SYSTEM (CLAUDE MUST FOLLOW)

## 🧱 Layout Structure

### Desktop

```plaintext
-----------------------------------------
| Header                                |
-----------------------------------------
| Step Content        | Summary Panel   |
|                     |                |
|                     |                |
-----------------------------------------
```

------

### Mobile

```plaintext
-----------------------------------------
| Header                                |
-----------------------------------------
| Step Content                          |
-----------------------------------------
| Sticky Summary Drawer                |
-----------------------------------------
```

------

# 🧭 NAVIGATION

### Header

Left:

- Logo (use provided)

Right:

- Help / Chat
- Progress indicator

------

# 🧱 CORE UI COMPONENTS

## 1. Step Card

```plaintext
----------------------------------
| ICON   Title                    |
| Description                    |
|                                |
| [Toggle / Options]             |
----------------------------------
```

### Style

- Background: white
- Border radius: 12px
- Shadow: subtle
- Padding: 16–20px

------

## 2. Toggle

```plaintext
OFF: Gray (#77777A)
ON: Blue (#41A3D8)
```

------

## 3. Buttons

### Primary Button

```css
background: #193359;
color: white;
border-radius: 8px;
```

------

### Secondary Button

```css
border: 1px solid #193359;
color: #193359;
```

------

### Final CTA (Submit)

```css
background: #CB2D27;
color: white;
```

------

## 4. Summary Panel (VERY IMPORTANT)

### Style

- Background: #FFFFFF
- Border-left: 2px solid #193359
- Sticky position

------

### Layout

```plaintext
Monthly Total: $XXX
One-Time: $XXX

-----------------------
Internet        $149
Phones (5)      $100
Security        $200
-----------------------
```

------

### Colors

- Labels: #77777A
- Prices: #193359
- Total: Bold + larger font

------

## 5. Progress Bar

```plaintext
Step 3 of 7
[====------]
```

Color:

- Filled: #41A3D8
- Empty: light gray

------

# 🧠 UX RULES (NON-NEGOTIABLE)

## 1. ONE DECISION PER STEP

No clutter
No multi-category pages

------

## 2. INSTANT FEEDBACK

Every selection:

- Updates price immediately
- Highlights selection

------

## 3. PROGRESS VISIBILITY

User always knows:

- Where they are
- What’s next

------

## 4. DEFAULTS PRE-SELECTED

Example:

- Internet = 1 Gig pre-selected
- Phones = 3 lines

👉 Reduces friction

------

## 5. MICROCOPY (VERY IMPORTANT)

Each step must include:

```plaintext
Short explanation:
"Best for small teams needing fast, reliable internet."
```

------

# 🖼️ LANDING PAGE WIREFRAME (CLAUDE)

```plaintext
-------------------------------------------------
| LOGO                              HELP         |
-------------------------------------------------

| HEADLINE                         | IMAGE       |
| One Platform. Everything         | (abstract   |
| Your Business Needs              |  tech art)  |
|                                  |             |
| [ Build My Solution ]            |             |
-------------------------------------------------

| 3 BENEFITS ROW                                   |
| Energy | Connectivity | Security                |
-------------------------------------------------
```

------

# ⚙️ FINAL BUILD SPEC (REPLIT)

## Stack

- React
- Tailwind
- No backend required (use webhook/email)

------

## File Structure

```plaintext
/src
  /components
    LandingPage.jsx
    BusinessForm.jsx
    StepWizard.jsx
    StepCard.jsx
    SummaryPanel.jsx
    QuotePage.jsx
```

------

## State Model

```js
const state = {
  business: {
    name: "",
    address: "",
    employees: 10
  },
  services: {
    energy: false,
    internet: "1gig",
    ai: false,
    wifi: false,
    phones: 3,
    contactCenter: {
      type: null,
      agents: 0
    },
    security: true
  }
}
```

------

## Pricing Engine (Simple)

```js
function calculateTotal(state) {
  let monthly = 0
  let oneTime = 0

  if (state.services.energy) oneTime += 2000
  if (state.services.internet === "1gig") monthly += 149

  monthly += state.services.phones * 20
  monthly += state.business.employees * 15

  return { monthly, oneTime }
}
```

------

# 🧪 TEST CHECKLIST (TONIGHT)

Before demo:

-  Flow works end-to-end
-  Pricing updates instantly
-  No dead clicks
-  Mobile works
-  Submit sends data
-  UI matches brand colors

------

# 🔥 FINAL NOTE (IMPORTANT)

This is now:

✅ Design-complete for Claude
✅ Build-ready for Replit
✅ Demo-ready for tomorrow

------

## If you want next level (fast)

I can now generate:

1. ✅ **Claude prompt to generate UI screens instantly**
2. ✅ **Replit full React starter code**
3. ✅ **Live pricing JSON**
4. ✅ **Clickable wireframes**

Just say:
👉 “Build the Replit app” or
👉 “Give me Claude UI prompt”