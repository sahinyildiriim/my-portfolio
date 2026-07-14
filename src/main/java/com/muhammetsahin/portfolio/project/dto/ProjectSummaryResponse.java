package com.muhammetsahin.portfolio.project.dto;

import java.util.List;

public record ProjectSummaryResponse(
        Long id,
        String title,
        String slug,
        String description,
        String imageUrl,
        String liveUrl,
        String githubUrl,
        List<String> technologies,
        Integer displayOrder
) {
}