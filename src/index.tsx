import * as React from 'react'
import styles from './styles.module.css'

import { renderInputs } from './utils/renderInput'

// type InputType = 'input' | 'dropdown'

type Input = {
  label: string
  inputType: string
  key: number
  name: string
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
}

type Level = {
  inputs: Inputs[]
  config: Config
}

interface Props {
  inputs: Level
}

export const ExampleComponent = ({ inputs }: Props) => {
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
    name: any
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
            <label className={inputs.config.labelClassName}>
              {currentInput.label}
            </label>
            {renderInputs({
              name: currentInput.name,
              type: currentInput.inputType,
              validate,
              className: inputs.config.className,
              errorClassName: inputs.config.errorClassName,
              handleInputvalues: (event: any, name: any) =>
                handleInputvalues(event, name)
            })}
          </div>
        ))
      )}
      <button type='button' onClick={() => handleSubmit()}>
        {inputs.config.submitButtonLabel}
      </button>
    </div>
  )
}
