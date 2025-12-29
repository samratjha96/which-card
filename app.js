// ABOUTME: Main application logic for credit card rewards tracker
// ABOUTME: Handles card CRUD operations, search, and localStorage persistence

// Common categories for autocomplete suggestions (no emojis, professional)
const categoryTemplates = [
    'Groceries',
    'Grocery Stores',
    'Supermarkets',
    'Gas',
    'Gas Stations',
    'Fuel',
    'EV Charging',
    'Restaurants',
    'Dining',
    'Amazon',
    'Amazon.com',
    'Walmart',
    'Walmart.com',
    'Target',
    'Target.com',
    'Travel',
    'Airlines',
    'Flights',
    'Hotels',
    'Hyatt',
    'Marriott',
    'Hilton',
    'Car Rentals',
    'Rental Cars',
    'Streaming',
    'Streaming Services',
    'Netflix',
    'Spotify',
    'Drugstores',
    'Pharmacy',
    'CVS',
    'Walgreens',
    'Transit',
    'Rideshare',
    'Uber',
    'Lyft',
    'Fitness',
    'Gym',
    'Online Shopping',
    'Home Improvement',
    'Office Supplies',
    'Entertainment',
    'PayPal',
    'Utilities',
    'Phone Plans',
    'Internet',
    'Costco',
    'Wholesale Clubs',
    'Department Stores',
    'Electronics',
    'Rent'
];

// State
let cards = [];
let currentView = 'all';
let currentSort = 'name';
let editingCardId = null;
let selectedColor = '#6366f1';

// DOM Elements
const cardsGrid = document.getElementById('cardsGrid');
const searchInput = document.getElementById('searchInput');
const cardModal = document.getElementById('cardModal');
const modalTitle = document.getElementById('modalTitle');
const addCardBtn = document.getElementById('addCardBtn');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const rewardsContainer = document.getElementById('rewardsContainer');
const addRewardBtn = document.getElementById('addRewardBtn');
const tabButtons = document.querySelectorAll('.tab-btn');
const quickFilters = document.getElementById('quickFilters');
const colorPicker = document.getElementById('colorPicker');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importInput = document.getElementById('importInput');
const resetBtn = document.getElementById('resetBtn');
const sortSelect = document.getElementById('sortSelect');

// Initialize
function init() {
    loadCards();
    renderCards();
    bindEvents();
}

// Load cards from localStorage
function loadCards() {
    const stored = localStorage.getItem('creditCards');
    if (stored) {
        cards = JSON.parse(stored);
    } else {
        cards = getSampleCards();
        saveCards();
    }
}

// Save cards to localStorage
function saveCards() {
    localStorage.setItem('creditCards', JSON.stringify(cards));
}

