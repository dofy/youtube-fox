import { Caption } from '@dofy/youtube-caption-fox'

export type UserOptions = {
  openaiApiKey: string
  s3AccessKey: string
  s3SecretKey: string
  bucketName: string
  prefixKey: string
  systemPrompt: string
  prompt: string
}

export type VideoInfo = {
  videoId: string
  videoTitle: string
  videoCover: string
  captions?: Caption[]
}
