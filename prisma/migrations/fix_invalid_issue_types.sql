-- Update any issues with invalid type to use 'OTHER'
UPDATE Issue SET type = 'OTHER' WHERE type = 'IMPROVEMENT'; 