interface FormControlProps {
  label: string
  isRequired?: boolean
  type?: 'text' | 'password' | 'textarea'
  placeholder?: string
  info?: string
  minHeight?: number
  name?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const FormControl: React.FC<FormControlProps> = ({
  label,
  isRequired = false,
  type = 'text',
  placeholder,
  info,
  minHeight = 150,
  name,
  value,
  onChange,
}) => {
  const fieldId = label.toLowerCase().replace(/ /g, '-')

  return (
    <div className="form-control">
      <label htmlFor={fieldId}>
        {label}
        {isRequired && <span className="required">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={fieldId}
          required={isRequired}
          name={name || fieldId}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ minHeight: `${minHeight}px` }}
        />
      ) : (
        <input
          type={type}
          id={fieldId}
          required={isRequired}
          name={name || fieldId}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {info && <small>{info}</small>}
    </div>
  )
}
