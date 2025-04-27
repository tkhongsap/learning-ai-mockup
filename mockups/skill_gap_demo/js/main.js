document.addEventListener('DOMContentLoaded', function() {
  // Animate skill gap bars on load
  const skillGapFills = document.querySelectorAll('.skill-gap-fill');

  skillGapFills.forEach(fill => {
    const percentage = fill.getAttribute('data-percentage');
    setTimeout(() => {
      fill.style.width = `${percentage}%`;
    }, 300);
  });

  // Animate progress bars on load
  const progressFills = document.querySelectorAll('.progress-fill');

  progressFills.forEach(fill => {
    const percentage = fill.getAttribute('data-percentage');
    setTimeout(() => {
      fill.style.width = `${percentage}%`;
    }, 300);
  });
});