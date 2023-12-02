ALTER TABLE `ea_users` 
ADD `sex` VARCHAR(255) NULL DEFAULT NULL AFTER `notes`,
ADD `birth_date` VARCHAR(255) NULL DEFAULT NULL AFTER `sex`,
ADD `passport_number` VARCHAR(255) NULL DEFAULT NULL AFTER `birth_date`,
ADD `passport_expiry_date` VARCHAR(255) NULL DEFAULT NULL AFTER `passport_number`,
ADD `applicant_type` VARCHAR(255) NULL DEFAULT NULL AFTER `passport_expiry_date`,
ADD `client_id_reference_number` VARCHAR(255) NULL DEFAULT NULL AFTER `applicant_type`,
ADD `visa_category` VARCHAR(255) NULL DEFAULT NULL AFTER `client_id_reference_number`,
ADD `visa_type` VARCHAR(255) NULL DEFAULT NULL AFTER `visa_category`;

ALTER TABLE `ea_appointments`
ADD `proof_of_payment` LONGTEXT NULL DEFAULT NULL AFTER `notes`,
ADD `proof_of_identity` LONGTEXT NULL DEFAULT NULL AFTER `proof_of_payment`;

ALTER TABLE `ea_appointments`
ADD `created_by` VARCHAR(255) NULL DEFAULT NULL AFTER `notes`;