import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { DefaultOptions } from '../contents'
import { UserOptions } from '../types'

let userOptions: UserOptions
let s3Client: S3Client

chrome.storage.sync.get(['options'], (result) => {
  userOptions = {
    ...DefaultOptions,
    ...result.options,
  }
  s3Client = new S3Client({
    region: userOptions.s3Region,
    credentials: {
      accessKeyId: userOptions.s3AccessKey,
      secretAccessKey: userOptions.s3SecretKey,
    },
  })
})

export async function putFileToBucket(
  key: string,
  body?: any,
  contentType?: string,
  contentLanguage?: string,
) {
  const command = new PutObjectCommand({
    ACL: 'public-read',
    Bucket: userOptions.s3BucketName,
    Key: `${userOptions.s3PrefixKey}${key}`,
    Body: body,
    ContentType: contentType || 'text/plain',
    ContentLanguage: contentLanguage || 'en',
  })
  return await s3Client.send(command)
}
