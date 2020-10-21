/* eslint-disable no-unused-vars */
import * as React from 'react'
import { Option } from 'react-dropdown'
import { Dropdown } from '../components/common/Dropdown'

import { Input } from '../components/common/Input'

interface Props {
  type: string
  name: string
  label: string
  labelClassName: string | undefined
  dropDownOptions: Option[]
  inputClassName: string | undefined
  onClick: () => any
  validate: (value: string) => any
  className?: string | undefined
  errorClassName?: string | undefined
  handleInputvalues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => void
}

export const renderInputs = ({
  type,
  name,
  validate,
  className,
  errorClassName,
  handleInputvalues,
  dropDownOptions,
  labelClassName,
  label,
  onClick
}: Props): React.ReactElement | undefined => {
  if (type === 'input') {
    return (
      <React.Fragment>
        <label className={labelClassName}>{label}</label>
        <Input
          className={className}
          errorClassName={errorClassName}
          isValid={(value) => validate(value)}
          name={name}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement>,
            name: string
          ) => handleInputvalues(event, name)}
        />
      </React.Fragment>
    )
  } else if (type === 'dropdown') {
    return (
      <Dropdown
        isValid={(value) => validate(value)}
        options={dropDownOptions}
      />
    )
  } else if (type === 'textarea') {
    return <textarea className={className} name={name} />
  } else if (type === 'button') {
    return (
      <button type='button' onClick={() => onClick()}>
        {label}
      </button>
    )
  }
  return undefined
}
