import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Random Wheel - Online Random Picker",
    short_name: "Random Wheel",
    description: "Free online random wheel picker tool with smooth animations",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#667EEA",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
