--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: proposition_slot; Type: TABLE DATA; Schema: public; Owner: benoit
--

INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (1, 3, 24, '2022-06-06', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (2, 3, 25, '2022-06-13', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (3, 3, 26, '2022-06-20', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (4, 3, 27, '2022-06-27', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (5, 3, 28, '2022-07-04', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (6, 3, 29, '2022-07-11', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (7, 3, 30, '2022-07-18', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (8, 3, 31, '2022-07-25', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (9, 3, 32, '2022-08-01', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (10, 3, 33, '2022-08-08', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (11, 3, 34, '2022-08-15', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (12, 3, 35, '2022-08-22', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (13, 3, 36, '2022-08-29', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (15, 3, 38, '2022-09-12', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (14, 3, 37, '2022-09-05', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (16, 3, 39, '2022-09-19', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (17, 3, 40, '2022-09-26', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (18, 3, 41, '2022-10-03', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (19, 3, 42, '2022-10-10', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (20, 3, 43, '2022-10-17', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (21, 3, 44, '2022-10-24', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (22, 3, 45, '2022-10-31', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (23, 3, 46, '2022-11-07', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (24, 3, 47, '2022-11-14', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (25, 3, 48, '2022-11-21', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (26, 3, 49, '2022-11-28', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (27, 3, 50, '2022-12-05', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (28, 3, 51, '2022-12-12', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (29, 3, 52, '2022-12-19', true);
INSERT INTO public.proposition_slot (id, season_number, episode, publishing_date, is_booked) VALUES (30, 3, 53, '2022-12-26', true);


--
-- Name: proposition_slot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: benoit
--

SELECT pg_catalog.setval('public.proposition_slot_id_seq', 30, true);


--
-- PostgreSQL database dump complete
--

