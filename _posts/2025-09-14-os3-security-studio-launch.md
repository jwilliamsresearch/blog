---
layout: post
title: "OS³: Open Source Security Studio - Launching A Hands-On Cybersecurity Teaching Platform"
subtitle: "Deliberately vulnerable, modular, and instructor-friendly labs for cyber security education and engagement"
lead: "OS³ (Open Source Security Studio) is a free, open-source platform for teaching cyber security through safe, practical labs. Built in Python/Flask for CMU540 at Birmingham Newman University and STEM outreach, it offers paired insecure vs. secure demos of common vulnerabilities and network security simulations."
brief: "Explore OS³: an open teaching platform with modular labs covering SQLi, XSS, CSRF, SSRF, access control, cryptography, logging, monitoring, and network defence. Ideal for higher education, professional upskilling, and community workshops."
author: J. Williams
tags: OS3 Cybersecurity Teaching OpenSource Flask SecurityLabs CMU540 Outreach
displaytheme: '#1f3c88'
maskimage: os3-studio.png
icon: bi-shield-lock
---
## Why OS³, Why Now?

OS³ (Open Source Security Studio) is a deliberately vulnerable, modular, and instructor‑friendly platform for teaching cyber security through direct, repeatable practice. It is purpose‑built for higher education, internal upskilling, and STEM outreach. For CMU540 (Computer Science) at Birmingham Newman University, OS³ provides a practical environment to link conceptual material to lived experience: learners don’t just read about vulnerabilities—they exploit them safely, then fix them in place.

You’ll find paired “insecure vs. secure” implementations of core topics (e.g., SQL injection, XSS, CSRF, SSRF, access control, crypto practices, logging/monitoring) and network security labs (protocol security, port scanning, DNS security, traffic analysis, firewall simulation). Each module is tightly scoped and runs locally, making it ideal for a 3 hour minute seminar, a flipped‑classroom activity, or a guided workshop with community groups.

OS³ is written in Python with Flask and uses a simple SQLite database to keep the stack approachable. The code is designed to be read and extended by students. Instructors can highlight exactly where a vulnerability lives in the code and how secure remediation differs, line‑by‑line.

Key scaffolding design choices:

- Paired demos: Every concept comes with an insecure route/page and a secure route/page, so learners see both sides.
- Minimal dependencies: Small, clear Python stack—easy to run on Windows (PowerShell), macOS, or Linux.
- Transparent pedagogy: Each route maps to a template, a blueprint, and a specific risk with intentionally readable code.
- Extensible modules: Add a new blueprint with a couple of files and it’s part of the app.

OS³ is free and open source. Code is MIT‑licensed; learning content is CC BY 4.0. Use it, adapt it, and please credit the project when you share.

<figure class="text-center my-3">
    <img src="{{ site.baseurl }}/images/posts/2025-09-15/os3-cybersec.png" alt="OS³ security studio overview" class="img-fluid rounded" />
    <figcaption class="small text-muted mt-2">OS³ overview — modular labs for web and network security teaching.</figcaption>
    </figure>

## Getting Started on Windows (PowerShell)

Prerequisites:

- Python 3.8+ installed and on PATH
- 4 GB RAM, ~2 GB free disk space
- A modern web browser

Clone and run locally in Windows PowerShell:

```powershell
# 1) Clone the repository
git clone https://github.com/jwilliamsresearch/os3-security-studio.git
cd os3-security-studio

# 2) Create and activate a virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# 3) Install dependencies
pip install -r requirements.txt

# 4) Launch the platform
python app.py

# 5) Open your browser and visit
# http://localhost:5000
```

You can also use `run.bat` if present in the repository root.

Default demo credentials (for quick trials and demos):

- Admin: `admin` / `admin123`
- Student: `testuser` / `password`
- Demo: `john` / `weak`

Note: These credentials are intentionally weak—only use them in this simulated environment.

## How the Platform Is Organised

