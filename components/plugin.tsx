"use client";

import React, { useEffect } from "react";
import "@jup-ag/plugin/css";
import { useAppKit } from "@reown/appkit/react"

export default function PluginComponent() {
  const { open, close } = useAppKit()

  const handleConnectWallet = () => {
    open({ view: "Connect" });
  }

  useEffect(() => {
    // Initialize Jupiter Plugin
    import("@jup-ag/plugin").then((mod) => {
      const { init } = mod;
      init({
        displayMode: "integrated",
        integratedTargetId: "jupiter-plugin",
        containerStyles: {
          maxWidth: "100%",
          borderRadius: "1rem",
          height: "350px",
          overflow: "hidden",
        },
      });
    });
  }, []);

  useEffect(() => {
    const observedShadowRoots = new WeakSet<ShadowRoot>();
    const observedHosts = new WeakSet<HTMLElement>();
    const shadowObservers: MutationObserver[] = [];
    const hostObservers: MutationObserver[] = [];
    let bodyObserver: MutationObserver | null = null;

    const stopHandler = (e: Event) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      handleConnectWallet();
      console.log("🛑 stopped connect wallet");
    };

    const isConnectWalletButton = (el: HTMLElement) =>
      el.innerText?.trim().toLowerCase() === "connect wallet";

    const neutralizeElement = (el: HTMLElement) => {
      try {
        // Remove known classes that add background or padding
        ["bg-black", "bg-background", "bg-card", "px-2"].forEach((cls) => {
          if (el.classList.contains(cls)) el.classList.remove(cls);
        });

        // Force transparent background ONLY in shadow roots
        el.style.setProperty("background", "transparent", "important");
        el.style.setProperty("background-color", "transparent", "important");
      } catch (err) {}
    };

    const removeBrandingNodes = (root: ParentNode | ShadowRoot | null) => {
      if (!root) return;
      root.querySelectorAll('img[src*="jupiter-logo"]').forEach((img) => img.remove());
      root.querySelectorAll('img[src*="jupiter"]').forEach((img) => img.remove());
      Array.from(root.querySelectorAll("span")).forEach((s) => {
        if (s.textContent?.trim() === "Jupiter") (s as HTMLElement).remove();
      });
    };

    const attachConnectBlocker = (root: ParentNode | ShadowRoot | null) => {
      if (!root) return;
      const buttons = Array.from(root.querySelectorAll("button, div")) as HTMLElement[];
      const matched: HTMLElement[] = [];

      for (const b of buttons) {
        if (isConnectWalletButton(b)) {
          matched.push(b);
          if (!b.hasAttribute("data-stop-connected")) {
            b.setAttribute("data-stop-connected", "true");
            b.addEventListener("click", stopHandler, { capture: true });
            console.log("✅ attached to Connect Wallet button");
          }
        }
      }

      if (matched.length > 1) {
        const first = matched[0];
        if (first && first.style.display !== "none") {
          first.style.display = "none";
        }
      }
    };

    // Clean only shadow roots (not main DOM)
    const traverseShadowRoot = (sr: ShadowRoot) => {
      try {
        removeBrandingNodes(sr);

        sr.querySelectorAll(".bg-black, .bg-background, .bg-card, .px-2, .p-2").forEach((el) => {
          neutralizeElement(el as HTMLElement);
        });

        attachConnectBlocker(sr);

        sr.querySelectorAll("*").forEach((el) => {
          const nested = (el as HTMLElement).shadowRoot;
          if (nested && !observedShadowRoots.has(nested)) {
            observeShadowRoot(nested);
          }
        });
      } catch (err) {}
    };

    const observeShadowRoot = (sr: ShadowRoot) => {
      if (!sr || observedShadowRoots.has(sr)) return;
      observedShadowRoots.add(sr);

      traverseShadowRoot(sr);

      const mo = new MutationObserver(() => traverseShadowRoot(sr));
      mo.observe(sr, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style"] });
      shadowObservers.push(mo);
    };

    const scanNodeForShadowRoots = (node: Node | null) => {
      if (!node) return;

      if (node instanceof HTMLElement) {
        if (node.id === "jupiter-plugin" && !observedHosts.has(node)) {
          observedHosts.add(node);
          if ((node as any).shadowRoot) {
            observeShadowRoot((node as any).shadowRoot);
          } else {
            const hostMo = new MutationObserver(() => {
              if ((node as any).shadowRoot) {
                observeShadowRoot((node as any).shadowRoot);
                hostMo.disconnect();
              }
            });
            hostMo.observe(node, { childList: true, subtree: true, attributes: true });
            hostObservers.push(hostMo);
          }
        }

        const sr = (node as any).shadowRoot;
        if (sr) observeShadowRoot(sr);
      }

      node.childNodes.forEach((child) => scanNodeForShadowRoots(child));
    };

    bodyObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => scanNodeForShadowRoots(n));
      }
    });

    bodyObserver.observe(document.body, { childList: true, subtree: true });

    scanNodeForShadowRoots(document.body);

    let retryCount = 0;
    const maxRetries = 30;
    const retryIntervalMs = 200;

    const tryFindHost = () => {
      const host = document.querySelector("#jupiter-plugin") as HTMLElement | null;
      if (host) {
        scanNodeForShadowRoots(host);
        return;
      }
      retryCount++;
      if (retryCount <= maxRetries) {
        setTimeout(tryFindHost, retryIntervalMs);
      }
    };

    tryFindHost();

    return () => {
      bodyObserver?.disconnect();
      shadowObservers.forEach((mo) => mo.disconnect());
      hostObservers.forEach((mo) => mo.disconnect());
    };
  }, []);

  return <div id="jupiter-plugin" />;
}
