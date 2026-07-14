package com.muhammetsahin.portfolio.blog.dto;

import java.time.Instant;

public record BlogSummaryResponse(
        Long id,
        String title,
        String slug,
        String description,
        String imageUrl,
        String category,
        Integer readTime,
        Instant publishedAt
) {
}