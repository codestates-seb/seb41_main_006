import styled from 'styled-components';
import PropTypes from 'prop-types';

const AuthInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  > .error-msg {
    font-size: 0.75rem;
    color: var(--error-color);
    padding-left: 0.675rem;
  }

  > .email-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    > div {
      flex: 1;
    }

    > button {
      background-color: var(--sec-color);
      height: 100%;
      width: 3rem;
      border-radius: 0.5rem;
      color: white;
    }
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
  position: relative;

  &.error {
    border: 2px solid var(--error-color);
  }

  &.email {
    /* border-radius: 0.5rem 0 0 0.5rem; */
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
  auth,
  onClick,
  ...rest
}) => {
  if (auth) {
    return (
      <AuthInputWrapper>
        <div className="email-wrapper">
          <InputBox type="text" className={`email ${error ? 'error' : ''}`}>
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
          <button type="button" onClick={onClick}>
            인증
          </button>
        </div>
        <p className="error-msg">{error}</p>
      </AuthInputWrapper>
    );
  }

  return (
    <AuthInputWrapper>
      <InputBox type="text" className={error ? 'error' : ''}>
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
  auth: PropTypes.bool,
  onClick: PropTypes.func,
};

export default AuthInput;
