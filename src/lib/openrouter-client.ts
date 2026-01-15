import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';
if (!apiKey) {
  console.warn('OpenRouter: VITE_OPENROUTER_API_KEY is missing. Chatbot will return 401.');
}

// OpenRouter client (OpenAI-compatible)
const openrouter = new OpenAI({
  apiKey: apiKey,
  baseURL: 'https://openrouter.ai/api/v1',
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': typeof window !== 'undefined' ? window.location.href : 'https://neilsbohr.ma/',
    'X-Title': 'Groupe Scolaire Niels Bohr',
  },
});

export const getOpenRouterClient = () => openrouter;

export const generateResponse = async (
  messages: any[],
  tools?: any[]
) => {
  try {
    const envModel = import.meta.env.VITE_OPENROUTER_MODEL;
    const model = envModel && envModel.trim().length > 0 ? envModel.trim() : undefined;
    const apiKeyPreview = (import.meta.env.VITE_OPENROUTER_API_KEY || '').slice(0, 8);

    // Build payload - only include tools if provided
    const payload: any = {
      messages,
    };

    // Only send model if explicitly configured, else use default
    if (model) {
      payload.model = model;
    } else {
      payload.model = 'mistralai/mistral-7b-instruct:free'; // Default stable model
    }

    // Only include tools if provided
    if (tools && tools.length > 0) {
      payload.tools = tools;
      payload.tool_choice = 'auto';
    }

    console.debug('OpenRouter request:', {
      model: payload.model || '(using account default)',
      apiKeyStartsWith: apiKeyPreview,
      messageCount: messages.length,
      hasTools: !!payload.tools,
      firstMessageRole: messages[0]?.role,
    });

    const response = await openrouter.chat.completions.create(payload);

    return response.choices[0];
  } catch (error: any) {
    console.error('OpenRouter API error:', {
      message: error?.message,
      status: error?.status,
      statusText: error?.statusText,
      data: error?.response?.data,
      error: error?.error,
    });
    throw error;
  }
};
