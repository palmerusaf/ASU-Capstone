const ICON_ID = 'job-sourcerer-floating-tracked';

export function insertTrackedIcon(jobId: string | number) {
  // Remove existing icon if any
  removeTrackedIcon();

  // Create floating element
  const icon = document.createElement('div');
  icon.id = ICON_ID;
  icon.textContent = '🧙‍♂️ Tracked Job';
  icon.style.cssText = `
    position: fixed;
    bottom: 60px;
    right: 16px;
    background: #A020F0;
    color: white;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    font-size: 16px;
    z-index: 9999;
    opacity: 0.9;
  `;

  document.body.appendChild(icon);
}

export function removeTrackedIcon() {
  const existing = document.getElementById(ICON_ID);
  if (existing) existing.remove();
}