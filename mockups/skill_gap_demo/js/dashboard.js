document.addEventListener('DOMContentLoaded', function() {
    // Initialize default tab
    const defaultTab = document.querySelector('[data-tab]');
    if (defaultTab) {
        defaultTab.click();
    }

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('[data-tab-content]');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabTarget = button.dataset.tab;
            
            // Toggle active state on buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('tab-active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('tab-active');
            button.setAttribute('aria-selected', 'true');
            
            // Show active tab content
            tabContents.forEach(content => {
                if (content.dataset.tabContent === tabTarget) {
                    content.classList.remove('hidden');
                    content.classList.add('slide-in');
                } else {
                    content.classList.add('hidden');
                    content.classList.remove('slide-in');
                }
            });
        });
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('[data-filter]');
    const filterSelects = document.querySelectorAll('select[data-filter]');
    
    // For button filters
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterGroup = button.closest('[data-filter-group]');
            if (filterGroup) {
                const groupButtons = filterGroup.querySelectorAll('[data-filter]');
                groupButtons.forEach(btn => btn.classList.remove('bg-indigo-600', 'text-white'));
                button.classList.add('bg-indigo-600', 'text-white');
            }
            applyFilters();
        });
    });
    
    // For select filters
    filterSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    function applyFilters() {
        // This would typically filter the data based on selected filters
        console.log('Filters applied');
        // Trigger animation for filtered content
        document.querySelectorAll('.dashboard-card').forEach(card => {
            card.classList.add('fade-in');
            setTimeout(() => card.classList.remove('fade-in'), 500);
        });
    }

    // Toggle details functionality
    const detailToggles = document.querySelectorAll('[data-toggle-details]');
    
    detailToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetId = toggle.dataset.toggleDetails;
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const isHidden = targetElement.classList.contains('hidden');
                targetElement.classList.toggle('hidden', !isHidden);
                targetElement.classList.toggle('slide-in', !isHidden);
                
                // Update button text/icon
                const showText = toggle.dataset.showText || 'Show Details';
                const hideText = toggle.dataset.hideText || 'Hide Details';
                toggle.textContent = isHidden ? hideText : showText;
                
                // If there's an icon, toggle it too
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-chevron-down', isHidden);
                    icon.classList.toggle('fa-chevron-up', !isHidden);
                }
            }
        });
    });

    // Print functionality
    const printButton = document.getElementById('printDashboard');
    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    }

    // Export functionality (placeholder)
    const exportButton = document.getElementById('exportData');
    if (exportButton) {
        exportButton.addEventListener('click', () => {
            alert('Export functionality would be implemented here.');
            // Actual implementation would depend on export format needs
        });
    }

    // Tooltip initialization
    // Modern browsers support the title attribute, but for custom tooltips:
    document.querySelectorAll('.tooltip').forEach(tooltip => {
        const tooltipText = tooltip.getAttribute('data-tooltip');
        if (tooltipText) {
            const tooltipElement = document.createElement('span');
            tooltipElement.className = 'tooltiptext';
            tooltipElement.textContent = tooltipText;
            tooltip.appendChild(tooltipElement);
        }
    });
}); 