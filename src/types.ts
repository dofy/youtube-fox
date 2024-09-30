export type Language =
  | 'en'
  | 'ja'
  | 'es'
  | 'fr'
  | 'de'
  | 'it'
  | 'ko'
  | 'pt'
  | 'ru'
  | 'zh-CN'
  | 'zh-TW'

export type UserOptions = {
  // amazon s3
  s3AccessKey: string
  s3SecretKey: string
  s3Region: string
  s3BucketName: string
  s3PrefixKey: string
  // openai
  openaiApiKey: string
  blogSystemPrompt: string
  blogPrompt: string
  translateSystemPrompt: string
  translatePrompt: string
  // wp
  wpApiUrl: string
  wpUsername: string
  wpAppPassword: string
  // selected languages
  selectedLanguages: Language[]
}
