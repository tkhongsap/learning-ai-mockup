// Ensure the initialization function is globally accessible
window.initializeAnimations = function() {
  console.log('Initializing animations...');
  
  // Animate skill gap bars
  const skillGapFills = document.querySelectorAll('.skill-gap-fill');

  skillGapFills.forEach(fill => {
    const percentage = fill.getAttribute('data-percentage');
    // Apply animation directly
    fill.style.width = `${percentage}%`;
  });

  // Animate progress bars
  const progressFills = document.querySelectorAll('.progress-fill, .skill-progress'); // Include skill-progress

  progressFills.forEach(fill => {
    const percentage = fill.getAttribute('data-percentage') || (fill.style.width ? fill.style.width.replace('%', '') : '0'); // Get percentage or use existing style
    // Apply animation directly
    fill.style.width = `${percentage}%`; 
  });
  
  console.log('Animations initialized.');
};