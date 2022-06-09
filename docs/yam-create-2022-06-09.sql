CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nickname` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL
);

CREATE TABLE `posts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `user_id` int NOT NULL,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now()),
  `recipe` varchar(10000),
  `image_title` varchar(255),
  `image_path` varchar(255)
);

CREATE TABLE `ingredients` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `ingredient` varchar(255) NOT NULL
);

CREATE TABLE `post_ingredients` (
  `id` int,
  `post_id` int,
  `ingredient_id` int
);

CREATE UNIQUE INDEX `posts_index_0` ON `posts` (`id`);

CREATE UNIQUE INDEX `ingredients_index_1` ON `ingredients` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `post_ingredients` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `post_ingredients` ADD FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`);