OS³ follows Flask’s application factory pattern. The main entry point is `app.py`, which calls `create_app()` from `app/__init__.py`. Blueprints register individual modules with clear URL prefixes; templates live under `templates/` and static assets under `static/`.

At a glance:

- App entry point: `app.py`
- App factory and blueprint wiring: `app/__init__.py`
- SQLite setup and seed data: `app/models/database.py`
- Per‑topic routes: `app/routes/*.py`
- Utilities (auth, security headers): `app/utils/*.py`
- Templates: `templates/`
- Static: `static/`

The following sections walk module‑by‑module through what’s available and how to use it in class.

## Core Web Security Modules

Each web module has two sides: an insecure implementation that exposes a vulnerability, and a secure one that demonstrates mitigation. You’ll find the code in `app/routes/` and the paired templates under `templates/<topic>/`.

<div class="container my-3">
    <div class="row g-3 text-center">
        <div class="col-12 col-md-4 ">
            <img src="{{ site.baseurl }}/images/posts/2025-09-15/os3-security-1.gif" alt="OS³ demo clip 1" class="img-fluid rounded" />
            <div class="small text-muted mt-1">Animated GIF showcasing a XSS attack demo in OS³.</div>
        </div>
        <div class="col-12 col-md-4">
            <img src="{{ site.baseurl }}/images/posts/2025-09-15/os3-security-2.gif" alt="OS³ demo clip 2" class="img-fluid rounded" />
            <div class="small text-muted mt-1">Animated GIF showcasing cryptographic demonstration in OS³.</div>
        </div>
        <div class="col-12 col-md-4">
            <img src="{{ site.baseurl }}/images/posts/2025-09-15/os3-security-3.gif" alt="OS³ demo clip 3" class="img-fluid rounded" />
            <div class="small text-muted mt-1">Animated GIF showcasing port scanning in OS³.</div>
        </div>
    </div>
    </div>

### 1) SQL Injection

- Routes: `app/routes/sql_injection.py`
- Templates: `templates/sql_injection/`
- URL: `/sql-injection/` → Insecure: `/insecure`, Secure: `/secure`

Insecure implementation illustrates string concatenation in SQL queries:

```python
# app/routes/sql_injection.py (insecure path)
sql = f"SELECT username, email, role FROM users WHERE username LIKE '%{query}%'"
cursor.execute(sql)
```

Secure implementation uses parameterised queries:

```python
sql = "SELECT username, email, role FROM users WHERE username LIKE ?"
cursor.execute(sql, (f'%{query}%',))
```

Classroom use:

- Task students with crafting a payload that returns all users from the insecure path.
- Then ask them to explain exactly why the secure path is resistant.
- Extension: Add input validation and least‑privilege DB accounts to a checklist.

### 2) Cross‑Site Scripting (XSS)

- Routes: `app/routes/xss.py`
- Templates: `templates/xss/`
- URL: `/xss/` → Insecure: `/insecure`, Secure: `/secure`

The insecure version stores comments verbatim; the secure path sanitises user input with `bleach.clean` and allows a minimal tag set:

```python
comment = bleach.clean(comment, tags=['b', 'i', 'em', 'strong'], strip=True)
```

Classroom use:

- Show reflected vs. stored XSS using the comment board.
- Ask students to propose a safe rich‑text policy and justify allowed tags/attributes.

### 3) Cross‑Site Request Forgery (CSRF)

- Routes: `app/routes/csrf.py`
- Utilities: `app/utils/auth.py`
- URL: `/csrf/` → Insecure: `/insecure`, Secure: `/secure`

The secure variant issues and validates a CSRF token for state‑changing operations (e.g., a mock “transfer”):

```python
# Token management in app/utils/auth.py
def generate_csrf_token():
    if 'csrf_token' not in session:
        session['csrf_token'] = secrets.token_hex(16)
    return session['csrf_token']
```

Classroom use:

- Demonstrate a forged form that silently triggers a transfer on the insecure path.
- Compare with the secure path where token validation blocks the attempt.

