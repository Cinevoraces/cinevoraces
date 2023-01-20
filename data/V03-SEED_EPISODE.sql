BEGIN;

-- CREATE SEASONS
INSERT INTO "season" ("number","year") VALUES
(1,2020),
(2,2021),
(3,2022),
(4,2023);

-- CREATE EPISODES
INSERT INTO episode ("season_number","episode_number","publishing_date") VALUES
(1,1,'2020-03-20'),
(1,2,'2020-03-27'),
(1,3,'2020-04-03'),
(1,4,'2020-04-10'),
(1,5,'2020-04-17'),
(1,6,'2020-04-24'),
(1,7,'2020-05-16'),
(1,8,'2020-05-23'),
(1,9,'2020-05-29'),
(1,10,'2020-06-05'),
(1,11,'2020-06-12'),
(1,12,'2020-06-19'),
(1,13,'2020-06-26'),
(1,14,'2020-07-03'),
(1,15,'2020-07-10'),
(1,16,'2020-07-17'),
(1,17,'2020-07-24'),
(1,18,'2020-08-06'),
(1,19,'2020-08-07'),
(1,20,'2020-08-14'),
(1,21,'2020-08-21'),
(1,22,'2020-08-28'),
(1,23,'2020-09-09'),
(1,24,'2020-09-19'),
(1,25,'2020-09-25'),
(1,26,'2020-10-02'),
(1,27,'2020-10-09'),
(1,28,'2020-10-16'),
(1,29,'2020-10-24'),
(1,30,'2020-10-30'),
(1,31,'2020-11-08'),
(1,32,'2020-11-16'),
(1,33,'2020-11-30'),
(1,34,'2020-12-07'),
(1,35,'2020-12-15'),
(1,36,'2021-01-04'),
(1,37,'2021-01-19'),
(1,38,'2021-01-21'),
(1,39,'2021-01-28'),
(1,40,'2021-02-01'),
(1,41,'2021-02-09'),
(1,42,'2021-02-15'),
(2,1,'2021-02-21'),
(2,2,'2021-02-22'),
(2,3,'2021-03-01'),
(2,4,'2021-03-08'),
(2,5,'2021-03-15'),
(2,6,'2021-03-22'),
(2,7,'2021-03-29'),
(2,8,'2021-04-06'),
(2,9,'2021-04-13'),
(2,10,'2021-04-19'),
(2,11,'2021-04-28'),
(2,12,'2021-04-29'),
(2,13,'2021-05-03'),
(2,14,'2021-05-10'),
(2,15,'2021-05-17'),
(2,16,'2021-05-24'),
(2,17,'2021-05-31'),
(2,18,'2021-06-07'),
(2,19,'2021-06-14'),
(2,20,'2021-06-21'),
(2,21,'2021-06-29'),
(2,22,'2021-07-05'),
(2,23,'2021-07-12'),
(2,24,'2021-07-19'),
(2,25,'2021-07-26'),
(2,26,'2021-08-02'),
(2,27,'2021-08-03'),
(2,28,'2021-08-09'),
(2,29,'2021-08-16'),
(2,30,'2021-08-23'),
(2,31,'2021-08-30'),
(2,32,'2021-09-06'),
(2,33,'2021-09-13'),
(2,34,'2021-09-23'),
(2,35,'2021-09-27'),
(2,36,'2021-10-04'),
(2,37,'2021-10-11'),
(2,38,'2021-10-16'),
(2,39,'2021-10-25'),
(2,40,'2021-11-02'),
(2,41,'2021-11-08'),
(2,42,'2021-11-15'),
(2,43,'2021-11-16'),
(2,44,'2021-11-22'),
(2,45,'2021-11-29'),
(2,46,'2021-12-06'),
(2,47,'2021-12-13'),
(2,48,'2021-12-21'),
(3,1,'2022-01-02'),
(3,2,'2022-01-10'),
(3,3,'2022-01-17'),
(3,4,'2022-01-24'),
(3,5,'2022-01-30'),
(3,6,'2022-02-07'),
(3,7,'2022-02-14'),
(3,8,'2022-02-21'),
(3,9,'2022-02-28'),
(3,10,'2022-03-09'),
(3,11,'2022-03-15'),
(3,12,'2022-03-21'),
(3,13,'2022-03-29'),
(3,14,'2022-04-06'),
(3,15,'2022-04-11'),
(3,16,'2022-04-18'),
(3,17,'2022-04-25'),
(3,18,'2022-05-02'),
(3,19,'2022-05-10'),
(3,20,'2022-05-16'),
(3,21,'2022-05-23'),
(3,22,'2022-05-30'),
(3,23,'2022-06-01'),
(3,24,'2022-06-06'),
(3,25,'2022-06-13'),
(3,26,'2022-06-20'),
(3,27,'2022-06-27'),
(3,28,'2022-07-04'),
(3,29,'2022-07-11'),
(3,30,'2022-07-18'),
(3,31,'2022-07-25'),
(3,32,'2022-08-01'),
(3,33,'2022-08-08'),
(3,34,'2022-08-15'),
(3,35,'2022-08-22'),
(3,36,'2022-08-29'),
(3,37,'2022-09-05'),
(3,38,'2022-09-12'),
(3,39,'2022-09-19'),
(3,40,'2022-09-26'),
(3,41,'2022-10-03'),
(3,42,'2022-10-10'),
(3,43,'2022-10-17'),
(3,44,'2022-10-24'),
(3,45,'2022-10-31'),
(3,46,'2022-11-07'),
(3,47,'2022-11-14'),
(3,48,'2022-11-21'),
(3,49,'2022-11-28'),
(3,50,'2022-12-05'),
(3,51,'2022-12-12'),
(3,52,'2022-12-19'),
(3,53,'2022-12-26'),
(4,1,'2023-01-02'),
(4,2,'2023-01-09'),
(4,3,'2023-01-16'),
(4,4,'2023-01-23'),
(4,5,'2023-01-30'),
(4,6,'2023-02-06'),
(4,7,'2023-02-13'),
(4,8,'2023-02-20'),
(4,9,'2023-02-27'),
(4,10,'2023-03-06'),
(4,11,'2023-03-13'),
(4,12,'2023-03-20'),
(4,13,'2023-03-27'),
(4,14,'2023-04-03'),
(4,15,'2023-04-10'),
(4,16,'2023-04-17'),
(4,17,'2023-04-24'),
(4,18,'2023-05-01'),
(4,19,'2023-05-08'),
(4,20,'2023-05-15'),
(4,21,'2023-05-22'),
(4,22,'2023-05-29'),
(4,23,'2023-06-05'),
(4,24,'2023-06-12'),
(4,25,'2023-06-19'),
(4,26,'2023-06-26'),
(4,27,'2023-07-03'),
(4,28,'2023-07-10'),
(4,29,'2023-07-17'),
(4,30,'2023-07-24'),
(4,31,'2023-07-31'),
(4,32,'2023-08-07'),
(4,33,'2023-08-14'),
(4,34,'2023-08-21'),
(4,35,'2023-08-28'),
(4,36,'2023-09-04'),
(4,37,'2023-09-11'),
(4,38,'2023-09-18'),
(4,39,'2023-09-25'),
(4,40,'2023-10-02'),
(4,41,'2023-10-09'),
(4,42,'2023-10-16'),
(4,43,'2023-10-23'),
(4,44,'2023-10-30'),
(4,45,'2023-11-06'),
(4,46,'2023-11-13'),
(4,47,'2023-11-20'),
(4,48,'2023-11-27'),
(4,49,'2023-12-04'),
(4,50,'2023-12-11'),
(4,51,'2023-12-18'),
(4,52,'2023-12-25');

COMMIT;
