package com.muhammetsahin.portfolio.blog.dto;

import java.time.Instant;

public record BlogResponse(
        Long id,
        String title,
        String slug,
        String description,
        String content,
        String imageUrl,
        String category,
        Integer readTime,
        Instant publishedAt,
        Boolean published,
        Instant createdAt,
        Instant updatedAt
) {
}