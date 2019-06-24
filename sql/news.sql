-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 24. 06 2019 kl. 11:21:01
-- Serverversion: 10.1.30-MariaDB
-- PHP-version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `news`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `article`
--

CREATE TABLE `article` (
  `id` tinyint(4) NOT NULL,
  `title` varchar(15) NOT NULL,
  `image` varchar(126) NOT NULL,
  `description` text NOT NULL,
  `fk_menu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `article`
--

INSERT INTO `article` (`id`, `title`, `image`, `description`, `fk_menu`) VALUES
(64, 'hej', '1560848289674_iphone-410324_640.jpg', 'heje    \n        ', 17),
(65, 'test2', '1560854508851mobile-phone-1917737_640.jpg', 'test2          \n        ', 17);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `menu`
--

CREATE TABLE `menu` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(15) NOT NULL,
  `postion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `menu`
--

INSERT INTO `menu` (`id`, `name`, `postion`) VALUES
(17, 'test2', 2),
(18, 'test6', 6);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `roles`
--

CREATE TABLE `roles` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(15) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `roles`
--

INSERT INTO `roles` (`id`, `name`, `level`) VALUES
(6, 'super admin', 110),
(7, 'admin', 100),
(8, 'moderator', 75),
(9, 'user', 25),
(10, 'guest', 0);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE `users` (
  `id` tinyint(4) NOT NULL,
  `username` varchar(100) NOT NULL,
  `passphrase` varchar(76) NOT NULL,
  `roles_id` tinyint(4) NOT NULL,
  `photos` varchar(126) DEFAULT 'default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`id`, `username`, `passphrase`, `roles_id`, `photos`) VALUES
(30, 'admin', '$2a$10$jBFhy.A7aN5oZfOgaokXi.KBT8QPqxfCnVpJvepMB3sWz.XFQfD3.', 6, '1561361843260_binary2-1327493_640.jpg'),
(32, 'test', '$2a$10$Qxx/OzNxuj.36ls8Sg1e2.ikxaP5zffBWqBQhwYTPmnlRkHlQ6xga', 7, '1561366633901_mobile-phone-1917737_640.jpg'),
(34, 'test3', '$2a$10$E5eLHndyatV6eWpHDXyQJuxAbbw.yCj496ipw6gsNM.mZZu0KAGfW', 8, 'default.jpg');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `article`
--
ALTER TABLE `article`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- Tilføj AUTO_INCREMENT i tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
