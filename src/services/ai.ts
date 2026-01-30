/**
 * AI Service Layer - Multi-Model Integration
 * Supports: Gemini (default), GLM, OpenAI, Claude
 * 
 * @module services/ai
 */

import OpenAI from 'openai';

// ============================================
// TYPES & INTERFACES
// ============================================

export type AIProvider = 'gemini' | 'glm' | 'openai' | 'claude';

export interface AIConfig {
  provider: AIProvider;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIAnalysisRequest {
  type: 'brief' | 'error' | 'prompt' | 'general';
  input: string;
  context?: Record<string, any>;
  config?: AIConfig;
  env?: any; // Cloudflare env bindings
}

export interface AIAnalysisResponse {
  success: boolean;
  provider: AIProvider;
  model: string;
  result: {
    analysis: string;
    suggestions?: string[];
    effects?: Array<{
      name: string;
      confidence: number;
      estimatedTime: string;
      difficulty: 'easy' | 'medium' | 'hard' | 'very_hard';
    }>;
    errors?: Array<{
      type: string;
      severity: 'low' | 'medium' | 'high';
      description: string;
      solution: string;
    }>;
    metadata?: Record<string, any>;
  };
  tokens?: {
    prompt: number;
    completion: number;
    total: number;
  };
  timestamp: string;
  error?: string;
}

// ============================================
// AI CLIENT FACTORY
// ============================================

/**
 * Tạo OpenAI client từ config hoặc env vars
 */
function createOpenAIClient(env?: any): OpenAI {
  // In Cloudflare Workers, env vars come from bindings
  const apiKey = env?.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  const baseURL = env?.OPENAI_BASE_URL || process.env.OPENAI_BASE_URL;
  
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY. Please configure environment variables.');
  }
  
  return new OpenAI({
    apiKey,
    baseURL,
  });
}

// ============================================
// PROMPT TEMPLATES
// ============================================