// Sample cards
function getSampleCards() {
    return [
        {
            id: '1',
            name: 'Amex Platinum',
            issuer: 'American Express',
            baseReward: 1,
            color: '#71717a',
            notes: '$695 annual fee',
            rewards: [
                { categories: 'Flights (direct or Amex Travel)', percent: 5, rotating: false },
                { categories: 'Prepaid Hotels (Amex Travel)', percent: 5, rotating: false }
            ]
        },
        {
            id: '2',
            name: 'Chase Freedom',
            issuer: 'Chase',
            baseReward: 1,
            color: '#6366f1',
            notes: 'Original Freedom card, $0 annual fee',
            rewards: [
                { categories: 'Quarterly Categories (activate required)', percent: 5, rotating: true }
            ]
        },
        {
            id: '3',
            name: 'Chase Freedom Flex',
            issuer: 'Chase',
            baseReward: 1,
            color: '#6366f1',
            notes: '$0 annual fee',
            rewards: [
                { categories: 'Quarterly Categories (activate required)', percent: 5, rotating: true },
                { categories: 'Travel (via Chase)', percent: 5, rotating: false },
                { categories: 'Dining, Drugstores', percent: 3, rotating: false }
            ]
        },
        {
            id: '4',
            name: 'Bilt Mastercard',
            issuer: 'Bilt',
            baseReward: 1,
            color: '#ef4444',
            notes: '$0 annual fee. 1x on non-category only on Rent Day (1st of month). Rent earns 1x with no fee.',
            rewards: [
                { categories: 'Dining', percent: 3, rotating: false },
                { categories: 'Travel', percent: 2, rotating: false },
                { categories: 'Rent (no fee)', percent: 1, rotating: false }
            ]
        },
        {
            id: '5',
            name: 'Chase World of Hyatt',
            issuer: 'Chase',
            baseReward: 1,
            color: '#8b5cf6',
            notes: '$95 annual fee. 9x total at Hyatt (4x base + 5x member bonus)',
            rewards: [
                { categories: 'Hyatt Hotels', percent: 9, rotating: false },
                { categories: 'Dining, Fitness, Transit', percent: 2, rotating: false }
            ]
        },
        {
            id: '6',
            name: 'Capital One SavorOne',
            issuer: 'Capital One',
            baseReward: 1,
            color: '#f59e0b',
            notes: '$0 annual fee',
            rewards: [
                { categories: 'Hotels, Rental Cars (via Capital One Travel)', percent: 5, rotating: false },
                { categories: 'Dining, Entertainment, Streaming', percent: 3, rotating: false },
                { categories: 'Groceries (excludes Walmart/Target)', percent: 3, rotating: false }
            ]
        },
        {
            id: '7',
            name: 'Capital One Venture X',
            issuer: 'Capital One',
            baseReward: 2,
            color: '#22c55e',
            notes: '$395 annual fee. $300 travel credit annually.',
            rewards: [
                { categories: 'Hotels, Rental Cars (via Capital One Travel)', percent: 10, rotating: false },
                { categories: 'Flights (via Capital One Travel)', percent: 5, rotating: false }
            ]
        },
        {
            id: '8',
            name: 'US Bank Altitude Go',
            issuer: 'US Bank',
            baseReward: 1,
            color: '#06b6d4',
            notes: '$0 annual fee. 4x dining capped at $2,000/quarter.',
            rewards: [
                { categories: 'Dining (first $2k/quarter)', percent: 4, rotating: false },
                { categories: 'Streaming, Groceries, Gas', percent: 2, rotating: false }
            ]
        },
        {
            id: '9',
            name: 'Chase Sapphire Preferred',
            issuer: 'Chase',
            baseReward: 1,
            color: '#1e3a5f',
            notes: '$95 annual fee. $50 Chase Travel hotel credit. 10% anniversary bonus on prior year spend. Points transfer 1:1 to travel partners.',
            rewards: [
                { categories: 'Travel (via Chase)', percent: 5, rotating: false },
                { categories: 'Dining', percent: 3, rotating: false },
                { categories: 'Online Groceries (excludes Target/Walmart)', percent: 3, rotating: false },
                { categories: 'Streaming', percent: 3, rotating: false },
                { categories: 'Other Travel', percent: 2, rotating: false }
            ]
        }
    ];
}

