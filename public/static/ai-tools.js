/**
 * AI Tools Frontend Logic
 * Multi-AI Integration: Gemini, GLM, OpenAI, Claude
 */

// State management
let currentProvider = 'gemini';
let isAnalyzing = false;

// DOM Elements
const providerCards = document.querySelectorAll('.provider-card');
const analysisTypeSelect = document.getElementById('analysisType');
const inputTextarea = document.getElementById('inputContent');
const analyzeBtn = document.getElementById('analyzeBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('resultsContainer');
const loadingIndicator = document.getElementById('loadingIndicator');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupProviderSelection();
  setupAnalyzeButton();
  setupClearButton();
});

/**
 * Setup provider selection
 */
function setupProviderSelection() {
  providerCards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove active class from all
      providerCards.forEach(c => {
        c.classList.remove('border-orange-500', 'bg-orange-50');
        c.classList.add('border-gray-300');
        c.querySelector('.fa-check-circle')?.classList.add('hidden');
        c.querySelector('.fa-circle')?.classList.remove('hidden');
      });

      // Add active class to clicked
      card.classList.remove('border-gray-300');
      card.classList.add('border-orange-500', 'bg-orange-50');
      card.querySelector('.fa-circle')?.classList.add('hidden');
      card.querySelector('.fa-check-circle')?.classList.remove('hidden');

      // Update current provider
      currentProvider = card.dataset.provider;
      console.log('Selected provider:', currentProvider);
    });
  });
}

/**
 * Setup analyze button
 */
function setupAnalyzeButton() {
  analyzeBtn.addEventListener('click', async () => {
    const input = inputTextarea.value.trim();
    const analysisType = analysisTypeSelect.value;

    if (!input) {
      showError('Vui lòng nhập nội dung cần phân tích');
      return;
    }

    if (isAnalyzing) {
      return;
    }

    await analyzeWithAI(input, analysisType);
  });
}

/**
 * Setup clear button
 */
function setupClearButton() {
  clearBtn.addEventListener('click', () => {
    inputTextarea.value = '';
    resultsContainer.innerHTML = `
      <div class="flex items-center mb-4">
        <i class="fas fa-lightbulb text-yellow-500 text-2xl mr-3"></i>
        <h3 class="text-xl font-bold text-gray-800">Kết quả phân tích</h3>
      </div>
      <p class="text-gray-600 italic">
        Kết quả phân tích sẽ hiển thị ở đây sau khi bạn nhấn nút "Phân tích với AI".
      </p>
    `;
  });
}

/**
 * Main AI analysis function
 */
async function analyzeWithAI(input, analysisType) {
  isAnalyzing = true;
  
  // Show loading
  showLoading();
  analyzeBtn.disabled = true;
  analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang phân tích...';

  try {
    const response = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: analysisType,
        input: input,
        config: {
          provider: currentProvider,
          model: 'gpt-5',
          temperature: 0.7,
        },
      }),
    });

    const data = await response.json();

    if (data.success) {
      displayResults(data);
    } else {
      showError(data.error || 'Lỗi khi phân tích');
    }
  } catch (error) {
    console.error('Analysis error:', error);
    showError('Lỗi kết nối đến AI service. Vui lòng thử lại.');
  } finally {
    isAnalyzing = false;
    analyzeBtn.disabled = false;
    analyzeBtn.innerHTML = '<i class="fas fa-brain mr-2"></i>Phân tích với AI';
    hideLoading();
  }
}

/**
 * Display analysis results
 */
