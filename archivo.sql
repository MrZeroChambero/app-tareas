-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2024 a las 12:40:26
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4
CREATE DATABASE tareas;

-- Seleccionar la base de datos 'panes' para usar
USE tareas;

SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tareas`
--
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `dias_materia`
--
CREATE TABLE
  `dias_materia` (
    `id` int (11) NOT NULL,
    `Dia` tinyint (1) NOT NULL,
    `Hora_Inicio` time NOT NULL,
    `Hora_Final` time NOT NULL,
    `Materia_Asociada` int (11) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dias_materia`
--
INSERT INTO
  `dias_materia` (
    `id`,
    `Dia`,
    `Hora_Inicio`,
    `Hora_Final`,
    `Materia_Asociada`
  )
VALUES
  (1, 0, '02:42:00', '04:42:00', 1),
  (43, 0, '04:34:00', '05:34:00', 7),
  (44, 1, '05:34:00', '06:34:00', 7),
  (45, 2, '04:34:00', '05:35:00', 7),
  (46, 3, '01:35:00', '02:00:00', 7),
  (52, 6, '02:50:00', '03:50:00', 1),
  (55, 1, '02:45:00', '03:45:00', 1),
  (56, 2, '01:46:00', '03:46:00', 1),
  (57, 3, '02:47:00', '03:47:00', 1),
  (58, 4, '03:48:00', '07:48:00', 1),
  (59, 5, '03:49:00', '06:49:00', 1),
  (65, 2, '08:16:00', '10:19:00', 13),
  (66, 4, '08:15:00', '10:14:00', 13);

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `materias`
--
CREATE TABLE
  `materias` (
    `id` int (11) NOT NULL,
    `Nombre` varchar(80) NOT NULL,
    `Dia_incio` date NOT NULL,
    `Dia_Final` date NOT NULL,
    `ID_Ramdon` varchar(80) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materias`
--
INSERT INTO
  `materias` (
    `id`,
    `Nombre`,
    `Dia_incio`,
    `Dia_Final`,
    `ID_Ramdon`
  )
VALUES
  (
    1,
    'Deportes ',
    '2024-04-30',
    '2034-05-11',
    '4c2edde3-83e7-4033-bcec-26a6efd8e2df'
  ),
  (
    7,
    'lolsito',
    '2011-02-07',
    '2024-05-31',
    '74accf78-d6e0-4903-9a1b-be387d1c0b18'
  ),
  (
    13,
    'jugar maincrafff',
    '2024-05-06',
    '2024-05-23',
    '1cd744f9-0de8-4c44-8b53-0e737b70c692'
  );

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `tareas`
--
CREATE TABLE
  `tareas` (
    `id` int (11) NOT NULL,
    `Tarea` varchar(80) NOT NULL,
    `Fecha` date NOT NULL,
    `Hora` time NOT NULL,
    `Estado` tinyint (1) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tareas`
--
INSERT INTO
  `tareas` (`id`, `Tarea`, `Fecha`, `Hora`, `Estado`)
VALUES
  (3, 'jhhgfgf', '2024-05-08', '23:38:00', 0),
  (5, 'bañasme mentira', '2024-04-24', '03:25:00', 0);

--
-- Índices para tablas volcadas
--
--
-- Indices de la tabla `dias_materia`
--
ALTER TABLE `dias_materia` ADD PRIMARY KEY (`id`),
ADD KEY `Materia_Asociada` (`Materia_Asociada`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias` ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas` ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--
--
-- AUTO_INCREMENT de la tabla `dias_materia`
--
ALTER TABLE `dias_materia` MODIFY `id` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 69;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias` MODIFY `id` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 15;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas` MODIFY `id` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 6;

--
-- Restricciones para tablas volcadas
--
--
-- Filtros para la tabla `dias_materia`
--
ALTER TABLE `dias_materia` ADD CONSTRAINT `dias_materia_ibfk_1` FOREIGN KEY (`Materia_Asociada`) REFERENCES `materias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;