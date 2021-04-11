import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './_style.scss';

interface IProps {
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
  placeholder?: string;
  showClear?: boolean;
  onChange?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
}

const Input: FC<IProps> = (props) => {
  const onClear = () => {
    console.log('清空 input');

    props.onClear && props.onClear();
  };
  return (
    <div className="input-wrapper">
      <input
        type="text"
        disabled={props.disabled}
        readOnly={props.readonly}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
      />

      {props.showClear ? (
        <FontAwesomeIcon
          className="input-icon_clear"
          icon="chevron-circle-right"
          onClick={onClear}
        />
      ) : null}
    </div>
  );
};

export default Input;
