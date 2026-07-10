"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function BackgroundParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="particles"
      init={particlesInit}
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: false,
        background: {
          color: {
            value: "transparent",
          },
        },

        fpsLimit: 120,

        particles: {
          number: {
            value: 95,
            density: {
              enable: true,
              area: 800,
            },
          },

          color: {
            value: ["#2563eb", "#3b82f6", "#60a5fa", "#22d3ee"],
          },

          links: {
            enable: true,
            color: "#3b82f6",
            distance: 150,
            opacity: 0.2,
            width: 1,
          },

          move: {
            enable: true,
            speed: 0.9,
            direction: "none",
            outModes: {
              default: "bounce",
            },
          },

          opacity: {
            value: { min: 0.25, max: 0.55 },
            animation: {
              enable: true,
              speed: 0.6,
              sync: false,
            },
          },

          size: {
            value: {
              min: 1,
              max: 3.5,
            },
          },
        },

        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },

            resize: true,
          },

          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.5,
              },
            },
          },
        },

        detectRetina: true,
      }}
    />
  );
}
