package com.mainproject.server.response;

import com.mainproject.server.exception.ExceptionCode;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Slf4j
public class ErrorResponse {
    private int status;
    private String message;
    private List<FieldBindingError> fieldBindingErrors;
    private List<ConstraintViolationError> constraintViolationErrors;

    private ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    private ErrorResponse(List<FieldBindingError> fieldBindingErrors,
                          List<ConstraintViolationError> constraintViolationErrors) {
        this.fieldBindingErrors = fieldBindingErrors;
        this.constraintViolationErrors = constraintViolationErrors;
    }

    public static ErrorResponse of(int status, String message) {
        return new ErrorResponse(status, message);
    }

    public static ErrorResponse of(BindingResult bindingResult) {
        return new ErrorResponse(FieldBindingError.of(bindingResult), null);
    }

    public static ErrorResponse of(Set<ConstraintViolation<?>> constraintViolations) {
        return new ErrorResponse(null, ConstraintViolationError.of(constraintViolations));
    }

    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }

    public static ErrorResponse of(HttpStatus httpStatus, String message) {
        return new ErrorResponse(httpStatus.value(), message);
    }


    @Getter
    public static class FieldBindingError {
        private String field;
        private Object rejectedValue;
        private String message;

        private FieldBindingError(String field, Object rejectedValue, String message) {
            this.field = field;
            this.rejectedValue = rejectedValue;
            this.message = message;
        }

        public static List<FieldBindingError> of(BindingResult bindingResult) {
            return bindingResult.getFieldErrors().stream()
                    .map(fieldError -> new FieldBindingError(
                            fieldError.getField(),
                            fieldError.getRejectedValue() == null ?
                                    "" : fieldError.getRejectedValue().toString(),
                            fieldError.getDefaultMessage()
                    ))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        private ConstraintViolationError(String propertyPath, Object rejectedValue, String reason) {
            this.propertyPath = propertyPath;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations) {
            return constraintViolations.stream()
                    .map(constraintViolation ->
                            new ConstraintViolationError(
                                    constraintViolation.getPropertyPath().toString(),
                                    constraintViolation.getInvalidValue() == null ?
                                            "" : constraintViolation.getInvalidValue().toString(),
                                    constraintViolation.getMessage()
                            ))
                    .collect(Collectors.toList());
        }
    }
}
