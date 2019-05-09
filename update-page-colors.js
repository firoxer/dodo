function updatePageColors() {
  const hourOfDay = new Date().getHours();
  if (hourOfDay >= 6 && hourOfDay < 20) {
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundColor = 'hsl(0, 0%, 100%)';
    document.body.style.color = 'hsl(0, 0%, 0%)';
    document.body.style.filter = 'none';
  } else {
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundColor = 'hsl(0, 0%, 0%)';
    document.body.style.color = 'hsl(0, 0%, 0%)';
    document.body.style.filter = 'invert(100%)';
  }
}

updatePageColors();
window.setInterval(updatePageColors, 3600000); // Once per hour
document.addEventListener('visibilitychange', updatePageColors, false);
