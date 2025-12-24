CREATE TABLE `exercise_completions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`exerciseId` int NOT NULL,
	`isCorrect` boolean NOT NULL,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exercise_completions_id` PRIMARY KEY(`id`)
);
