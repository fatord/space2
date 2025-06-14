
import React, { useEffect, useRef } from "react";

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createStar = () => {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.width = Math.random() * 3 + 1 + "px";
      star.style.height = star.style.width;
      star.style.animationDuration = Math.random() * 3 + 2 + "s";
      container.appendChild(star);
    };

    // Create initial stars
    for (let i = 0; i < 100; i++) {
      createStar();
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return <div ref={containerRef} className="starfield" />;
}
