import * as React from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  name: string
  isValid: (value: string) => any
  className?: string | undefined
  errorClassName?: string | undefined
  successClassName?: string | undefined
}

export const Input = ({ name, isValid, className, errorClassName }: Props) => {
  const { register, errors } = useForm({
    mode: 'onBlur'
  })
  return (
    <React.Fragment>
      <input
        className={className}
        type='text'
        name={name}
        ref={register({
          validate: {
            isValid: (value: string) => isValid(value)
          },
          required: 'this is required',
          minLength: {
            value: 2,
            message: 'min length is not enough'
          }
        })}
      />
      {errors[name] && <p className={errorClassName}>{errors[name].message}</p>}
    </React.Fragment>
  )
}
