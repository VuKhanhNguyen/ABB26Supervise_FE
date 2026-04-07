/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-bright": "#393939",
        "outline": "#8b9198",
        "surface-container-low": "#1c1b1b",
        "on-secondary-fixed-variant": "#005048",
        "on-secondary": "#003731",
        "surface": "#131313",
        "on-background": "#e5e2e1",
        "primary-container": "#457b9d",
        "tertiary-container": "#dc3240",
        "secondary": "#6fd8c8",
        "primary-fixed": "#c7e7ff",
        "on-error-container": "#ffdad6",
        "tertiary": "#ffb3b1",
        "primary": "#98cdf2",
        "surface-tint": "#98cdf2",
        "on-primary-fixed-variant": "#064c6b",
        "on-tertiary-container": "#fffdff",
        "surface-container-lowest": "#0e0e0e",
        "inverse-primary": "#2b6485",
        "on-error": "#690005",
        "on-tertiary-fixed": "#410007",
        "secondary-fixed-dim": "#6fd8c8",
        "error-container": "#93000a",
        "tertiary-fixed": "#ffdad8",
        "inverse-on-surface": "#313030",
        "on-tertiary": "#680011",
        "surface-variant": "#353534",
        "surface-container-high": "#2a2a2a",
        "on-surface": "#e5e2e1",
        "primary-fixed-dim": "#98cdf2",
        "on-primary-container": "#fffdff",
        "tertiary-fixed-dim": "#ffb3b1",
        "on-surface-variant": "#c1c7ce",
        "on-secondary-container": "#00302a",
        "secondary-container": "#30a193",
        "on-primary-fixed": "#001e2e",
        "on-secondary-fixed": "#00201c",
        "on-primary": "#00344c",
        "error": "#ffb4ab",
        "background": "#131313",
        "outline-variant": "#41484d",
        "surface-container-highest": "#353534",
        "inverse-surface": "#e5e2e1",
        "surface-container": "#201f1f",
        "surface-dim": "#131313",
        "secondary-fixed": "#8cf5e4",
        "on-tertiary-fixed-variant": "#92001c"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      fontFamily: {
        headline: ["Space Grotesk"],
        body: ["Inter"],
        label: ["Inter"]
      }
    }
  }
};
