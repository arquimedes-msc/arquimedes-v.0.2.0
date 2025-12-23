ALTER TABLE `users` ADD `avatar` text;--> statement-breakpoint
ALTER TABLE `users` ADD `language` varchar(10) DEFAULT 'pt' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `themeColor` varchar(20) DEFAULT 'blue' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `darkMode` boolean DEFAULT false NOT NULL;