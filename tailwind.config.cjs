/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand"],
      },
      colors: {
        // primary
        p: "#E54D42",

        // background
        "bg-l": "#FFFFFF",
        "bg-l-s": "#FBFBFB",
        "bg-l-s-i": "#ECECEC",

        "bg-d": "#000000",
        "bg-d-s": "#111111",
        "bg-d-s-i": "#333333",

        // foreground
        "fg-l": "#000000",
        "fg-l-s": "#444444",
        "fg-l-s-i": "#555555",

        "fg-d": "#FFFFFF",
        "fg-d-s": "#AAAAAA",
        "fg-d-s-i": "#CCCCCC",

        // border
        "b-l": "#F1F1F1",
        "b-d": "#222222",

        // overlay
        "o-l": "#999999",
        "o-d": "#757575",
      },
    },
  },
  plugins: [],
};
