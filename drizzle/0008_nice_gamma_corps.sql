CREATE TABLE `daily_challenge_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`challengeId` int NOT NULL,
	`exerciseId` int NOT NULL,
	`isCorrect` boolean NOT NULL,
	`pointsEarned` int NOT NULL,
	`attemptedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `daily_challenge_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `daily_challenges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`challengeDate` varchar(10) NOT NULL,
	`exerciseIds` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `daily_challenges_id` PRIMARY KEY(`id`)
);
