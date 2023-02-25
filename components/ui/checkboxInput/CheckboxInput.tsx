import { IconChecked } from '../icons';
import Wrapper from './CheckboxInput.styled';

export interface ICheckboxInput extends React.ComponentPropsWithoutRef<'div'> {
  isChecked: boolean;
  inputId: string;
  inputLabel?: string;
  onChangeCb(): void;
  disabled?: boolean;
}

const CheckboxInput: React.FC<ICheckboxInput> = ({
  isChecked,
  inputId,
  inputLabel,
  onChangeCb,
  disabled,
}) => {
  return (
    <Wrapper className={`form-control bg-app ${isChecked ? 'checked' : null}`}>
      <button
        className="check-btn bg-box"
        type="button"
        onClick={onChangeCb}
        disabled={disabled}
      >
        <IconChecked className="icon" />
      </button>
      <input
        className="checkbox"
        type="checkbox"
        id={inputId}
        name={inputId}
        checked={isChecked}
        onChange={() => onChangeCb()}
        disabled={disabled}
      />
      {inputLabel && (
        <label
          className={isChecked ? 'text-light' : 'text-dark'}
          htmlFor={inputId}
        >
          {inputLabel}
        </label>
      )}
    </Wrapper>
  );
};

export default CheckboxInput;
