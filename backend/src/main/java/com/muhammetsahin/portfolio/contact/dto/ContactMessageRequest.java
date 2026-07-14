package com.muhammetsahin.portfolio.contact.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactMessageRequest(

        @NotBlank(message = "Ad soyad boş olamaz.")
        @Size(max = 120, message = "Ad soyad en fazla 120 karakter olabilir.")
        String name,

        @NotBlank(message = "E-posta boş olamaz.")
        @Email(message = "Geçerli bir e-posta adresi girilmelidir.")
        @Size(max = 254, message = "E-posta en fazla 254 karakter olabilir.")
        String email,

        @NotBlank(message = "Konu boş olamaz.")
        @Size(max = 200, message = "Konu en fazla 200 karakter olabilir.")
        String subject,

        @NotBlank(message = "Mesaj boş olamaz.")
        @Size(max = 5000, message = "Mesaj en fazla 5000 karakter olabilir.")
        String message
) {
}