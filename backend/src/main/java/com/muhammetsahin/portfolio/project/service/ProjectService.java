package com.muhammetsahin.portfolio.project.service;

import com.muhammetsahin.portfolio.common.util.SlugUtils;
import com.muhammetsahin.portfolio.exception.DuplicateResourceException;
import com.muhammetsahin.portfolio.exception.ResourceNotFoundException;
import com.muhammetsahin.portfolio.project.dto.ProjectCreateRequest;
import com.muhammetsahin.portfolio.project.dto.ProjectResponse;
import com.muhammetsahin.portfolio.project.dto.ProjectSummaryResponse;
import com.muhammetsahin.portfolio.project.dto.ProjectUpdateRequest;
import com.muhammetsahin.portfolio.project.entity.Project;
import com.muhammetsahin.portfolio.project.mapper.ProjectMapper;
import com.muhammetsahin.portfolio.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    @Transactional(readOnly = true)
    public Page<ProjectSummaryResponse> getPublishedProjects(Pageable pageable) {
        return projectRepository
                .findAllByPublishedTrue(pageable)
                .map(projectMapper::toSummaryResponse);
    }

    @Transactional(readOnly = true)
    public ProjectResponse getPublishedProjectBySlug(String slug) {
        Project project = projectRepository
                .findBySlugAndPublishedTrue(slug)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Proje bulunamadı.")
                );

        return projectMapper.toResponse(project);
    }

    @Transactional(readOnly = true)
    public Page<ProjectResponse> getAllProjects(Pageable pageable) {
        return projectRepository
                .findAll(pageable)
                .map(projectMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {
        return projectMapper.toResponse(findProjectById(id));
    }

    @Transactional
    public ProjectResponse createProject(ProjectCreateRequest request) {
        String slug = SlugUtils.generate(request.title());

        if (slug.isBlank()) {
            throw new IllegalArgumentException("Geçerli bir proje başlığı girilmelidir.");
        }

        if (projectRepository.existsBySlug(slug)) {
            throw new DuplicateResourceException(
                    "Bu başlığa ait bir proje zaten bulunuyor."
            );
        }

        Project project = projectMapper.toEntity(request, slug);
        Project savedProject = projectRepository.save(project);

        return projectMapper.toResponse(savedProject);
    }

    @Transactional
    public ProjectResponse updateProject(
            Long id,
            ProjectUpdateRequest request
    ) {
        Project project = findProjectById(id);
        String slug = SlugUtils.generate(request.title());

        if (slug.isBlank()) {
            throw new IllegalArgumentException("Geçerli bir proje başlığı girilmelidir.");
        }

        if (projectRepository.existsBySlugAndIdNot(slug, id)) {
            throw new DuplicateResourceException(
                    "Bu başlığa ait başka bir proje zaten bulunuyor."
            );
        }

        projectMapper.updateEntity(project, request, slug);

        return projectMapper.toResponse(project);
    }

    @Transactional
    public void deleteProject(Long id) {
        Project project = findProjectById(id);
        projectRepository.delete(project);
    }

    @Transactional
    public ProjectResponse updatePublication(Long id, boolean published) {
        Project project = findProjectById(id);
        project.setPublished(published);

        return projectMapper.toResponse(project);
    }

    private Project findProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Proje bulunamadı.")
                );
    }
}