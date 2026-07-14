package com.muhammetsahin.portfolio.blog.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record BlogCreateRequest(

        @NotBlank(message = "Başlık boş olamaz.")
        @Size(max = 200, message = "Başlık en fazla 200 karakter olabilir.")
        String title,

        @NotBlank(message = "Kısa açıklama boş olamaz.")
        String description,

        @NotBlank(message = "İçerik boş olamaz.")
        String content,

        @Size(max = 500, message = "Görsel URL en fazla 500 karakter olabilir.")
        String imageUrl,

        @NotBlank(message = "Kategori boş olamaz.")
        @Size(max = 100, message = "Kategori en fazla 100 karakter olabilir.")
        String category,

        @NotNull(message = "Okuma süresi boş olamaz.")
        @Min(value = 1, message = "Okuma süresi en az 1 dakika olmalıdır.")
        Integer readTime,

        @NotNull(message = "Yayın durumu boş olamaz.")
        Boolean published
) {
}