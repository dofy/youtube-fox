import { useEffect, useState } from 'react'
import { Copyright } from '../components/Copyright'
import { FormControl } from '../components/FormControl'
import { DefaultOptions } from '../contents'
import { UserOptions } from '../types'

export const Options = () => {
  const [userOption, setUserOption] = useState<UserOptions>(DefaultOptions)

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'getOptions' }, (response) => {
      setUserOption(response.options)
    })
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
    setUserOption(DefaultOptions)
    try {
      chrome.storage.sync.set({ options: DefaultOptions })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <main className="container">
      <h2>YouTube Fox</h2>
      <h3>Options</h3>
      <form>
        {/* <FormControl
          isRequired
          label="OpenAI API Key:"
          name="openaiApiKey"
          value={userOption.openaiApiKey}
          onChange={handleChange}
          placeholder="Enter your OpenAI API Key here"
        /> */}
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
        {/* <FormControl
          label="System Prompt:"
          type="textarea"
          minHeight={230}
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
        /> */}
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