// Bind events
function bindEvents() {
    addCardBtn.addEventListener('click', () => openModal());
    closeModal.addEventListener('click', () => closeModalHandler());
    cancelBtn.addEventListener('click', () => closeModalHandler());
    saveBtn.addEventListener('click', () => saveCard());
    addRewardBtn.addEventListener('click', () => addRewardInput());
    searchInput.addEventListener('input', () => {
        updateQuickFilterState();
        renderCards();
    });
    
    cardModal.addEventListener('click', (e) => {
        if (e.target === cardModal) closeModalHandler();
    });

    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentView = e.target.dataset.view;
            renderCards();
        });
    });

    // Quick filter buttons
    quickFilters.addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;
        
        const filter = pill.dataset.filter;
        if (searchInput.value.toLowerCase() === filter) {
            searchInput.value = '';
            pill.classList.remove('active');
        } else {
            searchInput.value = filter;
            updateQuickFilterState();
        }
        renderCards();
    });

    // Color picker
    colorPicker.addEventListener('click', (e) => {
        const colorOption = e.target.closest('.color-option');
        if (!colorOption) return;
        
        colorPicker.querySelectorAll('.color-option').forEach(c => c.classList.remove('selected'));
        colorOption.classList.add('selected');
        selectedColor = colorOption.dataset.color;
        document.getElementById('cardColor').value = selectedColor;
    });

    // Settings
    settingsBtn.addEventListener('click', () => {
        settingsModal.classList.add('active');
    });

    closeSettings.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });

    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) settingsModal.classList.remove('active');
    });

    // Export/Import
    exportBtn.addEventListener('click', exportCards);
    importBtn.addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', importCards);
    resetBtn.addEventListener('click', resetData);

    // Sort change
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderCards();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
        
        if (e.key === 'Escape') {
            if (cardModal.classList.contains('active')) {
                closeModalHandler();
            } else if (settingsModal.classList.contains('active')) {
                settingsModal.classList.remove('active');
            } else if (searchInput.value && document.activeElement === searchInput) {
                searchInput.value = '';
                updateQuickFilterState();
                renderCards();
            }
        }
        
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
        
        if (e.key === 'n' && !isTyping && !cardModal.classList.contains('active') && !settingsModal.classList.contains('active')) {
            e.preventDefault();
            openModal();
        }
        
        if (e.key === '/' && !isTyping) {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// Update quick filter button state based on search input
function updateQuickFilterState() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    quickFilters.querySelectorAll('.filter-pill').forEach(pill => {
        if (pill.dataset.filter === searchTerm) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });
}

// Update card count in header
function updateCardCount(count) {
    const cardCount = document.getElementById('cardCount');
    if (count === 0) {
        cardCount.textContent = '';
    } else {
        cardCount.textContent = `(${count} ${count === 1 ? 'card' : 'cards'})`;
    }
}

