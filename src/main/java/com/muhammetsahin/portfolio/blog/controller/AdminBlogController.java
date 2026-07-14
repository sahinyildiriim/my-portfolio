package com.muhammetsahin.portfolio.blog.controller;

import com.muhammetsahin.portfolio.blog.dto.BlogCreateRequest;
import com.muhammetsahin.portfolio.blog.dto.BlogResponse;
import com.muhammetsahin.portfolio.blog.dto.BlogUpdateRequest;
import com.muhammetsahin.portfolio.blog.service.BlogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/blogs")
@RequiredArgsConstructor
public class AdminBlogController {

    private final BlogService blogService;

    @GetMapping
    public Page<BlogResponse> getAllBlogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        return blogService.getAllBlogs(pageable);
    }

    @GetMapping("/{id}")
    public BlogResponse getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BlogResponse createBlog(
            @Valid @RequestBody BlogCreateRequest request
    ) {
        return blogService.createBlog(request);
    }

    @PutMapping("/{id}")
    public BlogResponse updateBlog(
            @PathVariable Long id,
            @Valid @RequestBody BlogUpdateRequest request
    ) {
        return blogService.updateBlog(id, request);
    }

    @PatchMapping("/{id}/publication")
    public BlogResponse updatePublication(
            @PathVariable Long id,
            @RequestParam boolean published
    ) {
        return blogService.updatePublication(id, published);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
    }
}