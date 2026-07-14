package com.muhammetsahin.portfolio.contact.dto;

import java.time.Instant;

public record ContactMessageResponse(
        Long id,
        String name,
        String email,
        String subject,
        String message,
        Boolean read,
        Instant createdAt
) {
}