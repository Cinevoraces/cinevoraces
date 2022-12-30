-- TEST USERS SEEDS
-- PASSWORD: 'Cinevoraces2022!'
-- role: 0 = user, 1 = moderator, 2 = admin

BEGIN;

INSERT INTO public."user" 
  ("id", "pseudo", "mail", "password", "avatar_url", "role", "created_at", "updated_at") 
OVERRIDING SYSTEM VALUE VALUES
  (1, 'Mat-Mat',        '01@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1670844416/cinevoraces/Mat-Mat.jpg',           0, '2022-06-02 11:27:09.971031+02',  '2022-12-12 12:26:57.291523+01'),
  (2, 'Yves Signal',    '02@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1654260290/cinevoraces/Yves%20Signal.jpg',     2, '2022-06-02 11:27:09.971031+02',  '2022-06-04 13:40:48.059505+02'),
  (3, 'ajcrou',         '03@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (4, 'Miku',           '04@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (5, 'Mordicus',       '05@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (6, 'Woulfo',         '06@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (7, 'Lukino',         '07@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/Lukino.jpg',            0, '2022-06-02 11:27:09.971031+02',  NULL),
  (8, 'Guillaume',      '08@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (9, 'Checco',         '09@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/Checco.jpg',            0, '2022-06-02 11:27:09.971031+02',  '2022-06-13 11:42:31.817165+02'),
  (10, 'Neofelis',      '10@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1654706029/cinevoraces/Neofelis.jpg',          0, '2022-06-02 11:27:09.971031+02',  '2022-06-08 18:34:17.491058+02'),
  (11, 'Sabbata',       '11@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (12, 'benbossman',    '12@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (13, 'HR',            '13@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (14, 'Poulpator',     '14@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1664727055/cinevoraces/Poulpator.jpg',         0, '2022-06-02 11:27:09.971031+02',  '2022-10-02 18:11:33.401031+02'),
  (15, 'Pyjama Wallon', '15@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (16, 'Sao',           '16@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/Sao.jpg',               0, '2022-06-02 11:27:09.971031+02',  '2022-06-30 20:27:52.115319+02'),
  (17, 'Fariboles',     '17@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (18, 'Eiffel-AD',     '18@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (19, 'Niebelungen',   '19@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (20, 'FlexAgrume',    '20@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  '2022-06-06 15:02:35.184443+02'),
  (21, 'Seurcha',       '21@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (22, 'TuBuzz',        '22@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (23, 'Klavor',        '23@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/Klavor.jpg',            0, '2022-06-02 11:27:09.971031+02',  NULL),
  (24, 'Nieuh',         '24@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (25, 'Ruadir',        '25@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1655533663/cinevoraces/Ruadir.jpg',            0, '2022-06-02 11:27:09.971031+02',  '2022-06-18 08:27:44.486126+02'),
  (26, 'Morbo',         '26@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/Morbo.jpg',             0, '2022-06-02 11:27:09.971031+02',  '2022-06-07 09:38:43.437025+02'),
  (27, 'MrSetzer',      '27@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (28, 'DrPierre',      '28@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (30, 'quilim',        '30@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  NULL),
  (31, 'Louis-Cyrus',   '31@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-02 11:27:09.971031+02',  '2022-06-07 09:27:56.921015+02'),
  (32, 'Calys',         '32@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1662571233/cinevoraces/Calys.jpg',             0, '2022-06-02 11:27:09.971031+02',  '2022-09-07 19:20:34.2998+02'),
  (33, 'olive qui tue', '33@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1653584757/cinevoraces/olive%20qui%20tue.jpg', 0, '2022-06-02 11:27:09.971031+02',  '2022-08-03 13:48:35.653214+02'),
  (34, 'benoitSafari',  '34@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1654266339/cinevoraces/benoitSafari.jpg',      2, '2022-06-03 14:46:38.459104+02',  '2022-06-03 16:25:39.507891+02'),
  (35, 'Colmeil',       '35@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-03 15:20:19.546992+02',  NULL),
  (36, 'nox',           '36@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1654266472/cinevoraces/nox.jpg',               0, '2022-06-03 16:26:10.397739+02',  '2022-06-03 16:27:52.961774+02'),
  (37, 'HugoLOPEZ',     '37@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-03 16:56:45.164022+02',  NULL),
  (39, 'Lily',          '39@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-03 20:24:16.043329+02',  NULL),
  (40, 'Mahh31',        '40@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', 'http://res.cloudinary.com/yvessignal/image/upload/v1655415951/cinevoraces/Mahh31.jpg',            2, '2022-06-04 21:57:27.253343+02',  '2022-06-28 22:52:38.677747+02'),
  (41, 'gtn83',         '41@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-07 23:05:42.8972+02',    NULL),
  (42, 'GregGS',        '42@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-08 11:37:02.026294+02',  NULL),
  (43, 'Astadia',       '43@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-14 20:07:32.522999+02',  NULL),
  (44, 'Aldagor',       '44@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-22 12:00:43.668519+02',  NULL),
  (45, 'Noodles',       '45@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-06-23 09:04:25.686523+02',  NULL),
  (47, 'Oudda',         '47@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-07-07 10:08:26.026958+02',  NULL),
  (48, 'TontonYoyo',    '48@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-09-30 20:54:48.721226+02',  NULL),
  (49, 'RayPenthotal',  '49@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-10-01 10:42:46.631823+02',  NULL),
  (50, 'Yann',          '50@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-10-05 17:33:23.915153+02',  NULL),
  (51, 'Roro',          '51@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-10-17 20:45:14.555861+02',  NULL),
  (52, 'Hasni',         '52@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-10-20 09:27:03.687714+02',  NULL),
  (53, 'Jade',          '53@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-10-22 21:28:48.54184+02',   NULL),
  (54, 'TipTop',        '54@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-11-21 17:21:46.481376+01',  NULL),
  (55, 'Mordicus_2.0',  '55@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-12-02 20:09:44.502571+01',  NULL),
  (56, 'juwo1',         '56@cinevoraces.fr', '$2a$10$Jz4SBmey2EhQorwBNV/t6uZAzptp4MRkZRIBRoApIIAALiJUrEO0u', NULL,                                                                                              0, '2022-12-17 17:35:50.904172+01',  NULL);

COMMIT;