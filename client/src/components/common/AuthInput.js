import styled from 'styled-components';
import PropTypes from 'prop-types';

const AuthInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 0.5rem;
  }

  > .error-msg {
    font-size: 0.75rem;
    color: var(--error-color);
    padding-left: 0.675rem;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid rgb(167, 150, 137, 0.4);
  gap: 0.375rem;
  padding: 0.625rem 0.875rem;
  border-radius: 0.5rem;

  &.error {
    border: 2px solid var(--error-color);
  }

  > label {
    font-size: 0.625rem;
    color: var(--sec-color);
  }
  > input {
    border: none;
    font-size: 0.875rem;
    color: var(--main-font-color);
  }
`;

const AuthInput = ({
  label,
  type,
  id,
  name,
  value,
  placeholder,
  error,
  ...rest
}) => {
  return (
    <AuthInputWrapper>
      <InputBox type="text" className={error ? 'error' : null}>
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          {...rest}
        ></input>
      </InputBox>
      <p className="error-msg">{error}</p>
    </AuthInputWrapper>
  );
};

AuthInput.defaultProps = {
  placeholder: 'placeholder',
  error: '',
};

AuthInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default AuthInput;
