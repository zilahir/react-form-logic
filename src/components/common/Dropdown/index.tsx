/* eslint-disable no-unused-vars */
import * as React from 'react'
import ReactDropdown, { Option } from 'react-dropdown'
import 'react-dropdown/style.css'

interface Props {
  options: Array<Option>
  isValid: (value: string) => any
  className?: string | undefined
}

export const Dropdown = ({ options, isValid }: Props): React.ReactElement => {
  const [value, setValue] = React.useState<Option>(options[0])
  function handleChange(value: Option) {
    setValue(value)
    isValid(value.value)
  }
  return (
    <div>
      <ReactDropdown
        onChange={(selected: Option) => handleChange(selected)}
        options={options}
        value={value}
      />
    </div>
  )
}
