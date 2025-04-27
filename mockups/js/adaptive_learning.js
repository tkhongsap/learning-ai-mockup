/**
 * Adaptive Learning Path - Core functionality
 * A modular implementation of the adaptive learning experience
 */

// Core classes and namespaces
const AdaptiveLearning = {
    // State management
    State: {
        currentStep: 0,
        pathItems: [],
        learningStyle: "visual", // Can be "visual", "auditory", "reading", "kinesthetic"
        difficultyPreference: "standard", // Can be "easy", "standard", "challenging"
        skillLevels: {
            "navigation": 75,
            "salesOrder": 25,
            "customerData": 10,
            "reporting": 0
        },

        // Method to initialize the learning path
        initializePath() {
            this.pathItems = [
                { id: 1, type: 'module', title: 'Introduction to SAP Navigation', status: 'locked', duration: '15 min', skillArea: 'navigation' },
                { id: 2, type: 'module', title: 'Understanding Sales Orders', status: 'locked', duration: '25 min', skillArea: 'salesOrder', matchStyle: 'visual' },
                { id: 3, type: 'quiz', title: 'Quiz 1: Sales Order Basics', status: 'locked', questions: 1, difficulty: 'Standard', skillArea: 'salesOrder' },
                { id: 4, type: 'module', title: 'Customer Master Data', status: 'locked', duration: '20 min', skillArea: 'customerData' },
                { id: 5, type: 'module', title: 'Pricing and Conditions', status: 'locked', duration: '30 min', skillArea: 'salesOrder' },
                { id: 6, type: 'quiz', title: 'Quiz 2: Customer & Pricing', status: 'locked', questions: 1, difficulty: 'Adaptive', skillArea: 'customerData' },
                { id: 7, type: 'module', title: 'Reporting in SAP Sales', status: 'locked', duration: '25 min', skillArea: 'reporting' },
                { id: 8, type: 'final', title: 'Course Completion', status: 'locked' }
            ];
            
            this.currentStep = 0;
            this.pathItems[0].status = 'active';
            return this.pathItems;
        },

        // Method to update skill levels
        updateSkill(skillArea, value, isAdditive = true) {
            try {
                if (!this.skillLevels.hasOwnProperty(skillArea)) {
                    console.error(`Skill area "${skillArea}" not found`);
                    return false;
                }
                
                if (isAdditive) {
                    this.skillLevels[skillArea] += value;
                } else {
                    this.skillLevels[skillArea] = value;
                }
                
                // Ensure values are within 0-100 range
                this.skillLevels[skillArea] = Math.max(0, Math.min(100, this.skillLevels[skillArea]));
                return true;
            } catch (error) {
                console.error("Error updating skill level:", error);
                return false;
            }
        }
    },

    // UI management and rendering
    UI: {
        elements: {}, // Will store DOM references

        // Initialize all DOM references
        initializeElements() {
            this.elements = {
                learningPath: document.getElementById('al-learning-path'),
                currentActivity: document.getElementById('al-current-activity'),
                completionMessage: document.getElementById('al-completion-message'),
                progressBar: document.getElementById('progress-bar'),
                completionPercentage: document.getElementById('completion-percentage'),
                aiAssistantMessage: document.getElementById('ai-assistant-message'),
                aiRecommendationPanel: document.getElementById('ai-recommendation-panel'),
                aiRecommendationText: document.getElementById('ai-recommendation-text'),
                acceptRecommendation: document.getElementById('accept-recommendation'),
                declineRecommendation: document.getElementById('decline-recommendation'),
                aiAskBtn: document.getElementById('ai-ask-btn'),
                aiPreferencesBtn: document.getElementById('ai-preferences-btn'),
                alternativePaths: document.getElementById('alternative-paths'),
                salesOrderSkill: document.getElementById('sales-order-skill'),
                salesOrderProgress: document.getElementById('sales-order-progress')
            };

            // Check if all elements were found
            let missingElements = [];
            for (const [key, element] of Object.entries(this.elements)) {
                if (!element) missingElements.push(key);
            }
            
            if (missingElements.length > 0) {
                console.warn("Missing UI elements:", missingElements.join(', '));
            }
            
            return this.elements;
        },

        // Update progress indicators based on completed items
        updateProgress(pathItems) {
            const completedItems = pathItems.filter(item => item.status === 'completed').length;
            const totalItems = pathItems.length;
            const percentage = Math.round((completedItems / totalItems) * 100);
            
            if (this.elements.progressBar) {
                this.elements.progressBar.style.width = `${percentage}%`;
            }
            
            if (this.elements.completionPercentage) {
                this.elements.completionPercentage.textContent = `${percentage}%`;
            }
        },

        // Render the learning path
        renderPath(pathItems, currentStep) {
            if (!this.elements.learningPath) return;
            this.elements.learningPath.innerHTML = '';
            
            pathItems.forEach((item, index) => {
                const isLocked = item.status === 'locked';
                const isActive = index === currentStep && item.status !== 'completed';
                const isCompleted = item.status === 'completed';
                const isAdaptive = item.adaptive === true;
                const isSkippable = item.skippable === true;
                
                let itemHtml = `
                    <div id="al-path-item-${item.id}" class="path-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isLocked && !isActive ? 'locked' : ''} ${isAdaptive ? 'adaptive-insert' : ''} ${isSkippable ? 'skippable' : ''}">
                        <div class="flex justify-between items-center">
                            <span class="font-medium ${isLocked && !isActive ? 'text-gray-500' : 'text-gray-900'}">
                                ${item.adaptive ? '<i class="fas fa-lightbulb text-yellow-500 mr-1"></i> ' : ''}
                                ${item.skippable ? '<i class="fas fa-forward text-purple-500 mr-1"></i> ' : ''}
                                ${item.title}
                                ${isCompleted ? '<i class="fas fa-check text-green-500 ml-2"></i>' : ''}
                                ${isActive ? '<i class="fas fa-arrow-right text-blue-500 ml-2"></i>' : ''}
                            </span>
                            <span class="text-xs text-gray-500">${item.duration || (item.questions ? `${item.questions} Question(s)` : '')}</span>
                        </div>
                        ${isAdaptive ? '<p class="text-xs text-yellow-700 mt-1">AI Suggestion: Added based on your quiz performance.</p>' : ''}
                        ${isSkippable ? '<p class="text-xs text-purple-700 mt-1">Optional: AI suggests you can skip this based on your skill level.</p>' : ''}
                        ${item.matchStyle ? '<p class="text-xs text-blue-600 mt-1"><i class="fas fa-check-circle mr-1"></i> Matched to your ' + item.matchStyle + ' learning style</p>' : ''}
                    </div>
                `;
                
                this.elements.learningPath.insertAdjacentHTML('beforeend', itemHtml);
                
                const itemElement = document.getElementById(`al-path-item-${item.id}`);
                if (itemElement && (!isLocked || isActive)) {
                    itemElement.style.cursor = 'pointer';
                    itemElement.onclick = () => AdaptiveLearning.Activities.loadActivity(index);
                }
            });
            
            this.updateProgress(pathItems);
        },

        // Update skill visualization in the UI
        updateSkillDisplay(skillArea, value) {
            if (skillArea === 'salesOrder' && this.elements.salesOrderSkill && this.elements.salesOrderProgress) {
                this.elements.salesOrderSkill.textContent = `${value}%`;
                this.elements.salesOrderProgress.style.width = `${value}%`;
            }
        },

        // Update AI assistant message
        setAssistantMessage(message) {
            if (this.elements.aiAssistantMessage) {
                this.elements.aiAssistantMessage.innerHTML = message;
            }
        },

        // Show/hide recommendation panel
        toggleRecommendationPanel(show, message = null) {
            if (!this.elements.aiRecommendationPanel) return;
            
            if (show) {
                this.elements.aiRecommendationPanel.classList.remove('hidden');
                if (message && this.elements.aiRecommendationText) {
                    this.elements.aiRecommendationText.textContent = message;
                }
            } else {
                this.elements.aiRecommendationPanel.classList.add('hidden');
            }
        },

        // Show alternative paths panel
        showAlternativePaths() {
            if (this.elements.alternativePaths) {
                this.elements.alternativePaths.classList.remove('hidden');
            }
        },

        // Show completion message
        showCompletionMessage() {
            if (this.elements.completionMessage) {
                this.elements.completionMessage.classList.remove('hidden');
            }
        }
    },

    // Activity management (modules, quizzes, etc.)
    Activities: {
        // Load an activity at the specified index
        loadActivity(index) {
            const ui = AdaptiveLearning.UI;
            const state = AdaptiveLearning.State;
            
            if (!ui.elements.currentActivity) return;
            
            state.currentStep = index;
            ui.renderPath(state.pathItems, state.currentStep);
            
            const item = state.pathItems[index];
            ui.elements.currentActivity.innerHTML = '';
            
            if (item.status === 'completed') {
                ui.elements.currentActivity.innerHTML = `<p class="text-sm text-gray-600">You have already completed: <strong>${item.title}</strong>.</p>`;
                return;
            }
            
            if (item.type === 'module') {
                this.renderModule(item, index);
            } else if (item.type === 'quiz') {
                this.renderQuiz(item, index);
            } else if (item.type === 'final') {
                this.renderFinal();
            }
            
            state.pathItems[index].status = 'active';
        },

        // Render a module activity
        renderModule(item, index) {
            const ui = AdaptiveLearning.UI;
            
            const visualContent = item.matchStyle === 'visual' ? 
                `<div class="bg-blue-50 p-3 rounded-md my-3 border border-blue-200">
                    <p class="text-sm text-blue-700"><i class="fas fa-eye mr-1"></i> Visual content tailored to your learning style.</p>
                </div>` : '';
            
            ui.elements.currentActivity.innerHTML = `
                <h4 class="font-semibold mb-2">${item.title}</h4>
                <p class="text-sm text-gray-600 mb-4">Estimated duration: ${item.duration}.</p>
                ${item.skippable ? 
                    `<div class="flex justify-between items-center mb-4 bg-purple-50 p-2 rounded-md border border-purple-200">
                        <p class="text-xs text-purple-700"><i class="fas fa-info-circle mr-1"></i> AI suggests you already know this content.</p>
                        <button class="text-xs px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700" onclick="AdaptiveLearning.Activities.skipModule(${index})">
                            Skip Module
                        </button>
                    </div>` : ''}
                ${visualContent}
                <div class="aspect-video bg-gray-300 rounded flex items-center justify-center mb-4">
                    <span class="text-gray-500">(Module Content Placeholder)</span>
                </div>
                <button class="w-full px-4 py-2 bg-green-600 text-white text-sm rounded-md shadow hover:bg-green-700" 
                        onclick="AdaptiveLearning.Activities.completeStep(${index})">Mark as Complete</button>
            `;
        },

        // Render a quiz activity
        renderQuiz(item, index) {
            const ui = AdaptiveLearning.UI;
            
            ui.elements.currentActivity.innerHTML = `
                <h4 class="font-semibold mb-2">${item.title}</h4>
                <div class="flex justify-between items-center mb-3">
                    <p class="text-sm text-gray-600">Question 1 of ${item.questions || 1}:</p>
                    <span class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">AI Difficulty: ${item.difficulty || 'Standard'}</span>
                </div>
                <p class="mb-3 font-medium">Where do you typically create a standard Sales Order in SAP?</p>
                <div class="space-y-2">
                    <div class="quiz-option border p-3 rounded-md text-sm" data-correct="true" onclick="AdaptiveLearning.Activities.selectAnswer(this)">A) Transaction VA01</div>
                    <div class="quiz-option border p-3 rounded-md text-sm" onclick="AdaptiveLearning.Activities.selectAnswer(this)">B) Transaction ME21N</div>
                    <div class="quiz-option border p-3 rounded-md text-sm" onclick="AdaptiveLearning.Activities.selectAnswer(this)">C) Transaction FB01</div>
                </div>
                <button id="al-submit-quiz-btn" class="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md shadow hover:bg-blue-700 disabled:opacity-50"
                        disabled onclick="AdaptiveLearning.Activities.submitQuiz(${index})">Submit Answer</button>
                <div id="al-quiz-feedback" class="hidden mt-3 text-sm"></div>
            `;
        },

        // Render the final completion step
        renderFinal() {
            const ui = AdaptiveLearning.UI;
            
            ui.elements.currentActivity.innerHTML = `
                <div class="text-center">
                    <p class="text-green-600 font-semibold mb-3">Ready to complete the course!</p>
                    <button class="px-4 py-2 bg-green-600 text-white text-sm rounded-md shadow hover:bg-green-700"
                            onclick="AdaptiveLearning.Activities.finishCourse()">Complete Course</button>
                </div>
            `;
        },

        // Handle skipping a module
        skipModule(index) {
            const state = AdaptiveLearning.State;
            const ui = AdaptiveLearning.UI;
            
            // Update skills if skipping
            if (state.pathItems[index].skillArea === 'salesOrder') {
                state.updateSkill('salesOrder', 5);
                ui.updateSkillDisplay('salesOrder', state.skillLevels.salesOrder);
            }
            
            this.completeStep(index);
            ui.setAssistantMessage("I've marked this module as complete. Let me know if you need any clarification on this topic later!");
        },

        // Handle completion of the entire course
        finishCourse() {
            const state = AdaptiveLearning.State;
            const ui = AdaptiveLearning.UI;
            
            ui.showCompletionMessage();
            // Update all skills to high levels since course is complete
            state.updateSkill('salesOrder', 90, false);
            state.updateSkill('customerData', 85, false);
            state.updateSkill('reporting', 80, false);
            
            ui.updateSkillDisplay('salesOrder', state.skillLevels.salesOrder);
            
            ui.setAssistantMessage("Congratulations on completing the course! Based on your performance, I've identified that you have strong skills in SAP Navigation, but may want to revisit Sales Order processing in the future.");
        },

        // Handle answer selection in quizzes
        selectAnswer(optionElement) {
            const container = optionElement.closest('#al-current-activity');
            if (!container) return;
            
            container.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
            optionElement.classList.add('selected');
            
            const submitBtn = container.querySelector('#al-submit-quiz-btn');
            if (submitBtn) submitBtn.disabled = false;
        },

        // Handle quiz submission
        submitQuiz(index) {
            const state = AdaptiveLearning.State;
            const ui = AdaptiveLearning.UI;
            
            const container = document.getElementById('al-current-activity');
            if (!container) return;
            
            const selectedOption = container.querySelector('.quiz-option.selected');
            const feedbackEl = container.querySelector('#al-quiz-feedback');
            const submitBtn = container.querySelector('#al-submit-quiz-btn');
            
            if (!selectedOption || !feedbackEl || !submitBtn) return;
            
            const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
            const quizItemId = state.pathItems[index].id;
            
            feedbackEl.classList.remove('hidden');
            
            if (isCorrect) {
                this.handleCorrectAnswer(selectedOption, feedbackEl, index, quizItemId);
            } else {
                this.handleIncorrectAnswer(selectedOption, feedbackEl, index, quizItemId, submitBtn);
            }
            
            container.querySelectorAll('.quiz-option').forEach(el => el.onclick = null);
        },

        // Handle correct quiz answer
        handleCorrectAnswer(selectedOption, feedbackEl, index, quizItemId) {
            const state = AdaptiveLearning.State;
            const ui = AdaptiveLearning.UI;
            
            selectedOption.classList.add('correct');
            feedbackEl.innerHTML = `
                <div class="bg-green-50 p-3 rounded-md border border-green-200">
                    <p class="text-green-700 font-medium"><i class="fas fa-check mr-1"></i> Correct!</p>
                    <p class="text-sm mt-1">Great job! You have a good understanding of Sales Order creation in SAP.</p>
                </div>
            `;
            
            // Update skill level
            if (state.pathItems[index].skillArea === 'salesOrder') {
                state.updateSkill('salesOrder', 15);
                ui.updateSkillDisplay('salesOrder', state.skillLevels.salesOrder);
            }
            
            // Show the alternative paths panel after passing quiz
            if (quizItemId === 3) {
                ui.showAlternativePaths();
            }
            
            // AI assistant message
            ui.setAssistantMessage("Well done! Based on your quiz performance, I've identified that some upcoming modules may be too basic for you. Would you like to skip to more advanced content?");
            
            setTimeout(() => this.completeStep(index), 1500);
        },

        // Handle incorrect quiz answer
        handleIncorrectAnswer(selectedOption, feedbackEl, index, quizItemId, submitBtn) {
            const state = AdaptiveLearning.State;
            const ui = AdaptiveLearning.UI;
            
            selectedOption.classList.add('incorrect');
            feedbackEl.innerHTML = `
                <div class="bg-red-50 p-3 rounded-md border border-red-200">
                    <p class="text-red-700 font-medium"><i class="fas fa-times mr-1"></i> Incorrect.</p>
                    <p class="text-sm mt-1">The correct answer is Transaction VA01. Let me add a refresher module to help you with this.</p>
                </div>
            `;
            
            // Update skill level - decrease for wrong answer
            if (state.pathItems[index].skillArea === 'salesOrder') {
                state.updateSkill('salesOrder', -5);
                ui.updateSkillDisplay('salesOrder', state.skillLevels.salesOrder);
            }
            
            // Show AI recommendation
            ui.setAssistantMessage("I've noticed you're having difficulty with transaction codes. I'll add a refresher module focusing specifically on this area.");
            
            this.adaptPath(index, quizItemId);
            submitBtn.disabled = true;
            
            setTimeout(() => {
                const adaptiveIndex = state.pathItems.findIndex(item => item.adaptive && item.adaptiveSource === quizItemId);
                if (adaptiveIndex !== -1) this.loadActivity(adaptiveIndex);
                
                // Show recommendation panel
                ui.toggleRecommendationPanel(true, "I recommend also reviewing the 'SAP Transaction Codes Guide' resource to strengthen your understanding of navigation.");
            }, 2000);
        },

        // Add an adaptive module to the learning path
        adaptPath(failedQuizIndex, quizId) {
            const state = AdaptiveLearning.State;
            const ui = AdaptiveLearning.UI;
            
            if (state.pathItems.some(item => item.adaptiveSource === quizId)) return;
            
            const adaptiveModule = {
                id: Date.now(),
                type: 'module',
                title: 'Refresher: Sales Order Process',
                status: 'locked',
                duration: '10 min',
                adaptive: true,
                adaptiveSource: quizId,
                skillArea: 'salesOrder',
                matchStyle: state.learningStyle // Match to user's learning style
            };
            
            state.pathItems.splice(failedQuizIndex + 1, 0, adaptiveModule);
            ui.renderPath(state.pathItems, state.currentStep);
        },

        // Complete a step in the learning path
        completeStep(index) {
            const state = AdaptiveLearning.State;
            const ui = AdaptiveLearning.UI;
            
            if (!ui.elements.currentActivity) return;
            
            state.pathItems[index].status = 'completed';
            ui.elements.currentActivity.innerHTML = `<p class="text-green-600 italic">Step completed!</p>`;
            
            // Check if we can make the next step skippable based on skills
            if (index + 2 < state.pathItems.length && 
                state.pathItems[index + 1].type === 'module' && 
                state.pathItems[index + 1].skillArea === 'salesOrder' && 
                state.skillLevels.salesOrder >= 40) {
                state.pathItems[index + 1].skippable = true;
            }
            
            if (index + 1 < state.pathItems.length) {
                state.pathItems[index + 1].status = 'active';
                state.currentStep = index + 1;
                setTimeout(() => this.loadActivity(state.currentStep), 500);
            } else {
                ui.showCompletionMessage();
            }
            
            ui.renderPath(state.pathItems, state.currentStep);
        }
    },

    // AI assistant functionality
    Assistant: {
        // Initialize AI assistant event listeners
        initializeAssistant() {
            const ui = AdaptiveLearning.UI;
            const state = AdaptiveLearning.State;
            
            // Ask button
            if (ui.elements.aiAskBtn) {
                ui.elements.aiAskBtn.addEventListener('click', () => {
                    const currentActivity = state.pathItems[state.currentStep];
                    if (currentActivity.type === 'quiz') {
                        ui.setAssistantMessage("For this quiz question, remember that standard Sales Orders in SAP are typically created using transaction codes that start with 'VA'. I can't give you the direct answer, but I hope this helps!");
                    } else {
                        ui.setAssistantMessage(`What questions do you have about ${currentActivity.title}? I'm here to help explain any concepts or provide additional examples.`);
                    }
                });
            }
            
            // Preferences button
            if (ui.elements.aiPreferencesBtn) {
                ui.elements.aiPreferencesBtn.addEventListener('click', () => {
                    ui.setAssistantMessage(`I've detected you prefer <strong>${state.learningStyle} learning</strong>. I'll prioritize content with ${this.getLearningStyleDescription(state.learningStyle)}. Would you like to change this preference?`);
                });
            }
            
            // Accept recommendation button
            if (ui.elements.acceptRecommendation) {
                ui.elements.acceptRecommendation.addEventListener('click', () => {
                    ui.toggleRecommendationPanel(false);
                    ui.setAssistantMessage("I've added the SAP Transaction Codes Guide to your resources. You can access it anytime from your resource library.");
                });
            }
            
            // Decline recommendation button
            if (ui.elements.declineRecommendation) {
                ui.elements.declineRecommendation.addEventListener('click', () => {
                    ui.toggleRecommendationPanel(false);
                    ui.setAssistantMessage("No problem! Let me know if you change your mind and want to explore additional resources.");
                });
            }
        },
        
        // Get description based on learning style
        getLearningStyleDescription(style) {
            const descriptions = {
                "visual": "diagrams and visual aids",
                "auditory": "audio explanations and discussions",
                "reading": "detailed text explanations",
                "kinesthetic": "interactive exercises and practical examples"
            };
            
            return descriptions[style] || "tailored content";
        }
    },

    // Application initialization
    init() {
        try {
            // Initialize UI elements
            this.UI.initializeElements();
            
            // Initialize learning path
            const pathItems = this.State.initializePath();
            
            // Initialize AI assistant
            this.Assistant.initializeAssistant();
            
            // Render the initial path
            this.UI.renderPath(pathItems, this.State.currentStep);
            
            // Load the first activity
            this.Activities.loadActivity(0);
            
            console.log("Adaptive Learning Path initialized successfully");
            return true;
        } catch (error) {
            console.error("Error initializing Adaptive Learning Path:", error);
            return false;
        }
    }
};

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    AdaptiveLearning.init();
}); 