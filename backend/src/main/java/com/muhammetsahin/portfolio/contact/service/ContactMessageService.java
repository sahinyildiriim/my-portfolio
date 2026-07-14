package com.muhammetsahin.portfolio.contact.service;

import com.muhammetsahin.portfolio.contact.dto.ContactMessageRequest;
import com.muhammetsahin.portfolio.contact.dto.ContactMessageResponse;
import com.muhammetsahin.portfolio.contact.entity.ContactMessage;
import com.muhammetsahin.portfolio.contact.mapper.ContactMessageMapper;
import com.muhammetsahin.portfolio.contact.repository.ContactMessageRepository;
import com.muhammetsahin.portfolio.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;
    private final ContactMessageMapper contactMessageMapper;

    @Transactional
    public ContactMessageResponse createMessage(
            ContactMessageRequest request
    ) {
        ContactMessage contactMessage =
                contactMessageMapper.toEntity(request);

        ContactMessage savedMessage =
                contactMessageRepository.save(contactMessage);

        return contactMessageMapper.toResponse(savedMessage);
    }

    @Transactional(readOnly = true)
    public Page<ContactMessageResponse> getMessages(
            Boolean read,
            Pageable pageable
    ) {
        if (read == null) {
            return contactMessageRepository
                    .findAll(pageable)
                    .map(contactMessageMapper::toResponse);
        }

        if (read) {
            return contactMessageRepository
                    .findAllByReadTrue(pageable)
                    .map(contactMessageMapper::toResponse);
        }

        return contactMessageRepository
                .findAllByReadFalse(pageable)
                .map(contactMessageMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public ContactMessageResponse getMessageById(Long id) {
        return contactMessageMapper.toResponse(findMessageById(id));
    }

    @Transactional
    public ContactMessageResponse markAsRead(Long id) {
        ContactMessage contactMessage = findMessageById(id);
        contactMessage.setRead(true);

        return contactMessageMapper.toResponse(contactMessage);
    }

    @Transactional
    public void deleteMessage(Long id) {
        ContactMessage contactMessage = findMessageById(id);
        contactMessageRepository.delete(contactMessage);
    }

    private ContactMessage findMessageById(Long id) {
        return contactMessageRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "İletişim mesajı bulunamadı."
                        )
                );
    }
}