import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wambete Benjamin | Full Stack Web Developer",
    short_name: "Wambete Benjamin",
    description:
      "Portfolio of Wambete Benjamin, a full stack web developer & UI/UX designer based in Nairobi, Kenya.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7fbfc",
    theme_color: "#009BB7",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
