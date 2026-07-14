package com.muhammetsahin.portfolio.contact.controller;

import com.muhammetsahin.portfolio.contact.dto.ContactMessageRequest;
import com.muhammetsahin.portfolio.contact.dto.ContactMessageResponse;
import com.muhammetsahin.portfolio.contact.service.ContactMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactMessageService contactMessageService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactMessageResponse createMessage(
            @Valid @RequestBody ContactMessageRequest request
    ) {
        return contactMessageService.createMessage(request);
    }
}