package com.muhammetsahin.portfolio.blog.controller;

import com.muhammetsahin.portfolio.blog.dto.BlogResponse;
import com.muhammetsahin.portfolio.blog.dto.BlogSummaryResponse;
import com.muhammetsahin.portfolio.blog.service.BlogService;
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
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @GetMapping
    public Page<BlogSummaryResponse> getBlogs(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        return blogService.getPublishedBlogs(category, pageable);
    }

    @GetMapping("/{slug}")
    public BlogResponse getBlogBySlug(
            @PathVariable String slug
    ) {
        return blogService.getPublishedBlogBySlug(slug);
    }
}