const PROMPT_TEMPLATES = {
  brief: `Bạn là chuyên gia phân tích Brief cho dịch vụ AI Video biên tập bất động sản.

NHIỆM VỤ: Phân tích yêu cầu khách hàng và đưa ra đánh giá chi tiết.

INPUT:
{input}

HÃY PHÂN TÍCH:
1. **Loại hiệu ứng yêu cầu**: Xác định chính xác loại AI Effects (Day-to-Night, Season Change, Lifestyle, Agent Composite, Furniture Animation, Weather Effects, Creative/Fantasy...)
2. **Độ khó thực hiện**: Đánh giá từ 1-10 (1=dễ, 10=rất khó)
3. **Thời gian ước tính**: Ước tính thời gian xử lý thực tế
4. **Yêu cầu footage đầu vào**: Footage cần có để thực hiện
5. **Khả năng thực hiện**: CÓ THỂ / KHÓ / KHÔNG THỂ với AI hiện tại
6. **Rủi ro tiềm ẩn**: Các vấn đề có thể gặp phải
7. **Đề xuất giải pháp**: Cách tiếp cận tối ưu

CONTEXT BỔ SUNG:
- Dữ liệu lỗi từ 23 job codes: 35% hiểu sai yêu cầu, 26% chất lượng AI kém, 22% trễ deadline
- Tỷ lệ lỗi cao: Object Animation (100%), Creative/Fantasy (100%), Agent Composite (100%)
- Tỷ lệ lỗi ổn định: Day-to-Night (33%), Furniture Staging (33%)
- Công cụ có sẵn: Kling AI, Veo 2/3.1, Runway Gen-3, Pika Labs, Luma, ElevenLabs

BẮT BUỘC TRẢ LỜI THEO FORMAT JSON SAU (không thêm markdown, không thêm text khác):
\`\`\`json
{
  "effects": [
    {
      "name": "Lifestyle Effect - Family Scene",
      "confidence": 0.85,
      "estimatedTime": "2-3 giờ",
      "difficulty": "medium"
    }
  ],
  "feasibility": "CÓ THỂ",
  "risks": ["Độ tự nhiên của motion người", "Lighting consistency với pool"],
  "solutions": ["Sử dụng Kling AI cho human motion", "Veo 3.1 cho cinematic quality"],
  "footageRequirements": ["Pool area rõ nét", "Góc quay rộng", "Lighting tốt"],
  "analysis": "Yêu cầu thêm Lifestyle effect với cảnh gia đình bên hồ bơi..."
}
\`\`\``,

  error: `Bạn là chuyên gia phân tích lỗi cho dịch vụ AI Video.

NHIỆM VỤ: Phân tích lỗi từ feedback và đưa ra root cause + giải pháp.

INPUT:
{input}

HÃY PHÂN TÍCH:
1. **Phân loại lỗi**: 
   - Nhóm A (35%): Hiểu sai yêu cầu / Brief không rõ
   - Nhóm B (26%): Chất lượng AI output kém
   - Nhóm C (22%): Trễ deadline
   - Nhóm D (17%): Logic/vật lý không hợp lý

2. **Root Cause**: Nguyên nhân gốc rễ
3. **Severity**: Low / Medium / High
4. **Impact**: Ảnh hưởng đến dự án
5. **Solution**: Giải pháp khắc phục
6. **Prevention**: Biện pháp phòng ngừa

CONTEXT:
- 23 job codes đã phân tích
- Các lỗi thường gặp: context missing, language barrier, input inspection gaps, checklist gaps, physics limitations
- Ví dụ: TADEC31004 (context missing), HTJAN15008Rev (language), DUJAN04005 (inspection)

TRẢ LỜI ĐỊNH DẠNG JSON:
{
  "errors": [
    {
      "type": "Nhóm A/B/C/D",
      "severity": "medium",
      "description": "Mô tả lỗi",
      "solution": "Giải pháp",
      "prevention": "Biện pháp phòng ngừa"
    }
  ],
  "rootCause": "Nguyên nhân gốc",
  "analysis": "Phân tích chi tiết..."
}`,

  prompt: `Bạn là chuyên gia Prompt Engineering cho AI Video Generation.

NHIỆM VỤ: Tạo prompt tối ưu cho công cụ AI Video.

INPUT:
{input}

YÊU CẦU:
1. **Phân loại hiệu ứng**: Xác định loại effect cần tạo
2. **Công cụ phù hợp**: Kling AI / Veo / Runway / Pika / Luma
3. **Prompt Master**: Prompt chính chi tiết
4. **Negative Prompt**: Những gì cần tránh
5. **Parameters**: Các tham số tối ưu (motion scale, camera movement, duration...)
6. **Variations**: 2-3 biến thể prompt

CONTEXT:
- Day-to-Night: Thời gian ~30 phút, độ khó 4/10
- Lifestyle (1-2 người): 1-3 giờ, độ khó 6/10
- Agent Composite: 3-4 giờ, độ khó 8/10
- Creative/Fantasy: 5+ giờ, độ khó 9-10/10

CÔNG CỤ:
- Kling AI: Tốt cho motion tự nhiên, người thật
- Veo 3.1: Cinematic quality cao, chuyển cảnh mượt
- Runway Gen-3: Linh hoạt, creative effects
- Pika Labs: Nhanh, hiệu ứng đơn giản

TRẢ LỜI ĐỊNH DẠNG JSON:
{
  "effectType": "Loại effect",
  "recommendedTool": "Kling AI",
  "promptMaster": "Prompt chi tiết...",
  "negativePrompt": "Tránh...",
  "parameters": {
    "motionScale": 5,
    "cameraMovement": "slow_zoom",
    "duration": "5s"
  },
  "variations": ["Variation 1", "Variation 2"],
  "analysis": "Phân tích và hướng dẫn..."
}`,

  general: `Bạn là AI Assistant chuyên về R&D AI Video cho Fotober.

NHIỆM VỤ: Trả lời câu hỏi và hỗ trợ người dùng.

INPUT:
{input}

CONTEXT:
- Fotober: Công ty dịch vụ biên tập ảnh/video BĐS, thành lập 2016
- 150+ nhân viên, 10,000+ khách hàng/năm, 20,000+ ảnh/ngày
- Dịch vụ: Basic $27/video, Standard $35/video
- 25+ AI Effects: Day-to-Night, Season Change, Lifestyle, Agent Composite...
- Công cụ: Kling AI, Veo, Runway, Pika, Luma, ElevenLabs
- Đối thủ: Esoft, BoxBrownie, Phixer, PhotoUp

HÃY TRẢ LỜI một cách:
- Chuyên nghiệp, chi tiết
- Dựa trên dữ liệu thực tế
- Đưa ra ví dụ cụ thể
- Gợi ý giải pháp khả thi

TRẢ LỜI ĐỊNH DẠNG JSON:
{
  "answer": "Câu trả lời chi tiết...",
  "references": ["Nguồn 1", "Nguồn 2"],
  "suggestions": ["Gợi ý 1", "Gợi ý 2"]
}`
};

