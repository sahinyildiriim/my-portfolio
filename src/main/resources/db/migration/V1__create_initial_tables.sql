CREATE TABLE projects (
                          id BIGSERIAL PRIMARY KEY,
                          title VARCHAR(150) NOT NULL,
                          slug VARCHAR(180) NOT NULL UNIQUE,
                          description TEXT NOT NULL,
                          image_url VARCHAR(500),
                          live_url VARCHAR(500),
                          github_url VARCHAR(500),
                          display_order INTEGER NOT NULL DEFAULT 0,
                          published BOOLEAN NOT NULL DEFAULT FALSE,
                          created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_technologies (
                                      project_id BIGINT NOT NULL,
                                      technology VARCHAR(100) NOT NULL,

                                      CONSTRAINT fk_project_technologies_project
                                          FOREIGN KEY (project_id)
                                              REFERENCES projects (id)
                                              ON DELETE CASCADE,

                                      CONSTRAINT uk_project_technology
                                          UNIQUE (project_id, technology)
);

CREATE TABLE blog_posts (
                            id BIGSERIAL PRIMARY KEY,
                            title VARCHAR(200) NOT NULL,
                            slug VARCHAR(220) NOT NULL UNIQUE,
                            description TEXT NOT NULL,
                            content TEXT NOT NULL,
                            image_url VARCHAR(500),
                            category VARCHAR(100) NOT NULL,
                            read_time INTEGER NOT NULL,
                            published_at TIMESTAMPTZ,
                            published BOOLEAN NOT NULL DEFAULT FALSE,
                            created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_messages (
                                  id BIGSERIAL PRIMARY KEY,
                                  name VARCHAR(120) NOT NULL,
                                  email VARCHAR(254) NOT NULL,
                                  subject VARCHAR(200) NOT NULL,
                                  message TEXT NOT NULL,
                                  is_read BOOLEAN NOT NULL DEFAULT FALSE,
                                  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_users (
                             id BIGSERIAL PRIMARY KEY,
                             username VARCHAR(80) NOT NULL UNIQUE,
                             email VARCHAR(254) NOT NULL UNIQUE,
                             password VARCHAR(255) NOT NULL,
                             role VARCHAR(30) NOT NULL,
                             enabled BOOLEAN NOT NULL DEFAULT TRUE,
                             created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                             updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_published
    ON projects (published);

CREATE INDEX idx_projects_display_order
    ON projects (display_order);

CREATE INDEX idx_blog_posts_published
    ON blog_posts (published);

CREATE INDEX idx_blog_posts_published_at
    ON blog_posts (published_at DESC);

CREATE INDEX idx_contact_messages_is_read
    ON contact_messages (is_read);

CREATE INDEX idx_contact_messages_created_at
    ON contact_messages (created_at DESC);