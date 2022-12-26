-- Deploy cinevoraces:version_2 to pg

BEGIN;

-- Create all seasons
INSERT INTO "season" ("number","year") VALUES
(1,2020),(2,2021),(3,2022),(4, 2023);
-- Create all episodes
INSERT INTO episode ("season_number","episode_number","publishing_date","is_booked") VALUES
(1,1,'2020-03-20', true),
(1,2,'2020-03-27', true),
(1,3,'2020-04-03', true),
(1,4,'2020-04-10', true),
(1,5,'2020-04-17', true),
(1,6,'2020-04-24', true),
(1,7,'2020-05-16', true),
(1,8,'2020-05-23', true),
(1,9,'2020-05-29', true),
(1,10,'2020-06-05', true),
(1,11,'2020-06-12', true),
(1,12,'2020-06-19', true),
(1,13,'2020-06-26', true),
(1,14,'2020-07-03', true),
(1,15,'2020-07-10', true),
(1,16,'2020-07-17', true),
(1,17,'2020-07-24', true),
(1,18,'2020-08-06', true),
(1,19,'2020-08-07', true),
(1,20,'2020-08-14', true),
(1,21,'2020-08-21', true),
(1,22,'2020-08-28', true),
(1,23,'2020-09-09', true),
(1,24,'2020-09-19', true),
(1,25,'2020-09-25', true),
(1,26,'2020-10-02', true),
(1,27,'2020-10-09', true),
(1,28,'2020-10-16', true),
(1,29,'2020-10-24', true),
(1,30,'2020-10-30', true),
(1,31,'2020-11-08', true),
(1,32,'2020-11-16', true),
(1,33,'2020-11-30', true),
(1,34,'2020-12-07', true),
(1,35,'2020-12-15', true),
(1,36,'2021-01-04', true),
(1,37,'2021-01-19', true),
(1,38,'2021-01-21', true),
(1,39,'2021-01-28', true),
(1,40,'2021-02-01', true),
(1,41,'2021-02-09', true),
(1,42,'2021-02-15', true),
-- TODO - SEASON 2
(3,1,'2022-01-02',true),
(3,2,'2022-01-10',true),
(3,3,'2022-01-17', true),
(3,4,'2022-01-24',true),
(3,5,'2022-01-30',true),
(3,6,'2022-02-07',true),
(3,7,'2022-02-14',true),
(3,8,'2022-02-21',true),
(3,9,'2022-02-28',true),
(3,10,'2022-03-09',true),
(3,11,'2022-03-15',true),
(3,12,'2022-03-21',true),
(3,13,'2022-03-29',true),
(3,14,'2022-04-06',true),
(3,15,'2022-04-11',true),
(3,16,'2022-04-18',true),
(3,17,'2022-04-25',true),
(3,18,'2022-05-02',true),
(3,19,'2022-05-10',true),
(3,20,'2022-05-16',true),
(3,21,'2022-05-23',true),
(3,22,'2022-05-30',true),
(3,23,'2022-06-01',true),
(3,24,'2022-06-06',false),
(3,25,'2022-06-13',false),
(3,26,'2022-06-20',false),
(3,27,'2022-06-27',false),
(3,28,'2022-07-04',false),
(3,29,'2022-07-11',false),
(3,30,'2022-07-18',false),
(3,31,'2022-07-25',false),
(3,32,'2022-08-01',false),
(3,33,'2022-08-08',false),
(3,34,'2022-08-15',false),
(3,35,'2022-08-22',false),
(3,36,'2022-08-29',false),
(3,37,'2022-09-05',false),
(3,38,'2022-09-12',false),
(3,39,'2022-09-19',false),
(3,40,'2022-09-26',false),
(3,41,'2022-10-03',false),
(3,42,'2022-10-10',false),
(3,43,'2022-10-17',false),
(3,44,'2022-10-24',false),
(3,45,'2022-10-31',false),
(3,46,'2022-11-07',false),
(3,47,'2022-11-14',false),
(3,48,'2022-11-21',false),
(3,49,'2022-11-28',false),
(3,50,'2022-12-05',false),
(3,51,'2022-12-12',false),
(3,52,'2022-12-19',false),
(3,53,'2022-12-26',false),
(4,1,'2023-01-02',false),
(4,2,'2023-01-09',false),
(4,3,'2023-01-16',false),
(4,4,'2023-01-23',false),
(4,5,'2023-01-30',false),
(4,6,'2023-02-06',false),
(4,7,'2023-02-13',false),
(4,8,'2023-02-20',false),
(4,9,'2023-02-27',false),
(4,10,'2023-03-06',false),
(4,11,'2023-03-13',false),
(4,12,'2023-03-20',false),
(4,13,'2023-03-27',false),
(4,14,'2023-04-03',false),
(4,15,'2023-04-10',false),
(4,16,'2023-04-17',false),
(4,17,'2023-04-24',false),
(4,18,'2023-05-01',false),
(4,19,'2023-05-08',false),
(4,20,'2023-05-15',false),
(4,21,'2023-05-22',false),
(4,22,'2023-05-29',false),
(4,23,'2023-06-05',false),
(4,24,'2023-06-12',false),
(4,25,'2023-06-19',false),
(4,26,'2023-06-26',false),
(4,27,'2023-07-03',false),
(4,28,'2023-07-10',false),
(4,29,'2023-07-17',false),
(4,30,'2023-07-24',false),
(4,31,'2023-07-31',false),
(4,32,'2023-08-07',false),
(4,33,'2023-08-14',false),
(4,34,'2023-08-21',false),
(4,35,'2023-08-28',false),
(4,36,'2023-09-04',false),
(4,37,'2023-09-11',false),
(4,38,'2023-09-18',false),
(4,39,'2023-09-25',false),
(4,40,'2023-10-02',false),
(4,41,'2023-10-09',false),
(4,42,'2023-10-16',false),
(4,43,'2023-10-23',false),
(4,44,'2023-10-30',false),
(4,45,'2023-11-06',false),
(4,46,'2023-11-13',false),
(4,47,'2023-11-20',false),
(4,48,'2023-11-27',false),
(4,49,'2023-12-04',false),
(4,50,'2023-12-11',false),
(4,51,'2023-12-18',false),
(4,52,'2023-12-25',false);

-- Ajouts des users
INSERT INTO "user" ("pseudo","mail","password") VALUES
('Thierry-poisson-dargent', 'emailbidon1@jambon.com' ,'$2b$10$P0oe5y4BIaF9dRD0YtImg.CDISjzNLbtDuGZamYVWysY9nA3KeICS'),
('admin', 'emailbidon2@jambon.com' ,'$2b$10$mYoFJ5/s64gtIvaL/f2L9e4BNJNsCMbxb.wAsB645qsuvB4iq1KUe'),
('bébou', 'emailbidon3@jambon.com' ,'$2b$10$WNJfkzActUsWgx7Ybc55Zu821W8QyOLE3Tr6DiybSBkMLxt3IKQly'),
('Maurice84', 'emailbidon4@jambon.com' ,'$2b$10$u55JJzgJLoJHBuRO5muyWemPmrqMdzZ1jD6pp1Q8WtB6jJylK6MUu'),
('Michelline Fallafel', 'emailbidon5@jambon.com' ,'$2b$10$p7gFUkQYvnFwBBF3VliKn.vNyPKaOLpq0xakXoGifr8/dfcMbO07q'),
('Canis', 'emailbidon6@jambon.com' ,'$2b$10$LI2dphFtjnaappM4U4zROuAi5ehDmowfaLSmIQV4..sl8QND1/Rce'),
('Luigi', 'emailbidon7@jambon.com' ,'$2b$10$xa/ls/7Tb8XrbKm/eytWQOEOB5QAOR7jCRNz3kbrbiwhsfb7MhwvC'),
('Altem', 'emailbidon8@jambon.com' ,'$2b$10$aEs5te4MLcbotnG.ZNvj.u0Id5IPU8RM8p3rNHP3gbS9u/nXU9gsS'),
('Bolo', 'emailbidon9@jambon.com' ,'$2b$10$tYkMQMb2jdF/cJdSXVqhuugB7faFxp/L/jYu71DlKw1OEWt4w0FdW'),
('Neo', 'emailbidon10@jambon.com' ,'$2b$10$nUGRE.fqHibmb2.0zA9PpOdLCQ3f1HAtEmHc63.IroP3VH2cI7UBq'),
('Sebastien90', 'emailbidon11@jambon.com' ,'$2b$10$/I0m2xNhhCQFMN7Ul9c4YuUVZ/BGjGhTa0NfzZ5n.e671NtKgEomG'),
('ElmerFoodBeat', 'emailbidon12@jambon.com' ,'$2b$10$HhJMCQVgr.n7yjG4u3/N3uqwDbVtw3mW0kBlA4dGR3Uh.ncXNokWC'),
('TB', 'emailbidon13@jambon.com' ,'$2b$10$Wov6Y.AKn1zZ9ZUTzYLWbOvoEAH0Z/SPtR5HbQYx3KpGVJpZG6tpm'),
('Meduz', 'emailbidon14@jambon.com' ,'$2b$10$JcWEO3ToyEoh6tpUxA0mlOco3N9WmteMnJkLsdMx8HhFhR3qPHC22'),
('Body Grenouille', 'emailbidon15@jambon.com' ,'$2b$10$sAuFgfOhfvp1casL.oUNieq6DS0d0WmS8FvtXB3tDwny6muN9esfq'),
('Mao', 'emailbidon16@jambon.com' ,'$2b$10$x0BiY5t2LZkRwqnR6M.4XeB9p7EGAiokqASHnu5eg.I3370Lv7TUO'),
('Billevesée', 'emailbidon17@jambon.com' ,'$2b$10$epbXTgzp.SBVBK8VQjeR/unvrlMceuP3wsyqW20V4j4yTabz7FGwS'),
('Gustave', 'emailbidon18@jambon.com' ,'$2b$10$zkSNbkrjL.VEfvH6cnQ4WOEJD9mXO7f9EX9Xim5SR2WQ5go3gk8gq'),
('Nihil', 'emailbidon19@jambon.com' ,'$2b$10$EhgY5xTUbmIgLrO.TbJW.Oj0LfWGlRETW/S6d6cXuCkV8QwdvOe8G'),
('Citron', 'emailbidon20@jambon.com' ,'$2b$10$eylXx3O6jePoLk50wISQK.ne0xyy/h/L10tYPz5iRP234xckMDk/G'),
('sacha_bourgpal', 'emailbidon21@jambon.com' ,'$2b$10$X7pUWHCypaRoGZwjc0YZG.UGa61apkorXc.axgUrAK3WPmJvqlq0u'),
('jesuisdesole', 'emailbidon22@jambon.com' ,'$2b$10$KO5vhN/7Oq/jeitnmuArOehmf4CvxPAG6JPuuATNTsNFwQVzSBp9e'),
('Garfield-tt', 'emailbidon23@jambon.com' ,'$2b$10$pEq3mWYxyBOLxvrN4ipRdeKKE1suEgf9qe14pesezOzmj78hmwaaC'),
('YVETTE22', 'emailbidon24@jambon.com' ,'$2b$10$ZY9wEUlUnyynz8OrtjkzBO/bNOfJshSf.vXT1SI2AwB0zkGae26t.'),
('kevin_gomez', 'emailbidon25@jambon.com' ,'$2b$10$OL1uTPUEgGwTQGnmUZgaJeVFebnkOJfYAq8VnZq5epfyWPwxQs7Z6'),
('morbolo', 'emailbidon26@jambon.com' ,'$2b$10$kWGxO.gV1RObHQ0b43C8sO9qigaeEu7g8HzjmnqUOf5TwjDuq4Rvq'),
('desole', 'emailbidon27@jambon.com' ,'$2b$10$eLl6SAS9Yuk9sEFWfl8VgO05urMcyqXOJoi9potjFqMBy60mI6tzO'),
('jaimelejambon', 'emailbidon28@jambon.com' ,'$2b$10$xO3Sw7JobqpNUfkVtfizd..CsFUl5o1VaL2jfG7bVrsC/xZp5qkDu'),
('bennyOuiOui', 'emailbidon29@jambon.com' ,'$2b$10$cPHbtrXBpoRkIcc1zMVofumN4IYIcOpnYqR3J3nLEzAEtVm01o4Uu'),
('maeva3215', 'emailbidon30@jambon.com' ,'$2b$10$xsrOrJHFKCQEzhBGJNZGzOMOyOUDF/65i27/VaEKBCBrO7jAmgIom'),
('zobygn', 'emailbidon31@jambon.com' ,'$2b$10$LqUMiJgtgU.9zZRiP7fRM.wJGHDHKkDfxqQt0K3AjxnJtx3LYzFju'),
('olivier_69', 'emailbidon32@jambon.com' ,'$2b$10$f1jG.YJSSTGylHxb9GQHGeDXTZTdPR0yKZewb4TrkvK6uMBm1hA/i');

-- Ajout des photos de profil
UPDATE "user" SET avatar_url = 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/Calys.jpg' WHERE pseudo='zobygn';
UPDATE "user" SET avatar_url = 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/Checco.jpg' WHERE pseudo='Bolo';
UPDATE "user" SET avatar_url = 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/Klavor.jpg' WHERE pseudo='Garfield-tt';
UPDATE "user" SET avatar_url = 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/Lukino.jpg' WHERE pseudo='Luigi';
UPDATE "user" SET avatar_url = 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/Mat-Mat.jpg' WHERE pseudo='Thierry-poisson-dargent';
UPDATE "user" SET avatar_url = 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/Morbo.jpg' WHERE pseudo='morbolo';
UPDATE "user" SET avatar_url = 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/Sao.jpg' WHERE pseudo='Mao';
UPDATE "user" SET avatar_url = 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/Yves%20Signal' WHERE pseudo='admin';
UPDATE "user" SET avatar_url = 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/olive%20qui%20tue.jpg' WHERE pseudo='olivier_69';

-- Passage de Yves Signal en admin
UPDATE "user"
SET role = 'admin'
WHERE pseudo = 'admin';

