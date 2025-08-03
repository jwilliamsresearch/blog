---
layout: post
title: "Why 'Placing Code' Matters"
subtitle: "A manifesto for place-aware software development and spatial computing"
lead: "Most navigation apps don't know where you really want to go. This opening post explores why we need code that understands the difference between space and place, and introduces the philosophy behind jwilliams.science."
brief: "This manifesto-style post introduces the concept of 'placing code'—software development that respects geography, culture, and context. Drawing from research in Geographic Information Science and platial information systems, it argues for technology that serves human spatial relationships rather than replacing them."
author: J. Williams
tags: Platial Information Geographic Information Science Software Development Place-Based Computing
displaytheme: '#1a5490'
maskimage: dalletown.webp
icon: bi-geo-alt
---
Most navigation apps don't know where you really want to go.

I realised this during my PhD research on leisure walking routes, watching people describe their walks in ways that no algorithm could capture. The GPS data showed coordinates and distances, but missed everything that made the walk meaningful: the stories, the views, the feeling of being in a particular place at a particular time.

This is the problem with placeless code. We keep building location-aware systems that know where things are but not what they mean. We optimise for efficiency instead of experience, for shortest paths instead of most interesting ones. The result is technology that can guide us anywhere but can't tell us why we'd want to go there.

## What Is "Placing Code"?

Placing code is about writing software that understands the difference between space and place: between coordinates on a map and the lived experience of being somewhere. It's code that recognises that a park isn't just a green polygon in a database, but a place where children play, where neighbours meet, where people find quiet moments in busy lives.

But placing code is also about acknowledging where *you* code from. When I develop location-based systems, I'm drawing on my background in Geographic Information Science, my research into how people actually move through and experience urban spaces, and my understanding that technology should serve human spatial needs rather than impose digital logic on messy geographical realities.

The concept emerges from years of studying how people interact with geographic information systems, conducting think-aloud walking studies, and observing the gap between how algorithms process spatial data and how humans experience place. It's a response to the persistent assumption in software development that location is just another data point, rather than a fundamental aspect of human experience that shapes how we understand and navigate the world.

## The Three Dimensions of Place in Code

**Spatial Awareness:** This goes beyond basic GPS functionality. True spatial awareness means understanding local knowledge, recognising that the shortest route isn't always the safest or most pleasant one, that some paths have stories and significance that data alone can't capture. My research on leisure walking shows how people navigate based on places of interest, views, and feelings rather than just turn-by-turn directions.

During one walking study, participants consistently chose routes that GPS would consider inefficient. They avoided busy roads not captured in noise databases, sought out tree-lined streets for shade, and deliberately passed landmarks that held personal meaning. These spatial choices reflect deep knowledge about place that current location-based services largely ignore. Code that respects spatial awareness must account for these human factors, not just geometric optimisation.

**Experiential Understanding:** Every journey is also an experience. People don't just want to get from A to B; they want walks that feel engaging, routes that reveal something new about their neighborhood, paths that match their mood or purpose. Understanding this requires moving beyond geometric optimisation to consider what makes places personally meaningful.

In my work on route recommendation systems, traditional approaches optimise for distance, time, or popularity. But experiential factors such as the quality of light filtering through leaves, the interesting architecture along a particular street, the sense of discovery when finding a new shortcut remain largely absent from computational approaches. Placing code means designing systems that can incorporate and respond to these qualitative aspects of spatial experience.

**Contextual Sensitivity:** Places exist within broader systems of meaning: cultural, social, temporal. A street corner means different things at different times of day, to different communities, in different seasons. Place-aware code adapts to these shifting contexts rather than treating geography as static data.

This dimension requires understanding that spatial data is never neutral. The same geographic coordinates can represent safety or danger, community or isolation, depending on who is moving through them and when. Effective location-based systems must be sensitive to these contextual variations, adapting their behaviour based on temporal patterns, cultural norms, and social dynamics that shape how places are experienced.

## Why It Matters

The consequences of placeless code aren't just frustrating, they're often exclusionary. When algorithms make spatial decisions without understanding local context, they can reinforce inequalities, ignore community knowledge, and design out the very qualities that make places livable and meaningful.

Consider how mapping applications handle pedestrian navigation in urban areas. Routes optimised purely for distance might direct walkers through areas that feel unsafe, past construction zones that make walking unpleasant, or along busy arterial roads where the pedestrian experience is an afterthought. These algorithmic choices reflect a fundamental misunderstanding of how people actually move through and experience urban space.

My journey through computer science research - from undergraduate work through my PhD at the Nottingham Geospatial Institute - has shown me that spatial problems are fundamentally human problems. They require understanding not just where things are, but how people experience and move through the world. Solving them requires combining computational power with deep attention to place-based knowledge.

This is especially important as location-based services become more ubiquitous. Our phones track our every movement, our apps claim to know what we need, but too often they're optimizing for metrics that miss the point entirely. We need technology that understands geography as more than just coordinates as the lived, experienced, culturally embedded reality of how people actually inhabit space.

The stakes extend beyond individual user experience. Urban planning increasingly relies on data from location-based applications, creating feedback loops where algorithmic assumptions about how people move through space influence decisions about how cities are designed. If our foundational spatial computing systems don't understand place, we risk building cities that serve algorithms rather than people.

## What This Blog Will Do

Every week, I'll share reflections and technical insights from a place-based computer science perspective. Some posts will dive into specific research on my work on platial information systems, studies of how people actually navigate leisure walking routes, the challenge of representing experiential geography computationally. Others will explore broader questions: How do we build genuinely location-aware systems? What does it mean to design technology that respects local knowledge? How do we bridge the gap between computational efficiency and human spatial experience?

Expect deep dives into the technical challenges of implementing place-aware systems, discussions of emerging research in platial information science, and practical examples of how spatial computing can better serve human needs. I'll share code snippets and methodological insights from ongoing projects, review interesting developments in geographic information science, and reflect on the broader implications of different approaches to spatial computing.

This isn't just academic theory. These are working notes from someone actively building place-aware systems, teaching students to think spatially about code, and trying to develop technology that serves human relationships with place rather than replacing them. The goal is to contribute to a more thoughtful approach to spatial computing, one that recognises the complexity and richness of human spatial experience.

## Because Code Isn't Just Logic - It's Location

Every algorithm runs somewhere, developed by someone with their own spatial background, for people who live and move through specific places. The more honestly we acknowledge these geographical relationships (spatial, experiential, contextual) the better our software becomes.

We need more local logic, and fewer universal defaults. We need systems that understand that efficiency isn't always the goal, that the fastest route isn't always the best route, that spatial data without place-based context is just coordinates on a screen.
