import { useEffect, useState } from 'react'
import { Copyright } from '../components/Copyright'
import { FormControl } from '../components/FormControl'
import { PageTitle } from '../components/PageTitle'
import { DefaultOptions } from '../constants'
import { UserOptions } from '../types'

export const Options = () => {
  const [userOption, setUserOption] = useState<UserOptions>(DefaultOptions)

  useEffect(() => {
    try {
      chrome.runtime.sendMessage({ type: 'getOptions' }, (response) => {
        setUserOption(response.options)
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserOption((prev) => {
      const result = { ...prev, [name]: value }
      try {
        chrome.storage.sync.set({ options: result })
      } catch (error) {
        console.error(error)
      }
      return result
    })
  }

  const resetUserOptions = () => {
    setUserOption(DefaultOptions)
    try {
      chrome.storage.sync.set({ options: DefaultOptions })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="container">
      <PageTitle pageName="Options" />
      <form>
        <div className="hidden">
          {/* amazon s3 */}
          <FormControl
            isRequired
            label="S3 Access Key ID:"
            name="s3AccessKey"
            value={userOption.s3AccessKey}
            onChange={handleChange}
            placeholder="Enter your S3 Access Key here"
          />
          <FormControl
            isRequired
            label="S3 Secret Access Key:"
            name="s3SecretKey"
            type="password"
            value={userOption.s3SecretKey}
            onChange={handleChange}
            placeholder="Enter your S3 Secret Key here"
          />
          <FormControl
            isRequired
            label="S3 Region:"
            name="s3Region"
            value={userOption.s3Region}
            onChange={handleChange}
            placeholder="Enter your S3 Region here"
          />
          <FormControl
            isRequired
            label="Bucket Name:"
            name="s3BucketName"
            value={userOption.s3BucketName}
            onChange={handleChange}
            placeholder="Enter your Bucket Name here"
          />
          <FormControl
            label="Prefix Key:"
            name="s3PrefixKey"
            value={userOption.s3PrefixKey}
            onChange={handleChange}
            placeholder="Enter your Prefix Key here"
          />
        </div>
        {/* openai */}
        <FormControl
          isRequired
          label="OpenAI API Key:"
          name="openaiApiKey"
          value={userOption.openaiApiKey}
          onChange={handleChange}
          placeholder="Enter your OpenAI API Key here"
        />
        <FormControl
          label="Blog System Prompt:"
          type="textarea"
          minHeight={150}
          name="blogSystemPrompt"
          value={userOption.blogSystemPrompt}
          onChange={handleChange}
          placeholder="Enter your system prompt here."
        />
        <FormControl
          label="Blog Prompt:"
          name="blogPrompt"
          value={userOption.blogPrompt}
          onChange={handleChange}
          placeholder='Enter your prompt here. Use "{{subtitle}}" to represent the subtitle.'
          info="The text {{subtitle}} will be replaced with the actual subtitle text."
        />
        <FormControl
          label="Translate System Prompt:"
          type="textarea"
          minHeight={150}
          name="translateSystemPrompt"
          value={userOption.translateSystemPrompt}
          onChange={handleChange}
          placeholder="Enter your system prompt here."
        />
        <FormControl
          label="Translate Prompt:"
          type="textarea"
          minHeight={100}
          name="translatePrompt"
          value={userOption.translatePrompt}
          onChange={handleChange}
          placeholder='Enter your prompt here. Use "{{content}}" to represent the blog content.'
          info="The text {{lang}} and {{content}} will be replaced with the actual language and blog content."
        />
        {/* wp */}
        <FormControl
          isRequired
          label="WordPress API URL:"
          name="wpApiUrl"
          value={userOption.wpApiUrl}
          onChange={handleChange}
          placeholder="https://example.com/wp-json"
        />
        <FormControl
          isRequired
          label="WordPress Username:"
          name="wpUsername"
          value={userOption.wpUsername}
          onChange={handleChange}
          placeholder="Enter your WordPress Username here"
        />
        <FormControl
          isRequired
          label="WordPress App Password:"
          name="wpAppPassword"
          type="password"
          value={userOption.wpAppPassword}
          onChange={handleChange}
          placeholder="Enter your WordPress App Password here"
        />

        <div className="button-group">
          <button type="button" onClick={resetUserOptions}>
            Reset to Default Options
          </button>
        </div>
      </form>
      <Copyright />
    </main>
  )
}

export default Options
