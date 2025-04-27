// Ensure the initialization function is globally accessible
window.initializeDashboard = function() {
    console.log('Initializing dashboard...');
    
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('[data-tab-content]');

    // Attach event listeners directly
    tabButtons.forEach(button => {
        button.addEventListener('click', handleTabClick);
    });
    
    function handleTabClick() {
        const tabTarget = this.dataset.tab;
        
        // Toggle active state on buttons
        tabButtons.forEach(btn => {
            btn.classList.remove('tab-active');
            btn.setAttribute('aria-selected', 'false');
        });
        this.classList.add('tab-active');
        this.setAttribute('aria-selected', 'true');
        
        // Show active tab content
        tabContents.forEach(content => {
            // Ensure content element exists before manipulating classes
            if (content && content.dataset.tabContent === tabTarget) {
                content.classList.remove('hidden');
                content.classList.add('slide-in');
            } else if (content) {
                content.classList.add('hidden');
                content.classList.remove('slide-in');
            }
        });
    }

    // Filter functionality
    const filterButtons = document.querySelectorAll('[data-filter]');
    const filterSelects = document.querySelectorAll('select[data-filter]');
    
    // For button filters
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterButtonClick);
    });
    
    function handleFilterButtonClick() {
        const filterGroup = this.closest('[data-filter-group]');
        if (filterGroup) {
            const groupButtons = filterGroup.querySelectorAll('[data-filter]');
            groupButtons.forEach(btn => btn.classList.remove('bg-indigo-600', 'text-white'));
            this.classList.add('bg-indigo-600', 'text-white');
        }
        applyFilters();
    }
    
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
        toggle.addEventListener('click', handleDetailsToggle);
    });
    
    function handleDetailsToggle() {
        const targetId = this.dataset.toggleDetails;
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const isHidden = targetElement.classList.contains('hidden');
            targetElement.classList.toggle('hidden', !isHidden);
            targetElement.classList.toggle('slide-in', !isHidden);
            
            // Update button text/icon
            const showText = this.dataset.showText || 'Show Details';
            const hideText = this.dataset.hideText || 'Hide Details';
            const iconElement = this.querySelector('i'); // Get icon if present
            
            // Set text content excluding the icon's HTML
            this.innerHTML = (isHidden ? hideText : showText) + (iconElement ? ` ${iconElement.outerHTML}` : ''); 
            
            // If there's an icon, toggle it too
            const updatedIcon = this.querySelector('i'); // Re-select icon after innerHTML change
            if (updatedIcon) {
                updatedIcon.classList.toggle('fa-chevron-down', isHidden);
                updatedIcon.classList.toggle('fa-chevron-up', !isHidden);
            }
        } else {
            console.warn(`Target element for toggle not found: ${targetId}`);
        }
    }

    // Print functionality
    const printButton = document.getElementById('printDashboard');
    if (printButton) {
        printButton.addEventListener('click', handlePrint);
    }
    
    function handlePrint() {
        window.print();
    }

    // Export functionality (placeholder)
    const exportButton = document.getElementById('exportData');
    if (exportButton) {
        exportButton.addEventListener('click', handleExport);
    }
    
    function handleExport() {
        alert('Export functionality would be implemented here.');
        // Actual implementation would depend on export format needs
    }

    // Tooltip initialization - only once
    initializeTooltips();
    
    console.log('Dashboard initialized.');
};

function initializeTooltips() {
    // Remove existing tooltip spans if any (to prevent duplicates on re-init)
    document.querySelectorAll('.tooltip .tooltiptext').forEach(el => el.remove());
    
    document.querySelectorAll('.tooltip').forEach(tooltip => {
        const tooltipData = tooltip.getAttribute('data-tooltip');
        if (tooltipData) {
            let tooltipContent = '';
            try {
                // Attempt to parse JSON for structured tooltips
                const data = JSON.parse(tooltipData.replace(/'/g, '"')); // Replace single quotes if used
                tooltipContent = `<div class="font-semibold text-center mb-1">${data.title}</div>`;
                if(data.gap) tooltipContent += `<div>Gap: ${data.gap}</div>`;
                if(data.priority) tooltipContent += `<div>Priority: ${data.priority}</div>`;
                if(data.recommendation) tooltipContent += `<div class="text-xs mt-1">Recommended: ${data.recommendation}</div>`;
                if(data.factors && Array.isArray(data.factors)) {
                     tooltipContent += `<ul class="list-disc list-outside pl-3 mt-1 text-left">`;
                     data.factors.forEach(factor => { tooltipContent += `<li>${factor}</li>`; });
                     tooltipContent += `</ul>`;
                }
            } catch (e) {
                // Fallback to plain text if not valid JSON
                tooltipContent = tooltipData;
            }

            const tooltipElement = document.createElement('span');
            tooltipElement.className = 'tooltiptext';
            tooltipElement.innerHTML = tooltipContent; // Use innerHTML to render potential HTML tags
            tooltip.appendChild(tooltipElement);
        }
    });
    console.log('Tooltips initialized.');
} 