package com.muhammetsahin.portfolio.blog.repository;

import com.muhammetsahin.portfolio.blog.entity.BlogPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

    Page<BlogPost> findAllByPublishedTrue(Pageable pageable);

    Page<BlogPost> findAllByPublishedTrueAndCategoryIgnoreCase(
            String category,
            Pageable pageable
    );

    Optional<BlogPost> findBySlug(String slug);

    Optional<BlogPost> findBySlugAndPublishedTrue(String slug);

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, Long id);
}