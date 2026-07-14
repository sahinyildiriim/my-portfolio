package com.muhammetsahin.portfolio.project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProjectCreateRequest(

        @NotBlank(message = "Başlık boş olamaz.")
        @Size(max = 150, message = "Başlık en fazla 150 karakter olabilir.")
        String title,

        @NotBlank(message = "Açıklama boş olamaz.")
        String description,

        @Size(max = 500, message = "Görsel URL en fazla 500 karakter olabilir.")
        String imageUrl,

        @Size(max = 500, message = "Live URL en fazla 500 karakter olabilir.")
        String liveUrl,

        @Size(max = 500, message = "GitHub URL en fazla 500 karakter olabilir.")
        String githubUrl,

        @NotNull(message = "Teknolojiler boş olamaz.")
        List<
                @NotBlank(message = "Teknoloji adı boş olamaz.")
                @Size(max = 100, message = "Teknoloji adı en fazla 100 karakter olabilir.")
                        String
                > technologies,

        @NotNull(message = "Gösterim sırası boş olamaz.")
        Integer displayOrder,

        @NotNull(message = "Yayın durumu boş olamaz.")
        Boolean published
) {
}