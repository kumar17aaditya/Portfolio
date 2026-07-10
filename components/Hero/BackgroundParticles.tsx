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
          value: 95,
          density: {
            enable: true,
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
          value: {
            min: 0.25,
            max: 0.55,
          },
          animation: {
            enable: true,
            speed: 0.6,
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