// Render cards
function renderCards() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let filteredCards = cards;
    let bestCard = null;
    let bestPercent = 0;
    let matchedCategory = '';

    if (searchTerm) {
        filteredCards = cards.filter(card => {
            if (card.name.toLowerCase().includes(searchTerm)) return true;
            if (card.issuer.toLowerCase().includes(searchTerm)) return true;
            
            for (const reward of card.rewards) {
                if (matchesCategory(reward.categories.toLowerCase(), searchTerm)) {
                    return true;
                }
            }
            return false;
        });

        cards.forEach(card => {
            for (const reward of card.rewards) {
                if (matchesCategory(reward.categories.toLowerCase(), searchTerm)) {
                    if (reward.percent > bestPercent) {
                        bestPercent = reward.percent;
                        bestCard = card;
                        matchedCategory = reward.categories;
                    }
                }
            }
        });

        if (!bestCard && filteredCards.length > 0) {
            filteredCards.forEach(card => {
                if (card.baseReward > bestPercent) {
                    bestPercent = card.baseReward;
                    bestCard = card;
                }
            });
        }
    }

    if (currentView === 'best' && searchTerm && bestCard) {
        filteredCards = [bestCard];
    }

    if (searchTerm && bestCard) {
        filteredCards.sort((a, b) => {
            if (a.id === bestCard.id) return -1;
            if (b.id === bestCard.id) return 1;
            return a.name.localeCompare(b.name);
        });
    } else {
        filteredCards = sortCards(filteredCards, currentSort);
    }

    if (filteredCards.length === 0) {
        updateCardCount(0);
        if (searchTerm) {
            cardsGrid.innerHTML = `
                <div class="no-results">
                    <p>No cards found for "${escapeHtml(searchTerm)}"</p>
                    <p style="margin-top: 8px; font-size: 0.85rem;">Try a different search or add a new card</p>
                </div>
            `;
        } else {
            cardsGrid.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="2" y="5" width="20" height="14" rx="2"/>
                        <path d="M2 10h20"/>
                    </svg>
                    <h3>No cards yet</h3>
                    <p>Add your first credit card to get started</p>
                </div>
            `;
        }
        return;
    }

    updateCardCount(filteredCards.length);

    cardsGrid.innerHTML = filteredCards.map(card => {
        const isBest = bestCard && card.id === bestCard.id && searchTerm;
        const cardColor = card.color || '#6366f1';
        
        const sortedRewards = [...(card.rewards || [])].sort((a, b) => b.percent - a.percent);
        
        return `
            <div class="credit-card ${isBest ? 'highlight' : ''}" data-id="${card.id}" style="--card-color: ${cardColor}">
                <div class="card-header">
                    <div class="card-info">
                        <h3>${escapeHtml(card.name)}${card.lastFour ? `<span class="last-four">•••• ${escapeHtml(card.lastFour)}</span>` : ''}${isBest ? '<span class="best-card-badge">Best Choice</span>' : ''}</h3>
                        <span class="issuer">${escapeHtml(card.issuer)}</span>
                    </div>
                    <div class="card-actions">
                        <button class="edit-btn" onclick="editCard('${card.id}')">Edit</button>
                        <button class="delete-btn" onclick="deleteCard('${card.id}')">Delete</button>
                    </div>
                </div>
                <div class="rewards-section">
                    ${sortedRewards.map(reward => {
                        const isMatchedReward = searchTerm && matchesCategory(reward.categories.toLowerCase(), searchTerm);
                        const rotatingBadge = reward.rotating ? `<span class="rotating-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>Q</span>` : '';
                        return `
                            <div class="reward-row ${isMatchedReward ? 'matched-reward' : ''}">
                                <div class="reward-categories">
                                    ${reward.categories.split(',').map(cat => 
                                        `<span class="category-tag">${escapeHtml(cat.trim())}</span>`
                                    ).join('')}
                                    ${rotatingBadge}
                                </div>
                                <span class="reward-percent ${getPercentClass(reward.percent)}">${reward.percent}%</span>
                            </div>
                        `;
                    }).join('')}
                    <div class="base-reward">Base: ${card.baseReward}% on all other purchases</div>
                    ${card.notes ? `<div class="card-notes">${escapeHtml(card.notes)}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Get CSS class for percent badge
function getPercentClass(percent) {
    if (percent >= 5) return 'percent-5';
    if (percent >= 3) return 'percent-3';
    if (percent >= 2) return 'percent-2';
    return 'percent-1';
}

// Sort cards by selected criteria
function sortCards(cardsList, sortBy) {
    const sorted = [...cardsList];
    switch (sortBy) {
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'reward-desc':
            sorted.sort((a, b) => {
                const aRewards = a.rewards || [];
                const bRewards = b.rewards || [];
                const aMax = Math.max(a.baseReward, ...(aRewards.length ? aRewards.map(r => r.percent) : [0]));
                const bMax = Math.max(b.baseReward, ...(bRewards.length ? bRewards.map(r => r.percent) : [0]));
                return bMax - aMax;
            });
            break;
        case 'issuer':
            sorted.sort((a, b) => a.issuer.localeCompare(b.issuer));
            break;
        default:
            sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
}

// Open modal for add/edit
function openModal(cardId = null) {
    editingCardId = cardId;
    
    if (cardId) {
        const card = cards.find(c => c.id === cardId);
        if (card) {
            modalTitle.textContent = 'Edit Card';
            document.getElementById('cardId').value = card.id;
            document.getElementById('cardName').value = card.name;
            document.getElementById('cardIssuer').value = card.issuer;
            document.getElementById('cardLastFour').value = card.lastFour || '';
            document.getElementById('cardNotes').value = card.notes || '';
            document.getElementById('baseReward').value = card.baseReward;
            
            selectedColor = card.color || '#6366f1';
            document.getElementById('cardColor').value = selectedColor;
            colorPicker.querySelectorAll('.color-option').forEach(c => {
                c.classList.toggle('selected', c.dataset.color === selectedColor);
            });
            
            rewardsContainer.innerHTML = '';
            card.rewards.forEach(reward => {
                addRewardInput(reward.categories, reward.percent, reward.rotating || false);
            });
        }
    } else {
        modalTitle.textContent = 'Add New Card';
        document.getElementById('cardId').value = '';
        document.getElementById('cardName').value = '';
        document.getElementById('cardIssuer').value = '';
        document.getElementById('cardLastFour').value = '';
        document.getElementById('cardNotes').value = '';
        document.getElementById('baseReward').value = '1';
        
        selectedColor = '#6366f1';
        document.getElementById('cardColor').value = selectedColor;
        colorPicker.querySelectorAll('.color-option').forEach(c => {
            c.classList.toggle('selected', c.dataset.color === selectedColor);
        });
        
        rewardsContainer.innerHTML = '';
        addRewardInput();
    }
    
    cardModal.classList.add('active');
    document.getElementById('cardName').focus();
}

// Close modal
function closeModalHandler() {
    cardModal.classList.remove('active');
    editingCardId = null;
}

// Add reward input row with category autocomplete
function addRewardInput(categories = '', percent = 5, rotating = false) {
    const row = document.createElement('div');
    row.className = 'reward-input-row';
    const uniqueId = Date.now() + Math.random().toString(36).substr(2, 9);
    row.innerHTML = `
        <div class="category-input-wrapper">
            <input type="text" class="category-input" placeholder="e.g., Groceries, Gas" value="${escapeHtml(categories)}" autocomplete="off">
            <div class="category-suggestions" id="suggestions-${uniqueId}"></div>
        </div>
        <input type="number" placeholder="%" min="0" max="25" step="0.5" value="${percent}">
        <div class="rotating-checkbox">
            <input type="checkbox" id="rotating-${uniqueId}" ${rotating ? 'checked' : ''}>
            <label for="rotating-${uniqueId}">Quarterly</label>
        </div>
        <button type="button" class="remove-reward-btn" onclick="this.parentElement.remove()">×</button>
    `;
    
    const input = row.querySelector('.category-input');
    const suggestionsDiv = row.querySelector('.category-suggestions');
    let highlightedIndex = -1;
    
    input.addEventListener('focus', () => {
        showCategorySuggestions(input, suggestionsDiv);
    });
    
    input.addEventListener('input', () => {
        highlightedIndex = -1;
        showCategorySuggestions(input, suggestionsDiv);
    });
    
    input.addEventListener('blur', (e) => {
        setTimeout(() => {
            suggestionsDiv.classList.remove('active');
        }, 150);
    });
    
    input.addEventListener('keydown', (e) => {
        const items = suggestionsDiv.querySelectorAll('.suggestion-item');
        if (!suggestionsDiv.classList.contains('active') || items.length === 0) return;
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightedIndex = Math.min(highlightedIndex + 1, items.length - 1);
            updateHighlight(items, highlightedIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightedIndex = Math.max(highlightedIndex - 1, 0);
            updateHighlight(items, highlightedIndex);
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
            e.preventDefault();
            selectSuggestion(input, items[highlightedIndex].dataset.value, suggestionsDiv);
        } else if (e.key === 'Escape') {
            suggestionsDiv.classList.remove('active');
        }
    });
    
    rewardsContainer.appendChild(row);
}

// Show category suggestions dropdown
function showCategorySuggestions(input, suggestionsDiv) {
    const currentValue = input.value.trim().toLowerCase();
    const lastCommaIndex = input.value.lastIndexOf(',');
    const currentTerm = lastCommaIndex >= 0 
        ? input.value.slice(lastCommaIndex + 1).trim().toLowerCase()
        : currentValue;
    
    let filtered = categoryTemplates;
    if (currentTerm) {
        filtered = categoryTemplates.filter(cat => 
            cat.toLowerCase().includes(currentTerm)
        );
    }
    
    if (filtered.length === 0) {
        suggestionsDiv.classList.remove('active');
        return;
    }
    
    filtered = filtered.slice(0, 8);
    
    suggestionsDiv.innerHTML = filtered.map(cat => `
        <div class="suggestion-item" data-value="${escapeHtml(cat)}">
            ${escapeHtml(cat)}
        </div>
    `).join('');
    
    suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('mousedown', (e) => {
            e.preventDefault();
            selectSuggestion(input, item.dataset.value, suggestionsDiv);
        });
    });
    
    suggestionsDiv.classList.add('active');
}

// Select a suggestion and add it to the input
function selectSuggestion(input, value, suggestionsDiv) {
    const lastCommaIndex = input.value.lastIndexOf(',');
    if (lastCommaIndex >= 0) {
        input.value = input.value.slice(0, lastCommaIndex + 1) + ' ' + value;
    } else {
        input.value = value;
    }
    suggestionsDiv.classList.remove('active');
    input.focus();
}

// Update highlight state in suggestions
function updateHighlight(items, index) {
    items.forEach((item, i) => {
        item.classList.toggle('highlighted', i === index);
    });
    if (items[index]) {
        items[index].scrollIntoView({ block: 'nearest' });
    }
}

// Save card
function saveCard() {
    const name = document.getElementById('cardName').value.trim();
    const issuer = document.getElementById('cardIssuer').value.trim();
    const lastFour = document.getElementById('cardLastFour').value.trim();
    const notes = document.getElementById('cardNotes').value.trim();
    const baseReward = parseFloat(document.getElementById('baseReward').value) || 1;
    const color = document.getElementById('cardColor').value || '#6366f1';
    
    if (!name) {
        showToast('Please enter a card name', 'error');
        return;
    }

    if (lastFour && !/^\d{4}$/.test(lastFour)) {
        showToast('Last 4 digits must be exactly 4 numbers', 'error');
        return;
    }

    const rewards = [];
    const rewardRows = rewardsContainer.querySelectorAll('.reward-input-row');
    rewardRows.forEach(row => {
        const catInput = row.querySelector('.category-input') || row.querySelector('input[type="text"]');
        const cats = catInput.value.trim();
        const pct = parseFloat(row.querySelector('input[type="number"]').value) || 0;
        const rotating = row.querySelector('input[type="checkbox"]').checked;
        if (cats && pct > 0) {
            rewards.push({ categories: cats, percent: pct, rotating });
        }
    });

    if (editingCardId) {
        const index = cards.findIndex(c => c.id === editingCardId);
        if (index !== -1) {
            cards[index] = {
                ...cards[index],
                name,
                issuer,
                lastFour,
                notes,
                baseReward,
                color,
                rewards
            };
        }
    } else {
        cards.push({
            id: Date.now().toString(),
            name,
            issuer,
            lastFour,
            notes,
            baseReward,
            color,
            rewards
        });
    }

    const isEditing = !!editingCardId;
    saveCards();
    renderCards();
    closeModalHandler();
    showToast(isEditing ? 'Card updated' : 'Card added', 'success');
}

// Edit card
function editCard(cardId) {
    openModal(cardId);
}

// Delete card
function deleteCard(cardId) {
    const card = cards.find(c => c.id === cardId);
    if (confirm(`Delete "${card?.name || 'this card'}"? This cannot be undone.`)) {
        cards = cards.filter(c => c.id !== cardId);
        saveCards();
        renderCards();
        showToast('Card deleted', 'success');
    }
}

// Match categories with fuzzy logic
function matchesCategory(categories, searchTerm) {
    if (categories.includes(searchTerm)) return true;
    
    const aliases = {
        'groceries': ['grocery', 'groceries', 'supermarket', 'food'],
        'grocery': ['grocery', 'groceries', 'supermarket', 'food'],
        'gas': ['gas', 'fuel', 'gasoline', 'gas station', 'ev charging'],
        'fuel': ['gas', 'fuel', 'gasoline', 'gas station'],
        'restaurants': ['restaurant', 'restaurants', 'dining', 'food'],
        'restaurant': ['restaurant', 'restaurants', 'dining', 'food'],
        'dining': ['restaurant', 'restaurants', 'dining', 'food'],
        'travel': ['travel', 'hotels', 'airlines', 'flights', 'rental cars'],
        'hotels': ['hotel', 'hotels', 'hyatt', 'marriott', 'hilton', 'lodging'],
        'hyatt': ['hyatt', 'hotels', 'hotel'],
        'flights': ['flights', 'airlines', 'travel', 'airfare'],
        'airlines': ['flights', 'airlines', 'travel', 'airfare'],
        'amazon': ['amazon', 'amazon.com'],
        'walmart': ['walmart', 'walmart.com'],
        'target': ['target', 'target.com'],
        'drugstores': ['drugstore', 'drugstores', 'pharmacy', 'cvs', 'walgreens'],
        'pharmacy': ['drugstore', 'drugstores', 'pharmacy', 'cvs', 'walgreens'],
        'streaming': ['streaming', 'netflix', 'hulu', 'disney', 'spotify', 'max', 'peacock'],
        'online': ['online', 'internet', 'online shopping'],
        'rent': ['rent', 'rental'],
        'fitness': ['fitness', 'gym', 'workout'],
        'transit': ['transit', 'metro', 'subway', 'bus', 'commute'],
        'entertainment': ['entertainment', 'movies', 'concerts', 'events']
    };
    
    const searchAliases = aliases[searchTerm] || [searchTerm];
    for (const alias of searchAliases) {
        if (categories.includes(alias)) return true;
    }
    
    const words = categories.split(/[\s,]+/);
    for (const word of words) {
        if (word.startsWith(searchTerm) || searchTerm.startsWith(word)) return true;
    }
    
    return false;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Export cards to JSON file
function exportCards() {
    const dataStr = JSON.stringify(cards, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `credit-cards-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Import cards from JSON file
function importCards(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const importedCards = JSON.parse(event.target.result);
            if (Array.isArray(importedCards)) {
                const validCards = importedCards.filter(card => 
                    card.name && typeof card.name === 'string'
                );
                
                if (validCards.length === 0) {
                    showToast('No valid cards found', 'error');
                    return;
                }
                
                const action = confirm(
                    `Found ${validCards.length} cards. Click OK to add them to your existing cards, or Cancel to replace all cards.`
                );
                
                if (action) {
                    const newCards = validCards.map(card => ({
                        ...card,
                        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
                    }));
                    cards = [...cards, ...newCards];
                } else {
                    cards = validCards.map(card => ({
                        ...card,
                        id: card.id || Date.now().toString() + Math.random().toString(36).substr(2, 9)
                    }));
                }
                
                saveCards();
                renderCards();
                settingsModal.classList.remove('active');
                showToast(`Imported ${validCards.length} cards`, 'success');
            } else {
                showToast('Invalid file format', 'error');
            }
        } catch (err) {
            showToast('Error reading file', 'error');
        }
    };
    reader.readAsText(file);
    e.target.value = '';
}

// Reset to default sample data
function resetData() {
    if (confirm('Are you sure you want to delete all your cards and reset to sample data? This cannot be undone.')) {
        cards = getSampleCards();
        saveCards();
        renderCards();
        settingsModal.classList.remove('active');
        showToast('Reset to sample data', 'success');
    }
}

// Initialize app
init();
