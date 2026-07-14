package com.muhammetsahin.portfolio.exception;

import java.time.Instant;
import java.util.List;

public record ApiError(
        int status,
        String error,
        String message,
        String path,
        Instant timestamp,
        List<FieldValidationError> fieldErrors
) {
}