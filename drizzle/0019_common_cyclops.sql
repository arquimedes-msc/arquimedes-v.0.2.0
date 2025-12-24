ALTER TABLE `exercise_completions` MODIFY COLUMN `exerciseId` int;--> statement-breakpoint
ALTER TABLE `exercise_completions` ADD `uniqueId` varchar(255);