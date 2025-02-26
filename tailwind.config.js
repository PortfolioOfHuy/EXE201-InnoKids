/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-color": "#ddc8fc",
        "background-color-cover": "#9382d3",
        pink: "#e7b3d1",
        yellow: "#fdda74",
        white: "#f7f7f7",
        blue: "#9cd8e5",
        green: "#9fd8cd",
        black: "#2d2d2d",
        purple: "#9382D3",
        realWhite: "#ffffff",
        "light-blue": "#9cd8e5",
      },
      fontFamily: {
        body: ["HTH", "sans-serif"],
        heading: ["HTED", "serif"],
      },
      backgroundImage: {
        bannerImg: "url('/background.png')",
        rainbowImg: "url('/rainBowImage.jpg')",
      },
      boxShadow: {
        "button-shadow":
          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;",
      },
    },
  },
  plugins: [],
};
