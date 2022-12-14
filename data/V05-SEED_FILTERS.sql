BEGIN;

-- CREATE COUNTRIES
INSERT INTO public."country" ("id", "name", "created_at") OVERRIDING SYSTEM VALUE VALUES 
  (1,   'United Kingdom',           '2022-06-02 11:27:09.971031+02'),
  (2,   'Soviet Union',             '2022-06-02 11:27:09.971031+02'),
  (3,   'Norway',                   '2022-06-02 11:27:09.971031+02'),
  (4,   'South Korea',              '2022-06-02 11:27:09.971031+02'),
  (5,   'United States of America', '2022-06-02 11:27:09.971031+02'),
  (6,   'Canada',                   '2022-06-02 11:27:09.971031+02'),
  (7,   'France',                   '2022-06-02 11:27:09.971031+02'),
  (8,   'Japan',                    '2022-06-02 11:27:09.971031+02'),
  (9,   'Italy',                    '2022-06-02 11:27:09.971031+02'),
  (10,  'Australia',                '2022-06-02 11:27:09.971031+02'),
  (11,  'Austria',                  '2022-06-02 11:27:09.971031+02'),
  (12,  'Germany',                  '2022-06-02 11:27:09.971031+02'),
  (13,  'Greece',                   '2022-06-02 11:27:09.971031+02'),
  (14,  'Yugoslavia',               '2022-06-02 11:27:09.971031+02'),
  (15,  'Romania',                  '2022-06-02 11:27:09.971031+02'),
  (16,  'Hong Kong',                '2022-06-02 11:27:09.971031+02'),
  (17,  'Sweden',                   '2022-06-02 11:27:09.971031+02'),
  (18,  'Poland',                   '2022-06-02 11:27:09.971031+02'),
  (19,  'Switzerland',              '2022-06-02 11:27:09.971031+02'),
  (20,  'Belgium',                  '2022-06-02 11:27:09.971031+02'),
  (21,  'Netherlands',              '2022-06-02 11:27:09.971031+02'),
  (22,  'Bulgaria',                 '2022-06-02 11:27:09.971031+02'),
  (23,  'Luxembourg',               '2022-06-02 11:27:09.971031+02'),
  (24,  'Brazil',                   '2022-06-02 11:27:09.971031+02'),
  (25,  'Denmark',                  '2022-06-02 11:27:09.971031+02'),
  (26,  'Spain',                    '2022-06-02 11:27:09.971031+02'),
  (27,  'Indonesia',                '2022-06-02 11:27:09.971031+02'),
  (28,  'China',                    '2022-06-02 11:27:09.971031+02'),
  (29,  'Egypt',                    '2022-06-02 11:27:09.971031+02'),
  (30,  'Ethiopia',                 '2022-06-02 11:27:09.971031+02'),
  (31,  'Ghana',                    '2022-06-02 11:27:09.971031+02'),
  (32,  'Jordan',                   '2022-06-02 11:27:09.971031+02'),
  (33,  'Namibia',                  '2022-06-02 11:27:09.971031+02'),
  (34,  'Saudi Arabia',             '2022-06-02 11:27:09.971031+02'),
  (35,  'Thailand',                 '2022-06-02 11:27:09.971031+02'),
  (36,  'United Arab Emirates',     '2022-06-02 11:27:09.971031+02'),
  (37,  'Finland',                  '2022-06-02 11:27:09.971031+02'),
  (38,  'India',                    '2022-06-02 11:27:09.971031+02'),
  (39,  'Israel',                   '2022-06-02 11:27:09.971031+02'),
  (40,  'New Zealand',              '2022-06-02 11:27:09.971031+02'),
  (41,  'South Africa',             '2022-06-02 11:27:09.971031+02'),
  (42,  'Angola',                   '2022-06-04 22:06:51.216632+02'),
  (43,  'Czech Republic',           '2022-07-04 11:39:55.602977+02'),
  (44,  'Algeria',                  '2022-09-29 18:12:25.166988+02'),
  (45,  'Argentina',                '2022-10-12 17:01:53.658588+02'),
  (46,  'Ireland',                  '2022-11-01 11:03:34.611494+01');

