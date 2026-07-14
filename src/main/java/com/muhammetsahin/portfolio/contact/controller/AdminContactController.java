package com.muhammetsahin.portfolio.contact.controller;

import com.muhammetsahin.portfolio.contact.dto.ContactMessageResponse;
import com.muhammetsahin.portfolio.contact.service.ContactMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/messages")
@RequiredArgsConstructor
public class AdminContactController {

    private final ContactMessageService contactMessageService;

    @GetMapping
    public Page<ContactMessageResponse> getMessages(
            @RequestParam(required = false) Boolean read,
            Pageable pageable
    ) {
        return contactMessageService.getMessages(read, pageable);
    }

    @GetMapping("/{id}")
    public ContactMessageResponse getMessageById(@PathVariable Long id) {
        return contactMessageService.getMessageById(id);
    }

    @PatchMapping("/{id}/read")
    public ContactMessageResponse markAsRead(@PathVariable Long id) {
        return contactMessageService.markAsRead(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMessage(@PathVariable Long id) {
        contactMessageService.deleteMessage(id);
    }
}