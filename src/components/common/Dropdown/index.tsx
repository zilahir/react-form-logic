/* eslint-disable no-unused-vars */
import * as React from 'react'
import ReactDropdown, { Option } from 'react-dropdown'

import styles from './Dropdown.module.scss'

interface Props {
  options: Array<Option>
  isValid: (value: string) => any
  className?: string | undefined
  onChange: (value: Option) => void
}

export const Dropdown = ({
  options,
  isValid,
  onChange
}: Props): React.ReactElement => {
  const [value, setValue] = React.useState<Option>(options[0])
  function handleChange(value: Option) {
    setValue(value)
    isValid(value.value)
    onChange(value)
  }
  return (
    <div>
      <ReactDropdown
        onChange={(selected: Option) => handleChange(selected)}
        options={options}
        value={value}
        className={styles['Dropdown-root']}
        controlClassName={styles['Dropdown-control']}
        placeholderClassName={styles['']}
        menuClassName={styles['Dropdown-menu']}
      />
    </div>
  )
}
