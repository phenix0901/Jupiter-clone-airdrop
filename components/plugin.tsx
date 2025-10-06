"use client";

import React, { useEffect } from "react";
import "@jup-ag/plugin/css";

export default function PluginComponent() {
  useEffect(() => {
    // Initialize Jupiter Plugin
    import("@jup-ag/plugin").then((mod) => {
      const { init } = mod;
      init({
        displayMode: "integrated",
        integratedTargetId: "jupiter-plugin",
        containerStyles: {
          maxWidth: "100%",
          borderRadius: "1.5rem",
          height: "350px",
          overflow: "hidden",
        },
      });
    });
  }, []);

  useEffect(() => {
    const stopHandler = (e: Event) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      console.log("🛑 stopped connect wallet");
    };

    const isConnectWalletButton = (el: HTMLElement) => {
      const text = el.innerText?.trim().toLowerCase();
      return text === "connect wallet";
    };

    const hideJupiterBranding = (root: ParentNode | ShadowRoot | null) => {
      if (!root) return;

      // Hide logo and name
      const logo = root.querySelector('img[src*="jupiter-logo"]') as HTMLElement | null;
      const name = root.querySelector('span') as HTMLElement | null;

      if (logo) {
        logo.style.display = "none";
        console.log("🪄 Jupiter logo hidden");
      }
      if (name && name.innerText.trim() === "Jupiter") {
        name.style.display = "none";
        console.log("🪄 Jupiter name hidden");
      }
    };

    const traverse = (root: ParentNode | ShadowRoot | null) => {
      if (!root) return;
      const buttons: HTMLElement[] = [];

      const allEls = root.querySelectorAll("*");
      for (const el of Array.from(allEls)) {
        const shadow = (el as HTMLElement).shadowRoot;
        if (shadow) traverse(shadow);
      }

      // Custom: also clean branding on each traversal
      hideJupiterBranding(root);

      for (const btn of Array.from(root.querySelectorAll("button, div"))) {
        if (isConnectWalletButton(btn as HTMLElement)) {
          buttons.push(btn as HTMLElement);
          if (!btn.hasAttribute("data-stop-connected")) {
            btn.setAttribute("data-stop-connected", "true");
            btn.addEventListener("click", stopHandler, { capture: true });
            console.log("✅ attached to Connect Wallet button");
          }
        }
      }

      if (buttons.length > 1) {
        const firstBtn = buttons[0];
        if (firstBtn && firstBtn.style.display !== "none") {
          firstBtn.style.display = "none";
          console.log("👻 first Connect Wallet button hidden");
        }
      }
    };

    const scan = () => {
      const plugin = document.querySelector("#jupiter-plugin") as HTMLElement | null;
      if (!plugin) return;
      traverse(plugin);
      const sr = (plugin as any).shadowRoot;
      if (sr) traverse(sr);
    };

    const observer = new MutationObserver(() => scan());
    observer.observe(document.body, { childList: true, subtree: true });

    const interval = setInterval(scan, 1500);
    scan(); // initial

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return <div id="jupiter-plugin" />;
}
