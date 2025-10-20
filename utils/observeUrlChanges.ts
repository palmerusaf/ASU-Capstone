export function observeUrlChanges(callback: () => void) {
  let lastUrl = location.href;
  const observer = new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      callback();
    }
  });
  observer.observe(document, { subtree: true, childList: true });
  callback();
}