function displayResults(data) {
  const { result, provider, model, tokens, timestamp } = data;

  let resultsHTML = `
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <i class="fas fa-lightbulb text-yellow-500 text-2xl mr-3"></i>
          <h3 class="text-xl font-bold text-gray-800">Kết quả phân tích</h3>
        </div>
        <div class="text-sm text-gray-500">
          <span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-semibold">
            ${getProviderName(provider)} (${model})
          </span>
        </div>
      </div>
  `;

  // Main analysis text
  if (result.analysis) {
    resultsHTML += `
      <div class="mb-6 p-4 bg-white rounded-lg border-2 border-orange-200">
        <h4 class="font-bold text-gray-800 mb-2">📊 Phân tích:</h4>
        <div class="text-gray-700 whitespace-pre-wrap">${escapeHtml(result.analysis)}</div>
      </div>
    `;
  }

  // Effects (for brief analysis)
  if (result.effects && result.effects.length > 0) {
    resultsHTML += `
      <div class="mb-6">
        <h4 class="font-bold text-gray-800 mb-3">✨ Hiệu ứng đề xuất:</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    `;

    result.effects.forEach(effect => {
      const difficultyColor = getDifficultyColor(effect.difficulty);
      const confidencePercent = Math.round(effect.confidence * 100);
      
      resultsHTML += `
        <div class="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-gray-800">${effect.name}</span>
            <span class="text-xs px-2 py-1 rounded ${difficultyColor}">${effect.difficulty}</span>
          </div>
          <div class="text-sm text-gray-600">
            <div class="flex items-center mb-1">
              <i class="fas fa-clock mr-2 text-orange-600"></i>
              <span>${effect.estimatedTime}</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-chart-line mr-2 text-orange-600"></i>
              <span>Confidence: ${confidencePercent}%</span>
            </div>
          </div>
        </div>
      `;
    });

    resultsHTML += `
        </div>
      </div>
    `;
  }

  // Errors (for error analysis)
  if (result.errors && result.errors.length > 0) {
    resultsHTML += `
      <div class="mb-6">
        <h4 class="font-bold text-gray-800 mb-3">🔍 Lỗi phát hiện:</h4>
    `;

    result.errors.forEach(error => {
      const severityColor = getSeverityColor(error.severity);
      
      resultsHTML += `
        <div class="p-4 bg-red-50 rounded-lg border-2 border-red-200 mb-3">
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-gray-800">${error.type}</span>
            <span class="text-xs px-2 py-1 rounded ${severityColor}">${error.severity}</span>
          </div>
          <div class="text-sm text-gray-700 mb-2">
            <strong>Mô tả:</strong> ${escapeHtml(error.description)}
          </div>
          <div class="text-sm text-green-700">
            <strong>✅ Giải pháp:</strong> ${escapeHtml(error.solution)}
          </div>
        </div>
      `;
    });

    resultsHTML += `</div>`;
  }

  // Suggestions
  if (result.suggestions && result.suggestions.length > 0) {
    resultsHTML += `
      <div class="mb-6">
        <h4 class="font-bold text-gray-800 mb-3">💡 Gợi ý:</h4>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
    `;

    result.suggestions.forEach(suggestion => {
      resultsHTML += `<li>${escapeHtml(suggestion)}</li>`;
    });

    resultsHTML += `
        </ul>
      </div>
    `;
  }

  // Prompt Master (for prompt analysis)
  if (result.promptMaster) {
    resultsHTML += `
      <div class="mb-6">
        <h4 class="font-bold text-gray-800 mb-2">🎨 Prompt Master:</h4>
        <div class="p-4 bg-gray-800 text-green-400 rounded-lg font-mono text-sm">
          ${escapeHtml(result.promptMaster)}
        </div>
      </div>
    `;
  }

  // Negative Prompt
  if (result.negativePrompt) {
    resultsHTML += `
      <div class="mb-6">
        <h4 class="font-bold text-gray-800 mb-2">🚫 Negative Prompt:</h4>
        <div class="p-4 bg-gray-100 rounded-lg text-sm text-gray-700">
          ${escapeHtml(result.negativePrompt)}
        </div>
      </div>
    `;
  }

  // Metadata
  resultsHTML += `
    <div class="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
      <div class="flex justify-between">
        <span>Thời gian: ${new Date(timestamp).toLocaleString('vi-VN')}</span>
        ${tokens ? `<span>Tokens: ${tokens.total} (${tokens.prompt} + ${tokens.completion})</span>` : ''}
      </div>
    </div>
  `;

  resultsHTML += `</div>`;

  resultsContainer.innerHTML = resultsHTML;
}

/**
 * Show loading indicator
 */
function showLoading() {
  loadingIndicator.classList.remove('hidden');
}

/**
 * Hide loading indicator
 */
function hideLoading() {
  loadingIndicator.classList.add('hidden');
}

/**
 * Show error message
 */
function showError(message) {
  resultsContainer.innerHTML = `
    <div class="flex items-center mb-4">
      <i class="fas fa-exclamation-triangle text-red-500 text-2xl mr-3"></i>
      <h3 class="text-xl font-bold text-gray-800">Lỗi</h3>
    </div>
    <p class="text-red-600">${escapeHtml(message)}</p>
  `;
}

/**
 * Helper functions
 */
function getProviderName(provider) {
  const names = {
    gemini: 'Gemini',
    glm: 'GLM',
    openai: 'OpenAI',
    claude: 'Claude',
  };
  return names[provider] || provider;
}

function getDifficultyColor(difficulty) {
  const colors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-orange-100 text-orange-700',
    very_hard: 'bg-red-100 text-red-700',
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-700';
}

function getSeverityColor(severity) {
  const colors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  };
  return colors[severity] || 'bg-gray-100 text-gray-700';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
