package com.muhammetsahin.portfolio.blog.mapper;

import com.muhammetsahin.portfolio.blog.dto.BlogCreateRequest;
import com.muhammetsahin.portfolio.blog.dto.BlogResponse;
import com.muhammetsahin.portfolio.blog.dto.BlogSummaryResponse;
import com.muhammetsahin.portfolio.blog.dto.BlogUpdateRequest;
import com.muhammetsahin.portfolio.blog.entity.BlogPost;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class BlogMapper {

    public BlogPost toEntity(BlogCreateRequest request, String slug) {
        Instant publishedAt = Boolean.TRUE.equals(request.published())
                ? Instant.now()
                : null;

        return BlogPost.builder()
                .title(request.title())
                .slug(slug)
                .description(request.description())
                .content(request.content())
                .imageUrl(request.imageUrl())
                .category(request.category())
                .readTime(request.readTime())
                .published(request.published())
                .publishedAt(publishedAt)
                .build();
    }

    public void updateEntity(
            BlogPost blogPost,
            BlogUpdateRequest request,
            String slug
    ) {
        boolean wasPublished = Boolean.TRUE.equals(blogPost.getPublished());
        boolean willBePublished = Boolean.TRUE.equals(request.published());

        blogPost.setTitle(request.title());
        blogPost.setSlug(slug);
        blogPost.setDescription(request.description());
        blogPost.setContent(request.content());
        blogPost.setImageUrl(request.imageUrl());
        blogPost.setCategory(request.category());
        blogPost.setReadTime(request.readTime());
        blogPost.setPublished(request.published());

        if (!wasPublished && willBePublished && blogPost.getPublishedAt() == null) {
            blogPost.setPublishedAt(Instant.now());
        }
    }

    public BlogSummaryResponse toSummaryResponse(BlogPost blogPost) {
        return new BlogSummaryResponse(
                blogPost.getId(),
                blogPost.getTitle(),
                blogPost.getSlug(),
                blogPost.getDescription(),
                blogPost.getImageUrl(),
                blogPost.getCategory(),
                blogPost.getReadTime(),
                blogPost.getPublishedAt()
        );
    }

    public BlogResponse toResponse(BlogPost blogPost) {
        return new BlogResponse(
                blogPost.getId(),
                blogPost.getTitle(),
                blogPost.getSlug(),
                blogPost.getDescription(),
                blogPost.getContent(),
                blogPost.getImageUrl(),
                blogPost.getCategory(),
                blogPost.getReadTime(),
                blogPost.getPublishedAt(),
                blogPost.getPublished(),
                blogPost.getCreatedAt(),
                blogPost.getUpdatedAt()
        );
    }
}