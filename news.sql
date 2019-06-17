-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 25. 01 2019 kl. 17:50:06
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
  `id` int(11) NOT NULL,
  `title` varchar(15) NOT NULL,
  `image` varchar(126) NOT NULL,
  `description` text NOT NULL,
  `fk_menu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `article`
--

INSERT INTO `article` (`id`, `title`, `image`, `description`, `fk_menu`) VALUES
(42, 'hej', '1548405468179adult-beach-beard-736716.jpg', ' hej      \r\n        ', 10),
(43, 'hej', '1548405824284girl-919048_640.jpg', '             jijsiwij            \r\n         \r\n        ', 11),
(44, 'jeg', '1548410870690girl-919048_640.jpg', '              jeg           \n         \n        ', 11),
(45, 'andreas', '1548418993308girl-919048_640.jpg', '             \r\n andreas       ', 11),
(46, 'hej', '1548419235088girl-919048_640.jpg', '  mmkeke', 10),
(47, 'hej', '1548419297846girl-919048_640.jpg', '    jjdii         \r\n        ', 10),
(48, 'hej', '1548419343552girl-919048_640.jpg', ' nsj            \r\n        ', 10),
(49, 'hej', '1548419414540beautiful-1274056_640.jpg', '  jijiwjw           \r\n        ', 10),
(50, 'hej', '1548419442786beautiful-1274056_640.jpg', '  jijiwjw           \r\n        ', 10);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `postion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `menu`
--

INSERT INTO `menu` (`id`, `name`, `postion`) VALUES
(10, 'hej', 1),
(11, 'articel', 2);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `passphrase` varchar(78) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`id`, `username`, `passphrase`) VALUES
(1, 'admin', '1234');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Tilføj AUTO_INCREMENT i tabel `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
