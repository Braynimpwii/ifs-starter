module.exports = {
  // Temporarily disable PostCSS plugins to avoid build-time Tailwind/PostCSS
  // plugin resolution issues in this environment. This will prevent Tailwind
  // processing but allows the build to run so we can surface other errors.
  plugins: [],
};