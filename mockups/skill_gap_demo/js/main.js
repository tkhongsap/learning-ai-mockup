document.addEventListener('DOMContentLoaded', function() {
  // Tab switching
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and tab contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // View switching
  const viewButtons = document.querySelectorAll('.view-btn');
  const viewContents = document.querySelectorAll('.view-content');
  
  viewButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all view buttons and view contents
      viewButtons.forEach(b => b.classList.remove('active'));
      viewContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const viewId = button.getAttribute('data-view');
      document.querySelector(`.view-content[data-view="${viewId}"]`).classList.add('active');
    });
  });
  
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