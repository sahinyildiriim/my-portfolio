package com.muhammetsahin.portfolio.security;

import com.muhammetsahin.portfolio.auth.entity.AdminUser;
import com.muhammetsahin.portfolio.auth.repository.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminUserRepository adminUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        AdminUser adminUser = adminUserRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Kullanıcı adı veya parola hatalı."
                        )
                );

        return User.builder()
                .username(adminUser.getUsername())
                .password(adminUser.getPassword())
                .disabled(!Boolean.TRUE.equals(adminUser.getEnabled()))
                .authorities(List.of(
                        new SimpleGrantedAuthority(
                                "ROLE_" + adminUser.getRole().name()
                        )
                ))
                .build();
    }
}