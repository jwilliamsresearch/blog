---
layout: post
title: "Teaching in the Open: Why I Put My Lectures Online"
subtitle: "Rethinking accessibility, openness, and pedagogy in digital teaching"
lead: "Lecture slides are rarely neutral artefacts: they embody choices about what knowledge is shared, how it is structured, and who has access to it. By publishing my teaching openly with Reveal.js, I am exploring how digital tools can reshape the relationship between lecturer, student, and wider community."
brief: "A reflection on why I use Reveal.js to share my lectures online, the pedagogical values this expresses, and how open materials contribute to accessibility, transparency, and the evolving role of the university."
author: J. Williams
tags: Teaching Reveal.js OnlineLearning OpenEducation Pedagogy
displaytheme: '#41b9c2ff'
maskimage: lectures-online.png
icon: bi-journal-text
---
Traditional lecture slides often remain locked away in virtual learning environments, visible only to enrolled students. This model assumes that knowledge is a scarce commodity to be protected. In reality, restricting access narrows the potential audience and reinforces the divide between formal education and the wider public. By placing my lectures online, I am deliberately questioning this boundary and treating teaching as part of the broader knowledge commons.

## Why Reveal.js

Reveal.js is more than a convenient platform. Built on open web standards, it allows lectures to be read on any device, embedded with code or media, and versioned publicly on GitHub. The choice of technology is not incidental: the medium itself mirrors the pedagogical values I want to communicate — accessibility, adaptability, and transparency. The lecture is no longer a static handout, but a living, interactive document, one that students can engage with on their own terms and that fellow educators can adapt or extend. In this way, the form of the lecture becomes as open as the content it carries.

## Openness as Practice

Openness is not an abstract aspiration but a tangible practice with everyday benefits. Students can revisit concepts at their own pace, without barriers of logins or restricted platforms. Prospective learners gain a glimpse of the curriculum and ethos of the institution, while colleagues across disciplines can borrow or reframe materials. This permeability reflects what some scholars have described as the “porous university”: a model where knowledge circulates freely, resisting the neat boundaries of classroom walls. Publishing lecture content openly is therefore not just a technical choice but a philosophical stance on what it means to teach in the digital age.

## Shifting the Role of the Lecturer

At the same time, making lecture materials public reshapes the role of the lecturer. No longer the sole gatekeeper of content, the lecturer becomes a curator, framing materials for multiple audiences simultaneously. This resonates with broader trends in open science and open pedagogy, where reproducibility and transparency are valued alongside authority. The openly published lecture thus takes on the character of an academic artefact in its own right, situated between teaching and scholarship. It demands rigour, clarity, and accessibility — qualities that benefit both students and the wider academic community.

## Workflow and Accessibility

My workflow reflects these commitments in practice. I write in Markdown to keep the source simple and durable, render slides through Reveal.js with plugins for navigation and notes, and store the source in Git. Each lecture has a stable URL, can be exported to PDF for revision and accessibility, and carries an explicit licence and attribution policy. Accessibility is integral: headings and alt text support screen readers, colour choices follow contrast guidance, and slides can be navigated entirely by keyboard.

What excites me most is that Reveal.js is not limited to static text and images. I can demonstrate live CSS examples directly within the slides, showing how a single change in code alters the layout or colours of a webpage in real time. In data-driven modules, I can embed Chart.js diagrams that animate as values update, helping students see immediately how an algorithm or dataset is behaving. For geospatial teaching, I can drop in a Leaflet map that students can pan and zoom, overlaying live spatial data rather than relying on screenshots. These forms of interactivity bridge the gap between explanation and demonstration, allowing the lecture itself to become a working lab environment.

<figure class="text-center">
	<img src="{{ site.baseurl }}/images/titles/{{ page.maskimage }}" alt="{{ page.title }} — cover image" />
	<figcaption class="mt-2">Cover image for this post, representing a lecturer using a laptop.</figcaption>

</figure>

## Managing Risks

Of course, openness introduces risks. Materials may circulate out of context, intellectual property can be uncertain, and version drift across module iterations is inevitable. I address these by adding framing notes, citing or linking to third-party content carefully, dating releases, and clarifying which version applies to assessment. Crucially, publishing slides does not replace the dynamics of the classroom. Polls, discussions, and collaborative whiteboarding remain central; the slides are a complement, not a substitute, for the live experience.

## Looking Ahead

Looking ahead, I see possibilities for building even richer interactivity into my lectures. I want to expand the use of embedded coding sandboxes where students can try small edits and immediately see results. I am exploring ways to combine Chart.js visualisations with live datasets that update as the lecture unfolds. And for my geospatial work, the potential of linking Reveal.js to real-time Leaflet layers — such as OpenStreetMap or environmental feeds — opens new opportunities for teaching data as lived, dynamic, and contextual. These are not simply technical upgrades but ways of reimagining what it means to lecture in a digital age. At stake is more than convenience: it is a commitment to teaching as a public, accessible, and evolving practice.

## Explore My Lectures

If you would like to see how this approach works in practice, my current lecture slides are openly available at [**jwilliams.science/lectures**](https://jwilliams.science/lectures/). These cover modules in web design, cybersecurity, and computer science fundamentals, and will continue to grow as I extend my commitment to teaching in the open.
