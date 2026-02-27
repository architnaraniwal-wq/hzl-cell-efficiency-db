import React, { useEffect, useRef } from 'react';

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load external scripts
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initApp = async () => {
      try {
        // Load dependencies in order
        await loadScript('https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@2.2.0/dist/chartjs-plugin-zoom.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.6.0/jspdf.plugin.autotable.min.js');

        // Load and inject HTML content
        const response = await fetch('/app-content.html');
        const html = await response.text();

        if (containerRef.current) {
          containerRef.current.innerHTML = html;

          // Execute inline scripts
          const scripts = containerRef.current.querySelectorAll('script');
          scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
              newScript.src = script.src;
            } else {
              newScript.textContent = script.textContent;
            }
            document.body.appendChild(newScript);
          });
        }
      } catch (error) {
        console.error('Error loading app:', error);
      }
    };

    initApp();
  }, []);

  return <div ref={containerRef} id="app-container"></div>;
}

export default App;
