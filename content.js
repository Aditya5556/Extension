let timeout;
document.addEventListener('copy', () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    navigator.clipboard.readText().then((text) => {
      const companyMatch = text.match(/(?:at|with)\s+([A-Z][a-zA-Z0-9\s&]+)/);
      const roleMatch = text.match(/(?:role of|as a|for a)\s+([A-Z][a-zA-Z0-9\s]+)/i);

      const company = companyMatch ? companyMatch[1].trim() : "the company";
      const role = roleMatch ? roleMatch[1].trim() : "the role";

      chrome.storage.local.set({ jobData: { company, role } });
    });
  }, 300);
});
