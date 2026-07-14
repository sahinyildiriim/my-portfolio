package com.muhammetsahin.portfolio.blog.service;

import com.muhammetsahin.portfolio.blog.dto.BlogCreateRequest;
import com.muhammetsahin.portfolio.blog.dto.BlogResponse;
import com.muhammetsahin.portfolio.blog.dto.BlogSummaryResponse;
import com.muhammetsahin.portfolio.blog.dto.BlogUpdateRequest;
import com.muhammetsahin.portfolio.blog.entity.BlogPost;
import com.muhammetsahin.portfolio.blog.mapper.BlogMapper;
import com.muhammetsahin.portfolio.blog.repository.BlogPostRepository;
import com.muhammetsahin.portfolio.common.util.SlugUtils;
import com.muhammetsahin.portfolio.exception.DuplicateResourceException;
import com.muhammetsahin.portfolio.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogPostRepository blogPostRepository;
    private final BlogMapper blogMapper;

    @Transactional(readOnly = true)
    public Page<BlogSummaryResponse> getPublishedBlogs(
            String category,
            Pageable pageable
    ) {
        if (category == null || category.isBlank()) {
            return blogPostRepository
                    .findAllByPublishedTrue(pageable)
                    .map(blogMapper::toSummaryResponse);
        }

        return blogPostRepository
                .findAllByPublishedTrueAndCategoryIgnoreCase(
                        category.trim(),
                        pageable
                )
                .map(blogMapper::toSummaryResponse);
    }

    @Transactional(readOnly = true)
    public BlogResponse getPublishedBlogBySlug(String slug) {
        BlogPost blogPost = blogPostRepository
                .findBySlugAndPublishedTrue(slug)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Blog yazısı bulunamadı.")
                );

        return blogMapper.toResponse(blogPost);
    }

    @Transactional(readOnly = true)
    public Page<BlogResponse> getAllBlogs(Pageable pageable) {
        return blogPostRepository
                .findAll(pageable)
                .map(blogMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public BlogResponse getBlogById(Long id) {
        return blogMapper.toResponse(findBlogById(id));
    }

    @Transactional
    public BlogResponse createBlog(BlogCreateRequest request) {
        String slug = SlugUtils.generate(request.title());

        validateSlug(slug);

        if (blogPostRepository.existsBySlug(slug)) {
            throw new DuplicateResourceException(
                    "Bu başlığa ait bir blog yazısı zaten bulunuyor."
            );
        }

        BlogPost blogPost = blogMapper.toEntity(request, slug);
        BlogPost savedBlogPost = blogPostRepository.save(blogPost);

        return blogMapper.toResponse(savedBlogPost);
    }

    @Transactional
    public BlogResponse updateBlog(
            Long id,
            BlogUpdateRequest request
    ) {
        BlogPost blogPost = findBlogById(id);
        String slug = SlugUtils.generate(request.title());

        validateSlug(slug);

        if (blogPostRepository.existsBySlugAndIdNot(slug, id)) {
            throw new DuplicateResourceException(
                    "Bu başlığa ait başka bir blog yazısı zaten bulunuyor."
            );
        }

        blogMapper.updateEntity(blogPost, request, slug);

        return blogMapper.toResponse(blogPost);
    }

    @Transactional
    public BlogResponse updatePublication(Long id, boolean published) {
        BlogPost blogPost = findBlogById(id);
        boolean wasPublished = Boolean.TRUE.equals(blogPost.getPublished());

        blogPost.setPublished(published);

        if (!wasPublished && published && blogPost.getPublishedAt() == null) {
            blogPost.setPublishedAt(Instant.now());
        }

        return blogMapper.toResponse(blogPost);
    }

    @Transactional
    public void deleteBlog(Long id) {
        BlogPost blogPost = findBlogById(id);
        blogPostRepository.delete(blogPost);
    }

    private BlogPost findBlogById(Long id) {
        return blogPostRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Blog yazısı bulunamadı.")
                );
    }

    private void validateSlug(String slug) {
        if (slug.isBlank()) {
            throw new IllegalArgumentException(
                    "Geçerli bir blog başlığı girilmelidir."
            );
        }
    }
}