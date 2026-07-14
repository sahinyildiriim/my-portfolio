package com.muhammetsahin.portfolio.project.dto;

import java.time.Instant;
import java.util.List;

public record ProjectResponse(
        Long id,
        String title,
        String slug,
        String description,
        String imageUrl,
        String liveUrl,
        String githubUrl,
        List<String> technologies,
        Integer displayOrder,
        Boolean published,
        Instant createdAt,
        Instant updatedAt
) {
}