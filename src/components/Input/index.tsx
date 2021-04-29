import React, { ChangeEvent, FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import './_style.scss';

interface IProps {
  className?: string;
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
  placeholder?: string;
  showClear?: boolean;
  password?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
}

const Input: FC<IProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const onClear = () => {
    props.onClear && props.onClear();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(e.target.value);
  };

  const eyeIconEl = (
    <FontAwesomeIcon
      className="input-icon input-icon_eye"
      icon={showPassword ? 'eye-slash' : 'eye'}
      onMouseDown={() => {
        setShowPassword(true);
      }}
      onMouseUp={() => {
        setShowPassword(false);
      }}
    />
  );

  const classes = classNames('input-wrapper', props?.className);
  return (
    <div className={classes}>
      {props.password ? (
        <input
          type={showPassword ? 'text' : 'password'}
          disabled={props.disabled}
          readOnly={props.readonly}
          value={props.value}
          onChange={onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          placeholder={props.placeholder}
        />
      ) : (
        <input
          type="text"
          disabled={props.disabled}
          readOnly={props.readonly}
          value={props.value}
          onChange={onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          placeholder={props.placeholder}
        />
      )}

      {props.showClear ? (
        <FontAwesomeIcon
          className="input-icon input-icon_clear"
          icon="times"
          onClick={onClear}
        />
      ) : null}

      {props.password ? eyeIconEl : null}
    </div>
  );
};

export default Input;