// ============================================
// MAIN AI ANALYSIS FUNCTION
// ============================================

/**
 * Phân tích input bằng AI
 */
export async function analyzeWithAI(
  request: AIAnalysisRequest
): Promise<AIAnalysisResponse> {
  const startTime = Date.now();
  const config: AIConfig = {
    provider: 'gemini', // Default to Gemini
    model: 'gpt-5',
    temperature: 0.7,
    maxTokens: 2000,
    ...request.config,
  };

  try {
    // Get prompt template
    const template = PROMPT_TEMPLATES[request.type] || PROMPT_TEMPLATES.general;
    const prompt = template.replace('{input}', request.input);

    // Call AI based on provider
    let result: any;
    let tokens: any;

    switch (config.provider) {
      case 'gemini':
      case 'glm':
      case 'openai':
      case 'claude':
        // All use OpenAI-compatible endpoint
        const response = await callOpenAICompatible(prompt, config, request.env);
        result = response.result;
        tokens = response.tokens;
        break;
      default:
        throw new Error(`Unsupported provider: ${config.provider}`);
    }

    return {
      success: true,
      provider: config.provider,
      model: config.model || 'gpt-5',
      result: parseAIResult(result, request.type),
      tokens,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('AI Analysis Error:', error);
    return {
      success: false,
      provider: config.provider,
      model: config.model || 'gpt-5',
      result: {
        analysis: 'Lỗi khi phân tích. Vui lòng thử lại.',
      },
      timestamp: new Date().toISOString(),
      error: error.message,
    };
  }
}

/**
 * Call OpenAI-compatible API
 */
async function callOpenAICompatible(
  prompt: string,
  config: AIConfig,
  env?: any
): Promise<{ result: string; tokens: any }> {
  const client = createOpenAIClient(env);

  const completion = await client.chat.completions.create({
    model: config.model || 'gpt-5',
    messages: [
      {
        role: 'system',
        content: 'Bạn là chuyên gia R&D AI Video của Fotober. Luôn trả lời bằng Tiếng Việt, chi tiết, chuyên nghiệp, và dựa trên dữ liệu thực tế.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: config.temperature || 0.7,
    max_tokens: config.maxTokens || 2000,
  });

  return {
    result: completion.choices[0]?.message?.content || '',
    tokens: {
      prompt: completion.usage?.prompt_tokens || 0,
      completion: completion.usage?.completion_tokens || 0,
      total: completion.usage?.total_tokens || 0,
    },
  };
}

/**
 * Parse AI result based on analysis type
 */
function parseAIResult(rawResult: string, type: string): any {
  try {
    // Try to extract JSON from markdown code blocks
    const jsonMatch = rawResult.match(/```json\s*([\s\S]*?)\s*```/) || 
                     rawResult.match(/```\s*([\s\S]*?)\s*```/);
    
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[1]);
      return {
        analysis: parsed.analysis || rawResult,
        ...parsed,
      };
    }

    // Try direct JSON parse
    try {
      const parsed = JSON.parse(rawResult);
      return {
        analysis: parsed.analysis || rawResult,
        ...parsed,
      };
    } catch {
      // Not JSON, return as plain text
      return {
        analysis: rawResult,
      };
    }
  } catch (error) {
    console.error('Parse error:', error);
    return {
      analysis: rawResult,
    };
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get available AI models for a provider
 */
export function getAvailableModels(provider: AIProvider): string[] {
  switch (provider) {
    case 'gemini':
    case 'glm':
    case 'openai':
    case 'claude':
      return ['gpt-5', 'gpt-5.1', 'gpt-5.2', 'gpt-5-mini', 'gpt-5-nano'];
    default:
      return ['gpt-5'];
  }
}

/**
 * Validate AI config
 */
export function validateAIConfig(config: Partial<AIConfig>): boolean {
  if (config.provider && !['gemini', 'glm', 'openai', 'claude'].includes(config.provider)) {
    return false;
  }
  if (config.temperature && (config.temperature < 0 || config.temperature > 1)) {
    return false;
  }
  if (config.maxTokens && (config.maxTokens < 1 || config.maxTokens > 4000)) {
    return false;
  }
  return true;
}
