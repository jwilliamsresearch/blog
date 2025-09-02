---
layout: post
title: "Getting Started with H3: The Hexagonal Grid System for Spatial Analysis"
subtitle: "A practical tutorial for understanding and implementing Uber's H3 hexagonal grid system"
lead: "Why are Uber, Foursquare, and every major location intelligence company switching to hexagonal grids? This tutorial will teach you H3 fundamentals with interactive examples you can run in your browser."
brief: "This hands-on tutorial introduces H3, Uber's open-source hexagonal grid system that's transforming spatial analysis. Learn why hexagons outperform traditional grids, set up H3 in JavaScript, and build interactive mapping applications with step-by-step code examples."
author: J. Williams
tags: H3 Hexagonal Grids Spatial Analysis JavaScript Mapping Tutorial GIS
displaytheme: '#df0edfff'
maskimage: hexagonal-grid.png
icon: bi-hexagon
lastupdate: 2025-09-02
updatereason: "All code examples now use the current API."
---
Why are Uber, Foursquare, and every major location intelligence company switching to hexagonal grids? The answer lies in a fundamental limitation of traditional spatial analysis that most developers never question.

When you analyse location data using latitude and longitude coordinates directly, you're working with a system that treats the Earth as flat. This creates distortions, especially at scale. More problematically, traditional rectangular grids suffer from edge effects and inconsistent neighbour relationships that make spatial analysis unreliable.

Enter H3: Uber's open-source hexagonal hierarchical geospatial indexing system. It's not just another mapping library, it's a complete rethinking of how we organise and analyse spatial data. This tutorial will show you why it matters and how to use it.

## Why Hexagons Beat Rectangles

Before diving into code, let's understand why hexagonal grids are mathematically superior for spatial analysis:

**Consistent Neighbours**: Every hexagon has exactly six neighbours at equal distances. Squares have four close neighbours and four distant corner neighbours, creating analytical inconsistencies.

**Better Coverage**: Hexagons tile the plane more efficiently with less distortion when projected onto the Earth's curved surface.

**Natural Aggregation**: Data aggregated into hexagons provides more intuitive and statistically robust results than rectangular binning.

**Multi-Resolution**: H3's hierarchical structure allows seamless zooming between resolution levels whilst maintaining spatial relationships.

These advantages make H3 particularly powerful for tasks like density analysis, spatial clustering, and geographic data aggregation.

## Setting Up H3

Let's start with a basic HTML page that includes the H3 JavaScript library. We'll use Leaflet for mapping and H3 for the spatial magic.

```html
<!DOCTYPE html>
<html>
<head>
    <title>H3 Tutorial</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
        #map { height: 400px; width: 100%; }
        .controls { margin: 10px 0; }
        .code-output { 
            background: #f5f5f5; 
            padding: 10px; 
            margin: 10px 0; 
            border-radius: 4px; 
            font-family: monospace; 
        }
    </style>
</head>
<body>
    <div id="map"></div>
    <div class="controls">
        <label>H3 Resolution: 
            <input type="range" id="resolution" min="1" max="10" value="7" />
            <span id="resValue">7</span>
        </label>
    </div>
    <div class="code-output" id="output">Click on the map to see H3 index</div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="https://unpkg.com/h3-js@4.3.0/dist/h3-js.umd.js"></script>
</body>
</html>
```

