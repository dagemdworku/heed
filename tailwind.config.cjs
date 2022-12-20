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

        "bg-d": "#000000",
        "bg-d-s": "#111111",

        // foreground
        "fg-l": "#000000",
        "fg-l-s": "#444444",
        "fg-l-s-i": "#777777",

        "fg-d": "#FFFFFF",
        "fg-d-s": "#AAAAAA",
        "fg-d-s-i": "#666666",

        // border
        "b-l": "#F1F1F1",
        "b-d": "#222222",
      },
    },
  },
  plugins: [],
};
