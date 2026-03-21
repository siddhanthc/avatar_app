/* ───────────────────────────────────────────────────────
   Malleshwaram Map Guide — Map Initialization
   ─────────────────────────────────────────────────────── */

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://tiles.openfreemap.org/styles/bright',
  center: MALLESHWARAM_CENTER,
  zoom: DEFAULT_ZOOM,
  pitch: DEFAULT_PITCH,
  bearing: DEFAULT_BEARING,
  antialias: true,
  maxPitch: 70,
});

// Navigation controls
map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
map.addControl(new maplibregl.ScaleControl({ maxWidth: 150 }), 'bottom-right');

map.on('load', () => {
  // ── 3D Buildings ─────────────────────────────────────
  // OpenFreeMap's bright style includes an 'openmaptiles' source with building data.
  // We add a fill-extrusion layer to render buildings in 3D.

  const layerExists = map.getLayer('3d-buildings');
  if (!layerExists) {
    // Find the first symbol layer to insert buildings beneath labels
    const layers = map.getStyle().layers;
    let labelLayerId;
    for (const layer of layers) {
      if (layer.type === 'symbol' && layer.layout && layer.layout['text-field']) {
        labelLayerId = layer.id;
        break;
      }
    }

    map.addLayer(
      {
        id: '3d-buildings',
        source: 'openmaptiles',
        'source-layer': 'building',
        type: 'fill-extrusion',
        minzoom: 14,
        paint: {
          'fill-extrusion-color': [
            'interpolate',
            ['linear'],
            ['get', 'render_height'],
            0, '#e8ddd3',
            20, '#d4c5b5',
            50, '#c0b0a0',
          ],
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            14, 0,
            15.5, ['get', 'render_height'],
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            14, 0,
            15.5, ['get', 'render_min_height'],
          ],
          'fill-extrusion-opacity': 0.75,
        },
        filter: ['!=', ['get', 'hide_3d'], true],
      },
      labelLayerId
    );
  }

  // ── Markers & UI ─────────────────────────────────────
  createMarkers(map);
  renderSidebar(map);
  initFilters(map);
  initSidebarToggle();
});

// ── Click on map to deselect ───────────────────────────
map.on('click', (e) => {
  // Only deselect if click wasn't on a marker
  const target = e.originalEvent.target;
  if (!target.closest('.custom-marker') && !target.closest('.maplibregl-popup')) {
    setActiveCard(null, map);
  }
});