See the HTML in the Codepen demo here:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="NPGEVdZ" data-pen-title="Interactive Demo 1: Basic H3 Conversion" data-editable="true" data-user="JWilliamsResearch" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/JWilliamsResearch/pen/NPGEVdZ">
  Interactive Demo 1: Basic H3 Conversion</a> by James Williams (<a href="https://codepen.io/JWilliamsResearch">@JWilliamsResearch</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## Interactive Demo 1: Basic H3 Conversion

This demo shows the fundamental H3 operation: converting geographic coordinates (latitude/longitude) into H3 hexagonal indices. Click anywhere on the map to see how H3 transforms precise coordinates into discrete hexagonal cells.

**What you'll learn:**

This interactive example demonstrates how H3 converts continuous geographic coordinates into discrete hexagonal cells. You'll see how resolution affects hexagon size and precision, and understand the relationship between coordinates, H3 indices, and hexagon boundaries.

**How to use:**

Start by clicking anywhere on the map to place a hexagon. You can then adjust the resolution slider (ranging from 1 to 10) to see how hexagon size changes dynamically. As you interact, watch the information panel update with real-time data including coordinates, H3 index, and area calculations.

**Key concepts demonstrated:**

The demo introduces three essential H3 concepts. The **H3 Index** is a unique identifier for each hexagon (like `8a1fb46622dffff`) that represents its position in the global grid. **Resolution** controls hexagon size, where higher values create smaller, more precise hexagons. Finally, **Area Calculation** shows the approximate area of each hexagon in square kilometers, helping you understand the spatial scale of your analysis.

```javascript
// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Current hexagon layer
let currentHexagon = null;

// Resolution control
const resolutionSlider = document.getElementById('resolution');
const resValueDisplay = document.getElementById('resValue');
const output = document.getElementById('output');

// Update resolution display
resolutionSlider.addEventListener('input', function() {
    resValueDisplay.textContent = this.value;
});

// Map click handler
map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    const resolution = parseInt(resolutionSlider.value);
  
    // Convert to H3 index
    const h3Index = h3.latLngToCell(lat, lng, resolution);
  
    // Get hexagon boundary
    const hexBoundary = h3.cellToBoundary(h3Index, true);
  
    // Remove previous hexagon
    if (currentHexagon) {
        map.removeLayer(currentHexagon);
    }
  
    // Add new hexagon to map
    currentHexagon = L.polygon(hexBoundary, {
        color: '#0f4c75',
        fillColor: '#0f4c75',
        fillOpacity: 0.3
    }).addTo(map);
  
    // Add hover effects to main hexagon
    currentHexagon.on('mouseover', function() {
        this.setStyle({
            fillOpacity: 0.5,
            weight: 3
        });
        this.bindTooltip(`H3 Index: ${h3Index}`, {
            permanent: false,
            direction: 'top'
        }).openTooltip();
    });
  
    currentHexagon.on('mouseout', function() {
        this.setStyle({
            fillOpacity: 0.3,
            weight: 1
        });
        this.closeTooltip();
    });
  
    // Display information
    output.innerHTML = `
        <strong>Coordinates:</strong> ${lat.toFixed(6)}, ${lng.toFixed(6)}<br>
        <strong>H3 Index:</strong> ${h3Index}<br>
        <strong>Resolution:</strong> ${resolution}<br>
        <strong>Area:</strong> ~${(h3.getHexagonAreaAvg(resolution, h3.UNITS.km2)).toFixed(2)} km²
    `;
});
```

Try clicking on different locations and adjusting the resolution slider. Notice how higher resolutions create smaller, more precise hexagons. See the Codepen demo here:

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="NPGEVdZ" data-pen-title="Interactive Demo 1: Basic H3 Conversion" data-editable="true" data-user="JWilliamsResearch" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/JWilliamsResearch/pen/NPGEVdZ">
  Interactive Demo 1: Basic H3 Conversion</a> by James Williams (<a href="https://codepen.io/JWilliamsResearch">@JWilliamsResearch</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## Interactive Demo 2: K-Ring Analysis

This demo demonstrates H3's powerful k-ring analysis capabilities, which find all hexagons within k steps of a target hexagon. This is essential for neighborhood analysis, spatial buffers, and understanding connectivity patterns in hexagonal grids.

**What you'll learn:**

K-ring analysis reveals the spatial relationships between hexagons at different distances. You'll see how H3 can efficiently calculate neighborhoods of any size, from immediate neighbors to larger catchment areas. This technique is fundamental for spatial analysis tasks like service area calculations, density mapping, and network analysis.

**How to use:**

First, click on the map to place a hexagon (using Demo 1). Then adjust the k-ring distance slider (1-5) to control the neighborhood size. Click "Show K-Ring" to visualize all hexagons within that distance, with the center hexagon highlighted in red and surrounding hexagons in blue. Use "Clear" to remove the k-ring visualization.

**Key concepts demonstrated:**

The **K-Ring Distance** determines how many steps away from the center hexagon to include (k=1 means immediate neighbors, k=2 includes neighbors of neighbors, etc.). **Spatial Connectivity** shows how hexagons are connected in a consistent, predictable pattern. **Neighborhood Analysis** demonstrates how H3 makes it easy to define service areas, buffers, and spatial relationships without complex geometric calculations.

```javascript
// Add k-ring controls
const kRingHtml = `
    <div class="controls">
        <label>K-Ring Distance: 
            <input type="range" id="kDistance" min="1" max="5" value="2" />
            <span id="kValue">2</span>
        </label>
        <button id="showKRing">Show K-Ring</button>
        <button id="clearKRing">Clear</button>
    </div>
`;

// Insert after existing controls
document.querySelector('.controls').insertAdjacentHTML('afterend', kRingHtml);

let kRingLayers = [];
let centerHexagon = null;

document.getElementById('kDistance').addEventListener('input', function() {
    document.getElementById('kValue').textContent = this.value;
});

document.getElementById('showKRing').addEventListener('click', function() {
    if (!currentHexagon) {
        alert('Please click on the map first to select a hexagon');
        return;
    }
  
    // Clear existing k-ring
    clearKRing();
  
    const resolution = parseInt(resolutionSlider.value);
    const k = parseInt(document.getElementById('kDistance').value);
  
    // Get the center H3 index from current location
    const centerIndex = h3.latLngToCell(
        currentHexagon.getLatLngs()[0][0].lat, 
        currentHexagon.getLatLngs()[0][0].lng, 
        resolution
    );
  
    // Get k-ring hexagons using gridDisk (correct function in H3 v4.0.0)
    const kRingIndices = h3.gridDisk(centerIndex, k);
  
    // Add each hexagon to the map
    kRingIndices.forEach((hexIndex, i) => {
        const hexBoundary = h3.cellToBoundary(hexIndex, true);
  
        // Different colour for center vs ring
        const isCenter = hexIndex === centerIndex;
        const hexagon = L.polygon(hexBoundary, {
            color: isCenter ? '#e74c3c' : '#3498db',
            fillColor: isCenter ? '#e74c3c' : '#3498db',
            fillOpacity: isCenter ? 0.6 : 0.2,
            weight: isCenter ? 3 : 1
        }).addTo(map);
  
        // Add hover effects for k-ring hexagons
        hexagon.on('mouseover', function() {
            this.setStyle({
                fillOpacity: isCenter ? 0.8 : 0.4,
                weight: isCenter ? 4 : 2
            });
            this.bindTooltip(isCenter ? 'Center hexagon' : `Ring hexagon ${i + 1}`, {
                permanent: false,
                direction: 'top'
            }).openTooltip();
        });
  
        hexagon.on('mouseout', function() {
            this.setStyle({
                fillOpacity: isCenter ? 0.6 : 0.2,
                weight: isCenter ? 3 : 1
            });
            this.closeTooltip();
        });
  
        kRingLayers.push(hexagon);
    });
  
    output.innerHTML += `<br><strong>K-Ring (${k}):</strong> ${kRingIndices.length} hexagons`;
});

document.getElementById('clearKRing').addEventListener('click', clearKRing);

function clearKRing() {
    kRingLayers.forEach(layer => map.removeLayer(layer));
    kRingLayers = [];
}
```

See the Codepen demo below:

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="myeQYMz" data-pen-title="Interactive Demo 1: Basic H3 Conversion" data-editable="true" data-user="JWilliamsResearch" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/JWilliamsResearch/pen/myeQYMz">
  Interactive Demo 1: Basic H3 Conversion</a> by James Williams (<a href="https://codepen.io/JWilliamsResearch">@JWilliamsResearch</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## Understanding H3 Resolutions

H3 uses 16 resolution levels (0-15), each providing different levels of spatial precision:

- **Resolution 0**: ~4,250 km² per hexagon (continental scale)
- **Resolution 5**: ~252 km² per hexagon (regional scale)
- **Resolution 8**: ~0.74 km² per hexagon (city district scale)
- **Resolution 10**: ~15,047 m² per hexagon (neighbourhood scale)
- **Resolution 12**: ~424 m² per hexagon (building block scale)

The key insight is that H3's hierarchical structure means every hexagon at resolution n contains exactly 7 hexagons at resolution n+1. This makes multi-scale analysis incredibly efficient.

## Performance Considerations

When working with H3 in production applications, keep these performance tips in mind:

**Pre-compute when possible**: H3 indices are deterministic, so you can pre-calculate them for static datasets.

**Use appropriate resolutions**: Higher resolutions create more hexagons and require more computation. Choose the coarsest resolution that meets your analytical needs.

**Batch operations**: When processing large datasets, batch your H3 operations rather than calling them individually.

**Index your data**: Store H3 indices alongside your original coordinates for faster spatial queries.

## Next Steps

This tutorial covers H3 fundamentals, but there's much more to explore:

- **Compact representations**: H3 can compress sets of hexagons for efficient storage
- **Edge traversal**: Navigate between adjacent hexagons programmatically
- **Integration with databases**: PostGIS, BigQuery, and other spatial databases support H3
- **Advanced algorithms**: Implement spatial clustering, hotspot detection, and catchment analysis

## Why This Matters for Place-Based Computing

H3 represents a shift towards more human-centred spatial analysis. Unlike traditional grid systems that impose arbitrary boundaries, hexagonal grids better reflect how people perceive and move through space.

The mathematical elegance of hexagonal tessellation combined with H3's hierarchical structure makes it an ideal foundation for place-aware computing systems. As we build more sophisticated location-based applications, tools like H3 help us move beyond simple coordinate-based thinking towards richer, more contextual spatial analysis.

Try experimenting with the examples above, and you'll quickly see why major tech companies are adopting H3 for their spatial computing needs. The future of location intelligence is hexagonal.
