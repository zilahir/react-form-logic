/* eslint-disable no-unused-vars */
import * as React from 'react'
import { Option } from 'react-dropdown'
import { Dropdown } from '../components/common/Dropdown'

import { Input } from '../components/common/Input'
import { Textarea } from '../components/common/Textarea'

interface Props {
  type: string
  name: string
  label: string
  buttonLabel: string | undefined
  labelClassName: string | undefined
  dropDownOptions: Option[]
  inputClassName: string | undefined
  onClick: () => any
  validate: (value: string) => any
  className?: string | undefined
  errorClassName?: string | undefined
  handleInputvalues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
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
  onClick,
  buttonLabel,
  inputClassName
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
          ) => handleInputvalues(event.target.value, name)}
        />
      </React.Fragment>
    )
  } else if (type === 'dropdown') {
    return (
      <Dropdown
        isValid={(value) => validate(value)}
        options={dropDownOptions}
        onChange={(selected: Option) => handleInputvalues(selected.value, name)}
      />
    )
  } else if (type === 'textarea') {
    return (
      <React.Fragment>
        <label className={labelClassName}>{label}</label>
        <Textarea
          isValid={(value) => validate(value)}
          className={`${className} ${inputClassName}`}
          name={name}
          errorClassName={errorClassName}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement>,
            name: string
          ) => handleInputvalues(event.target.value, name)}
        />
      </React.Fragment>
    )
  } else if (type === 'button') {
    return (
      <React.Fragment>
        <p>{label}</p>
        <button
          className={inputClassName}
          type='button'
          onClick={() => onClick()}
        >
          {buttonLabel}
        </button>
      </React.Fragment>
    )
  }
  return undefined
}
