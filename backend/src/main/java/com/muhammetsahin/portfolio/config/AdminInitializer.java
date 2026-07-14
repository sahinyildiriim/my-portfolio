package com.muhammetsahin.portfolio.config;

import com.muhammetsahin.portfolio.auth.entity.AdminUser;
import com.muhammetsahin.portfolio.auth.entity.Role;
import com.muhammetsahin.portfolio.auth.repository.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        String username = "admin";

        if (adminUserRepository.existsByUsername(username)) {
            return;
        }

        AdminUser adminUser = AdminUser.builder()
                .username(username)
                .email("admin@example.com")
                .password(passwordEncoder.encode("Admin123!"))
                .role(Role.ADMIN)
                .enabled(true)
                .build();

        adminUserRepository.save(adminUser);
    }
}