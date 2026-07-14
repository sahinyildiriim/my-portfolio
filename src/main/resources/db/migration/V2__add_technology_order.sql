ALTER TABLE project_technologies
    ADD COLUMN technology_order INTEGER;

UPDATE project_technologies
SET technology_order = 0
WHERE technology_order IS NULL;

ALTER TABLE project_technologies
    ALTER COLUMN technology_order SET NOT NULL;