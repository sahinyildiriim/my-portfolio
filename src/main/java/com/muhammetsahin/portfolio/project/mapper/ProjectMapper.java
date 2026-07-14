package com.muhammetsahin.portfolio.project.mapper;

import com.muhammetsahin.portfolio.project.dto.ProjectCreateRequest;
import com.muhammetsahin.portfolio.project.dto.ProjectResponse;
import com.muhammetsahin.portfolio.project.dto.ProjectSummaryResponse;
import com.muhammetsahin.portfolio.project.dto.ProjectUpdateRequest;
import com.muhammetsahin.portfolio.project.entity.Project;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class ProjectMapper {

    public Project toEntity(ProjectCreateRequest request, String slug) {
        return Project.builder()
                .title(request.title())
                .slug(slug)
                .description(request.description())
                .imageUrl(request.imageUrl())
                .liveUrl(request.liveUrl())
                .githubUrl(request.githubUrl())
                .technologies(
                        request.technologies() == null
                                ? new ArrayList<>()
                                : new ArrayList<>(request.technologies())
                )
                .displayOrder(request.displayOrder())
                .published(request.published())
                .build();
    }

    public void updateEntity(
            Project project,
            ProjectUpdateRequest request,
            String slug
    ) {
        project.setTitle(request.title());
        project.setSlug(slug);
        project.setDescription(request.description());
        project.setImageUrl(request.imageUrl());
        project.setLiveUrl(request.liveUrl());
        project.setGithubUrl(request.githubUrl());
        project.setTechnologies(
                request.technologies() == null
                        ? new ArrayList<>()
                        : new ArrayList<>(request.technologies())
        );
        project.setDisplayOrder(request.displayOrder());
        project.setPublished(request.published());
    }

    public ProjectSummaryResponse toSummaryResponse(Project project) {
        return new ProjectSummaryResponse(
                project.getId(),
                project.getTitle(),
                project.getSlug(),
                project.getDescription(),
                project.getImageUrl(),
                project.getLiveUrl(),
                project.getGithubUrl(),
                new ArrayList<>(project.getTechnologies()),
                project.getDisplayOrder()
        );
    }

    public ProjectResponse toResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getSlug(),
                project.getDescription(),
                project.getImageUrl(),
                project.getLiveUrl(),
                project.getGithubUrl(),
                new ArrayList<>(project.getTechnologies()),
                project.getDisplayOrder(),
                project.getPublished(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }
}