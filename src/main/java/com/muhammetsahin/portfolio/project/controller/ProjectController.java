package com.muhammetsahin.portfolio.project.controller;

import com.muhammetsahin.portfolio.project.dto.ProjectResponse;
import com.muhammetsahin.portfolio.project.dto.ProjectSummaryResponse;
import com.muhammetsahin.portfolio.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public Page<ProjectSummaryResponse> getProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.ASC, "displayOrder")
        );

        return projectService.getPublishedProjects(pageable);
    }

    @GetMapping("/{slug}")
    public ProjectResponse getProjectBySlug(
            @PathVariable String slug
    ) {
        return projectService.getPublishedProjectBySlug(slug);
    }
}