-- MOVIES SEEDING
-- SEASON 1
SELECT new_movie(
  'Les Chaussons rouges',
  'The Red Shoes',
  'https://image.tmdb.org/t/p/original/eByAzqYc1ncYkaoxsYupkvMOL8H.jpg',
  array['Emeric Pressburger','Michael Powell'],
  '1948-09-06',
  '133',
  array['Moira Shearer','Adolf Wohlbrück','Marius Goring','Léonide Massine','Robert Helpmann'],
  'Je propose de regarder les chaussons rouges. Film de Powell et Pressburger (D''ailleurs vous pouvez vous jeter sur leurs autres films, Narcisse Noir, Le voyeur, ... Y''a rien à jeter). Pourquoi ? Parce qu''il est superbe. Que la scène du ballet, je ne m''en suis jamais vraiment remis. Voilà... J''espère que ça vous plaira autant qu''à moi !',
  array['Drame','Romance'],
  array['Pусский','English','Français'],
  array['United Kingdom'],
  1,
  1
);
SELECT new_movie(
  'Stalker',
  'Сталкер',
  'https://image.tmdb.org/t/p/original/91pnITUEwt1GfYy55zA2AZSTSVb.jpg',
  array['Andrei Tarkovsky'],
  '1979-05-25',
  '163',
  array['Aleksandr Kaydanovskiy','Anatoliy Solonitsyn','Nikolay Grinko','Alisa Freyndlikh','Natasha Abramova'],
  'Comment embrayer derrière Powell et Pressburger ? Peut-être en invitant un autre réalisateur prestigieux, russe de surcroît. Venez déambuler avec nous dans la zone, cette semaine je vous propose de (re)voir le futur post-apocalyptique façon Andreï Tarkovski.',
  array['Science-Fiction','Drame'],
  array['Pусский'],
  array['Soviet Union'],
  2,
  2
);
SELECT new_movie(
  'The King''s Choice',
  'Kongens nei',
  'https://image.tmdb.org/t/p/original/daKZmVgLlDwuO9sSRwevvh8alaS.jpg',
  array['Erik Poppe'],
  '2016-09-29',
  '135',
  array['Jesper Christensen','Anders Baasmo Christiansen','Karl Markovics','Tuva Novotny','Arthur Hakalahti'],
  'J''ai décidé de vous proposer un film qui me paraît intéressant et un minimum original (et d''une qualité honorable dans sa réalisation / acteurs) tout en explorant un fait essentiel de l''Histoire norvégienne (et indirectement de la WWII) avec le film : Kongens nei (Erik Poppe - 2016). Ultimatum en français. Je conseille fortement de le visionner en VO sous-titrée en français (ou autre), car le film est centré notamment sur le personnage du Roi Haakon VII d''origine danoise (élément essentiel pour comprendre certains aspects du propos historique) et l''acteur Jesper Christensen fait un très bon boulot pour parler justement le norvégien avec un certain accent danois. Je ne veux pas détailler davantage pour laisser la découverte, en sachant que je proposerais à l''issus de la semaine de visionnage une petite analyse historique pour aller plus loin et mieux appréhender les faits explorés par le film.',
  array['Guerre','Action','Drame'],
  array['Dansk','Norsk','svenska','Deutsch'],
  array['Norway'],
  3,
  3
);
SELECT new_movie(
  'New World',
  '신세계',
  'https://image.tmdb.org/t/p/original/1nLHvksC2VWQZJfXtoCb2ei16FT.jpg',
  array['Park Hoon-jung'],
  '2013-02-21',
  '134',
  array['Lee Jung-jae','Choi Min-sik','Hwang Jung-min','Park Sung-woong','Song Ji-hyo'],
  'Je vous propose de nous intéresser au cinéma asiatique, et plus spécifiquement Coréen. Afin de ne pas proposer un film ultra-culte que tout le monde a vu, et en même temps de vous faire découvrir un film qui est selon moi injustement trop peu connu, probablement dissimulé par ses camarades un peu trop voyants, je vous propose : New World de Park Hoon-Jung. C''est un film dont le fil conducteur a déjà été vu maintes fois, citons par exemple Les Infiltrés ; mais n''a-t-il pas été vu dans un tas de bons films ? Citons, par exemple... Les Infiltrés ? Ce qui m''a poussé à vous proposer ce film, c''est qu''il est assez méconnu et pourtant d''excellente facture : ce long-métrage est incroyable sur le plan technique. Il y a des scènes vraiment imposantes, qui ont probablement été extrêmement complexes à tourner, et une en particulier est absolument incroyable, vous la reconnaîtrez certainement durant votre visionnage. La musique est incroyable, les acteurs sont convaincants, la réalisation est au top, bref, j''espère que vous passerez un bon moment !',
  array['Thriller','Crime','Drame'],
  array['한국어/조선말'],
  array['South Korea'],
  4,
  4
);
SELECT new_movie(
  'Buffalo ''66',
  'Buffalo ''66',
  'https://image.tmdb.org/t/p/original/eAgrKrAr8lMqc1Ujcagm7h881ZP.jpg',
  array['Vincent Gallo'],
  '1998-01-20',
  '110',
  array['Vincent Gallo','Christina Ricci','Ben Gazzara','Anjelica Huston','Rosanna Arquette'],
  'Alors je propose donc pour cette semaine, le film d''un grand modeste, Vincent Gallo, avec une Christina Ricci délicieuse : Buffalo 66. J''ai vu ça à sa sortie, j''avais pas mal aimé, passe-t-il l''épreuve du temps ? A voir !',
  array['Drame','Romance','Comédie'],
  array['English'],
  array['United States of America','Canada'],
  5,
  5
);
SELECT new_movie(
  'La Peau douce',
  'La Peau douce',
  'https://image.tmdb.org/t/p/original/9bHHaK5ehIcEWvQc24WgHQYtMeR.jpg',
  array['François Truffaut'],
  '1964-04-20',
  '119',
  array['Françoise Dorléac','Jean Desailly','Nelly Benedetti','Daniel Ceccaldi','Laurence Badie'],
  'Pour fêter l''arrivée du grand François Truffaut sur Netflix, je vous propose de découvrir un de ses films, pas forcément le plus connu, mais en tout cas un film très apprécié par de nombreux amateurs, un film sur l''amour, le couple : un film qui s''appelle La peau douce.  Comme précisé, le film est disponible sur Netflix pour les français. Si des belges sont dans la salle, le film est disponible sur UniversCine.be. Bon visionnage et cocorico !',
  array['Drame','Romance'],
  array['Français','English','Português'],
  array['France'],
  6,
  6
);
SELECT new_movie(
  'Souvenirs de Marnie',
  '思い出のマーニー',
  'https://image.tmdb.org/t/p/original/cc1UKEQCw7BJA7uWnZbd2tfqM4.jpg',
  array['Hiromasa Yonebayashi'],
  '2014-07-19',
  '104',
  array['Sara Takatsuki','Kasumi Arimura','Nanako Matsushima','Susumu Terajima','Toshie Negishi'],
  'Bonsoir chers canarades ! Aujourd’hui, pour fêter l’arrivée des films du studio Ghibli sur Netflix, je vous propose un des films, pas forcément des plus connus mais néanmoins de grande qualité du studio : j’ai nommé Souvenirs de Marnie, sorti en 2015 dans notre contrée, qui n’a malheureusement pas eu un grand succès en France à sa sortie, la faute probablement à l’absence de grand nom tel que Miyazaki ou Takahata sur l’affiche. Mais sous-estimer le film pour cette raison serait une grande erreur, et j’espère que vous passerez un bon moment devant !',
  array['Animation','Drame'],
  array['日本語'],
  array['Japan'],
  7,
  4
);
SELECT new_movie(
  'Suspiria',
  'Suspiria',
  'https://image.tmdb.org/t/p/original/olexm07jHC62YdPXh83i6duYa17.jpg',
  array['Dario Argento'],
  '1977-02-01',
  '101',
  array['Jessica Harper','Stefania Casini','Flavio Bucci','Miguel Bosé','Barbara Magnolfi'],
  'Suspiria de Dario Argento, un film d''horreur fantastique qui marque la tentative du bon Dario de s''extraire du giallo, ou du moins de l''emmener sur un terrain très original. C''est sorti en 1977 et j''ai eu l''immense plaisir de le découvrir en salle dans sa version restaurée il y a 2 ans.',
  array['Horreur'],
  array['English','Italiano','Latin','Deutsch'],
  array['Italy'],
  8,
  2
);
SELECT new_movie(
  'Ne coupez pas !',
  'カメラを止めるな！',
  'https://image.tmdb.org/t/p/original/F4Q51FOzRygYCw9fKRVyzvqatn.jpg',
  array['Shinichiro Ueda'],
  '2017-11-04',
  '96',
  array['Takayuki Hamatsu','Yuzuki Akiyama','Kazuaki Nagaya','Harumi Shuhama','Mao'],
  'Pour rester dans le thème de l''horreur, je vous propose cette petite production japonaise appelée: One Cut of the Dead (Ne Coupez Pas en français). Je vous conseille grandement de ne pas lire de résumé quel qu''y soit, ça gâcherait le plaisir de mon point de vue (par conséquent je ne donne pas plus détail sur le plot du film ici).',
  array['Comédie','Horreur'],
  array['日本語'],
  array['Japan'],
  9,
  7
);
SELECT new_movie(
  'La Ruée vers l''or',
  'The Gold Rush',
  'https://image.tmdb.org/t/p/original/fT3OU1AjdTxiJmKvfCnzBBAQivp.jpg',
  array['Charlie Chaplin'],
  '1925-07-12',
  '96',
  array['Charlie Chaplin','Georgia Hale','Mack Swain','Tom Murray','Henry Bergman'],
  'Le film de la semaine est............. La ruée vers l''or de Charlie Chaplin ! Un film assez court à caler dans vos planning et surtout le dernier film majeur de sa filmo que je n''ai jamais vu (anomalie assez folle étant donné qu''il fait partie de mes réalisateur phares). Un choix assez classique donc mais pour une première proposition je joue la sécurité ! Hâte d''avoir vos retours, sachant qu''il est fort possible que beaucoup ait déjà eu l''occasion de le voir.',
  array['Aventure','Comédie','Drame'],
  array['No Language'],
  array['United States of America'],
  10,
  8
);
SELECT new_movie(
  'Dark City',
  'Dark City',
  'https://image.tmdb.org/t/p/original/ep2lq8hSsf1nCpwPAAd5Ujb76kK.jpg',
  array['Alex Proyas'],
  '1998-02-27',
  '95',
  array['Rufus Sewell','William Hurt','Kiefer Sutherland','Jennifer Connelly','Richard O''Brien'],
  'Saurez-vous retrouver les décors qui ont été utilisé pour Matrix par la suite ? Saurez-vous retrouvez des scènes qui ont été tournés de la même manière dans Requiem for a Dream ? Saurez-vous écrire Sauriez-vous juste ?',
  array['Mystère','Science-Fiction'],
  array['English'],
  array['Australia','United States of America'],
  11,
  9
);
SELECT new_movie(
  'Incendies',
  'Incendies',
  'https://image.tmdb.org/t/p/original/sOuRauhB0f7bcHlBU0OJwi4JoC2.jpg',
  array['Denis Villeneuve'],
  '2010-09-04',
  '123',
  array['Lubna Azabal','Mélissa Désormeaux-Poulin','Maxim Gaudette','Rémy Girard','Allen Altman'],
  'Le film de la semaine sera donc Incendies de Denis Villeneuve. Il nous plonge dans un drame profond qui mènera deux jumeaux sur les traces de leur propre histoire.',
  array['Drame','Guerre','Mystère'],
  array['Français','العربية','English'],
  array['Canada','France'],
  12,
  10
);
SELECT new_movie(
  'Godzilla: Resurgence',
  'シン・ゴジラ',
  'https://image.tmdb.org/t/p/original/qrjxAKzxsnO9qGleVx3EqSWGmRe.jpg',
  array['Hideaki Anno'],
  '2016-07-29',
  '120',
  array['Hiroki Hasegawa','Yutaka Takenouchi','Satomi Ishihara','Kengo Kora','Satoru Matsuo'],
  'Et le film de la semaine est...シン・ゴジラ ou Shin Godzilla pour nous occidentaux. Sorti en 2016 et 29ème entrée de la série de Kaijū Eiga, reboot donc visonnable sans avoir vu les films précédents ,dirigé par Hideaki Anno et Shinji Higuchi(Evangelion et Shin Evangelion c''était eux). Shirō Sagisu à la musique(Evangelion et Shin Evangelion c''était lui aussi). Je n''en dit pas plus et vous laisse découvrir l''oeuvre, bon visionnage!',
  array['Action','Science-Fiction','Horreur'],
  array['Italiano','Deutsch','English','日本語'],
  array['Japan'],
  13,
  11
);
SELECT new_movie(
  'Chat noir, chat blanc',
  'Crna mačka, beli mačor',
  'https://image.tmdb.org/t/p/original/bbeSx7usxfCl0ey8MklidtRnvxr.jpg',
  array['Emir Kusturica'],
  '1998-06-01',
  '130',
  array['Bajram Severdzhan','Srđan Todorović','Zabit Memedov','Florijan Ajdini','Branka Katić'],
  'Et le film de la semaine est ... Chat noir chat blanc d''Emir Kusturica. C''est un cinéaste qui m''est cher en mettant de côté ses prises (ou non) de position politiques qui ne regardent que lui.... J''ai vu pas mal de ses films et à chaque fois avec grand plaisir  ! Je placerais Underground au-dessus mais Chat noir chat blanc est vraiment représentatif de son œuvre : des séquences folles, du rire, ... Bref je vous laisse vous faire votre idée (en espérant que ce soit une découverte pour beaucoup...). Bon visionnage !',
  array['Comédie','Romance','Crime'],
  array['български език','Srpski'],
  array['Austria','France','Germany','Greece','Yugoslavia'],
  14,
  1
);
SELECT new_movie(
  'The Old Guard',
  'The Old Guard',
  'https://image.tmdb.org/t/p/original/pSGO3h6Cyqgv1bDbkjzxUlU8jsW.jpg',
  array['Gina Prince-Bythewood'],
  '2020-07-10',
  '118',
  array['Charlize Theron','KiKi Layne','Matthias Schoenaerts','Marwan Kenzari','Luca Marinelli'],
  'Bon ben puisque personne n''y va, je propose une récréation ! The Old Guard sur Netflix, adapté d''un bon comicbook avec la belle Charlize Theron, qui reprend la coupe de cheveux d''Aeon Flux. Ça vient de sortir sur Netflix. Bon courage !',
  array['Action','Fantastique'],
  array['English','العربية','Français','Italiano','Pусский'],
  array['United States of America'],
  15,
  2
);
SELECT new_movie(
  'A Scanner Darkly',
  'A Scanner Darkly',
  'https://image.tmdb.org/t/p/original/72kQ9tlP0fweBmbTqzkfUCTUUS.jpg',
  array['Richard Linklater'],
  '2006-07-07',
  '100',
  array['Keanu Reeves','Winona Ryder','Woody Harrelson','Robert Downey Jr.','Rory Cochrane'],
  'Et le film de la semaine est : A Scanner Darkly ! Avec : Keanu Reeves, Winona Ryder, Robert Downey Jr. et Woody Harrelson ! Tout cela en cell-shading.',
  array['Animation','Science-Fiction','Thriller'],
  array['English'],
  array['United States of America'],
  16,
  9
);
SELECT new_movie(
  'Whiplash',
  'Whiplash',
  'https://image.tmdb.org/t/p/original/3XriEpTdnplQRzyphAC0cu3emns.jpg',
  array['Damien Chazelle'],
  '2014-10-10',
  '106',
  array['Miles Teller','J.K. Simmons','Paul Reiser','Melissa Benoist','Austin Stowell'],
  'Et le film de la semaine est: Whiplash (disponible sur netflix france, mais pas suisse bien évidemment) Pour être honnête avec vous, je ne l''ai pas encore regardé, mais j''ai eu 2 très bon retours dessus (dont un venant de celui qui m''avait fait découvrir One cut of the Dead qui est lui même batteur dont en lien avec le thème du film), donc ça peut être que bien.',
  array['Drame','Musique'],
  array['English'],
  array['United States of America'],
  17,
  7
);
SELECT new_movie(
  'Your Name.',
  '君の名は。',
  'https://image.tmdb.org/t/p/original/zyHjvVRgKOt9wgVx4ikp2kGArGF.jpg',
  array['Makoto Shinkai'],
  '2016-08-26',
  '107',
  array['Ryûnosuke Kamiki','Mone Kamishiraishi','Ryo Narita','Aoi Yuki','Nobunaga Shimazaki'],
  'Le dernier Shinkai approchant des salles obscures, je trouvais le moment judicieux pour proposer Your Name, Kimi No Nawa. Bon film à toutes et tous !',
  array['Romance','Animation','Drame'],
  array['日本語'],
  array['Japan'],
  18,
  4
);
SELECT new_movie(
  'La Mort de Dante Lazarescu',
  'Moartea domnului Lăzărescu',
  'https://image.tmdb.org/t/p/original/hNy1U9Q9XWsw3FLxCjl66TM01yd.jpg',
  array['Cristi Puiu'],
  '2005-05-17',
  '150',
  array['Ioan Fiscuteanu','Luminița Gheorghiu','Doru Ana','Monica Bârlădeanu','Alina Berzunțeanu'],
  'Nous avons fait la France, le Japon, la Russie, l''Italie, les Etats Unis, la Corée et enfin la Yougoslavie... Je vous invite donc à continuer notre tour du monde avec......... La ROUMANIE. La Mort de Dante Lazarescu (2006) de Cristi Puiu (Prix Un certain regard lors du Festival de Cannes 2005.) Aucune idée du scénario parce que... je l''ai jamais vu. Mais un tel film présent sur Netflix, ça mérite d''être salué alors je vous propose de lui laisser sa chance.',
  array['Comédie','Drame'],
  array['Română'],
  array['Romania'],
  19,
  8
);
SELECT new_movie(
  'Crazy Kung‐Fu',
  '功夫',
  'https://image.tmdb.org/t/p/original/tTcIIg9qsYkKZguR4EsWBUtywef.jpg',
  array['Stephen Chow'],
  '2004-02-10',
  '99',
  array['Stephen Chow','Yuen Wah','Yuen Qiu','Lam Tze-chung','Bruce Leung Siu-Lung'],
  'Retour en Asie cette semaine avec Crazy Kung-Fu(ou Kung-Fu Hustle), réalisé par Stephen Chow(Bons baisers de Pékin,Crazy Soccer,et plus récemment Journey to the West). Comédie d''arts martiaux plus que sympathique, dotée d''une fort belle musique traditionnelle interprétée par l''orchestre chinois de Hong Kong. Je recommande (comme toujours) la VO pour profiter du jeu en cantonais(très différent au son du mandarin). Le film utilise régulièrement quelques effets en 3d qui ont hélas vieilli,mais le film en lui même reste très propre techniquement. Une œuvre qui m''a m''avais fait excellente impression à l''époque et que je recommande chaudement.',
  array['Action','Comédie','Crime','Fantastique'],
  array['广州话 / 廣州話'],
  array['Hong Kong'],
  20,
  11
);
SELECT new_movie(
  'Chungking Express',
  '重慶森林',
  'https://image.tmdb.org/t/p/original/7ejz2cc6tMpuTb7hz4oUi9uW7O9.jpg',
  array['Wong Kar-wai'],
  '1994-07-14',
  '102',
  array['Brigitte Lin','Tony Leung Chiu-wai','Faye Wong','Takeshi Kaneshiro','Valerie Chow'],
  'Décidément, peut-être est-ce une question d''actualité mais j''ai décidé de nous faire rester une semaine de plus à Hong Kong, cette mégalopole hors norme que le temps n''aura pas épargné. Une culture chinoise très particulière, forcément remodelée par le colonialisme et meurtrie par ce retour à la république populaire de Chine avec la rétrocession, grande déchirure pour ses habitants. Ce qui nous conduit tout naturellement, près de 20 ans plus tard, aux tragiques événements qui s''y produisent en ce moment. Le cinéma Hong Kongais a toujours été précieux à mes yeux : forcément, certains des plus estimés réalisateurs y ont fait leurs armes et leurs noms ne vous sont je le sais, pas tout à fait étrangers : John Woo, Ringo Lam, Tsui Hark, Jonnhie To... et Wong Kar Wai. Ils incarnaient la nouvelle vague hong-kongaise entre les années 80 et 90, une ère pleine de remise en question, d''exploration stylistique et de liberté créative et qui mieux que Wong Kar Wai pour représenter ce mouvement si particulier. Choisir un film parmi la filmographie de ce réalisateur c''est pour moi comme choisir entre des enfants que je n''ai pas. Sa filmo est remplie de pépites et c''est un véritable déchirement de ne vous en proposer qu''un seul. Qui plus est quand ce film fait partie d''un duo de films sur la jeunesse hong kongaise. Cette semaine, je vous propose de mater Chungking Express, et j''espère que vous redécouvrirez avec plaisir un des plus beaux films d''amour jamais réalisés, où que vous découvrirez et tomberez amoureux vous aussi de Tony Leung, Brigitte Lin, Faye Wong ou Takeshi Kaneshiro.',
  array['Drame','Comédie','Romance'],
  array['广州话 / 廣州話','普通话','English','हिन्दी','日本語','ਪੰਜਾਬੀ'],
  array['Hong Kong'],
  21,
  1
);
SELECT new_movie(
  'La Source',
  'Jungfrukällan',
  'https://image.tmdb.org/t/p/original/wKpVJvPqdfVIIvLRnerUCtrh6YP.jpg',
  array['Ingmar Bergman'],
  '1960-02-08',
  '90',
  array['Max von Sydow','Birgitta Valberg','Gunnel Lindblom','Birgitta Pettersson','Axel Düberg'],
  'Le film de la semaine ! Je ne peux pas en dire grand chose... a part que jai adore le septieme sceau, que la source est sorti à la même époque et que l’intrigue se déroule également au moyen âge ! Bon visionnage !',
  array['Crime','Drame','Thriller'],
  array['Deutsch','svenska'],
  array['Sweden'],
  22,
  1
);
SELECT new_movie(
  'Message from the King',
  'Message from the King',
  'https://image.tmdb.org/t/p/original/9LDt4BSmNFOWvIMJkhUcfzjgdjK.jpg',
  array['Fabrice Du Welz'],
  '2016-05-10',
  '102',
  array['Chadwick Boseman','Luke Evans','Alfred Molina','Teresa Palmer','Natalie Martinez'],
  'Message from the King de Fabrice du Welz avec Chadwick Boseman dans le rôle principal. Un revenge movie sympa sans être exceptionnel, à mi-chemin entre Taken et le film noir. Le film vaut surtout pour la prestation de l''acteur et le gimmick du fish outta water puisque son personnage est sud africain et débarque à Los Angeles pour retrouver sa sœur récemment disparue. J''ai conscience que passer après Bergman c''est un peu chaud, mais je pense que le film peut s''apprécier comme récréation malgré tout.',
  array['Thriller'],
  array['English'],
  array['France'],
  23,
  2
);
SELECT new_movie(
  'Moon',
  'Moon',
  'https://image.tmdb.org/t/p/original/32Bz9CBTDFLQZCLIcj6Ew6iOxhj.jpg',
  array['Duncan Jones'],
  '2009-06-12',
  '97',
  array['Sam Rockwell','Kevin Spacey','Dominique McElligott','Rosie Shaw','Adrienne Shaw'],
  'Et le film de la semaine est Moon, premier long métrage de Duncan Jones, fils de David Bowie, que vous avez peut-être entendu nommer en tant que réalisateur du film Warcraft. Si vous l’avez déjà vu, alors je vous invite à voir plutôt son dernier film cyberpunk : Mute.',
  array['Science-Fiction','Drame'],
  array['Español','English'],
  array['United Kingdom','United States of America'],
  24,
  9
);
SELECT new_movie(
  'Lisztomania',
  'Lisztomania',
  'https://image.tmdb.org/t/p/original/slkgkRL8hu0Sj4sOkcb8NSkwdGd.jpg',
  array['Ken Russell'],
  '1975-10-10',
  '105',
  array['Roger Daltrey','Sara Kestelman','Paul Nicholas','Ringo Starr','Rick Wakeman'],
  'Et le film de la semaine sera Lisztomania. Un film que je n''ai jamais vu, un film sur lequel je n''ai lu aucune review, un film qui m''a l''air d''un autre monde.',
  array['Comédie','Fantastique','Musique'],
  array['English'],
  array['United Kingdom'],
  25,
  7
);
SELECT new_movie(
  'Lost Highway',
  'Lost Highway',
  'https://image.tmdb.org/t/p/original/wsMW0D5AxoEiwl1e2HUAmmreUYn.jpg',
  array['David Lynch'],
  '1997-01-15',
  '134',
  array['Bill Pullman','Patricia Arquette','Balthazar Getty','Robert Blake','Natasha Gregson Wagner'],
  'Il sera question cette semaine de Lost Highway de David Lynch. À mes yeux le Lynch parfait, un film parfait, conjonction du noir et du monde onirique de son auteur. Les hommages à Bergman y sont légion (une de ses influences majeures), ceux qui ont vu Le Septième Sceau ou Persona comprendront. J’ai conscience que ce n’est pas le film le plus accessible du monde, mais on vous a bien endurcis depuis le début du ciné-club, ça va le faire !',
  array['Drame','Thriller','Mystère'],
  array['English'],
  array['United States of America','France'],
  26,
  2
);
SELECT new_movie(
  'Trois couleurs : Bleu',
  'Trois couleurs : Bleu',
  'https://image.tmdb.org/t/p/original/qqmPmoY0BejMnYfSz0aoNJwSBqp.jpg',
  array['Krzysztof Kieślowski'],
  '1993-09-08',
  '100',
  array['Juliette Binoche','Benoît Régent','Florence Pernel','Charlotte Véry','Hélène Vincent'],
  'Je propose donc Trois couleurs : Bleu de  Krzysztof Kieslowski disponible sur Netflix. Parce que c''est le film que je préfère de la trilogie. Parce que le film est superbe d''un point de vue Esthétique. Parce que Juliette Binoche, à son apogée, y est exceptionnelle. Parce que ça ne dure qu''une heure trente huit !',
  array['Drame'],
  array['Français','Polski'],
  array['France','Poland','Switzerland'],
  27,
  5
);
SELECT new_movie(
  'The Voices',
  'The Voices',
  'https://image.tmdb.org/t/p/original/uRdhZZGKnImfjtm4gp6G097NaEU.jpg',
  array['Marjane Satrapi'],
  '2014-01-19',
  '101',
  array['Ryan Reynolds','Gemma Arterton','Anna Kendrick','Jacki Weaver','Ella Smith'],
  'Cette semaine, je vous propose : The Voices, de la Réalisatrice Marjane Satrapi (oui, je me rends compte que je connais très peu de réalisatrices :/ )',
  array['Comédie','Crime','Horreur','Fantastique'],
  array['English'],
  array['Germany','United States of America'],
  28,
  9
);
SELECT new_movie(
  'Rome, ville ouverte',
  'Roma città aperta',
  'https://image.tmdb.org/t/p/original/dsazRHPV7pxrXZiriIcL2hlgSvD.jpg',
  array['Roberto Rossellini'],
  '1945-10-08',
  '100',
  array['Aldo Fabrizi','Anna Magnani','Marcello Pagliero','Francesco Grandjacquet','Harry Feist'],
  'On est pas bien là, fin octobre, à se mater un des plus gros mastodontes de Rosselini. Régalez-vous !!',
  array['Drame','Histoire'],
  array['Deutsch','Italiano'],
  array['Italy'],
  29,
  1
);
SELECT new_movie(
  'Alabama Monroe',
  'The Broken Circle Breakdown',
  'https://image.tmdb.org/t/p/original/s77tX2QhI11mwRqKxrr5JLETqbM.jpg',
  array['Felix van Groeningen'],
  '2012-10-09',
  '112',
  array['Veerle Baetens','Johan Heldenbergh','Nell Cattrysse','Geert Van Rampelberg','Nils De Caster'],
  'Hello tout le monde, chose promise, chose due, je vous propose un film à voir pour cette semaine qui m''a particulièrement plu, Alabama Monroe (ou The Broken Circle Breakdown en VO). Un excellent film d''après moi, par Van Groeningen et porté par un super duo d''acteur, une OST du tonnerre (comme pour Belgica du même réalisateur) à base de bluegrass :banjo: , une tonne d''émotion et une très belle réal. Très appréciable aussi d''entendre un peu de flammand :flag_be:  à l''écran, c''est assez dépaysant et assez rare donc profitez de la VO ! À voir ce que va donner la carrière de Van G. , même si je préfère le voir tourner dans des endroits un peu cradingues et des productions de son pays plutôt que sa jeune carrière Hollywoodienne qui s''annonce.',
  array['Drame'],
  array['Nederlands','English'],
  array['Belgium','Netherlands'],
  30,
  12
);
SELECT new_movie(
  'Les Incorruptibles',
  'The Untouchables',
  'https://image.tmdb.org/t/p/original/xrdMy48NrJSJYRplKfuQT0sDfSI.jpg',
  array['Brian De Palma'],
  '1987-06-03',
  '119',
  array['Kevin Costner','Sean Connery','Charles Martin Smith','Andy García','Robert De Niro'],
  'Et le film de la semaine est... Les Incorruptibles (The Untouchables) de Brian De Palma, 1987. Je m’excuse de couper l’herbe sous le pied à notre chère nouvelle recrue, mais je me devais de réparer une injuste première lecture : celle d’un De Palma mineur, a priori impersonnel dont la charge héroïque (bien présente) se détournait de la richesse thématique de son œuvre globale. Une quinzaine d’année plus tard et une relative érudition en ce qui concerne son cinéma me permettent de porter une conclusion radicalement différente, ce jour à 3h du mat’ passé : Les Incorruptibles est un chef d’œuvre. Rien de moins. Film noir mais néanmoins baroque et opératique, il convoque pelle-mêle nombre de références dont Orson Welles et les incontournables Hitchcock et Eisenstein pour rendre un hommage appuyé à cette richesse cinephilique qui l’anime. Sa réalisation si caractéristique s’exprime via un pognon monstrueux qui se ressent à chaque minute : montage effréné, mouvements à la grue et travelings surabondants et d’une fluidité folle, reconstitution historique de Chicago fidèle, recours à une multitude de focales, à la Demi-bonnette, au plan séquence subjectif et des effets visuels pratiques forcément très graphiques. Mais regarder The Untouchables aujourd’hui c’est aussi l’occasion de rendre hommage à beaucoup de choses. Un des réalisateurs les plus importants du cinéma américain, si ce n’est le plus important, le score du regretté Ennio Morricone, la prestation du non moins regretté Sean Connery, dans une de ses innombrables (et réussies) tentatives de briser son image. Petite pensée émue pour De Niro qui cabotine un peu (comme souvent) et les carrières naissantes de Costner et Andy Garcia, aujourd’hui bien derrière eux. Les Incorruptibles c’est tout ça, et bien d’autres choses encore. Mais c’est surtout le film de la semaine, disponible sur OCS.',
  array['Crime','Drame','Histoire','Thriller'],
  array['English'],
  array['United States of America'],
  31,
  2
);
SELECT new_movie(
  'Perfect Blue',
  'パーフェクトブルー',
  'https://image.tmdb.org/t/p/original/pTjuiITuZHIii9PSRZjWzTRNwoC.jpg',
  array['Satoshi Kon'],
  '1997-07-25',
  '81',
  array['Junko Iwao','Rica Matsumoto','Shinpachi Tsuji','Masaaki Ôkura','Yousuke Akimoto'],
  'Hello ! Pour cette semaine je vous propose de regarder un cultissime long-métrage de l''animation japonaise de la fin des années 90, réalisé par l''éminent Satoshi Kon : Perfect Blue. C''est souvent qualifié de thriller psychologique et je pense qu''il mérite bien ce nom, mais plus encore, car sa construction est complètement folle et va bien au-delà du thriller psycho qui ne te prendrait aux tripes que par son histoire. Là, la façon dont c''est construit participe au jeu, et c''est dingue. Un travail de dingue a été réalisé sur les transitions, ce qui semble être une marque de fabrique du réalisateur, c''est un régal, je vous laisse (re)découvrir ça pendant votre (re)visionnage ! Et si ça vous intéresse, j''en ai parlé récemment dans le podcast Le Samurai et la Soubrette que je réalise avec un canard du forum canardpc.',
  array['Animation','Thriller'],
  array['日本語'],
  array['Japan'],
  32,
  4
);
SELECT new_movie(
  'La grande bellezza',
  'La grande bellezza',
  'https://image.tmdb.org/t/p/original/uuV2eEMrAp4Sc0m9juknxUAf9rA.jpg',
  array['Paolo Sorrentino'],
  '2013-05-21',
  '142',
  array['Toni Servillo','Carlo Verdone','Sabrina Ferilli','Carlo Buccirosso','Iaia Forte'],
  'Cette semaine je vous propose un film de Paolo Sorrentino. Je n’ai vu que Youth et la série the young/the new pope, mais a chaque fois j’ai adoré. Je vous recommande d’ailleurs chaudement the new pope. Un objet étonnant, parfois agaçant mais toujours beau, et touchant au sublime dans son final. Sorrentino c’est aussi un napolitain amoureux de football et plus particulièrement de Diego Armando Maradona. Il le remercie  à longueur d’interview et son prochain film évoquera le génie argentin. Bref, pour un cinéphile amateur de foot comme moi, c’est le réalisateur parfait. Bon film.',
  array['Drame'],
  array['Italiano','日本語','Español','普通话'],
  array['Italy'],
  33,
  1,
);
SELECT new_movie(
  'Mank',
  'Mank',
  'https://image.tmdb.org/t/p/original/4yzTcAtvzyZLLto4z04xobUK9el.jpg',
  array['David Fincher'],
  '2020-11-13',
  '131',
  array['Gary Oldman','Amanda Seyfried','Lily Collins','Arliss Howard','Tom Pelphrey'],
  'Cette semaine je vous propose l''incontournable dernier film de David Fincher : Mank. Alors tout le monde en parle, forcément, mais qu''est-ce que Mank ? D''abord, c''est un projet commun entre Fincher fils et son défunt père : parler de la paternité d''un des plus gros monument du septième art, Citizen Kane. L''idée : réhabiliter Herman Mankiewicz, l''auteur du script du film, rapidement effacé par ce jeune loup d''Orson Welles, en un long montage parallèle détaillant comment la situation politique californienne aura définitivement convaincu Mank de s''investir dans un cinéma profondément militant et politique, quitte à sacrifier une carrière sécure mais non moins cynique à la MGM. La question qui se pose tout au long du film est plus ou moins celle que posait déjà Trent Reznor en 2005 : Why do you bite the hand that feeds you ?. Et on ne va pas y aller par quatre chemins : si vous avez quelques connaissances des années 30-40 à Hollywood et qui plus est une profonde admiration pour Citizen Kane, ce film est fait pour vous. Si par contre cette connaissance de cette période et du film vous fait défaut, il est possible que vous passiez à côté d''un certain nombre de clés de compréhension. Si ces prérequis sont remplis, j''espère que vous vous enjaillerez comme je me suis enjaillé, à vous balader dans les studios, côtoyer certaines têtes bien connues, notamment un frangin en pleine ascension, qui deviendra ni plus ni moins que l''un des meilleurs réalisateurs américains Je ne m''étendrai pas davantage sur le film en lui-même, on pourra échanger dans la section appropriée. Sinon oui-oui : la BO est toujours de Trent Reznor et Atticus Ross, le résultat est pour le moins étonnant.',
  array['Drame','Histoire'],
  array['English'],
  array['United States of America'],
  34,
  2
);
SELECT new_movie(
  'La vie est belle',
  'It''s a Wonderful Life',
  'https://image.tmdb.org/t/p/original/niniH26VfSTF7fefLWwipvNFGbL.jpg',
  array['Frank Capra'],
  '1946-12-20',
  '136',
  array['James Stewart','Donna Reed','Lionel Barrymore','Thomas Mitchell','Henry Travers'],
  'Noël approchant, je vous propose le film ultime de la période. Celui que l''on voit à chaque fin d''année sur la plupart des chaines de télés américaines. Un morceau du patrimoine des Etats Unis : La vie est belle (It''s a Wonderful Life) sorti en 1946 réalisé par Frank Capra avec comme duo de stars Donna Reed et James Stewart. Un soir de Noël, un homme déprimé décide de se jeter dans la rivière après avoir perdu une grosse somme d''argent. Un ange va l''aider. Une histoire pleine de bons sentiments et simpliste de prime abord qui renferme son lot de scènes magnifiques, une interprétation incroyable et un final puissant. Un film passionné, enlevé, joyeux, triste et finalement une ode à la vie, ses travers et ses merveilles.',
  array['Drame','Familial','Fantastique'],
  array['English'],
  array['United States of America'],
  35,
  8
);
SELECT new_movie(
  'Je veux juste en finir',
  'I''m Thinking of Ending Things',
  'https://image.tmdb.org/t/p/original/5ynWWapdl45hJXUh0KIevxSG9JQ.jpg',
  array['Charlie Kaufman'],
  '2020-08-28',
  '134',
  array['Jesse Plemons','Jessie Buckley','Toni Collette','David Thewlis','Guy Boyd'],
  'Le film de la semaine est Je Veux Juste en Finir / I''m Thinking of Ending Things de Charlie Kaufman, joli coup de poker de Netflix pour 2020. Pour les amateurs de Michel Gondry, ce nom peut peut être vous évoquer un brillant scénariste à qui l''on doit Eternal Sunshine of the Spotless Mind, ce qui ne manquera pas de vous interpeller tout au long de votre visionnage. Avec un titre aussi ambigu que tout à fait à propos, le film emprunte la voie du thriller psychologique mâtiné de petits morceaux d''horreur pour porter toute sa réflexion et toute son attention à la dissection du couple, de l''aliénation, le don de soi, l''érosion du temps et l''importance du souvenir, dans un joli plat de spaghetti tout à fait emmêlés. C''est un film qui a plutôt divisé sur notre canapé, Neofelis ayant tout simplement conchié le film, alors que de mon côté je l''ai vraiment apprécié. On est à peu près à l''opposé du film précédent, bienvenue dans la dépression post-fêtes et bonnes année à tout.es',
  array['Drame','Mystère','Thriller','Fantastique'],
  array['English'],
  array['United States of America'],
  36,
  2
);
SELECT new_movie(
  'Salut l''ami, adieu le trésor',
  'Chi trova un amico trova un tesoro',
  'https://image.tmdb.org/t/p/original/AslQALHBtPJpkftvZvWlgMNzw0.jpg',
  array['Sergio Corbucci'],
  '1981-12-09',
  '99',
  array['Terence Hill','Bud Spencer','John Fujioka','Louise Bennett','Salvatore Borgese'],
  'Après hésitation sur le choix du film, et des débats interminables avec mon frère, le film de la mi-semaine sera Chi trova un amico trova un tesoro de Sergio Corbucci. La série des Bud Spencer et Terrence Hill a bercé mon enfance, des flics aux westerns en passant par de simple types, j''ai beaucoup apprécié leurs films et encore plus les musiques. De mon impression personnelle, ça n''a pas l''air très connu en France, mais Allemagne et en Italie, c''est des classiques. Le choix du film était dur, car il y a en plusieurs que j''ai adoré. Allez, je vous laisse détruire mon enfance (ou pas)!',
  '2021-01-19',
  array['Action','Aventure','Comédie'],
  array['Italiano'],
  array['Italy','United States of America'],
  37,
  7
);
SELECT new_movie(
  'Akira',
  'アキラ',
  'https://image.tmdb.org/t/p/original/8fCn7TwTe0Z4fTugIiLssX6UcHe.jpg',
  array['Katsuhiro Otomo'],
  '1988-07-16',
  '124',
  array['Mitsuo Iwata','Nozomu Sasaki','Mami Koyama','Tesshou Genda','Hiroshi Ohtake'],
  'L’année dernière il est ressorti en 4k au cinéma, mais malheureusement pas en Suisse. Ce fût le premier manga que j’ai lu en étant gosse, et j’avais bien envie de le recouvrir au cinéma. Du coup, je le propose ici.',
  array['Animation','Science-Fiction','Action'],
  array['日本語'],
  array['Japan'],
  38,
  9
);
SELECT new_movie(
  '300',
  '300',
  'https://image.tmdb.org/t/p/original/q31SmDy9UvSPIuTz65XsHuPwhuS.jpg',
  array['Zack Snyder'],
  '2007-03-07',
  '115',
  array['Gerard Butler','Lena Headey','Dominic West','David Wenham','Vincent Regan'],
  'Pourquoi lui ce soir ? Car ma fille (8ans) vient de me parler de Xerxès ce soir (franchement je ne pige plus rien au programme scolaire d’aujourd’hui), et du coup ça m’a donné une furieuse envie de revoir 300. J’ai souvenir d’une photographie incroyable et des plans magnifiques. (et si l’envie vous prend, surtout ne jamais regarder sa « suite »).',
  array['Action','Aventure','Guerre'],
  array['English'],
  array['Bulgaria','Canada','United States of America'],
  39,
  9
);
SELECT new_movie(
  'Kamen Rider Zo',
  '仮面ライダーZO',
  'https://image.tmdb.org/t/p/original/mnNG212ESE6fie722p4Bb3pnpMW.jpg',
  array['Keita Amemiya'],
  '1993-04-17',
  '48',
  array['Hiroshi Tsuchikado','Isao Sasaki','Shohei Shibata','Hiroshi Inuzuka','Naomi Morinaga'],
  'Sortez les effets spéciaux à papa, la reco de la semaine est Kamen Rider ZO (仮面ライダーZO)! Quatorzième entrée dans la saga produite par la TOEI, sorti en 1993, qui narre le combat de son protagoniste contre les Neonoid.',
  array['Action','Aventure','Science-Fiction'],
  array['日本語'],
  array['Japan'],
  40,
  11
);
SELECT new_movie(
  'Black Dynamite',
  'Black Dynamite',
  'https://image.tmdb.org/t/p/original/9zskb3CrQs9la687TFMWAiGNHjl.jpg',
  array['Scott Sanders'],
  '2009-10-16',
  '90',
  array['Michael Jai White','Arsenio Hall','Tommy Davidson','Kevin Chapman','Richard Edson'],
  'Comment après des semaines d''attentes, c''est enfin mon tour, je me permets de vous proposer le film Black Dynamite sorti en 2009. J''ai découvert ce film avec Quelqu''un lors d''une diffusion cinématographique dans mon école. Et je pense que pour des cinéphiles comme vous, vous allez éventuellement découvrir des références intéressantes. Dans tout les cas Quelqu''un garde toujours le film sur son natel pour revoir des séquences choisies qui lui ont plu ! D''ailleurs l''autre jour, il m''a sorti une référence au film et ça m''a donné envie de le revoir! D''où cette proposition; une pierre 2 coups ! Je vous laisse ci-dessous l''introduction Wikipédia: Le film est une parodie des films de blaxploitation, un genre cinématographique très populaire aux États-Unis dans les années 1970 (Coffy, Les Nuits rouges de Harlem, Superfly…).',
  array['Comédie','Action'],
  array['English','Italiano'],
  array['United States of America'],
  41,
  7
);
SELECT new_movie(
  'The Blade',
  '刀',
  'https://image.tmdb.org/t/p/original/1bTSJj00esTzWTVUSRQbbZhB0sR.jpg',
  array['Tsui Hark'],
  '1995-12-21',
  '101',
  array['Vincent Zhao','Moses Chan','Sonny Song','Xiong Xin-Xin','Song Lei'],
  'Et le film de la semaine est... The Blade de Tsui Hark (1995). Exubérant, incroyablement baroque, Tsui Hark se repose sur ses expériences formelles du haut de sa grosse quinzaine d''années d''exercice pour revitaliser le cinéma d''action HK en s''attaquant à l''adaptation d''une légende chinoise classique et archi-traitée. Certes j''aurais pu sélectionner l''incroyable Zu - Les Guerriers de la Montagne Magique, mais le côté profondément expérimental de The Blade en fait un des piliers de sa filmographie. Toujours plus extrême, il y rejette une bonne partie du carcan artistique de l''époque pour déconstruire ses compositions et réviser complètement les techniques de montage. En résulte un film d''une violence dingue, sans concession, particulièrement épuisant et exigeant pour le spectateur, qui culmine dans des combats absolument jouissifs et hallucinants. Le résultat est proprement phénoménal et à mes yeux non-encore égalé, même par Tsui Hark lui-même (oui même Time and Tide). En espérant que vous preniez la gifle que j''ai prise à la découverte.',
  array['Drame','Action'],
  array['广州话 / 廣州話'],
  array['Hong Kong'],
  42,
  2
);
-- SEASON 2
SELECT new_movie('The Lighthouse','The Lighthouse','https://image.tmdb.org/t/p/original/5i7sW28vddZhUfotDL5zuzDprvT.jpg',array['Robert Eggers'],'2019-10-18','109',array['Robert Pattinson','Willem Dafoe','Valeriia Karaman','Logan Hawkes','Kyla Nicolle'],'Et le premier film de cette nouvelle saison est un film avec le beau Bob Pattinson, à mes yeux l''un des acteurs les plus talentueux de ma génération.
Certes on peut rappeler ses débuts de carrière dans une adaptation de roman pour enfant puis un young adult aussi cringe que ridicule, mais c''est oublier que Pattinson se construit depuis une dizaine d''année une solide carrière pleine de rôles atypiques et surtout extrêmement varié.
L''idée cette semaine c''est d''aller piocher deux de ses rôles le splus récents, loin du ronflant d''une carrière américaine à la papa chez James Gray (The Lost City of Z) ou l''an dernier chez Christopher Nolan (Tenet).
D''un côté le dernier film de Robert chez un cinéaste qui m''a fait forte impression avec The Witch : Robert Eggers.
Dans The Lighthouse (2019), il donne la réplique à Willem Dafoe dans un format carré et un beau noir et blanc qui semble aller comme un gant à ce thriller fantastique d''horreur que j''ai raté en salle.','2021-02-21',2,2,array['Drame','Fantastique','Thriller','Horreur'],array['English'],array['Canada','United States of America']);
SELECT new_movie('The Rover','The Rover','https://image.tmdb.org/t/p/original/h7ZRTNHoFg7Ld2VJ7aABoOQnghm.jpg',array['David Michôd'],'2014-06-04','103',array['Guy Pearce','Robert Pattinson','Scoot McNairy','David Field','Susan Prior'],'À l''opposé de The Lighthouse, on trouve The Rover de David Michôd (2014), western apocalyptique australien où il côtoie ce bon vieux Guy Pearce, en complète perdition ces dernières années.
Un film boudé en salles française, mais qui a son succès d''estimes et semblent s''inscrire dans la mouvance des westerns contemporains sales et méchants.','2021-02-22',2,2,array['Crime','Drame'],array['普通话','English'],array['Australia']);
SELECT new_movie('Le Trou','Le Trou','https://image.tmdb.org/t/p/original/pyCMEIAtMPpWTVwZTajcbCIBI3u.jpg',array['Jacques Becker'],'1960-03-18','131',array['Michel Constantin','Jean Keraudy','Philippe Leroy','Raymond Meunier','Marc Michel'],'A mon tour de proposer un film. Je me lance et vous propose donc Le trou de Jacques Becker. Pourquoi Le trou ? Parce que, dans le désordre : du suspense,  de la camaraderie, des valeurs, de l''émotion, des dialogues parfaits. La caméra vous plongera en immersion dans une cellule exiguë avec ces bonhommes dont on ne connait rien et vous n''aurez qu''une envie : vous libérez, peu importe ce qu''il en coûtera !
La mise en scène, les éclairages (ces scènes dans les souterrains de la Santé ❤️ ) sont merveilleux.
Tout est précis, notamment la description du milieu carcéral et on pourrait presque y voir un documentaire.
Oh et... oubliez MacGyver, je vous présente Roland.
Oui, l''affiche est superbe. Je me permets de vous recommander également La grande Illusion si vous aimez vraiment les évasions et Casque d''or si vous aimez vraiment les voyous. Pour ma part, je vais essayer de regarder Touchez pas au grisbi pour continuer d''explorer l’œuvre de Jacques Becker. Bon(s) film(s).','2021-03-01',1,2,array['Crime','Drame','Thriller','Histoire'],array['Français'],array['France','Italy']);
SELECT new_movie('Chambre 212','Chambre 212','https://image.tmdb.org/t/p/original/g00pbH3oa0yWuqaCLHk8r45frxr.jpg',array['Christophe Honoré'],'2019-10-09','87',array['Chiara Mastroianni','Vincent Lacoste','Camille Cottin','Benjamin Biolay','Carole Bouquet'],'À la carte cette semaine, je vous propose Chambre 212, un film de Christophe Honoré. Film que je trouve très très français avec un arôme prononcé de France Inter et un arrière-goût de service public… Rétrospective d’un couple sur leur(s) histoire(s) d’amour, de désamour, mais sans excès de miel ou de pralines. La touche d’originalité réside dans le fait que passé et présent se retrouvent dans le même plan spatio-temporel. C’est une ambiance assez spleen, on a l’impression parfois de regarder une pièce de théâtre, mais je n’ai pas envie de trop en dire pour ne rien divulgâcher.','2021-03-08',13,2,array['Comédie','Drame'],array['English','Français'],array['Belgium','France','Luxembourg']);
SELECT new_movie('La Cité de Dieu','Cidade de Deus','https://image.tmdb.org/t/p/original/52cZF8OJNLDcVFYvmwzlhGZMfgt.jpg',array['Fernando Meirelles'],'2002-02-05','135',array['Alexandre Rodrigues','Leandro Firmino','Phellipe Haagensen','Douglas Silva','Jonathan Haagensen'],'Dong dong, il est l’heure les ami·e·s. Le film de la semaine, est un film bon enfant, sur la joie d’être enfant dans le quartier nommé « Cité de Dieu » à Rio de Janeiro en 1970. Et ça fait bim, bam, boum, ça fait pshht et ça fait vroum, le tout mis en scène par Fernando Meirelles & Kátia Lund. Je veux bien sûr parler de Cidade de Deus (2002). Si vous peinez à le trouver, contactez-moi.','2021-03-15',9,2,array['Drame','Crime'],array['Português'],array['Brazil']);
SELECT new_movie('Captain Fantastic','Captain Fantastic','https://image.tmdb.org/t/p/original/aGZUdxnNo3kQF8QioNWBKrCxBvY.jpg',array['Matt Ross'],'2016-07-08','118',array['Viggo Mortensen','Samantha Isler','Annalise Basso','Steve Zahn','George MacKay'],'Au menu cette semaine je vous propose Captain Fantastic, réalisé par Matt Ross. Vu en salle à sa sortie pour ma part, j''en garde un bon souvenir. J''ai hâte de lire vos avis dessus (et ne vous en tiendrai pas rigueur si vous n''aimez pas).','2021-03-22',10,2,array['Aventure','Drame'],array['Esperanto','English'],array['United States of America']);
SELECT new_movie('Moonrise Kingdom','Moonrise Kingdom','https://image.tmdb.org/t/p/original/iDfjUWJ0w8XmEgaL4n1m7GI86BE.jpg',array['Wes Anderson'],'2012-05-16','94',array['Bruce Willis','Jared Gilman','Kara Hayward','Edward Norton','Bill Murray'],'Amis du soir bonsoir. Cette semaine je vous propose la suite de la trilogie Une enfance au soleil initiée par Checco et la Cité de Dieu avec Moonrise Kingdom de Wes Anderson. Âmes sensibles s''abstenir. ','2021-03-29',14,2,array['Comédie','Drame','Romance'],array['English'],array['United States of America']);
SELECT new_movie('Coup de torchon','Coup de torchon','https://image.tmdb.org/t/p/original/qjyqR1KkGmHPNs4zA4KICDWSxfX.jpg',array['Bertrand Tavernier'],'1981-11-04','128',array['Philippe Noiret','Isabelle Huppert','Jean-Pierre Marielle','Stéphane Audran','Eddy Mitchell'],'À la carte cette semaine Coup de Torchon, du chef Bertrand Tavernier.
Petit hommage posthume à un véritable amoureux du cinéma, dont la passion sincère débordait allègrement dans la plupart de ses prises de paroles publiques.
Quoi de mieux que son film le plus emblématique pour s''initier ensemble à son univers ?
Un trio de monstres Huppert / Noiret / Marielle pour un pétage de câble en Afrique coloniale.','2021-04-06',2,2,array['Drame','Crime','Comédie'],array['English','Français'],array['France']);
SELECT new_movie('Sleepers','Sleepers','https://image.tmdb.org/t/p/original/2qIFogmG9GoBt4kztCFPgVC166Q.jpg',array['Barry Levinson'],'1996-10-18','147',array['Kevin Bacon','Billy Crudup','Robert De Niro','Ron Eldard','Minnie Driver'],'Bon allez, je me lance !
Au menu cette semaine, Sleepers, de Barry Levinson. Vu la gueule du casting, je suppose que c''est un classique et que plusieurs d''entre vous, si pas tous, l''ont déjà visionné.
En toute honnêteté, je ne sais pas trop quoi vous rajouter vu que je fais partie des gens qui ne matent pas trop les bandes-annonces, les synopsis ou autres... J''aime tellement le plaisir de la découverte !','2021-04-13',15,2,array['Crime','Drame','Thriller'],array['English'],array['United States of America']);
SELECT new_movie('M. Holmes','Mr. Holmes','https://image.tmdb.org/t/p/original/xToNLUiVoGgFE4ZNb5CSqub17Gt.jpg',array['Bill Condon'],'2015-06-19','103',array['Ian McKellen','Laura Linney','Milo Parker','Hiroyuki Sanada','Roger Allam'],'Que proposer ? L''autre mois, je suis tombé sur la série animée Moriarty the Patriot, une adaptation (absolument pas 1-1) de Sherlock Holmes qui prends plus le vue de Moriarty.
Du coup, après avoir vu la première saison, je me suis dit: Tiens, qu''est-ce qu''il a eu comme récent film/série/anime sur Sherlock Holmes ces derniers temps ?
Alors bien évidemment, il a eu les 2 adaptations de Guy Ritchie que je suppose tout le monde à vue (si je les ai vu moi). Mais il y a eu également Mr. Holmes en 2015 et une version plus dérivé appelé Enola Holmes en 2020 (dispo sur Netflix).
Ayant déjà regardé Enola Holmes à la place Chambre 212 (tapez pas), je vous propose de visionner Mr. Holmes','2021-04-19',7,2,array['Drame','Crime'],array['Français','English','日本語'],array['United Kingdom','United States of America']);
SELECT new_movie('Un Seul bras les tua tous','獨臂刀','https://image.tmdb.org/t/p/original/6HBS1iFXkxe9LQuUFC2HAf7yUFV.jpg',array['Chang Cheh'],'1967-07-26','111',array['Jimmy Wang Yu','Lisa Chiao Chiao','Tien Feng','Violet Pan Ying-Zi','Yeung Chi-Hing'],'Et les films de la semaine sont 2 incontournables du cinéma d''action chinois.
Les deux entretiennent une connexion évidente avec l''une de de mes précédentes recommandations : The Blade de Tsui Hark, qui je le sais a pas mal divisé.
Cette semaine on se concentre sur deux légendes, deux mythes chinois, deux guerriers légendaires qui incarnent l''essence même du Wu Xia Pian : d''une part le sabreur manchot, de l''autre Wong Fei-Hung.
Pour le premier, difficile de passer à côté d''Un Seul Bras les Tua Tous de Chang Cheh (1967).
Production emblématique de la Shaw Brothers, le film remet en question la dévotion filiale largement glorifiée par le cinéma d''action chinois, avec une violence somme toute assez impressionnante. Le sabreur manchot a inspiré des tas de réalisateur et été adapté au travers d''un nombre considérable de films d''action de plus ou moins bonne facture (plutôt moins que plus), jusqu''à ce qu''un certain Tsui Hark ne décide de le réinvestir avec The Blade. Je pense que le jeu des 7 différences (en fait largement plus) entre les deux films peut s''avérer assez ludique pour vos yeux aguerris. Le film reste un classique qui je trouve a très bien vieilli, j''espère que vous prendrez beaucoup de plaisir à le regarder.','2021-04-28',2,2,array['Drame','Action'],array['普通话'],array['Hong Kong']);
SELECT new_movie('Il était une fois en Chine','黃飛鴻','https://image.tmdb.org/t/p/original/2WhVZMh3YvDgtLHEQbkmrxVybvO.jpg',array['Tsui Hark'],'1991-08-15','134',array['Jet Li','Yuen Biao','Jacky Cheung','Rosamund Kwan','Kent Cheng'],'Pour le second film, j''ai choisi le premier volet de la trilogie Il Était Une Fois en Chine de Tsui Hark (1991).
Film charnière de la carrière de Tsui Hark, il est également celui qui révéla le talent incroyable de Jet Li, alors relativement peu connu.
Wong Fei-Hung est un médecin chinois de la deuxième moitié du 19° siècle, aussi maître (Sifu) d''une école de kung-fu.
Le personnage a inspiré une quantité pléthorique d''adaptations (plus d''une centaine), mais celle de Tsui Hark et Jet Li est sans doute une des plus intéressantes à mes yeux.
La force du film réside dans la réinterprétation du personnage et son évolution tout au long du film : en le replaçant à l''aube des grands bouleversements de la Chine du 19° siècle, entre colonialisme occidental et modernisation technologique, Hark file la métaphore de la rétrocession de Hong Kong une fois encore, interrogeant la place de la culture chinoise au sein d''une ville métissée par les années d''impérialisme britannique (et occidental plus largement) en interrogeant la position du cinéma Hong Kongais comme la réussite d''une ouverture aux autres cultures et la technologie, tout en évitant de voir son identité culturelle dissoute.
Encore une fois, difficile de donner tort à cette vague de réalisateurs, compte tenu de ce qu''ils sont devenus dans le régime actuel...
Vous trouverez sans doute beaucoup de similitude avec les plus récents films Ip Man avec Donnie Yen.
Je ne doute pas une seconde que la trilogie de Tsui Hark en soit une des inspiration majeures.
Néanmoins, là où les Ip Man restent des pamphlets nationalistes hagiographiques, je trouve les 3 premiers Il Était une fois en Chine beaucoup plus fins et beaucoup plus intéressants dans leurs propos.
Par contre les acteurs occidentaux dans les productions asiatiques sont toujours aussi nuls à chier à 25 ans d''intervalle. ','2021-04-29',2,2,array['Action','Drame'],array['Français','普通话','English','广州话 / 廣州話'],array['Hong Kong']);
SELECT new_movie('Only Lovers Left Alive','Only Lovers Left Alive','https://image.tmdb.org/t/p/original/kffoWJ7FfPRlFFBGixOMbq3blQp.jpg',array['Jim Jarmusch'],'2013-12-12','123',array['Tom Hiddleston','Tilda Swinton','Mia Wasikowska','John Hurt','Anton Yelchin'],'A la carte cette semaine, je vous propose mon film préféré de tous les temps (Ex-aequo avec Bagdad café) : Only lovers left alive de Jim Jarmusch. C’est un film d’une esthétique folle, autant au niveau des images que de la musique. Les acteurs sont d’une sensualité écrasante. Tout transpire le spleen et le Prozac. On est sur une bonne vieille histoire de love, mais avec beaucoup d’élégance et d’originalité. C’est un peu le Twilight version Arte qui serait plébiscité par France Inter. Ce n’est pas un film qui s’adresse seulement aux amateurs de « contemplatif », les images s’appuient sur un vrai scénario. Bref, si vous en avez l’occasion, foncez. C’est beau, mais c’est beau…','2021-05-03',13,2,array['Drame','Romance'],array['Türkçe','العربية','English','Français'],array['France','Germany','Greece','United Kingdom']);
SELECT new_movie('The Killer','喋血雙雄','https://image.tmdb.org/t/p/original/xUesDDgPaRBTEHybs0I1Z8fTdk2.jpg',array['John Woo'],'1989-07-06','111',array['Chow Yun-Fat','Danny Lee Sau-Yin','Sally Yeh','Paul Chu Kong','Kenneth Tsang'],'Ce soir, on retourne en Chine.
Enfin, en Chine ... À l''époque c''était plus vraiment la Chine car le film se déroule à Hong-Kong.
Le film c''est The Killer de John Woo (1989).
Je l''ai découvert au lycée grâce à la collection HK (merci Christophe Gans et ses amis).
J''ai envie de le revoir encore une fois parce que d''une, les scènes d''action, indissociables des films hong-kongais de monsieur Woo, j''ai envie de voir comment elles ont vieilli car c''était une sacrée claque et de deux, l''histoire est simple et efficace, y''a une lumière de dingue, une ambiance de dingue, c''est triste et mignon à la fois.
À vos marques, prêts, matez !','2021-05-10',16,2,array['Action','Crime','Drame','Thriller'],array['广州话 / 廣州話','普通话','日本語'],array['Hong Kong']);
SELECT new_movie('The Guilty','Den skyldige','https://image.tmdb.org/t/p/original/wmYMPR8PYebma5WNWFC3umYDSJ2.jpg',array['Gustav Möller'],'2018-06-14','85',array['Jakob Cedergren','Jessica Dinnage','Omar Shargawi','Johan Olsen','Jacob Ulrik Lohmann'],'The Guilty est un film qui nous plonge dans l''intimite d''Asger le temps d''une nuit, mais en même temps, sans connaître grand chose de ce personnage.
Dans un style particulier, le film se joue comme si nous suivons l''histoire en temps réel, cet officier qui essaye de résoudre un kidnapping suite à un appel fait lors de son shift.
Nous plongeons dans cet univers, tout en ayant droit à une histoire passionnante et entraînante, avec des rebondissements qui vous glacent le sang.','2021-05-17',17,2,array['Drame','Thriller'],array['Dansk'],array['Denmark']);
SELECT new_movie('La Chair et le Sang','Flesh + Blood','https://image.tmdb.org/t/p/original/qEeNYMjd4oMoGLGHffZOLePNKaT.jpg',array['Paul Verhoeven'],'1985-08-30','126',array['Rutger Hauer','Jennifer Jason Leigh','Tom Burlinson','Jack Thompson','Susan Tyrrell'],'Considérant le décès récent de Kentaro Miura, auteur de l''excellente série de mangas Berserk, Lukino et moi nous sommes dit qu''il serait peut-être pertinent de lui rendre hommage cette semaine. Non pas en recommandant les adaptations en animé de l''un des arcs les plus estimés de la bande dessinée contemporaine, mais plutôt en allant puiser dans certaines de ses influences.
Une Europe occidentale en proie à des guerres civiles sans fin, des aristocrates sans foi ni ni loi, des mercenaires en divagation et pour couronner le tout une gentille épidémie de peste bubonique : c''est le cadre qu''a choisi Paul Verhoeven (le hollandais violant / violent) pour sa grande fresque moyen-âgeuse La Chair et le Sang, ou Flesh + Blood dans la langue de Kanye West.
Dans ce contexte pas forcément des plus joyeux, Verhoeven ancre son récit sur Martin, impeccable Rutger Hauer, fils de pute opportuniste qui se rêve sauveur messianique de sa petite troupes de parias. Un personnage ambivalent, qui n''est pas sans rappeler la dualité Guts/Griffith, pour les initié·e·s.
Pour ce coup d''essai sur le sol américain, Paulo n''y va pas avec le dos de la cuillère : mutilation, meurtres graphiques, nudité frontale, viols, cadavres à la pelle... âmes sensibles s''abstenir.
Avec un budget pourtant rachitique, il multiplie les effets pour dérouler une parabole politique acerbe, aux portées interprétatives forcément contemporaines. S''il est souvent tissé un lien de parenté entre Verhoeven et Leone / Peckinpah, ce n''est pas tout à fait par hasard...
Vous ne manquerez pas de noter une quantité de petites choses empruntées depuis dans de nombreux media, comme par exemple la scène du bain, dans lequel se prélassera un certain sorceleur trente ans plus tard.','2021-05-24',2,2,array['Aventure','Drame'],array['Deutsch','English','Latin'],array['Netherlands','Spain','United States of America']);
SELECT new_movie('Cours, Lola, cours','Lola rennt','https://image.tmdb.org/t/p/original/ezsrZQkL9kq98rsuBfaQr2ncRPf.jpg',array['Tom Tykwer'],'1998-03-03','81',array['Franka Potente','Moritz Bleibtreu','Herbert Knaup','Nina Petri','Armin Rohde'],'Pour celles et ceux qui ont envie de courir sans se fatiguer.
Pour celles et ceux qui souhaitent un film pas trop long
Pour celles et ceux qui trouvent que Franka Potente ne dévoile pas tout son potentiel aux côtés de Matt Damon (à prononcer comme dans Team America).
COURS, LOLA, COURS
(pas de vanne avec Forrest, merci vous êtes gentils)
Un flim de 1998 de Tom Tykwer, c''est allemand, ça pulse, pour moi c''est un court-métrage qui s''étire (mais qui s''étire bien)
Vous (re)verrez par vous-mêmes, il m''a beaucoup plus et ça fait un certain temps que je n''ai pas posé mes yeux dessus, j''espère que cela vous plaira','2021-05-31',16,2,array['Action','Drame','Thriller'],array['Deutsch','English','日本語'],array['Germany']);
SELECT new_movie('Enquête sur un citoyen au-dessus de tout soupçon','Indagine su un cittadino al di sopra di ogni sospetto','https://image.tmdb.org/t/p/original/dNYuzLRgybtxQOlAnbTxS56oDU4.jpg',array['Elio Petri'],'1970-10-16','111',array['Gian Maria Volonté','Florinda Bolkan','Gianni Santuccio','Orazio Orlando','Sergio Tramonti'],'Et le film de la semaine est : enquête sur un citoyen au dessus de tout soupçon.
Un film d’Elio Petri qui a de suite intégré mes films préférés et dont je ne me suis jamais vraiment remis. Tout est dingue, brutal et immoral. Le film se déroule pendant les années de plomb italiennes, années de troubles politiques dont je ne peux pas dire beaucoup plus (une vidéo de la chaîne cinéma et politique traitant du film est en approche...).
Je ne vous donnerai pas le synopsis parce que je ne veux pas gâcher la scène d’introduction. La musique est de Morricone : vous avez déjà entendu cet air de mandoline, maintenant vous saurez de quel film il est tiré.
J’espère que ça vous plaira autant qu’à moi ! Bon visionnage.','2021-06-07',1,2,array['Drame','Thriller'],array['Italiano'],array['Italy']);
SELECT new_movie('Batman contre le Fantôme masqué','Batman: Mask of the Phantasm','https://image.tmdb.org/t/p/original/4A4dYMcMzhMWSmEoOXi7crZEhkI.jpg',array['Bruce Timm','Eric Radomski'],'1993-12-25','76',array['Kevin Conroy','Dana Delany','Hart Bochner','Stacy Keach','Abe Vigoda'],'Très bien, je vois que mon intimidation n''a pas fonctionné. En conséquence, le film de la semaine partira sur un tout autre registre, qui n''est même pas mon style, même pas mon univers. Peut-être on va tous souffrir, ou peut-être on sera étonné, qui sait ? ça sera : Batman contre le Fantôme Masqué :D. Film d''animation de 1993.','2021-06-14',9,2,array['Action','Animation','Crime','Mystère'],array['English'],array['United States of America']);
SELECT new_movie('Willow','Willow','https://image.tmdb.org/t/p/original/v0WaeLwdljh1P9MHp989dp5XYDM.jpg',array['Ron Howard'],'1988-05-20','120',array['Warwick Davis','Val Kilmer','Joanne Whalley','Jean Marsh','Patricia Hayes'],'Pour le film de la semaine, je vous propose un sucré/salé de Fantasy sur lit de légumes anciens (oui parce que bon, il est pas jeunot le bouzin ^^). Il s''agit donc d''une douceur de mon passé : Willow (Fantasy - 1988 par Ron Howard).','2021-06-21',18,2,array['Action','Aventure','Fantastique'],array['English'],array['United States of America']);
SELECT new_movie('Tetsuo','鉄男','https://image.tmdb.org/t/p/original/zEzJP8F9EawE1FQySR6ppCyAEX.jpg',array['Shinya Tsukamoto'],'1989-07-01','67',array['Tomorowo Taguchi','Kei Fujiwara','Nobu Kanaoka','Shinya Tsukamoto','Naomasa Musaka'],'Et le film de la semaine est Tetsuo de Shinya Tsukamoto (1989).
Une pépite du cinéma underground japonais sorti de l''esprit contrarié de son alors très jeune réalisateur.
Son noir et blanc très contrasté apporte une distance et une édulcoration sans doute bienvenues pour cette pépite de body-horror / steampunk déjantée d''à peine plus d''une heure qui vous recrachera, je l''espère, complètement abasourdis.
Il faut dire que l''expérience sensorielle risque d''être troublante ! Préparez-vous à un film quasi muet, bercé par une musique indus quasi bruitiste et porté par un montage irréprochable au rythme parfois effréné et aux inserts perturbants. Bonne séance !','2021-06-29',2,2,array['Horreur','Science-Fiction'],array['日本語'],array['Japan']);
SELECT new_movie('Harakiri','切腹','https://image.tmdb.org/t/p/original/3nPwMd3KviJWaHzG9fZCqlwWMas.jpg',array['Masaki Kobayashi'],'1962-09-15','135',array['Tatsuya Nakadai','Akira Ishihama','Shima Iwashita','Tetsurō Tamba','Masao Mishima'],'Cette semaine je vous propose Hara Kiri de Madak Kobayashi.(1962)
Je n''ai pas grand chose à vous dire dessus je l''ai découvert il y a une dizaine d''années quand j''essayais de parfaire ma culture en cinéma classique japonais et j''en ai assez peu de souvenirs si ce n''est quelque scènes marquantes visuellement et une histoire touchante.
Bon visionnage !','2021-07-05',19,2,array['Action','Drame','Histoire'],array['日本語'],array['Japan']);
SELECT new_movie('L''Arme Fatale','Lethal Weapon','https://image.tmdb.org/t/p/original/uh1ImPGPySZ0bKEVgPDIXHLt22.jpg',array['Richard Donner'],'1987-03-06','110',array['Mel Gibson','Danny Glover','Gary Busey','Mitchell Ryan','Tom Atkins'],'Le film de la semaine est l''Arme Fatale de Richard Donner (1987).
Essence même du buddy movie, Lethal Weapon est une comédie d''action remarquablement bien écrite par un certain Shane Black. Le choix du casting n''est pas totalement étranger au succès fou du film, le tandem Gibson - Glover faisant réellement des étincelles. S''il reste un des meilleurs faiseurs de l''industrie Hollywoodienne d''alors, Donner livre ici un de ses films les plus efficaces, autant dans ses excès spectaculaires que dans la mise en scène de la bromance improbable entre Martin et Roger.
Un film à la fois disjoncté, méchant et drôle, avec du saxo parce que c''est les 80''s et un Gary Busey très très méchant qui en fait des caisses, mais c''est comme ça qu''on l''aime.
Bonne semaine et bon film !','2021-07-12',2,2,array['Aventure','Action','Comédie','Thriller','Crime'],array['English'],array['United States of America']);
SELECT new_movie('Spider-Man : New Generation','Spider-Man: Into the Spider-Verse','https://image.tmdb.org/t/p/original/jw9TRNYIMI1KsTjgQ3wVYSMXxlh.jpg',array['Rodney Rothman','Peter Ramsey','Bob Persichetti'],'2018-12-06','117',array['Shameik Moore','Jake Johnson','Hailee Steinfeld','Mahershala Ali','Brian Tyree Henry'],'Le film de la semaine est Spider-Man : Into the Spider-Verse (2018).
Synopsis : Ce récit se concentre sur un Spider-Man plus récent dans le Spider-Verse : Miles Morales, adolescent afro-américain qui, à son tour, va se faire mordre par une araignée radio-active et se découvrir des super-pouvoirs. Dans le même temps, le plus redoutable cerveau criminel de la ville, le Caïd, a mis au point un accélérateur de particules nucléaires capable d''ouvrir un portail sur d''autres univers. Son invention va provoquer l''arrivée de plusieurs autres versions de Spider-Man dans le monde de Miles, dont un Peter Parker plus âgé, Spider-Gwen, Spider-Man Noir, Spider-Cochon et Peni Parker, venue d''un dessin animé japonais.
Film d''animation produit par Sony Pictures Animation et réalisé non par un, ni deux, mais trois réalisateurs : Peter Ramsey, Bob Persichetti et Rodney Rothman. Ce film est un bijou de l''animation moderne. Il a su repousser les limites créatives dans le milieu de l''animation et se distinguer à la fois sur le plan artistique mais aussi technique. Le travail sur la manipulation de la 2D pour donner l''illusion de 3D est tout simplement bluffant. Le film a raflé de belles récompenses en 2019 : Golden Globes du meilleur film d''animation, Oscards du meilleur film d''animation, BAFA du meilleur film d''animation, etc.','2021-07-19',20,2,array['Action','Aventure','Animation','Science-Fiction'],array['English','日本語','Español'],array['United States of America']);
SELECT new_movie('Pulp Fiction','Pulp Fiction','https://image.tmdb.org/t/p/original/4TBdF7nFw2aKNM0gPOlDNq3v3se.jpg',array['Quentin Tarantino'],'1994-09-10','154',array['John Travolta','Samuel L. Jackson','Uma Thurman','Bruce Willis','Ving Rhames'],'Le film de la semaine est Pulp Fiction (1994).
Film de gangster américain par Quentin Tarantino. Plusieurs histoires entre mêlées dans une chronologie déstructurée mais où, à la fin, on remet tout dans l''ordre.
C''est cru, violent et vulgaire mais diablement efficace. ','2021-07-26',18,2,array['Thriller','Crime'],array['English','Español','Français'],array['United States of America']);
SELECT new_movie('Le Limier','Sleuth','https://image.tmdb.org/t/p/original/6ya0B3t0VxcTjUEXqSj2sdemdKw.jpg',array['Joseph L. Mankiewicz'],'1972-12-10','138',array['Laurence Olivier','Michael Caine','Alec Cawthorne','John Matthews','Eve Channing'],'Le film que je vous propose de regarder cette semaine est Sleuth, ou Le Limier (1976).
Adapté d''une pièce de théâtre, le film de Joseph L. Mankiewicz propose une formidable passe d''armes entre Laurence Olivier et Michael Caine, dans une escalade de tromperies, de vengeances et de mensonges. J''évite ici de trop en dire sur l''intrigue, qui oppose un richissime écrivain de romans policiers (Laurence Olivier) au jeune amant de sa femme (Michael Caine), sachez simplement que le duo fait des étincelles et les deux hommes s''entendront comme larrons en foire sur le tournage (alors qu''Olivier fut semble-t-il assez froid et distant avec Caine les premiers jours), et seront tous deux nommés aux Oscars pour la qualité de leur performance en tant que...personnage principal.
Un remake est sorti en 2008, Michael Caine incarnant cette fois le vieil écrivain face à un jeune Jude Law. L''original laisse un bel héritage malgré sa relative confidentialité (il est rarement cité dans les listes des grands thrillers / films à énigmes), avec notamment une citation très visible dans le récent Knives Out.','2021-08-02',21,2,array['Mystère','Thriller','Crime'],array['Italiano','English'],array['United Kingdom']);
SELECT new_movie('Comancheria','Hell or High Water','https://image.tmdb.org/t/p/original/3JEWbVppKyZyIyE0aCYak2zUsg8.jpg',array['David Mackenzie'],'2016-08-11','102',array['Jeff Bridges','Chris Pine','Ben Foster','Gil Birmingham','Marin Ireland'],'Voici donc la proposition alternative : Hell or High Water (2016). En France, il avait gardé son titre initial de Comancheria. Le film est réalisé par David McKenzie (c''est son meilleur projet à ce jour), sur un scénario de Taylor Sheridan (qui a notamment écrit les scripts des deux Sicario).
S''il a moins d''ampleur et de génie que Sleuth(comment pourrait-il en être autrement), Hell or High Water repose lui aussi sur des duos. D''un côté, deux frères fatigués et désargentés (Ben Foster et un surprenant Chris Pine) qui, pour sauver le ranch familial, se lancent dans une série de braquages des banques de la région. De l''autre, deux policiers expérimentés à leurs trousses, incarnés par les impeccables Jeff Bridges et Gil Birmingham (que les amateurs de Bansheereconnaîtront sans peine).
Il s''agit d''un néo-western crépusculaire, qui dépeint une Amérique post-subprimes en pleine déliquescence. C''est rêche, très beau visuellement, avec un dénouement inattendu. C''était l''un de mes coups de coeur de 2016, que je vous propose aujourd''hui car il n''avait pas bénéficié d''un gros éclairage en son temps.','2021-08-03',21,2,array['Crime','Thriller','Drame','Western'],array['English'],array['United States of America']);
SELECT new_movie('I Don''t Feel at Home in This World Anymore','I Don''t Feel at Home in This World Anymore','https://image.tmdb.org/t/p/original/1stdUlXBc3nxqhdWvZ6wWWEbCQW.jpg',array['Macon Blair'],'2017-01-19','93',array['Melanie Lynskey','Elijah Wood','David Yow','Jane Levy','Devon Graye'],'J''ai eu du mal à choisir mais celui-ci est sur Netflix donc go pour la proposition de la semaine : I Don''t Feel at Home in This World Anymore (2017) de Macon Blair (un acteur de petits rôles dont il s''agit du seul film en tant que réalisateur), une comédie dramatique qui flirte avec le cynisme pour nous offrir un duo aussi improbable que touchant, incarné par Melanie Lynskey et Elijah Wood.
La première est une infirmière fin de la trentaine qui semble frappée de poisse chronique, à laquelle s''ajoute son tempérament conciliant qui ne l''aide pas et qu''elle envoie valser suite au cambriolage de sa maison. La goutte de trop qui va la lancer sur la traque des cambrioleurs, accompagnée de son voisin à l''équilibre mental douteux.
Un film drôle, ludique, et crédible malgré tout, qui rend hommage aux personnes marginalisées dans une société aux codes définis.','2021-08-09',22,2,array['Comédie','Crime','Drame','Thriller'],array['English'],array['United States of America']);
SELECT new_movie('The Raid','Serbuan maut','https://image.tmdb.org/t/p/original/e0EeE8Rc5weReJNpwOP78DuCxdH.jpg',array['Gareth Evans'],'2012-03-22','101',array['Iko Uwais','Joe Taslim','Donny Alamsyah','Yayan Ruhian','Pierre Gruno'],'Cette semaine je vous propose un film qui dépote avec The Raid de Gareth Evans (2011). On y suit un groupe de flics qui mène une opération plus que musclée dans un immeuble occupé par la mafia locale. Honnêtement le scénario est accessoire, si vous aimez les arts martiaux et les jeux de baston, ce film est pour vous ! On peut aussi souligner que les acteurs/cascadeurs sont époustouflants. J''espère juste que tout le monde ne l''a pas déjà vu !','2021-08-16',10,2,array['Action','Thriller','Crime'],array['Bahasa indonesia'],array['France','Indonesia']);
SELECT new_movie('Printemps tardif','晩春','https://image.tmdb.org/t/p/original/fx5Igs7D7SqosMk2FGLcel0IItO.jpg',array['Yasujirō Ozu'],'1949-09-13','110',array['Chishū Ryū','Setsuko Hara','Yumeji Tsukioka','Haruko Sugimura','Hohi Aoki'],'Cette semaine, on regarde Printemps tardif de Yasujirō Ozu (1949).
Drame familial avec aussi un peu de tranche de vie, Printemps tardif (Late Spring) est réputé comme étant un des tous meilleurs films d''Ozu. Les critiques soulèvent également la poésie certaine de ce film. Ne l''ayant pas encore vu, je ne peux malheureusement pas vous en décrire plus.
Bonne séance !','2021-08-23',23,2,array['Drame'],array['日本語'],array['Japan']);
SELECT new_movie('Une journée particulière','Una giornata particolare','https://image.tmdb.org/t/p/original/9QXrJuoSGRTe4p6EbgbLPM6l5si.jpg',array['Ettore Scola'],'1977-08-11','106',array['Sophia Loren','Marcello Mastroianni','John Vernon','Françoise Berd','Patrizia Basso'],'Cette semaine ce sera Une journée particulière d''Ettore Scola.
Je poursuis mon exploration du cinéma italien avec ce film qui décrit la rencontre entre une mère de famille et un homosexuel en 1938. Pendant ce temps, la ville accueille le défilé de Mussolini et Hitler.
Ça traite de l''enfermement vécu par ces deux êtres que tout semble opposer. Ne l''ayant jamais vu, je n''en dis pas plus. Hâte d''avoir votre avis ! Film disponible sur cinéplus. Bonne séance.','2021-08-30',1,2,array['Drame','Romance'],array['Italiano'],array['Italy','Canada']);
SELECT new_movie('Il était Temps','About Time','https://image.tmdb.org/t/p/original/eoOvm8cUtjxmfHX6i6a3maEhjCj.jpg',array['Richard Curtis'],'2013-09-04','123',array['Domhnall Gleeson','Rachel McAdams','Bill Nighy','Tom Hollander','Margot Robbie'],'Cette semaine, c''est une première pour moi, aussi je vous propose un film tout simple mais très joli qui s''appelle It''s About Time réalisé par Richard Curtis, l''homme à qui l''ont doit les plus grandes comédies romantiques anglaises ( Coup de foudre à Nothing Hill, 4 mariages et un enterrement, Love Actually ). Curtis c''est un peu le boss de la comédie romantique, et je trouve que son savoir faire atteint son apogée dans It''s About Time, puisqu''il n''y est pas aussi sirupeux qu''il peut parfois l''être. Certains aiment les comédies romantiques, d''autres n''aiment pas, je sais que les cinéphiles ont tendance à relayer ce genre au second voir au troisième plan, mais moi j''adore.
Enfin, c''est plutôt pratique parce que le film est sur Netlfix en bonne qualité. Vous pourrez ainsi profiter du duo Domhnall Gleeson et Rachel McAdams dans de très bonnes conditions. J''espère que ça vous plaira et je suis bien content de le découvrir à nouveau avec vous.
Cordialement.','2021-09-06',24,2,array['Drame','Romance','Fantastique'],array['English'],array['United Kingdom']);
SELECT new_movie('Quand passent les cigognes','Летят журавли','https://image.tmdb.org/t/p/original/sX5rsq7w6qZbiOAPEIBFWUFjCx5.jpg',array['Mikhail Kalatozov'],'1957-10-12','98',array['Tatyana Samoylova','Aleksey Batalov','Vasili Merkuryev','Aleksandr Shvorin','Svetlana Kharitonova'],'Cette semaine nous découvrons Quand passent les cigognes. Film russe ou plutôt, soviétique de 1957 du réalisateur Mikhail Kalatozov. Je l’ai revu il y a quelques mois à l’occasion de sa restauration en 4K. Soviétique, et pourtant, pas question de propagande même si nous pouvions l’imaginer car ce film se passe dans le cadre de la Seconde Guerre Mondiale.  Le film se concentre sur Veronika et Boris, Boris est volontaire pour aller sur le front laissant donc Veronika derrière-lui. L’intérêt du film et la marque que ce film a laissé sur le cinéma soviétique ne repose pas sur l’histoire qui peut paraitre ‘’classique’’ mais sur les plans, les techniques utilisées par le réalisateur novatrices à l’époque et bien sûr, l’acteur et l’actrice principaux qui jouent merveilleusement bien. Le film sait retranscrire les émotions humaines en particulier dans une situation et un amour si intense. Ce film marque un renouveau dans le cinéma soviétique de l’époque et j’espère que les cigognes ne feront pas que passer mais sauront vous faire migrer avec elle, dans la vie de deux jeunes amoureux durant une des périodes les plus marquantes du XXème siècle.','2021-09-13',17,2,array['Drame','Romance','Guerre'],array['Pусский'],array['Soviet Union']);
SELECT new_movie('Au Revoir à Jamais','The Long Kiss Goodnight','https://image.tmdb.org/t/p/original/8ska2itChnsOs3CJcILR6SFoTno.jpg',array['Renny Harlin'],'1996-10-11','121',array['Geena Davis','Samuel L. Jackson','Yvonne Zima','Craig Bierko','Brian Cox'],'Au menu cette semaine, penchons-nous sur le cas Au Revoir À Jamais de Renny Harlin (1996). Harlin c''est ce cinéaste ultra-bourrin qui a produit des classiques décérébrés en pleine période d''actionner idiot. Souvent gores, assez vilains, ses films détonnent par ce rapport décomplexé à la violence jouissive, largement illustrée dans Die Hard 2, Freddy 4, Peur Bleu et surtout l''inoubliable (et super con) Cliffhanger. Un monument de nos regrettés vidéo-clubs.
Mais Harlin c''est aussi à la ville le compagnon de Geena Davis, sa muse, à qui il va consacrer deux films L''Île Aux Pirates et Au Revoir à Jamais.
Un script de Shane Black mettant en scène une femme lambda qui se découvre un passé enfoui de super espionne et qui se retrouve à botter des culs par bus entiers, accompagné du roublard Samuel L. Jackson.
De mémoire c''est mon film préféré de Harlin et ça me fait plaisir de partager ça avec vous (et de le revoir).
On est donc très très loin du film proposé la semaine dernière par @Fariboles, mais dans quelque chose de plus récréatif et bassement jouissif.
Bonne séance !','2021-09-23',2,2,array['Crime','Action','Mystère','Thriller'],array['English'],array['United States of America']);
SELECT new_movie('The Man from Earth','The Man from Earth','https://image.tmdb.org/t/p/original/th9wi8T4R5iiF5ZJDgFzorIX25C.jpg',array['Richard Schenkman'],'2007-06-10','87',array['David Lee Smith','Tony Todd','John Billingsley','Ellen Crawford','Annika Peterson'],'Le film proposé est The Man from Earth (2007) par Richard Schenkenman.
Pour être honnête, je ne l''ai pas vu, mais c''est un collègue qui m''a dit qu''il avait adoré.
Le film est dispo gratuitement en VO sous-titré VO sur le site de plex ( https://watch.plex.tv/movie/the-man-from-earth ) (avec pub?).
Notez que ''le producteur Eric D. Wilkinson a remercié un site de piratage qui propose ce film en torrent'' et que ''Le réalisateur a confirmé les propos de son producteur, et a souligné qu''ils acceptaient tous deux l''idée d''être piratés, mais en encourageant en contrepartie les internautes du monde entier, qui n''ont pas accès au DVD, à faire un don'' (source wiki).
La suite a même été mise à disposition par les créateurs eux-même sur pirate bay.','2021-09-27',7,2,array['Science-Fiction','Drame'],array['English'],array['United States of America']);
SELECT new_movie('Qui veut la peau de Roger Rabbit ?','Who Framed Roger Rabbit','https://image.tmdb.org/t/p/original/rggLGRuANMRPwYJq0UMlNc7aia7.jpg',array['Robert Zemeckis'],'1988-06-21','103',array['Bob Hoskins','Charles Fleischer','Christopher Lloyd','Joanna Cassidy','Kathleen Turner'],'BONJOUR
Comme chacun sait, les films avec des vrais gens, c''est pour les grands, et les dessins animés, c''est pour les enfants, c''est comme ça et puis C''EST TOUT.
Fort heureusement, monsieur Robert Zemeckis a souhaité en 1988 réunir tous ces âges dans une même salle de cinéma, c''est pour cette raison qu''il a réalisé le film de la semaine.
QUI VEUT LA PEAU DE ROGER RABBIT, et non pas une contrepèterie douteuse, je vous vois dans le fond bande de fouines
C''est l''histoire d''un lapin qui discute avec des vrais gens, nous y croiserons des balles qui parlent, des années 50 et PAS LA TREMPETTE !
Dedans y''a Bob Hoskins qui joue l''humain et Roger Rabbit c''est le lapin. Doc c''est le méchant mais il veut pas remonter le temps cette fois-ci. Et Dumbo c''est Dumbo.
Si vous aimez le film ou si vous souhaitez en savoir + (comme Disney) avec de vraies infos bien plus documentées et véridiques que celles que j''ai énoncées, allez voir cette vidéo de Mr Mea → https://www.youtube.com/watch?v=8iTdey8FcQA
Si vous restez sur votre faim et voulez toujours plus de cartoons, 3 courts métrages promotionnel avaient été réalisés en même temps (trouvables sur les internets globaux).','2021-10-04',16,2,array['Fantastique','Animation','Comédie','Crime','Familial'],array['English'],array['United States of America']);
SELECT new_movie('Et la Terre survivra','Silent Running','https://image.tmdb.org/t/p/original/uWoj7EfHBprcssXUzCCWeI383Tx.jpg',array['Douglas Trumbull'],'1972-03-09','89',array['Bruce Dern','Cliff Potts','Ron Rifkin','Jesse Vint','Steven Brown'],'En cette période pleine de joie et de bonne humeur, où le dernier rapport du GIEC sert de presse-papier pour les élites politiques et où la science-fiction télévisuelle et cinématographique regorge d’inventivité pour parler de crise écologique sans en parler, je propose ce petit film, ce modeste projet très personnel de Douglas Trumbull, un brin naïf, pas forcément culte, au budget fauché mais qui a le mérite de parler d’écologie bien avant que ce soit « cool ».
Il fait parti de ces films pour lesquels je ressens toujours une immense bouffée nostalgique, je devais avoir 11 ans quand je suis tombé sur le dvd du film au vidéoclub. Le gosse que j’étais était captivé par la solitude qui se dégageait de l''œuvre. Je l''ai revu avec des yeux d''adultes il y a 10 ans et malgré le fait que le film soit très ancré dans son époque, je n''ai pas pu m''empêcher d''avoir une forme de tendresse pour ce film.','2021-10-11',25,2,array['Aventure','Science-Fiction'],array['English'],array['United States of America']);
SELECT new_movie('Titan A.E.','Titan A.E.','https://image.tmdb.org/t/p/original/lWyoSh33Nl13avncPwcd0mAFb0D.jpg',array['Gary Goldman','Don Bluth'],'2000-06-16','94',array['Matt Damon','Bill Pullman','Drew Barrymore','John Leguizamo','Nathan Lane'],'J''aurai moins le temps lundi alors j''anticipe un peu pour poster ma proposition de la semaine prochaine.
J''avais pas mal d''idées mais pas forcément toutes facilement regardable de manière légale quand il m''est venu l''envie de revoir un film que je n''ai pas vu depuis très longtemps et que j''avais souvent regardé durant les années suivant sa sortie.
Ce film c''est Titan AE, film d''animation de la FOX de 2000 avec Don Bluth à la réalisation. Acheté un peu au hasard par mon frère à l''époque du début des lecteurs DVD et qu''on avait beaucoup apprécié.
Paradoxalement je n''aurai pas grand chose à en dire maintenant, c''est de la science fiction, c''était fun et efficace mais je ne sais pas comment il a supporté le poids des années ni quel regard porterai dessus quelqu''un qui le découvre aujourd''hui. Mes souvenirs me font penser que ça vous fera un visionnage divertissant et je suis curieux de savoir ce que vous allez en penser.
Pour la première je suis parti sur quelque chose d''inoffensif, voire inconséquent xD','2021-10-16',26,2,array['Animation','Action','Science-Fiction','Familial','Aventure'],array['English','普通话'],array['United States of America']);
SELECT new_movie('Assurance sur la mort','Double Indemnity','https://image.tmdb.org/t/p/original/3hNFFzH9EhaK4jia9ayBDUpJup4.jpg',array['Billy Wilder'],'1944-06-14','107',array['Fred MacMurray','Barbara Stanwyck','Edward G. Robinson','Porter Hall','Richard Gaines'],'Bonjour tout le monde ! Au menu cette semaine, je vous propose le visionnage d''un classique parmi les classiques, avec Double Indemnity, du grand Billy Wilder. Traduit en français par Assurance sur la Mort, ce film de 1944 relate la mue d''un banal agent d''assurance tombé sous le charme d''une épouse vénale en meurtrier calculateur. Il est régulièrement cité parmi les plus illustres représentants du film noir, pour en avoir établi certaines bases et installé des codes devenus incontournables :
- Chronologie éclatée avec l''utilisation de flashbacks, et surtout la résolution dévoilée au spectateur dès la séquence d''introduction;
- Narration en voix off;
- Point de vue du meurtrier;
- Esthétique des jeux de lumières à travers les persiennes, qui deviendront un standard absolu du genre.
Mais, au-delà des codes posés pratiquement involontairement par Billy Wilder (qui, de son propre aveu, avait simplement travaillé à un film qu''il aurait lui-même voulu voir), Double Indemnity a par ailleurs été marqué par une production houleuse et des anecdotes croustillantes :
- Les trois acteurs principaux avaient initialement refusé les rôles proposés, et Wilder a dû user de stratégies diverses (séduction, négociations secrètes avec Paramount qui a forcé son acteur en pensant ''lui donner une leçon'') pour arriver à ses fins;
- Wilder fit appel à l''immense Raymond Chandler pour les dialogues. La collaboration fut certes fructueuse à l''écran, mais si houleuse en coulisses qu''elle fit replonger Chandler dans l''alcoolisme, et inspira à Wilder son film suivant, sur... un écrivain alcoolique en panne d''inspiration.
- Chandler apparaît brièvement dans le film, ce qui en fait le seul témoignage vidéo connu de l''écrivain !
- Proposant des scènes d''une grande sensualité (la descente de l''escalier en peignoir, le bracelet de cheville...), le film se vit plusieurs fois retoqué par le Code Hays, qui obtint la modification de la fin initialement prévue au script, mais concéda que l''on raconte dans le détail la conception d''un meurtre, une grande première au cinéma US.
- Le film a eu une énorme influence sur l''industrie en ouvrant la voie à des récits centrés sur des ''anti-héros'', ou en tout cas des héros amoraux.
Vous l''aurez compris, voilà un grand film que j''aime profondément. D''abord parce qu''à mes yeux il conserve une réelle fluidité qui n''atténue en rien le plaisir malgré les années, mais aussi parce que, contrairement à d''autres grands représentants du film noir parfois plus baroques et grandiloquents, il est ancré dans un certain réalisme (la banalité du monde administratif des assurances), et saisit avec beaucoup de lucidité un monde amoral, dans lequel tout se monnaie, jusqu''à la mort.','2021-10-25',21,2,array['Crime','Drame','Mystère','Thriller'],array['English'],array['United States of America']);
SELECT new_movie('The Strangers','곡성','https://image.tmdb.org/t/p/original/7BQ2qdN6mvPdjbo0ZzMnHSNplSJ.jpg',array['Na Hong-jin'],'2016-05-12','146',array['Kwak Do-won','Hwang Jung-min','Chun Woo-hee','Jun Kunimura','Kim Hwan-hee'],'Difficile de passer après @Seurcha  mais c’est malgré tout à moi qu’incombe aujourd’hui la lourde tache de vous proposer un film !
Fi des années 40’, c’est aujourd’hui un film de 2016 que je vous propose.
The Strangers est un film de Na Hong-jin, réalisateur de The Chaser et de  the Murderer et prochainement de The Medium.
On y suit Jong Goo, un flic bedonnant d’une petite bourgade de la Corée rurale, un peu looser, un peu feignant et qui se satisfait parfaitement de sa petite vie sans relief jusqu’à ce qu’une série de meurtres assez degueu accompagnée d’une épidémie de fièvre vienne foutre le bordel.
Le film est long, cela dure 2h30. Certains ont qualifié la première heure de chiante mais perso je trouve que ça ne s‘arrête jamais, le film entremêle plusieurs genres et multiplie les fausses pistes avant de sombrer dans la noirceur bien crasse (je n’en dis pas plus !), le tout dans un écrin d’images magnifiques avec une photographie que j’ai trouvé superbe.
Pas grand-chose à ajouter si ce n’est que le film est dispo en vod sur Amazon Prime mais malheureusement uniquement en vf (je en comprendrais jamais cette politique..)
Bon visionnage !','2021-11-02',27,2,array['Horreur','Mystère'],array['日本語','한국어/조선말'],array['South Korea']);
SELECT new_movie('J''ai rencontré le Diable','악마를 보았다','https://image.tmdb.org/t/p/original/wE0j7sqbpOJwGviVjETfixJSS2s.jpg',array['Kim Jee-woon'],'2010-08-12','142',array['Lee Byung-hun','Choi Min-sik','Jeon Kuk-hwan','Cheon Ho-jin','Oh San-ha'],'Alors comme c''est à mon tour de m''y coller, je vous propose de continuer sur la lancée du cinéma Sud-coréen qui frappe fort avec J''ai rencontré le diable.
Le film raconte l''histoire d''une vengeance et d''une descente aux enfers. Un tueur en série commet l''erreur de tuer la petite amie d''un membre des forces spéciales.
Au fil du récit, on plonge dans une espèce d''abime au cœur de la noirceur de l''âme humaine avec cette question en toile de fond : jusqu''où peut-on aller pour assouvir sa vengeance ? Faut-il être prêt à abandonner son humanité pour se débarrasser d''un monstre ?
Je ne l''ai pas vu depuis un bon moment mais je me souviens l''avoir trouvé haletant sur la forme (malgré une narration qui prend son temps pour poser une ambiance lourde) et très intéressant dans son propos.
Le film est dispo sur Prime (seulement VF, arf) ou sur Shadowz (vous pouvez profiter d''un premier mois gratuit, c''est toujours appréciable).','2021-11-08',28,2,array['Thriller','Horreur'],array['한국어/조선말'],array['South Korea']);
SELECT new_movie('Free Guy','Free Guy','https://image.tmdb.org/t/p/original/lG7Rv88OANLVbeR6Zymlid1cRuk.jpg',array['Shawn Levy'],'2021-08-11','115',array['Ryan Reynolds','Jodie Comer','Joe Keery','Lil Rel Howery','Utkarsh Ambudkar'],'Cette semaine, je vous propose un film bien plus léger, un film par un réalisateur qui se plait au musée, par un acteur qui déchire sa race de part sa bouille, par une actrice mère de Rey (que je ne connais d’ailleurs pas), je veux parler de Free Guy !
Qui n’a jamais rêvé·e d’être le ou la NPC annexe qui ne donne même pas de quête dans Wow ? Ce film est fait pour toi ! ','2021-11-15',9,2,array['Comédie','Action','Aventure','Science-Fiction'],array['English','日本語'],array['United States of America']);
SELECT new_movie('Samsara','Samsara','https://image.tmdb.org/t/p/original/qodkea4k0pNUmNTl5TJO2PdTqgW.jpg',array['Ron Fricke'],'2011-09-16','102',array['Ni Made Megahadi Pratiwi','Puti Sri Candra Dewi','Putu Dinda Pratika','Marcos Luna','Hiroshi Ishiguro'],'Comme les helvètes sont les seuls (avec les belges) à avoir accès à Free Guy, je propose un autre film « léger ». Cette fois-ci, je ne vous propose pas une légèreté dans le font du film, mais dans la narration. Le film de cette semaine, est un film contemplatif, une déconnexion de votre quotidien. C’est Samsara (2011).','2021-11-16',9,2,array['Documentaire'],array['No Language'],array['Brazil','China','Denmark','Egypt','Ethiopia','Ghana','Indonesia','Italy','Japan','Jordan','Namibia','Saudi Arabia','South Korea','Thailand','United Arab Emirates','United States of America']);
SELECT new_movie('The Game','The Game','https://image.tmdb.org/t/p/original/2sUcLRG3ZwE8JOrCzk3M6GyCsTx.jpg',array['David Fincher'],'1997-09-12','129',array['Michael Douglas','Sean Penn','Deborah Kara Unger','James Rebhorn','Spike Jonze'],'Eh bien jeunes gens, nostalgique de cette récente époque où je pouvais regarder des films (vous inquiétez pas, ça reviendra), je me suis mis à repenser à The Game de David Fincher, l''un de ses films que je préfère et qui me semble pourtant sous-coté. 
On y retrouve Michael Douglas dans le rôle de Nicholas Van Orton, un homme d''affaire riche en fin de quarantaine à la vie bien rangée, peut-être trop, à tel point qu''il semble s''engouffrer dans une introspection funeste, pensant au suicide de son père lorsqu''il avait le même âge. Son seul lien avec le commun des mortels est son agaçant et chaotique jeune frère Conrad (Sean Penn), qui propose à Nicholas de se décoincer un coup en participant à un jeu. Du jour au lendemain, la structure quotidienne de Nicholas s''effondre tandis qu''il réalise que le jeu dans lequel il s''est lancé pourrait s''avérer extrêmement dangereux.
J''adore ce thriller psychologique car il nous plonge brillamment dans la psyché de son antihéros. On ressent son isolement, sa paranoïa, son désespoir et toutes les émotions qui le submergent à la fin, qui n''est pas exempte de défauts que je lui pardonne volontiers. Michael Douglas était l''acteur parfait pour ce personnage antipathique pour qui on se prend toutefois d''empathie. J''ai très envie de le revoir et vous invite donc à le faire pour moi...','2021-11-22',22,2,array['Drame','Thriller','Mystère'],array['广州话 / 廣州話','Deutsch','English'],array['United States of America']);
SELECT new_movie('Mutafukaz','Mutafukaz','https://image.tmdb.org/t/p/original/lwnkzrfBYXDK4JzQsTzSNjFNJVY.jpg',array['Shoujirou Nishimi','Guillaume Renard'],'2018-05-23','93',array['Orelsan','Gringe','Redouanne Harjane','Féodor Atkine','Kelly Marot'],'Cette semaine, je remonte le quota ''film d''animation'' de Cinévorace avec Mutafukaz . J''ai cru comprendre que certains aiment bien ça en plus (coucou Arcanes). Je n''ai moi même pas vu ce film, donc je me suis dis que c''était l''occasion. Je ne connais pas particulièrement les univers de l''auteur (Guillaume Renard, alias Run), mais le monsieur semble avoir une affection pour les histoires de gangs, les petits frappes et des personnages qui sont souvent des losers.
Synopsis : Angelino est un jeune loser parmi tant d’autres à Dark Meat City, une mégalopole sans pitié sous le soleil de Californie. La journée, il livre des pizzas dans tous les recoins de la ville et la nuit, il squatte une chambre d’hôtel minable avec son coloc Vinz et une armada de cafards qui font désormais un peu partie de sa famille. À la suite d’un accident de scooter lorsque son chemin a croisé par inadvertance la divine Luna, une fille aux cheveux noir de jais, notre jeune lascar commence à souffrir de maux de tête et d’étranges hallucinations. Des hallucinations, vous avez dit ? Hmm, peut-être pas... Pourchassé par des hommes en noir, Angelino n’a plus aucun doute : il est pris pour cible. Mais pourquoi lui ?','2021-11-29',20,2,array['Science-Fiction','Animation','Action','Crime'],array['Français'],array['France','Japan']);
SELECT new_movie('Annihilation','Annihilation','https://image.tmdb.org/t/p/original/wkg01fefEWL7GMec8J7QaaQ6XFK.jpg',array['Alex Garland'],'2018-02-22','115',array['Natalie Portman','Jennifer Jason Leigh','Gina Rodriguez','Tessa Thompson','Tuva Novotny'],'Bonjour à toutes et à tous. Si je ne me trompe pas de lieu pour publier, je propose pour cette semaine le visionnage de Annihilation d’Alex Garland d’après le roman de Jeff VanderMeer. Bon film.','2021-12-06',29,2,array['Science-Fiction','Horreur'],array['English'],array['United Kingdom','United States of America']);
SELECT new_movie('Paterson','Paterson','https://image.tmdb.org/t/p/original/AuJ1ZlfqwuAr9H5Qr1U9KILylse.jpg',array['Jim Jarmusch'],'2016-11-17','118',array['Adam Driver','Golshifteh Farahani','Barry Shabaka Henley','Method Man','Chasten Harmon'],'Bonjour, le film de cette semaine n''est pas un film gris mais un film sur le gris. Je vous proposons Paterson de Jim Jarmusch, avec Kylo Ren ce gros nullos dans le rôle principal et Farahani Golshifteh de la série nulle Invasion. C''est disponible sur la plateforme Prime, de ce gros con de Jeff.','2021-12-13',14,2,array['Comédie','Drame','Romance'],array['English','Italiano'],array['Germany','United States of America','France']);
SELECT new_movie(
  'Père Noël Origines',
  'Rare Exports',
  'https://image.tmdb.org/t/p/original/eWJQaLdVP6TFYc6NTJp4HJAU5Jw.jpg',
  array['Jalmari Helander'],
  '2010-12-03',
  '80',
  array['Per Christian Ellefsen','Jorma Tommila','Tommi Korpela','Onni Tommila','Jonathan Hutchings'],
  'Cette semaine, semaine des fêtes de Noël, je vous propose ''Père Noël Origines'' ou ''Rare Exports: A Christmas Tale'' de Jalmari Helander, film finlando-franco-norvégio-suédois. En Finlande, près de la frontière russo-finlandaise un homme d''affaires engage des chercheurs pour découvrir l''un des plus grands mystères de Noël. Les habitants sont menacés par ce qu''ils découvrent, un jeune garçon apprend la vraie nature du Père Noël et doit trouver un moyen de sauver les habitants et Noël ! C''est sombre, mais pas trop, et ça puise dans le réservoir de la mythologie du Père Noël et ce qui l''entoure. C''est aussi un film sincère et rédempteur sans être trop mesquin. Et si vous êtes d''humeur à casser du vieux (Et pas en salle de cinéma cette fois-ci) vous êtes au bon endroit. C''est un buffet nordique à l''écran.',
  '2021-12-21',
  17,
  2,
  array['Fantastique'],
  array['English','suomi'],
  array['Finland','France','Norway','Sweden'])
;
-- SEASON 3
SELECT new_movie(
  'Okkadu',
  'ఒక్కడు',
  'https://image.tmdb.org/t/p/original/1JU2kNk4D7B5E2sWY2IMbyMqjqe.jpg',
  array['Gunasekhar'],
  '2003-01-15',4
  '170',
  array['Mahesh Babu','Bhumika Chawla','Prakash Raj','Mukesh Rishi','Geetha'],
  'C’est avec grand plaisir que j’ouvre cette saison 3 de Cinévorace grâce à la confiance de Yves Signal. Ayant découvert le Kabaddi avec une série animée nommé Shakunetsu Kabaddi (https://myanimelist.net/anime/42395/Shakunetsu_Kabaddi), je me suis dit, pourquoi ne pas proposer un film sur ce thème. Ils existent plusieurs films sur le sujet, mais je vous propose Okkadu (2003), car il semble avoir de bonnes critiques, bien que malheureusement je crois que le Kabaddi joue un rôle mineur. Le film n’est bien sûr disponible nulle part (sauf Amazone prime aux US/UK?), par contre il est disponible sur YouTube avec des sous-titres anglais uniquement: https://www.youtube.com/watch?v=KbvPhITOhrw Mais grâce à la magie de YouTube, il est possible de faire traduire les sous-titres anglais à la volée en français! (si vous comprenez l''anglais j''éviterais cette option :p)',
  '2022-01-02',
  7,
  3,
  array['Action','Drame'],
  array['తెలుగు'],
  array['India'])
;
SELECT new_movie(
  'La Vie rêvée de Walter Mitty',
  'The Secret Life of Walter Mitty',
  'https://image.tmdb.org/t/p/original/1WKxLcAmM4liIaZ3aLEE123HrJG.jpg',
  array['Ben Stiller'],
  '2013-12-18',
  '114',
  array['Ben Stiller','Kristen Wiig','Sean Penn','Shirley MacLaine','Adam Scott'],
  'Au menu de cette semaine je vous propose un film disponible sur Disney +, La vie rêvée de Walter Mitty avec Ben Stiller et réalisé par lui même en 2013 ( 2013? put*** déjà? Fichtre...). C''est un film que j''avais découvert sans rien en connaître, hormis l''acteur principal que j''aime beaucoup et ce fut un visionnage très agréable. Je vous colle un résumé osef trouvé sur allo ciné pour le principe mais franchement vous focalisez pas là dessus et allez y en yolo comme moi. Walter Mitty est un homme ordinaire, enfermé dans son quotidien, qui n’ose s’évader qu’à travers des rêves à la fois drôles et extravagants. Mais confronté à une difficulté dans sa vie professionnelle, Walter doit trouver le courage de passer à l''action dans le monde réel. Il embarque alors dans un périple incroyable, pour vivre une aventure bien plus riche que tout ce qu''il aurait pu imaginer jusqu’ici. Et qui devrait changer sa vie à jamais.',
  '2022-01-10',
  26,
  3,
  array['Aventure','Comédie','Drame','Fantastique'],
  array['English','Íslenska','Español'],array['United States of America','United Kingdom'])
;
SELECT new_movie(
  'The Descent',
  'The Descent',
  'https://image.tmdb.org/t/p/original/gCsVUf2HyfYub0IwByeJ9Ld4dLQ.jpg',
  array['Neil Marshall'],
  '2005-07-08',
  '109',
  array['Shauna Macdonald','Natalie Mendoza','Alex Reid','MyAnna Buring','Saskia Mulder'],
  'Pour cette semaine je vous propose The Descent, un film de Neil Marshall (2005). Pour le pitch c’est un groupe de copines qui s’embarque dans l’exploration d’une cavité souterraine à l’occasion d’un week-end de retrouvailles entre amatrices d’activités nature et d’adrénaline. Mais, spoiler alert : ça tourne mal ! Je n’en dis pas beaucoup plus pour vous laisser découvrir le film. J’ai beaucoup aimé son ambiance générale qui évolue au cours du temps. PS : Je vous le déconseille si vous prévoyez une sortie spéléo ce week-end...',
  '2022-01-17',
  10,
  3,
  array['Aventure','Horreur'],array['English'],array['United Kingdom'])
;
SELECT new_movie(
  'Le Corbeau',
  'Le Corbeau',
  'https://image.tmdb.org/t/p/original/wM87JtxQqD0bq8xyAvlmuNbI66B.jpg',
  array['Henri-Georges Clouzot'],
  '1943-09-28',
  '92',
  array['Pierre Fresnay','Ginette Leclerc','Micheline Francey','Héléna Manson','Jeanne Fusier-Gir'],
  'Bonjour tout le monde ! Cette semaine, je vous propose de souffler la poussière sur l''étagère des classiques, pour dégager un film au contexte sulfureux et ô combien débattu, mais qui me semble constituer un jalon important bien que souvent oublié de l''histoire du cinéma français. Retour en 1943, donc, pour Le Corbeau, d''Henri-Georges Clouzot. Impossible de passer sous silence le contexte de sortie du film : produit en plein cœur de l''occupation par la Continental, passée sous pavillon allemand et dirigée par Alfred Greven - chargé en ligne directe par Goebbels de superviser toute la production cinématographique française pour l''en dépouiller de tout message politique au profit du divertissement le plus inoffensif -, le film relate l''enquête d''un médecin fraîchement nommé dans un petit village français pour retrouver l''auteur anonyme de lettres de dénonciation qui sèment la panique, la rancœur et le chaos parmi les habitants. Inspiré d''un fait réel, le scénario parviendra à franchir tous les barrages de la censure nazie, sous le prétexte de ne jamais faire intervenir l''occupant, de se concentrer sur une intrigue purement française, pour finalement s''attirer les foudres tant des collabos (qui y virent, assez justement, une dénonciation de la délation) que des résistants, qui bannirent Clouzot dès la Libération de toute possibilité de travailler en France, avant que son sort ne soit revu et sauvé quelques années plus tard par quelques intellectuels et artistes, qui parvinrent à le réhabiliter. On pourrait entrer bien plus en détail dans la carrière de Clouzot, son travail sous l''occupation qui ne l''empêcha pourtant pas de développer des thèmes honnis tant par la censure que la bonne société conservatrice, mais je laisse peut-être cela pour la prochaine Grande Bouffe. Car au-delà de la polémique historique, Le Corbeau est un grand film, chers amis ! Véritable jeu de massacre, peinture d''un effondrement des valeurs au sein d''un groupe d''individus où la justice est impuissante et laisse place à la vengeance personnelle, tableau grisant mais glaçant de l''ambigüité humaine et de la part d''ombre ancrée en chacun de nous, il s''agit non seulement d''un discours philosophique passionnant de complexité et de profondeur, mais également d''une belle leçon de mise en scène. Dans un noir et blanc de grande qualité, Clouzot déploie une solide science du cadre et du récit visuel, comme cette scène mémorable d''une lampe qui se balance (je n''en dis pas plus), et offre à Pierre Fresnay un très grand rôle. Bon visionnage !',
  '2022-01-24',
  21,
  3,
  array['Drame','Thriller','Crime','Mystère'],
  array['Français'],
  array['France'])
;
SELECT new_movie(
  'Train de vie',
  'Train de vie',
  'https://image.tmdb.org/t/p/original/3KtZfqNpUXPJkF4OYqNhELbH6ep.jpg',
  array['Radu Mihăileanu'],
  '1998-09-16',
  '103',
  array['Lionel Abelanski','Rufus','Clément Harari','Agathe de La Fontaine','Michel Muller'],
  'Malheureusement, l’actualité étant par moment toujours la même qu’il y a 80 ans, je vous propose un film comique sur ce thème pas très joyeux que fut la déportation, je vous propose Train de vie (1998) réalisé par Radu Mihaileanu. Attention, mon premier visionnage date d’il y a plus de 20 ans ! (aïe), mais j’en garde plutôt un bon souvenir, on verra ce que ça va donner. En toute cas, je suis ravi de le redécouvrir avec mon regard de vieux et de le partager avec vous. En effet, il me semble qu’il soit vite rentré dans l’oubli le plus total. Ou le voir ? Et ben c’est très compliqué, il me semble qu’il soit introuvable, c’est ça de tomber dans l’oubli. Alors n’hésitez pas à MP pour un prêt. @Morbo sapin roi des gorets, tu devrais trouver quelques rouflaquettes.',
  '2022-01-30',
  9,
  3,
  array['Drame','Comédie','Guerre'],
  array['Deutsch','Français'],
  array['Belgium','Israel','Netherlands','Romania','France'])
;
SELECT new_movie(
  'Take Shelter',
  'Take Shelter',
  'https://image.tmdb.org/t/p/original/pnKTLhnxQttndOFZgyaHv08RgrY.jpg',
  array['Jeff Nichols'],
  '2011-09-30',
  '120',
  array['Michael Shannon','Jessica Chastain','Katy Mixon','Shea Whigham','Ray McKinnon'],
  'Salut tout le monde ! J''ai longuement hésité concernant le film de la semaine. 12 Hommes en Colère, Equilibrium, The Mist, The Frighteners ou encore le director''s cut de Daredevil (ne riez pas trop vite, ce film, loin d''être parfait, a subi une grosse injustice à sa sortie à cause de la prod) auraient pu être proposés mais je reste finalement sur le choix qui s''est imposé initialement : Take Shelter écrit et réalisé par Jeff Nichols, un de mes cinéastes préférés (et accessoirement un de mes films préférés). On y retrouve Michael Shannon dans le rôle de Curtis LaForche, un père de famille dans une banlieue de province qui est de plus en plus en proie à des visions apocalyptiques. Un problème qu''il tente de cacher à sa femme Samantha (Jessica Chastain), se réfugiant physiquement et mentalement dans la construction d''un abri sous le jardin afin de préserver sa femme et sa fille malentendante d''une apocalypse imminente. Je ne souhaite vraiment pas en dire plus afin de ne pas ternir d''une quelconque façon votre visionnage. J''ai très hâte d''avoir vos retours et surtout de discuter du film.',
  '2022-02-07',
  22,
  3,
  array['Thriller','Drame','Horreur'],
  array['English'],
  array['United States of America'])
;
SELECT new_movie(
  'Gone Girl',
  'Gone Girl',
  'https://image.tmdb.org/t/p/original/7xkJ1ACu40BjzLHVPRILWjFvW7.jpg',
  array['David Fincher'],
  '2014-10-01',
  '145',
  array['Ben Affleck','Rosamund Pike','Neil Patrick Harris','Tyler Perry','Carrie Coon'],
  'Ce jour de Saint-Valentin je vous propose de voir ou revoir l''une des plus belle histoire d''amour du cinéma moderne : Gone Girl (2014) de David Fincher d''après l''œuvre de Gillian Flynn. Le pitch : Ben et Rosamund se kiffent trop, mais un jour… Si avec ça vous n''avez pas envie de le voir c''est que vous êtes biens difficiles.',
  '2022-02-14',
  14,
  3,
  array['Mystère','Thriller','Drame'],
  array['English'],
  array['United States of America'])
;
SELECT new_movie(
  'Copland',
  'Cop Land',
  'https://image.tmdb.org/t/p/original/zp2vxJVMkSSyoaF4vX6P9pLLtt0.jpg',
  array['James Mangold'],
  '1997-08-15',
  '104',
  array['Sylvester Stallone','Harvey Keitel','Ray Liotta','Robert De Niro','Peter Berg'],
  'Bonjour à tous, pour cette semaine, je vous propose de voir (ou de revoir) Copland de James Mangold (Ford vs Ferrari, Logan, Walk the Line), sorti en 1997. C''est son deuxième film en tant que réalisateur, et il se retrouve déjà avec un gros casting, notamment avec De Niro, Stallone, Keitel, ou Ray Liotta. Synopsis:  Garrison, cité-dortoir du New Jersey, est surnommée «Copland», en raison des nombreux policiers new-yorkais qui y habitent. Freddy Heflin, le shérif de Garrison, rêve d''intégrer la police de New York. Lorsque Murray Babitch, un jeune officier, tue deux Noirs, Heflin découvre un vaste réseau de corruption...',
  '2022-02-21',
  30,
  3,
  array['Action','Crime','Drame'],
  array['English'],
  array['United States of America'])
;
SELECT new_movie(
  'Victoria',
  'Victoria',
  'https://image.tmdb.org/t/p/original/wWMDg02KtaB9Pa4UC1OmJkKL0hV.jpg',
  array['Sebastian Schipper'],
  '2015-06-11',
  '138',
  array['Laia Costa','Frederick Lau','Franz Rogowski','Burak Yiğit','Max Mauff'],
  'Salut à tous ! Pour cette semaine je vous propose Victoria de Sebastian Schipper. Victoria ça raconte l''histoire d''une jeune femme espagnole, fraîchement débarquée à Berlin, qui se laisse embarquer par quatre garçons dans une virée nocturne qui va rapidement déraper. Mais c''est surtout un impressionnant plan séquence de plus de deux heures qui m''avait scotché lors de mon premier visionnage. Voilà pourquoi je vous propose de le découvrir ou le redécouvrir aujourd''hui.',
  '2022-02-28',
  31,
  3,
  array['Crime','Thriller','Romance'],
  array['Deutsch','Español','English'],
  array['Germany'])
;
SELECT new_movie(
  'The Power of the Dog','The Power of the Dog',
  'https://image.tmdb.org/t/p/original/uJauPbe1UWaAfJB7UBOM2jDBEAT.jpg',
  array['Jane Campion'],
  '2021-11-17',
  '125',
  array['Benedict Cumberbatch','Kodi Smit-McPhee','Kirsten Dunst','Jesse Plemons','Thomasin McKenzie'],
  'Cette semaine je vous propose de découvrir la dernière oeuvre d''une grande cinéaste : Jane Campion. Habituée des festival, c''est une des figures féminines majeures  du cinéma contemporain qui a su, je le pense, tirer partie d''une formation académique en anthropologie pour sonder et restituer sa perception de l''âme humaine et la complexité des relations sociales. Après deux saisons de Top of The Lake, Campion revient au ''cinéma'' (c''est une production Netflix) et adapte The Power of the Dog (2021), un drame qui s''attache à traiter de la masculinité toxique, dans le milieu des garçons vachers du Montana en dans les années 20 (celles de l''autre siècle). C''est l''occasion pour moi, je l''espère, de me réconcilier avec un cinéma qui m''a toujours soufflé le chaud et le froid. Sachant qu''au pire, les plaines néo-zélandaises vaudront malgré tout le temps investi. Côté palmarès, la coqueluche des festivals a récolté le lion d''argent du meilleur réalisateur à Venise, 3 Golden Globes et 12 nominations aux Oscars, si tant est que les événements d''auto-congratulation soient signifiants et des indicateurs fiables et pertinents. Bonne semaine et bon film !',
  '2022-03-09',
  2,
  3,
  array['Drame','Western'],
  array['English'],
  array['Australia','Canada','Greece','New Zealand','United Kingdom'])
;
SELECT new_movie(
  'Ascenseur pour l''échafaud',
  'Ascenseur pour l''échafaud',
  'https://image.tmdb.org/t/p/original/r6iFAvndVjJmGBK955zL0gwGtuq.jpg',
  array['Louis Malle'],
  '1958-01-29',
  '88',
  array['Jeanne Moreau','Maurice Ronet','Georges Poujouly','Yori Bertin','Lino Ventura'],
  'Bonjour à tous. Cette semaine, je vous propose Ascenseur pour l’échafaud de Louis Malle. Je ne l’ai jamais vu mais j’ai effleuré la filmographie de son réalisateur et à chaque fois ça a fait mouche. Il est considéré comme l’un des premiers films de la nouvelle vague et comme un grand film noir. Casting impressionnant, musique de Miles Davis, à priori peu de chance que je sois déçu. Hâte de découvrir ça avec vous. Bon visionnage ! (J’ai hésité avec Le Voleur du même Louis Malle mais il était beaucoup moins dispo. Je le recommande chaudement, c’est un de mes films préférés. Belmondo y est parfait).',
  '2022-03-15',
  1,
  3,
  array['Crime','Drame','Thriller'],
  array['Deutsch','Français'],
  array['France'])
;
SELECT new_movie(
  'Memories of Murder',
  '살인의 추억',
  'https://image.tmdb.org/t/p/original/fz5NYI8PUmPplu3UA70AOqEDJL7.jpg',
  array['Bong Joon-ho'],
  '2003-05-02',
  '129',
  array['Song Kang-ho','Kim Sang-kyung','Kim Roi-ha','Jae-ho Song','Park Hae-il'],
  'Je profite de ce début de printemps pour vous proposer un film de saison. Memories of Murder, puisque c''est de lui qu''il s''agit, est un film de Corée du Sud, dirigé par Bong Joon-Ho. Sortit en 2003, en pleine canicule ou presque, il narre la traque d''un individu peu recommandable par un duo de policier moustachus.',
  '2022-03-21',
  14,
  3,
  array['Crime','Drame','Thriller'],
  array['한국어/조선말','English'],
  array['South Korea'])
;
SELECT new_movie(
  'Ali',
  'Ali',
  'https://image.tmdb.org/t/p/original/7qJmvv6vIs810icshXo0FeEqGuc.jpg',
  array['Michael Mann'],
  '2001-12-10',
  '157',
  array['Will Smith','Jamie Foxx','Jon Voight','Mario Van Peebles','Ron Silver'],
  'Bonjour à tous, au vu de l’actualité, cette semaine je vous propose Ali de Michael Mann, sorti en 2001. Considéré comme un des meilleurs biopics, il raconte la vie de Mohamed Ali en se focalisant sur sa vie entre 64 et 74. Peut-être le meilleur rôle de Will Smith et Michael Mann derrière la caméra, ça ne peut être qu’un bon film.',
  '2022-03-29',
  30,
  3,
  array['Drame'],
  array['English'],
  array['South Africa','United States of America'])
;
SELECT new_movie(
  'tick, tick... BOOM!',
  'tick, tick... BOOM!',
  'https://image.tmdb.org/t/p/original/wopPaXrewT53omRIqaSK3cRXOQX.jpg',
  array['Lin-Manuel Miranda'],
  '2021-11-11',
  '115',
  array['Andrew Garfield','Alexandra Shipp','Robin de Jesús','Vanessa Hudgens','Joshua Henry'],
  'Cette semaine on se trémousse devant Tick, Tick... Boom! un film avec des chansons qui dansent, de Lin-Manuel Miranda, basé sur la comédie musicale de Jonathan Larson. Y a l''ex de Gwen Stacy dedans et la fille qui jouait Kelly dans Bad Boys for life avec Will. Forcément ça donne super envie à tout le monde. En plus c''est un film Netflix. Un gage de qualité.',
  '2022-04-06',
  14,
  3,
  array['Drame'],
  array['English','Español'],
  array['United States of America'])
;
SELECT new_movie(
  'Kate',
  'Kate',
  'https://image.tmdb.org/t/p/original/3P2DglSM20g8B27OQn3Ge4yM2Gz.jpg',
  array['Cedric Nicolas-Troyan'],
  '2021-09-10',
  '106',
  array['Mary Elizabeth Winstead','Woody Harrelson','Tadanobu Asano','Miku Martineau','Jun Kunimura'],
  'Cette semaine, fi de la musique, fi de la poesie, on balance des pruneaux et on botte des culs avec KATE de Cédric Nicolas-Troyan, exclu Netflix sortie en 2021 ou comment surfer sur la vague John Wick mais au féminin avec Mary Elisabeth Winstead dans le rôle titre.',
  '2022-04-11',
  27,
  3,
  array['Action'],
  array['English','日本語'],
  array['Japan','Thailand','United States of America'])
;
SELECT new_movie(
  'Donnie Darko',
  'Donnie Darko',
  'https://image.tmdb.org/t/p/original/z3gIuT4e4tjCKYEYJChcBI44U21.jpg',
  array['Richard Kelly'],
  '2001-10-24',
  '114',
  array['Jake Gyllenhaal','Jena Malone','James Duval','Drew Barrymore','Beth Grant'],
  'Le peuple à parlé, et c''est le lapinou qui l''emporte d''une courte tête. Je vous propose donc de découvrir ou de redécouvrir un de mes films préférés : Donnie Darko Réalisé par Richard Kelly en 2001 avec Jake Gyllenhaal dans le rôle titre, le film raconte la vie d''un adolescent tourmenté dont la vie va basculer après avoir miraculeusement échappé à un accident. C''est disponible sur MyCanal et la plupart des plateformes de location ou en MP pour un prêt. Bon visionnage !',
  '2022-04-18',
  31,
  3,
  array['Fantastique','Drame','Mystère'],
  array['English'],
  array['United States of America'])
;
SELECT new_movie(
  'Doomsday',
  'Doomsday',
  'https://image.tmdb.org/t/p/original/qqz5E5KOz7IUwa2BmU3sGVoFDdC.jpg',
  array['Neil Marshall'],
  '2008-03-14',
  '112',
  array['Rhona Mitra','Bob Hoskins','Adrian Lester','Alexander Siddig','David O''Hara'],
  'Vous n''avez rien vu. On recommence tout depuis le début. Suite à une campagne de vote chaotique comprenant en vrac votes multiples frauduleux, retournement de veste éhonté durant le dépouillement, indécision caractérisée du pouvoir décisionnaire (c''est à dire moi ) je me vois contraint par moi même de prendre des mesures exceptionnelles et drastiques! Encore plus puissant et plus impérieux qu''un 49.3 dégainé par gang de baltringues en costard j''invoque ici et maintenant le point Olive qui tue ! Ce faisant le résultat dudit vote est balayé, outrepassé par le bulletin du fruit dégueulasse sus nommé. Nous allons donc souffrir tous ensemble car c''est donc la vache qui l''emporte! Cette semaine je vous propose donc Doomsday ( de 2008 lui aussi ) réalisé par Neil Marshall sur un scenario de Neil Marshall avec en ''tête'' d''affiche Rhona Mitra ! ''Thriller d''action futuriste'' aussi con qu''un fanzouze, j''en garde à la fois le souvenir d''une séance de cinéma trèèèès longue et éprouvante mais aussi moult facepalm hilarants. Comme je disais un peu plus tôt ce n''est pas un film que j''ai particulièrement envie de revoir mais j''ai par contre très envie d''entendre vos retour dessus. De plus en allant voir la fiche IMDB j''ai été très surpris du 5.9 qu''il se tape, je le voyais beaucoup plus bas que ça. Du coup je suis tout de même curieux de voir quel regard je porterai sur ce film aujourd''hui. Peut-être que mon goût pour le nanard qui s''est depuis développé offrira un semblant de rédemption à ce truc ? Bref Doomsday dispo sur Prime, enjoy! ( Checco, je t''expliquerai pourquoi les meumeu m''ont marquées ensuite )',
  '2022-04-25',
  26,
  3,
  array['Action','Thriller','Science-Fiction'],
  array['English'],
  array['Germany','United Kingdom','United States of America','South Africa'])
;
SELECT new_movie(
  'The Dictator',
  'The Dictator',
  'https://image.tmdb.org/t/p/original/zKcCaWewiEF2XGJDSureoXb2uoo.jpg',
  array['Larry Charles'],
  '2012-05-15',
  '83',
  array['Sacha Baron Cohen','Ben Kingsley','Anna Faris','Jason Mantzoukas','Sayed Badreya'],
  'Je cherchais un film absurde, drôle ou politiquement incorrecte. J’avais d’abord pensé à Tonnerre sous les Tropiques (Tropic Thunder, 2008), mais finalement je l’ai trouvé trop convenu/connu. Alors, j’ai plutôt pensé au Le Fantôme de la liberté (1974) de Buñuel. Mais en le rematant (voyez comme je prends mon travail de proposeur au sérieux), je l’ai trouvé pas assez absurde et drôle, un peu déçu quoi. Alors, je me suis retourné vers ce vieux Chaplin, avec naturellement* Le Dictateur* (The Great Dictator, 1940), que tout le monde connaît, mais que personne n’a réellement vu en entier. Pareil (et ramaté) ce n’est pas un film super drôle/absurde, certes il montre l’absurdité des régimes fascistes, se moque de Hitler et Benito, mais son discours est une mise en garde, qui par les temps qui courent, on en sort le cœur lourd. Bon finalement, j’ai retiré Great, et je vous propose donc plutôt … Le Dictateur (The Dictator, 2012), de Larry Charles, avec naturellement Sacha Cohen ! Niveau humour con, vous serez servi !',
  '2022-05-02',
  9,
  3,
  array['Comédie'],
  array['English','עִבְרִית'],
  array['United States of America'])
;
SELECT new_movie(
  'Chasseurs de Dragons',
  'Chasseurs de dragons',
  'https://image.tmdb.org/t/p/original/gHjcaVaXVqjYItJzjD5Y8YrXh84.jpg',
  array['Guillaume Ivernel','Arthur Qwak'],
  '2008-03-19',
  '82',
  array['Vincent Lindon','Patrick Timsit','Philippe Nahon','Amanda Lear','Marie Drion'],
  'Alors, au menu cette semaine, je vous propose Chasseur de dragons, un film réalisé par Guillaume Ivernel, Arthur Qwak, produit par Philippe Delarue et Futurikon et sorti en 2008. Un des seuls films d''animation français que je peux visionner sans avoir envie de me petit-suissider (ref) et qui ne donne pas trop l''impression de prendre nos chères têtes blondes (rousses,brunes, bref) pour des c@ns. ça casse pas trois pattes à un c@nnard et le design des persos m''a rendue perplexe quand je l''ai visionné la première fois mais, l''ambiance complètement désolée, les paysages claqués de fou et certains passages un peu malaisants laissent une sensation de vide, chelou, mais pas déplaisante. C''est doublé avec de vrais acteurs, y''a des plans biens sympas, une bo pas dégueu (Klaus Badelt) bref, y''a moyen de passer un bon moment sans  se prendre le chou. Ah, ce film est adapté de la série animée du même nom, toujours du môsieur Qwak. Dispo sur Amazon Prime seulement (hélas, ni sur Netflix ou Disney +). Bon visionnage !',
  '2022-05-10',
  32,
  3,
  array['Animation','Familial'],
  array['العربية','Français','Español'],
  array['France'])
;
SELECT new_movie(
  'Les Pleins Pouvoirs',
  'Absolute Power',
  'https://image.tmdb.org/t/p/original/sU0SPvZPJj9AORrCqoI8JnhJiIw.jpg',
  array['Clint Eastwood'],
  '1997-02-14',
  '121',
  array['Clint Eastwood','Gene Hackman','Ed Harris','Laura Linney','Scott Glenn'],
  'Au menu cette semaine, j''ai envie de vous replonger dans l''ambiance si particulière des grands thrillers flamboyants des nineties ! Réalisation mineure d''un cinéaste majeur, Absolute Power (Les Pleins Pouvoirs, 1997) signe le retour aux affaires de Clint Eastwood, alors au sommet de sa gloire de réalisateur après les triomphes publics et critiques d''Impitoyable, et Sur la route de Maddison. Seulement voilà, ce thriller politique au casting cinq étoiles (les merveilleux Gene Hackman et Ed Harris sont de la partie) signe une phase de déclin pour Clint, avec une réception tiède aux Etats-Unis qui poussera Eastwood à annuler sa venue à Cannes, où le film devait être présenté en clôture de festival. Pourtant, le film bénéficiera d''un excellent accueil en France. Adapté du roman éponyme de David Baldacci, Absolute Power reste intéressant en ce qu''il est un témoignage limpide de la pensée politique du Clint : une méfiance totale envers un pouvoir central corrompu à tous les niveaux, auquel il oppose un héros certes hors-la-loi mais respectueux d''un code d''honneur. Bon visionnage ! ',
  '2022-05-16',
  21,
  3,
  array['Crime','Drame','Action'],
  array['English','Español'],
  array['United States of America'])
;
SELECT new_movie(
  'Les bas-fonds',
  'Les bas-fonds',
  'https://image.tmdb.org/t/p/original/74yEC8c42SGC4GtWozcWcA6lmMu.jpg',
  array['Jean Renoir'],
  '1936-12-11',
  '92',
  array['Jean Gabin','Suzy Prim','Louis Jouvet','Jany Holt','Junie Astor'],
  'Au menu cette semaine, du vieux, du très vieux même. J''ai décidé de vous proposer un film de Jean Renoir que je n''ai pas vu : Les Bas-fonds. J''ai surtout vu des films plus récent (La grande Illusion <3 , French Cancan, ...) et à chaque fois j''ai adoré. Le film est disponible sur Mycanal, c''est l''occasion de le découvrir. Il s''agit de l''adaptation d''une pièce de théâtre de Maxime Gorki dans laquelle Pépel (Jean Gabin) rencontre un baron ruiné (Louis Jouvet que j''adore) et l''accueille finalement dans la pension miteuse dans laquelle il survit. Que vous dire de plus ? Rien puisque je ne connais le film que de réputation. Hâte d''en parler avec vous. Bon visionnage.',
  '2022-05-23',
  1,
  3,
  array['Romance','Crime','Drame'],
  array['Français'],
  array['France'])
;
SELECT new_movie(
  'The Square',
  'The Square',
  'https://image.tmdb.org/t/p/original/lqJteErtfU1rZ0Y8Z3fRrlEo4G5.jpg',
  array['Ruben Östlund'],
  '2017-08-25',
  '142',
  array['Claes Bang','Elisabeth Moss','Dominic West','Terry Notary','Christopher Læssø'],
  'Afin de rendre hommage au palmarès 2022 (ridicule) de notre sérénissime Festival de Cannes, je vous propose pour cette semaine ex-aequo : 2 films ! Ici je vous présente le premier d''entre eux, dicté par l''actualité, choix du jury et de l''intelligentzia Gaumont-Pathesque : The Square  de Ruben Östlund, palme d''or 2017. Film un peu drôle, sur le milieu de l''art contemporain d''avant Covid et NFT. Intéressant, et clivant. Disponible sur Canal+ et OCS en France et à l''achat en Suisse (à un tarif honteux).',
  '2022-05-30',
  14,
  3,
  array['Drame'],
  array['Dansk','English','svenska'],
  array['Denmark','France','Germany','Sweden'])
;
SELECT new_movie(
  'Mademoiselle',
  '아가씨',
  'https://image.tmdb.org/t/p/original/z4cpSCLQLbe2TwDZhmf8uzsKUMj.jpg',
  array['Park Chan-wook'],
  '2016-06-01',
  '145',
  array['Kim Min-hee','Kim Tae-ri','Ha Jung-woo','Cho Jin-woong','Kim Hae-sook'],
  'Après The Square de Östlund, je vous propose un deuxième film, choix du public, et du cœur : Mademoiselle , le plus aboutit des films de Park Chan-wook et disponible sur Prime depuis le mois dernier. Un film beau, un film malin, un film rythmé : un film bien. Récompensé en 2016 du prix technique dans notre Festival Cannois national de la honte. Mesdames, Messieurs faites votre choix.',
  '2022-06-01',
  14,
  3,
  array['Thriller','Drame','Romance'],
  array['日本語','한국어/조선말'],
  array['South Korea'])
;

-- Update seeded movies status
UPDATE movie
SET is_published = 'true';

COMMIT;