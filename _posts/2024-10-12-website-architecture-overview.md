---
layout: post
title: "My Website and Blog: Overview and Architecture"
subtitle: "An overview of my new academic portfolio website architecture, explaining the design considerations and organisation."
lead: "Over the past couple of months I have been re-designing and building a new online portfolio for my work. This article will explore my design choices and experience in developing jwilliams.science."
brief: "This article will explore my experience of developing a new website for use as my main portfolio of work. My previous website had been developed and not updated for roughly three years and the new website will support enhanced project and blog-based updates. This article shares a few thoughts about my experiences in designing the new online presence."
author: J. Williams
keywords: Website Development, Software Development, Personal Website
displaytheme: '#2d3142'
maskimage: architecture.png
icon: bi-file-earmark-code-fill
---
You may have realised while browsing this website that it has been recently updated from the version that I completed 3-years ago. The new website has been designed to enhance the presentation of research conducted and support more engaging overviews of my work. As part of this process, the website has undergone several improvements in technology and domain organisation.

My history of updating my own website has been poor, however, over the last few months I have been slowly building a series of new interfaces for presenting my research publications, research projects, and an informal blog. The current interface was selected due to the organised view and easy to understand structure. This will hopefully help me in focusing on producing content for the website as opposed to refactoring web pages. 

This article will briefly present the current status of the website architecture, explaining the choices made and highlighting my future focus.

[TOC]

### Purpose of Website

When considering the layout and design of the new website, I first had to consider what type of content would be displayed on it. The initial intention of the website was to present my recent projects and publications. 

My previous website had functionality of manually updating HTML code to update publications and HTML pages to update projects. This website uses [bibtex.js](https://github.com/pcooksey/bibtex-js) to automatically generate a list of publications from an associated .bib file. This improvement should mean that one GitHub change can update my list of publications. 

For project pages I retained the same HTML format as previous, updating the design to be more visually appealing through the use of background videos and longer write-ups. At present, I am continuing to update these write-ups to be accurate to the projects. Example pages include the [LWSWG](https://jwilliams.science/research/lwswg.html) and [Leisure Walking Framework](https://jwilliams.science/research/LeisureWalkingFramework.html) pages. 

### A Website Built for Projects

![Screenshot of the project pages layout showing the Leisure Walking Framework and LWSWG project pages.](../images/posts/2024-10-12/projects.png)

A question I asked myself while building this new website was if I wanted to use templates for project pages? 

If I had used templates the whole website could be published using Jekyll through GitHub Pages (More on this later), however, this approach would retain a similar style for each of the project pages. Instead, customised HTML pages were still used to enable future interactivity and individual page layouts to be used. 

These new project pages enable both long-term and short-term projects to be presented as part of the 'research' page of this website. The project can have a standalone theme while still matching with the overall style of the website. Each new page has serveral key elements including a header with dynamic video background, a infobox panel with short project details, and a main content location for the body text of the project. These project pages can now represent completed or ongoing work. 

### Dynamic Publication Display

Using the aforementioned [bibtex.js](https://github.com/pcooksey/bibtex-js) library a dynamic and scalable publication list could be formed, with each of my open access publication available to download through the associated links. 

This publication list is also able to display extended details of the publication including keywords and a citation for the relevant article. Each publication also links to the online location of the work or the DOI. Through this all being completed automatically, only a minimal amount of manual development (copying the .bib citation) is needed to update the list of publications. 

![Screenshot of the project pages layout showing the Leisure Walking Framework and LWSWG project pages.](../images/posts/2024-10-12/wordcloud.png)

Using the dynamic list of publications, I also impleted a dynamic word cloud based on the content of the article abstracts. The word cloud was implemented using [wordcloud2.js](https://github.com/timdream/wordcloud2.js/), and enables a dynamic word cloud to be generated using the abstract of the work. The word cloud could be further developed in the future to alter based on publication filtering.

### The Learning Process

As part of this process...

#### Ongoing Challenges

...

#### Future Plans

...

