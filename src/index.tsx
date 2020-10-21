/* eslint-disable no-unused-vars */
import * as React from 'react'
import { Option } from 'react-dropdown'
import styles from './styles.module.css'

import { renderInputs } from './utils/renderInput'

type Input = {
  label: string
  inputType: string
  key: number
  name: string
  dropDownOptions?: Option[]
  inputClassName?: string
  onClick?: () => any
  buttonLabel?: string | undefined
}

type Inputs = {
  id: string | number
  inputs: Input[]
}

type Config = {
  className?: string | undefined
  labelClassName?: string | undefined
  errorClassName?: string | undefined
  successClassName?: string | undefined
  baseClassName?: string | undefined
  onSubmit: (values: any) => void
  submitButtonLabel: string
  submitClass?: string | undefined
}

type Level = {
  inputs: Inputs[]
  config: Config
}

interface Props {
  inputs: Level
}

export const ReactLogicForm = ({ inputs }: Props) => {
  const [currentLevel, setCurrentLevel] = React.useState<number>(1)
  const [inputValues, setInputValues] = React.useState<any>({})
  function validate(value: string) {
    const result = value.length > 1
    if (result) {
      if (currentLevel < inputs.inputs.length) {
        setCurrentLevel((currentValue: number) => currentValue + 1)
      }
    }
  }

  function handleInputvalues(
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) {
    setInputValues({
      ...inputValues,
      [name]: event.target.value
    })
  }

  function handleSubmit() {
    inputs.config.onSubmit(inputValues)
  }

  return (
    <div className={inputs.config.baseClassName}>
      {Array.from(new Array(currentLevel)).map((_, index: number) =>
        inputs.inputs[index].inputs.map((currentInput: Input) => (
          <div className={styles.oneInput} key={currentInput.key}>
            {renderInputs({
              buttonLabel: currentInput.buttonLabel,
              inputClassName: currentInput.inputClassName,
              labelClassName: inputs.config.labelClassName,
              label: currentInput.label,
              name: currentInput.name,
              type: currentInput.inputType,
              validate,
              className: inputs.config.className,
              onClick: currentInput.onClick
                ? currentInput.onClick
                : () =>
                    setCurrentLevel((currentValue: number) => currentValue + 1),
              errorClassName: inputs.config.errorClassName,
              dropDownOptions: currentInput.dropDownOptions
                ? currentInput.dropDownOptions
                : [],
              handleInputvalues: (event: any, name: any) =>
                handleInputvalues(event, name)
            })}
          </div>
        ))
      )}
      {currentLevel === inputs.inputs.length && (
        <button
          className={inputs.config.submitClass}
          type='button'
          onClick={() => handleSubmit()}
        >
          {inputs.config.submitButtonLabel}
        </button>
      )}
    </div>
  )
}