### 4) Authentication and Password Policy

- Routes: `app/routes/auth.py`
- Templates: `templates/auth/` and `templates/login.html`
- URL: `/auth/` → Login: `/login`, Insecure register: `/insecure-register`, Secure register: `/secure-register`

The insecure registration barely validates inputs; the secure path enforces strong password requirements using regular expressions (uppercase/lowercase/number/special character, min length).

```python
if not re.search(r'[A-Z]', password):
    flash('Password must contain at least one uppercase letter!', 'danger')
```

Classroom use:

- Compare usability vs. security: what’s a reasonable minimum policy?
- Extension: Discuss MFA design and add a TOTP proof‑of‑concept.

### 5) Access Control and IDOR

- Routes: `app/routes/access_control.py`
- Templates: `templates/access_control/`
- URL: `/access-control/` → Insecure: `/insecure/<user_id>`, Secure: `/secure/<user_id>`

The insecure view returns any user by ID to any logged‑in user—an Insecure Direct Object Reference. The secure route checks `session['user_id']` before serving data.

Classroom use:

- Have students attempt to access another user’s profile.
- Mitigation: Enforce ownership checks and least privilege.

### 6) Sensitive Data Exposure

- Routes: `app/routes/data_exposure.py`
- Templates: `templates/data_exposure/`
- URL: `/data-exposure/` → Insecure: `/insecure`, Secure: `/secure`

The insecure path returns password hashes alongside usernames and emails; the secure path returns only the minimal fields required for the UI. Great for teaching “data minimisation.”

### 7) File Upload Security

- Routes: `app/routes/file_upload.py`
- Templates: `templates/file_upload/`
- URL: `/file-upload/` → Insecure: `/insecure`, Secure: `/secure`

The insecure path trusts filenames and accepts any extension; the secure variant uses `werkzeug.utils.secure_filename` and a small allowlist (`txt`, `png`, `jpg`, etc.), appending a timestamp to avoid collisions.

Classroom use:

- Show path traversal and dangerous extensions conceptually; discuss server‑side scanning and content sniffing.

### 8) Server‑Side Request Forgery (SSRF)

- Routes: `app/routes/ssrf.py`
- Templates: `templates/ssrf/`
- URL: `/ssrf/` → Insecure: `/insecure`, Secure: `/secure`

The insecure fetcher requests any URL. The secure fetcher validates scheme, blocks localhost/private ranges, and whitelists domains:

```python
if parsed.scheme not in ['http', 'https']:
    return jsonify({'error': 'Only HTTP and HTTPS protocols are allowed'}), 400

if _is_private_or_localhost(parsed.hostname):
    return jsonify({'error': 'Access to private/localhost addresses is not allowed'}), 400
```

Classroom use:

- Discuss cloud metadata endpoints and network egress controls.
- Extend the allowlist, then test bypasses (redirects, DNS rebinding) in theory.

### 9) Cryptography: Weak vs. Strong Practices

- Routes: `app/routes/crypto.py`
- Templates: `templates/crypto/`
- URL: `/crypto/` → Insecure and secure APIs

The insecure routes demonstrate MD5/SHA1 hashing and XOR “encryption” with a hardcoded key (all bad ideas). The secure routes demonstrate bcrypt and PBKDF2 for hashing and Fernet (AES‑128‑CBC + HMAC) for authenticated encryption with proper key derivation.

Discussion prompts:

- What makes a good password hashing strategy? Why is a per‑password salt required?
- Why does Fernet include authentication (HMAC) and why does that matter?

### 10) Security Headers and Browser Defences

- Utility: `app/utils/security_headers.py`

Every response receives a modern baseline of security headers (CSP, HSTS, Referrer‑Policy, X‑Content‑Type‑Options, X‑Frame‑Options, legacy X‑XSS‑Protection). You can show how these mitigate injection, clickjacking, and mixed content risks while acknowledging tradeoffs for labs that use inline scripts/styles.

