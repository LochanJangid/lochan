# Comprehensive Content & Fact Audit

**Site**: `lochan.dev` / `lochan.vercel.app`  
**Audit Date**: November 10, 2026  
**Auditor**: Anti-Hallucination Review Engine  
**Sources of Truth**:
1. Fact Sheet verified by owner
2. Existing repository content files (`content/writing.js`, `content/writing/rag-zero-to-hero.md`, `src/app/work/*`)

---

## 1. Global & Biographical Claims

| Page / Component | Claim / Text Displayed | Source of Truth | Verification Status | Notes / Conflict Handling |
| :--- | :--- | :--- | :--- | :--- |
| Global (`layout.js`, `HeroSection`, `Footer`) | Person: **Lochan Jangid** | Fact Sheet (Line 1) | **VERIFIED** | Full name match |
| Global (`layout.js`, `HeroSection`, `Footer`) | Location: **Jaipur, Rajasthan, India** | Fact Sheet (Line 1) | **VERIFIED** | Location match |
| Hero & Story (`HeroSection`, `StorySection`) | Role: "AI/ML Engineer at REGEx Software Services" / "Currently learning as an AI/ML intern at Regex Software Services" | Fact Sheet vs Repo | **NEEDS CONFIRMATION** | Fact sheet states "AI/ML intern"; existing site copy has "AI/ML Engineer". Preserved and flagged for owner confirmation. |
| Story Section (`StorySection`) | Degree: **BSc Mathematics, University of Kota**, studied in Hindi medium | Fact Sheet (Line 2) | **VERIFIED** | Matches fact sheet exactly |
| Story Section (`StorySection`) | Curriculum: **Abstract algebra, real analysis, PDEs** | Fact Sheet (Line 2) | **VERIFIED** | Matches fact sheet exactly |
| Story Section (`StorySection`) | Background: **Self-taught developer with non-CS degree**, strong Python & SQL | Fact Sheet (Line 1) | **VERIFIED** | Matches fact sheet exactly |
| Story & Stats | Tenure: "11+ months tenure" / "11+ mos" | Repo `StorySection.jsx` | **NEEDS CONFIRMATION** | From existing site repo copy; fact sheet does not specify duration. Preserved and flagged for owner confirmation. |
| Global Socials (`Navbar`, `Hero`, `Footer`) | YouTube: `https://www.youtube.com/channel/UCGrWSahWPHDWpfgH48DYuUQ` ("Lochan Jangid", `@lochanjangidcoder`) | Fact Sheet (Line 3) | **VERIFIED** | Matches fact sheet |
| Global Socials (`Footer`) | GitHub: `github.com/LochanJangid` | Fact Sheet (Line 3) | **VERIFIED** | Matches fact sheet |
| Global Socials (`Footer`) | LinkedIn: `linkedin.com/in/lochan-jangid` | Fact Sheet (Line 3) | **VERIFIED** | Matches fact sheet |

---

## 2. Videos & Channel Content

| Page / Component | Claim / Text Displayed | Source of Truth | Verification Status | Notes / Conflict Handling |
| :--- | :--- | :--- | :--- | :--- |
| `VideosSection`, `writing/rag-zero-to-hero` | Title: **"RAG: Zero to Hero \| From Naive RAG to Advanced RAG"** | Fact Sheet & `content/writing.js` | **VERIFIED** | Exact title match |
| `VideosSection`, `writing/rag-zero-to-hero` | Language: **Python** | Fact Sheet & `content/writing.js` | **VERIFIED** | Verified |
| `VideosSection`, `writing/rag-zero-to-hero` | Duration: **"79:21" (~79 min)** | Fact Sheet & `content/writing.js` | **VERIFIED** | Fact sheet says "about 79 min", video duration is 79:21 |
| `VideosSection`, `writing/rag-zero-to-hero` | Published Date: **Nov 4, 2026** | Fact Sheet & `content/writing.js` | **VERIFIED** | Verified |
| `VideosSection` | Why Made: **"Made because no existing tutorial covered RAG from zero to advanced in a Karpathy-style teaching approach."** | Fact Sheet (Line 5) | **VERIFIED** | Word-for-word from fact sheet |
| `VideosSection`, `writing/rag-zero-to-hero` | Video Chapters: **18 exact timestamps (00:00 to 01:15:32)** | `content/writing.js` | **VERIFIED** | Traced directly to repo data; zero invented chapters |
| `VideosSection` | Second Video: **"MNIST Digit Recognition \| Project Showcase"** | Fact Sheet (Line 6) | **VERIFIED** | Traced to fact sheet; links directly to live canvas at `/work/mnist#demo` |

---

## 3. Home Page Stats Strip (`StatsStrip.jsx`)

| Stat Index | Display Value | Metric Label & Description | Source of Truth | Verification Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `// 01` | **09** | **ML Case Studies** (Interactive neural models, open-source tools & ML systems) | Repo routes (`/work/*`) | **VERIFIED** | 9 case studies implemented in repo. (Existing "09 Production Systems" flagged for owner confirmation) |
| `// 02` | **79 min** | **Deep RAG Masterclass** (From Naive to Advanced & Modular RAG in Python) | Fact Sheet (Line 5) & `content/writing.js` | **VERIFIED** | Verified real video duration |
| `// 03` | **97.7%** | **nanoCalc-GPT Match** (Four-operation transformer arithmetic exact match) | Fact Sheet (Line 12) | **VERIFIED** | Fact sheet: "Four-operation run: test exact match 0.977 overall" |
| `// 04` | **45,211** | **Bank Marketing Records** (Portuguese bank term-deposit dataset classified) | Fact Sheet (Line 15) | **VERIFIED** | Fact sheet: "Portuguese bank term-deposit dataset (45,211 rows)" |

