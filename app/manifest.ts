import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wambete Benjamin — Full-Stack Web Developer",
    short_name: "AM Dev",
    description:
      "Portfolio of Wambete Benjamin, a full-stack web developer & UI/UX designer based in Nairobi, Kenya.",
    start_url: "/",
    display: "standalone",
    background_color: "#05070d",
    theme_color: "#00D4FF",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
