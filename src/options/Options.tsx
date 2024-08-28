import { useState, useEffect } from 'react'
import { Copyright } from '../components/Copyright'
import { FormControl } from '../components/FormControl'
import { DEFAULT_PROMPT, DEFAULT_SYSTEM_PROMPT } from '../contents'
import { UserOptions } from '../types'

const defaultOptions = {
  openaiApiKey: '',
  s3SecretKey: '',
  bucketName: '',
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  prompt: DEFAULT_PROMPT,
}

export const Options = () => {
  const [userOption, setUserOption] = useState<UserOptions>(defaultOptions)

  useEffect(() => {
    try {
      chrome.storage.sync.get(['options'], (result) => {
        setUserOption(result.options || defaultOptions)
      })
    } catch (e) {
      console.error(e)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserOption((prev) => {
      const result = { ...prev, [name]: value }
      try {
        chrome.storage.sync.set({ options: result })
      } catch (e) {
        console.error(e)
      }
      return result
    })
  }

  const resetUserOptions = () => {
    setUserOption(defaultOptions)
    try {
      chrome.storage.sync.set({ options: defaultOptions })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <main className="container">
      <h2>YouTube Fox</h2>
      <h3>Options</h3>
      <form>
        <FormControl
          isRequired
          label="OpenAI API Key:"
          name="openaiApiKey"
          value={userOption.openaiApiKey}
          onChange={handleChange}
          placeholder="Enter your OpenAI API Key here"
        />
        <FormControl
          isRequired
          label="S3 Secret Key:"
          name="s3SecretKey"
          value={userOption.s3SecretKey}
          onChange={handleChange}
          placeholder="Enter your S3 Secret Key here"
        />
        <FormControl
          isRequired
          label="Bucket Name:"
          name="bucketName"
          value={userOption.bucketName}
          onChange={handleChange}
          placeholder="Enter your Bucket Name here"
        />
        <FormControl
          label="System Prompt:"
          type="textarea"
          minHeight={200}
          name="systemPrompt"
          value={userOption.systemPrompt}
          onChange={handleChange}
          placeholder="Enter your system prompt here."
        />
        <FormControl
          label="Prompt:"
          name="prompt"
          value={userOption.prompt}
          onChange={handleChange}
          placeholder='Enter your prompt here. Use "{{subtitle}}" to represent the subtitle.'
          info="The subtitle is: {{subtitle}}"
        />
        <div className="button-group">
          <button type="button" onClick={resetUserOptions}>
            Reset
          </button>
        </div>
      </form>
      <Copyright />
    </main>
  )
}

export default Options