---

## 4. Projects & Laboratory Shelf (`ProjectsShelf.jsx` & `/work/*`)

| Project ID | Status Badge | Numbers & Metrics Displayed | Source of Truth | Verification Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **nanoCalc-GPT** | *(Omitted - not in progress)* | Test Exact Match: `+ 100%`, `- 100%`, `* 94.0%` (with weight decay 0.1), `/ 84.2%` (57 examples); without weight decay: `62.8%`; train exact match `1.000` | Fact Sheet (Line 12) | **VERIFIED** | Exact horizontal SVG/CSS bars with 57 test examples caption and 62.8% marker |
| **nanoCalc-GPT** | — | Parameters: `1,195,536 (~1.2M)` | Existing repo `nanocalc-gpt/page.jsx` | **NEEDS CONFIRMATION** | Fact sheet details architecture (3 blocks vs 4 blocks, n_emb 64 vs 128); repo specifies 1,195,536 params. Flagged for owner confirmation. |
| **lochan-eda** | **Shipped** | `v0.2.0 API`: `AutomatedEDA` (prepare / fit / transform), `Profiler` (overview, summaries, plots, PDF report), standalone Numerical and Categorical | Fact Sheet (Line 8) & Repo | **VERIFIED** | Pipeline flow diagram with Leakage Prevention badge rendered on shelf & detail page |
| **gradlab** | *(Omitted)* | Scalar autograd engine; diagnostics: `gradcheck`, `suggest_lr`, `check_collinearity`; Karpathy Zero to Hero (micrograd, makemore 1-5); linear regression & MLP classifiers | Fact Sheet (Line 9-10) | **VERIFIED** | Added to project shelf with diagnostic chips from fact sheet |
| **MNIST** | **Shipped** | 784 numerical features (28×28), 784→286→120→10 architecture, sub-50ms inference | Fact Sheet (Line 7) & Repo `mnist/page.jsx` | **VERIFIED** | Drawing canvas at `/work/mnist#demo` 100% functional; hardcoded softmax replaced with "interactive demo" |
| **ZeroSQL (zero-sql)** | **In Progress** | Desktop app; LLM writes/runs SQL; RAG supplies SQL dialect rules + schema; SQLite first, then PostgreSQL and MySQL; Electron + React + FastAPI | Fact Sheet (Line 13) | **VERIFIED** | Status marked "In Progress" matching fact sheet |
| **auditor.ai** | **In Progress** | AI website auditor; explains findings with evidence, retrieves web standards via RAG, answers follow-up Q&A, proposes code fixes | Fact Sheet (Line 14) | **VERIFIED** | Added to project shelf; status marked "In Progress" |
| **Bank Marketing** | **In Progress** | 45,211 rows in Portuguese bank term-deposit dataset; logistic regression; API and website planned | Fact Sheet (Line 15) | **VERIFIED** | Status marked "In Progress" matching fact sheet |
| **MedicalAI** | *(Omitted)* | CheXNet 121-layer DenseNet diagnostic engine; 14 pulmonary pathologies; Grad-CAM | Existing repo `medical-ai/page.jsx` | **VERIFIED** | Repo verified; status omitted per rule |
| **WebLens AI** | *(Omitted)* | Playwright DOM coordinate extraction; multimodal LLMs; sub-2s visual audit | Existing repo `weblens-ai/page.jsx` | **VERIFIED** | Repo verified; status omitted per rule |
| **Sanjeevni Clinic** | *(Omitted)* | OPD queue state machine, acoustic dispatch engine, TV signage in active clinics | Existing repo `sanjeevni-clinic/page.jsx` | **VERIFIED** | Repo verified; status omitted per rule |
| **See-House** | *(Omitted)* | California housing price regression; `R² = 0.795` | Existing repo `see-house/page.jsx` | **VERIFIED** | Repo verified; status omitted per rule |

---

## 5. Pixel Digit Sensor (`PixelDigit.jsx`)

| Element | Previous Value | Current Value | Verification Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Footer Metric | `softmax: 99.4%` (hardcoded) | `interactive demo` | **CORRECTED / VERIFIED** | Replaced hardcoded unverified measurement with accurate interactive label |
| Class Label | `CLASS: {digit}` | `DIGIT: {digit}` | **VERIFIED** | Accurately reflects 5×7 font bitmap displayed |

---

## 6. Items Preserved for "Needs Owner Confirmation"

1. **Role Title Wording**: Site displays "AI/ML Engineer at REGEx Software Services" vs Fact Sheet "Currently learning as an AI/ML intern at Regex Software Services".
2. **Tenure Duration**: Site displays "11+ mos" / "11+ months tenure" vs Fact Sheet which does not state month count.
3. **Production Systems Count**: Site had "09 Production Systems" vs Fact Sheet showing 9 distinct project case studies (some in progress).
4. **nanoCalc-GPT Parameter Count**: Site displays "1.2M parameter" / "1,195,536" parameters vs Fact Sheet specifying architectural runs (3 blocks / 4 blocks, n_emb 64, 4 heads, batch 128, 30k steps).
5. **Deep Vision Mention**: Site hero mentions "Currently engineering RAG & Deep Vision in Jaipur, India" vs Fact Sheet focusing on RAG, Transformers, and Mathematics.