```python
response.headers['Content-Security-Policy'] = (
    "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; "
    "font-src 'self'; img-src 'self' data:; connect-src 'self'"
)
```

### 11) Security Logging and Monitoring

- Routes: `app/routes/logging_monitoring.py`
- Templates: `templates/logging_monitoring/`
- URL: `/logging_monitoring/` → Insecure and secure logging demos

Demonstrates the difference between poor logging (only generic errors) and security‑aware logging with relevant context (IP, user, session, attack type). Includes simulated anomaly detection and alert generation endpoints for teaching triage.

## Network Security Modules

These modules simulate common blue‑team and red‑team activities without touching your real network. Everything is deterministic and viewable in the browser.

### 12) Protocol Security: HTTP vs. HTTPS and MITM

- Routes: `app/routes/network_protocols.py`
- Templates: `templates/network/`
- URL: `/protocol-security/`

Learners submit credentials via an “HTTP” form (insecure path), then view a simulated “intercepted” payload and headers. The secure path shows base64‑encoded payload and a simulated TLS session. There’s also a guided man‑in‑the‑middle (MITM) simulation explaining attacker steps and outcomes.

Suggested activity:

- Capture two submissions—insecure vs. secure—and compare what an attacker observes.
- Discuss where TLS terminates in real systems and what still needs hardening.

### 13) Port Scanner Simulation + Defences

- Routes: `app/routes/port_scanner.py`
- Templates: `templates/network/`
- URL: `/port-scanning/`

Simulates TCP connect, SYN/FIN/NULL/XMAS stealth scans, and UDP quirks; returns banners and statuses from a curated set of common ports. Includes a defence dashboard (rate limiting, IDS, honeypots, etc.) and “stealth scanning” page with evasion techniques.

Teaching angle:

- Highlight why stealth scans are less reliable and how defenders catch them (pattern/rate analysis).

### 14) DNS Security: Lookup, Poisoning, Tunnelling, Secure DNS

- Routes: `app/routes/dns_security.py`
- Templates: `templates/network/`
- URL: `/dns-security/`

Learners perform mock lookups, poison a simulated cache, observe consequences, and try DNS tunnelling for “data exfiltration” (encoded and chunked). A “secure DNS” view summarises DoH/DoT/DNSSEC tradeoffs.

Discussion:

- Explain cache poisoning race conditions and how DNSSEC helps (signatures vs. encryption).

### 15) Traffic Analysis and Network Forensics

- Routes: `app/routes/traffic_analysis.py`
- Templates: `templates/network/`
- URL: `/traffic-analysis/`

Creates realistic packet logs (normal and suspicious), exposes live traffic via API for dashboards, and includes guided forensics scenarios (data breach, malware C2, reconnaissance). This is perfect for a capstone practical where students must describe indicators and propose controls.

### 16) Firewall Rule Simulation

- Routes: `app/routes/firewall_sim.py`
- Templates: `templates/network/`
- URL: `/firewall/`

An interactive firewall rule set with allow/deny/log actions, priorities, and testing. Students submit a “packet” and see which rule matched and why. There are also scenario presets (DMZ, VPN, web server), a logs view, and a rule analysis endpoint for conflicts/redundancies.

## Teaching Notes and Pedagogy

- Constructive alignment: Each lab links a learning outcome to a concrete artefact (exploit, fix, explanation). Marking can target correctness, clarity, and ethical framing.
- Cognitive apprenticeship: Instructors “think aloud” by stepping through `app/routes/<topic>.py` during demos, then students practice similar reasoning on a different module.
- Secure by default: The global security headers middleware (`app/utils/security_headers.py`) enables a conversation on platform‑level controls vs. per‑route protections.
- Ethics first: Every lab should restate the rules—do not attack systems you don’t own; this environment is for learning only.
- Accessibility: Templates use Bootstrap and clear language; the UI is designed for live teaching and remote study.

## For Outreach and Community Workshops

OS³ works well at open days, schools, and public hackathons. Tips:

