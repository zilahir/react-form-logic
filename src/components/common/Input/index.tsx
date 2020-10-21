import * as React from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  name: string
  isValid: (value: string) => any
  className?: string | undefined
  errorClassName?: string | undefined
  successClassName?: string | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void
}

export const Input = ({
  name,
  isValid,
  className,
  errorClassName,
  onChange
}: Props) => {
  const { register, errors } = useForm({
    mode: 'onBlur'
  })
  return (
    <React.Fragment>
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event, name)
        }
        className={className}
        type='text'
        name={name}
        ref={register({
          validate: {
            isValid: (value: string) => isValid(value)
          },
          required: 'Ez a mező kötelező',
          minLength: {
            value: 2,
            message: 'A bevitt szöveg túl rövid...'
          }
        })}
      />
      {errors[name] && <p className={errorClassName}>{errors[name].message}</p>}
    </React.Fragment>
  )
}