-- CREATE GENRES
INSERT INTO public."genre" ("id", "name", "created_at") VALUES
  (1,  'Drame',           '2022-06-02 11:27:09.971031+02'),
  (2,  'Romance',         '2022-06-02 11:27:09.971031+02'),
  (3,  'Science-Fiction', '2022-06-02 11:27:09.971031+02'),
  (4,  'Guerre',          '2022-06-02 11:27:09.971031+02'),
  (5,  'Action',          '2022-06-02 11:27:09.971031+02'),
  (6,  'Thriller',        '2022-06-02 11:27:09.971031+02'),
  (7,  'Crime',           '2022-06-02 11:27:09.971031+02'),
  (8,  'Com??die',         '2022-06-02 11:27:09.971031+02'),
  (9,  'Animation',       '2022-06-02 11:27:09.971031+02'),
  (10, 'Horreur',         '2022-06-02 11:27:09.971031+02'),
  (11, 'Aventure',        '2022-06-02 11:27:09.971031+02'),
  (12, 'Myst??re',         '2022-06-02 11:27:09.971031+02'),
  (13, 'Fantastique',     '2022-06-02 11:27:09.971031+02'),
  (14, 'Musique',         '2022-06-02 11:27:09.971031+02'),
  (15, 'Histoire',        '2022-06-02 11:27:09.971031+02'),
  (16, 'Familial',        '2022-06-02 11:27:09.971031+02'),
  (17, 'Western',         '2022-06-02 11:27:09.971031+02'),
  (18, 'Documentaire',    '2022-06-02 11:27:09.971031+02');

-- CREATE LANGUAGES
INSERT INTO public."language" ("id", "name", "created_at") OVERRIDING SYSTEM VALUE VALUES
  (1,  'P????????????', '2022-06-02 11:27:09.971031+02'),
  (2,  'English', '2022-06-02 11:27:09.971031+02'),
  (3,  'Fran??ais', '2022-06-02 11:27:09.971031+02'),
  (4,  'Dansk', '2022-06-02 11:27:09.971031+02'),
  (5,  'Norsk', '2022-06-02 11:27:09.971031+02'),
  (6,  'svenska', '2022-06-02 11:27:09.971031+02'),
  (7,  'Deutsch', '2022-06-02 11:27:09.971031+02'),
  (8,  '?????????/?????????', '2022-06-02 11:27:09.971031+02'),
  (9,  'Portugu??s', '2022-06-02 11:27:09.971031+02'),
  (10, '?????????', '2022-06-02 11:27:09.971031+02'),
  (11, 'Italiano', '2022-06-02 11:27:09.971031+02'),
  (12, 'Latin', '2022-06-02 11:27:09.971031+02'),
  (13, 'No Language', '2022-06-02 11:27:09.971031+02'),
  (14, '??????????????', '2022-06-02 11:27:09.971031+02'),
  (15, '?????????????????? ????????', '2022-06-02 11:27:09.971031+02'),
  (16, 'Srpski', '2022-06-02 11:27:09.971031+02'),
  (17, 'Rom??n??', '2022-06-02 11:27:09.971031+02'),
  (18, '????????? / ?????????', '2022-06-02 11:27:09.971031+02'),
  (19, '?????????', '2022-06-02 11:27:09.971031+02'),
  (20, '??????????????????', '2022-06-02 11:27:09.971031+02'),
  (21, '??????????????????', '2022-06-02 11:27:09.971031+02'),
  (22, 'Espa??ol', '2022-06-02 11:27:09.971031+02'),
  (23, 'Polski', '2022-06-02 11:27:09.971031+02'),
  (24, 'Nederlands', '2022-06-02 11:27:09.971031+02'),
  (25, 'Esperanto', '2022-06-02 11:27:09.971031+02'),
  (26, 'T??rk??e', '2022-06-02 11:27:09.971031+02'),
  (27, 'Bahasa indonesia', '2022-06-02 11:27:09.971031+02'),
  (28, 'suomi', '2022-06-02 11:27:09.971031+02'),
  (29, '??????????????????', '2022-06-02 11:27:09.971031+02'),
  (30, '??slenska', '2022-06-02 11:27:09.971031+02'),
  (31, '????????????????', '2022-06-02 11:27:09.971031+02'),
  (32, 'euskera', '2022-10-12 17:01:53.658588+02');
  
COMMIT;
