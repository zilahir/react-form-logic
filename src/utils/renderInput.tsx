import * as React from 'react'
import { Dropdown } from '../components/common/Dropdown'

import { Input } from '../components/common/Input'

interface Props {
  type: string
  name: string
  validate: (value: string) => any
  className?: string | undefined
  errorClassName?: string | undefined
}

const dropdownOptions = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
]

export const renderInputs = ({
  type,
  name,
  validate,
  className,
  errorClassName
}: Props): React.ReactElement | undefined => {
  if (type === 'input') {
    return (
      <Input
        className={className}
        errorClassName={errorClassName}
        isValid={(value) => validate(value)}
        name={name}
      />
    )
  } else if (type === 'dropdown') {
    return (
      <Dropdown
        isValid={(value) => validate(value)}
        options={dropdownOptions}
      />
    )
  } else if (type === 'textarea') {
    return <textarea className={className} />
  }
  return undefined
}
