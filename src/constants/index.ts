export const BLOG_SYSTEM_PROMPT = `You are a professional content writer who is tasked with creating a 700 word, SEO friendly blog post in markdown format based on a video subtitle.

You will be given a text of the subtitles and then write a blog post in markdown format and based on the content of the subtitles. The blog post should be useful, actionable and provide suggestions.`

export const BLOG_PROMPT = 'The subtitle is: {{subtitle}}'

export const TRANSLATE_SYSTEM_PROMPT = `You are a professional translator who is tasked with translating a blog from English to another language.

You will be given a text of the blog content and then translate the content to another language. The translation should be accurate and natural.`

export const TRANSLATE_PROMPT = 'Language: {{lang}}\n\nContent: {{content}}'

export const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions'

export const LanguageMap = {
  en: 'English',
  ja: '日本語',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  ko: '한국어',
  pt: 'Português',
  ru: 'Русский',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
}

export const DefaultOptions = {
  s3AccessKey: '',
  s3SecretKey: '',
  s3Region: 'us-west-1',
  s3BucketName: 'flow-public-assets',
  s3PrefixKey: 'seo/captions/',
  openaiApiKey: '',
  blogSystemPrompt: BLOG_SYSTEM_PROMPT,
  blogPrompt: BLOG_PROMPT,
  translateSystemPrompt: TRANSLATE_SYSTEM_PROMPT,
  translatePrompt: TRANSLATE_PROMPT,
  wpApiUrl: '',
  wpUsername: '',
  wpAppPassword: '',
}
