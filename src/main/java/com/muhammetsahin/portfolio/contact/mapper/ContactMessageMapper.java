package com.muhammetsahin.portfolio.contact.mapper;

import com.muhammetsahin.portfolio.contact.dto.ContactMessageRequest;
import com.muhammetsahin.portfolio.contact.dto.ContactMessageResponse;
import com.muhammetsahin.portfolio.contact.entity.ContactMessage;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class ContactMessageMapper {

    public ContactMessage toEntity(ContactMessageRequest request) {
        return ContactMessage.builder()
                .name(request.name())
                .email(request.email())
                .subject(request.subject())
                .message(request.message())
                .read(false)
                .createdAt(Instant.now())
                .build();
    }

    public ContactMessageResponse toResponse(ContactMessage contactMessage) {
        return new ContactMessageResponse(
                contactMessage.getId(),
                contactMessage.getName(),
                contactMessage.getEmail(),
                contactMessage.getSubject(),
                contactMessage.getMessage(),
                contactMessage.getRead(),
                contactMessage.getCreatedAt()
        );
    }
}