- Use the side‑by‑side insecure/secure flows to keep the story clear.
- Pre‑provision laptops or a lab VM image with `python` and dependencies.
- Start with HTTP vs. HTTPS and XSS—those are the most visual and intuitive.
- Include a short ethics segment: permission, legality, and responsible disclosure.
- Ask volunteers to “explain it back” to test understanding and build confidence.

<figure class="text-center my-3">
    <img src="{{ site.baseurl }}/images/posts/2025-09-15/os3-logo.png" alt="OS³ security studio logo" class="img-fluid rounded" style="max-width: 200px !important;" />
    <figcaption class="small text-muted mt-2">OS³ security studio logo.</figcaption>
    </figure>

## Extending OS³ (Add Your Own Module)

Create a new blueprint and templates in four small steps:

1) Create a routes file, e.g., `app/routes/session_management.py`:

```python
from flask import Blueprint, render_template

session_mgmt_bp = Blueprint('session_mgmt', __name__)

@session_mgmt_bp.route('/')
def index():
    return render_template('session_mgmt/index.html')

@session_mgmt_bp.route('/insecure')
def insecure():
    # Show insecure behaviour (e.g., predictable session IDs)
    return render_template('session_mgmt/insecure.html')

@session_mgmt_bp.route('/secure')
def secure():
    # Show secure behaviour (e.g., HttpOnly/SameSite cookies, rotation)
    return render_template('session_mgmt/secure.html')
```

2) Register the blueprint in `app/__init__.py` with a sensible URL prefix.
3) Add templates under `templates/session_mgmt/` (`index.html`, `insecure.html`, `secure.html`).
4) If you need data, add a table to `app/models/database.py` and seed it with safe demo content.

Keep the “paired demo” pattern and align with a specific learning objective.

## Assessment Ideas and Rubrics

When grading CMU540 practicals, focus on:

- Accuracy: Does the student correctly identify the flaw and the fix?
- Evidence: Do they show inputs/outputs, screenshots, and code references?
- Clarity: Can they explain the why, not just the what?
- Ethics: Do they frame actions within an ethical, legal context?
- Reflection: Can they generalise the principle to new systems?

## Operational Notes

- Database: `app/models/database.py` initialises `cyber_lab.db` with demo users, comments, and file metadata. It uses `werkzeug.security.generate_password_hash` to seed non‑reversible hashes.
- Security headers: `app/utils/security_headers.py` applies CSP, HSTS, X‑Frame‑Options, etc. These are educational defaults—perfect for labs; tweak as needed when adding custom JS.
- Sessions and CSRF: `app/utils/auth.py` manages login checks and CSRF token utilities for secure flows.
- Requirements: See `requirements.txt`. The footprint is intentionally small: Flask, bleach, requests, bcrypt, cryptography, PyYAML.

## Licensing and Attribution

- Code: MIT License
- Educational content and this article: CC BY 4.0

Please attribute “OS³: Open Source Security Studio” and Dr. James Williams when you adapt or share materials.

## Contributing and Support

Contributions are welcome—especially new modules, clearer templates, and teaching notes. To contribute:

1) Fork the repository and create a feature branch.
2) Keep modules small, readable, and paired (insecure/secure).
3) Include minimal templates and a short README snippet for your module.
4) Open a pull request with a brief teaching rationale.

Issues and discussions:

- GitHub Issues: bug reports and enhancements
- GitHub Discussions: pedagogy, outreach ideas, module requests

## Final Thoughts

Security education thrives on visibility. OS³ lets learners see, touch, and reason about vulnerabilities with code right in front of them. For CMU540, these modules can anchor weekly labs, revision sessions, and assessed practicals. For outreach, the same modules become interactive stories about how modern systems can fail and how we build them back safer and stronger.

If this studio helps your teaching or training, consider giving the repository a star and sharing your feedback. Your suggestions directly shape what gets added next.

Stay curious, stay ethical—and enjoy building secure systems.
