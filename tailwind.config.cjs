/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      "header-1": [
        "3.75rem",
        {
          lineHeight: "1.2",
          fontWeight: "700",
        },
      ],
      "header-2": [
        "3rem",
        {
          lineHeight: "1.16",
          fontWeight: "700",
        },
      ],
      "header-3": [
        "2.125rem",
        {
          lineHeight: "1.16",
          fontWeight: "700",
        },
      ],
      "header-4": [
        "1.875rem",
        {
          lineHeight: "1.2",
          fontWeight: "700",
        },
      ],
      "header-5": [
        "1.5rem",
        {
          lineHeight: "1.2",
          fontWeight: "700",
        },
      ],
      "header-6": [
        "1.375rem",
        {
          lineHeight: "1.2",
          fontWeight: "500",
        },
      ],
      "body-intro": [
        "1.25rem",
        {
          lineHeight: "1.3",
          fontWeight: "500",
        },
      ],
      "body-regular": [
        "1rem",
        {
          lineHeight: "1.5",
          fontWeight: "400",
        },
      ],
      "body-medium": [
        "1rem",
        {
          lineHeight: "1.5",
          fontWeight: "500",
        },
      ],
      "body-bold": [
        "1rem",
        {
          lineHeight: "1.5",
          fontWeight: "700",
        },
      ],
      "body-small-regular": [
        "0.875rem",
        {
          lineHeight: "1.5",
          fontWeight: "400",
        },
      ],
      "body-small-medium": [
        "0.875rem",
        {
          lineHeight: "1.5",
          fontWeight: "500",
        },
      ],
      "body-small-bold": [
        "0.875rem",
        {
          lineHeight: "1.5",
          fontWeight: "700",
        },
      ],
      "caption-regular": [
        "0.75rem",
        {
          lineHeight: "1.5",
          fontWeight: "400",
        },
      ],
      "caption-medium": [
        "0.75rem",
        {
          lineHeight: "1.5",
          fontWeight: "500",
        },
      ],
      "caption-bold": [
        "0.75rem",
        {
          lineHeight: "1.5",
          fontWeight: "700",
        },
      ],
      "caption-small-regular": [
        "0.625rem",
        {
          lineHeight: "1.5",
          fontWeight: "400",
        },
      ],
      "caption-small-medium": [
        "0.625rem",
        {
          lineHeight: "1.5",
          fontWeight: "500",
        },
      ],
      "caption-small-bold": [
        "0.625rem",
        {
          lineHeight: "1.5",
          fontWeight: "700",
        },
      ],
    },
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
