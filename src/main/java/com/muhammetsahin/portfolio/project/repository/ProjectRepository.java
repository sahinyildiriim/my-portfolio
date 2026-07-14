package com.muhammetsahin.portfolio.project.repository;

import com.muhammetsahin.portfolio.project.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Page<Project> findAllByPublishedTrue(Pageable pageable);

    Optional<Project> findBySlug(String slug);

    Optional<Project> findBySlugAndPublishedTrue(String slug);

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, Long id);
}