package com.muhammetsahin.portfolio.exception;

public record FieldValidationError(
        String field,
        String message
) {
}