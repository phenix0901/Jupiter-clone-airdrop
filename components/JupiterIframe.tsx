"use client"
import React from "react"

type Props = {
    className?: string
    style?: React.CSSProperties
    height?: number | string
}

export default function JupiterIframe({ className, style, height = 400 }: Props) {
    const srcDoc = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="plugin-v1.js" data-preload defer></script>
    <style>
        .container {
            width: 100% !important;
            max-width: 100% !important;
            height: 380px !important;
            min-height: 0 !important;
            max-height: none !important;
            border-radius: 1rem;
            box-sizing: border-box;
            padding: 0;
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div id="jupiter-plugin"></div>
    </div>

    <script>
    window.addEventListener('load', function () {
      try {
        if (window.Jupiter && typeof window.Jupiter.init === 'function') {
          window.Jupiter.init({
            displayMode: "integrated",
            integratedTargetId: "jupiter-plugin",
          });
        } else {
          // plugin script may still be loading — attempt init with a short retry
          var attempts = 0;
          var t = setInterval(function() {
            attempts++;
            if (window.Jupiter && typeof window.Jupiter.init === 'function') {
              window.Jupiter.init({
                displayMode: "integrated",
                integratedTargetId: "jupiter-plugin",
              });
              clearInterval(t);
            } else if (attempts > 20) {
              clearInterval(t);
            }
          }, 100);
        }
      } catch (e) {
        // silent fail to avoid breaking parent page
        console.error('jupiter init error', e);
      }
    });
  </script>
</body>
</html>
  `

    return (
        <iframe
            title="Jupiter Plugin"
            className={className}
            style={{ width: "100%", height, border: "0", borderRadius: 12, ...style }}
            srcDoc={srcDoc}
            sandbox="allow-scripts allow-same-origin allow-popups"
        />
    )
}