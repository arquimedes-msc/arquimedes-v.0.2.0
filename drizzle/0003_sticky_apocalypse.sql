CREATE TABLE `userPointsLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`action` enum('daily_login','video_watched','exercise_completed','podcast_listened','task_completed') NOT NULL,
	`points` int NOT NULL,
	`relatedId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userPointsLog_id` PRIMARY KEY(`id`)
);
