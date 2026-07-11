"use client";

import { useMemo } from "react";
import Particles, {
  ParticlesProvider,
  useParticlesProvider,
} from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

function ParticlesCanvas() {
  const { loaded } = useParticlesProvider();

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false,
      },

      background: {
        color: {
          value: "transparent",
        },
      },

      fpsLimit: 120,

      particles: {
        number: {
          value: 170,
          density: {
            enable: true,
            area: 1200,
          },
        },

        color: {
          value: ["#2563eb", "#3b82f6", "#60a5fa", "#22d3ee"],
        },

        links: {
          enable: true,
          color: "#3b82f6",
          distance: 220,
          opacity: 0.38,
          width: 1,
        },

        move: {
          enable: true,
          speed: 0.65,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },

        opacity: {
          value: {
            min: 0.45,
            max: 0.85,
          },
          animation: {
            enable: true,
            speed: 0.7,
          },
        },

        size: {
          value: {
            min: 1.3,
            max: 3.8,
          },
        },
      },

      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },

        modes: {
          grab: {
            distance: 220,
            links: {
              opacity: 0.6,
            },
          },
        },
      },

      detectRetina: true,
    }),
    []
  );

  if (!loaded) {
    return null;
  }

  return (
    <Particles
      id="particles"
      className="absolute inset-0 -z-10"
      options={options}
    />
  );
}

export default function BackgroundParticles() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        await loadSlim(engine);
      }}
    >
      <ParticlesCanvas />
    </ParticlesProvider>
  );
}