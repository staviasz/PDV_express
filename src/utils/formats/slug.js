const diacritics = require("diacritics");

const slug = (text) => {
  const textSplit = text.split(".");
  const ext = textSplit.pop();
  const date = new Date();
  const formatRegex = diacritics
    .remove(textSplit.join(""))
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/\d/g, "");

  return `${formatRegex}${+date}.${ext}`;
};

module.exports = slug;
