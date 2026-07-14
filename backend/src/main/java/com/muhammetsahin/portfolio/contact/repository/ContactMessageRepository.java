package com.muhammetsahin.portfolio.contact.repository;

import com.muhammetsahin.portfolio.contact.entity.ContactMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository
        extends JpaRepository<ContactMessage, Long> {

    Page<ContactMessage> findAllByReadFalse(Pageable pageable);

    Page<ContactMessage> findAllByReadTrue(Pageable pageable);
}