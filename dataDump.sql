--
-- PostgreSQL database dump
--

\restrict 1sMiV7NbzSVddWO4CNHopP7ACVD0JVenhjYqV2EdvdoZ1vetHkoeVDh9xVuEnvf

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contact_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact_messages (
    message_id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    company character varying(150),
    address1 character varying(200) NOT NULL,
    address2 character varying(200),
    city character varying(100) NOT NULL,
    state character varying(100) NOT NULL,
    zip character varying(20) NOT NULL,
    country character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    phone character varying(30) NOT NULL,
    message text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.contact_messages OWNER TO postgres;

--
-- Name: contact_messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contact_messages_message_id_seq OWNER TO postgres;

--
-- Name: contact_messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_messages_message_id_seq OWNED BY public.contact_messages.message_id;


--
-- Name: favorite_routes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorite_routes (
    route_id integer NOT NULL,
    user_id integer,
    start_station character varying(100) NOT NULL,
    end_station character varying(100) NOT NULL
);


ALTER TABLE public.favorite_routes OWNER TO postgres;

--
-- Name: favorite_routes_route_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorite_routes_route_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favorite_routes_route_id_seq OWNER TO postgres;

--
-- Name: favorite_routes_route_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorite_routes_route_id_seq OWNED BY public.favorite_routes.route_id;


--
-- Name: favorite_stations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorite_stations (
    station_id integer NOT NULL,
    user_id integer,
    station_name character varying(100) NOT NULL
);


ALTER TABLE public.favorite_stations OWNER TO postgres;

--
-- Name: favorite_stations_station_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorite_stations_station_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favorite_stations_station_id_seq OWNER TO postgres;

--
-- Name: favorite_stations_station_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorite_stations_station_id_seq OWNED BY public.favorite_stations.station_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: contact_messages message_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_messages ALTER COLUMN message_id SET DEFAULT nextval('public.contact_messages_message_id_seq'::regclass);


--
-- Name: favorite_routes route_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_routes ALTER COLUMN route_id SET DEFAULT nextval('public.favorite_routes_route_id_seq'::regclass);


--
-- Name: favorite_stations station_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_stations ALTER COLUMN station_id SET DEFAULT nextval('public.favorite_stations_station_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: contact_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact_messages (message_id, first_name, last_name, company, address1, address2, city, state, zip, country, email, phone, message, created_at) FROM stdin;
1	a	b		1		sf	ca	94132	usa	a@gmail.com	12345678	wassup chat\n	2026-04-29 05:03:45.083299
2	test	test		1600		sf	ca	94132	USA	test@gmaill.com	12345678	TEST TEST test	2026-04-29 18:10:05.167606
3	class	1		1s		sf	CA	94132	CA	class@sfsu.edu	13456789	WASSUP CHAt	2026-04-29 18:18:27.225598
4	a	s	f	h	k	l	h	f	e	aaa@gmail.com	2345678909	HI	2026-05-18 20:12:18.072522
\.


--
-- Data for Name: favorite_routes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorite_routes (route_id, user_id, start_station, end_station) FROM stdin;
1	10	daly city	balboa park
2	10	embarcadero	montogomery street
3	10	San Francisco International Airport	Oakland International Airport
4	11	Castro Valley	Concord
\.


--
-- Data for Name: favorite_stations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorite_stations (station_id, user_id, station_name) FROM stdin;
1	10	daly city
2	10	San Francisco International Airport
3	10	Coliseum
4	11	Berryessa/North San José
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, email, password_hash) FROM stdin;
1	ben	ben@email.com	123
2			
3	JohnDoe	johndoe@gmail.com	john!123
4	hello	hello@gmailcom	abcd
5	testFinal	test@testmail.com	test123
8	Class	class@sfsu.edu	class
9	Encrypt	encryptTest@gmail.com	$2b$10$D7pvhgiYt4EAFVTGZsgZt.FIm8c7ZKPtNDssIJl8fqIv2VJcDZfEa
10	dash	dashtest@dash.com	$2b$10$Kwsc.Ubb.IJB4khFLHum3OzyzuepLWoDvVz4/jQDgK//JgzLpuO12
11	csc	csc@sfsu.edu	$2b$10$BRfVr.HoSMFFxlFlbmaZJu31mPPcE10VspHYp3OB6GJSOhOG.UWfq
\.


--
-- Name: contact_messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_messages_message_id_seq', 4, true);


--
-- Name: favorite_routes_route_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorite_routes_route_id_seq', 4, true);


--
-- Name: favorite_stations_station_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorite_stations_station_id_seq', 4, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 11, true);


--
-- Name: contact_messages contact_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_messages
    ADD CONSTRAINT contact_messages_pkey PRIMARY KEY (message_id);


--
-- Name: favorite_routes favorite_routes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_routes
    ADD CONSTRAINT favorite_routes_pkey PRIMARY KEY (route_id);


--
-- Name: favorite_stations favorite_stations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_stations
    ADD CONSTRAINT favorite_stations_pkey PRIMARY KEY (station_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: favorite_routes favorite_routes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_routes
    ADD CONSTRAINT favorite_routes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: favorite_stations favorite_stations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_stations
    ADD CONSTRAINT favorite_stations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO webapp;


--
-- Name: TABLE contact_messages; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT ON TABLE public.contact_messages TO webapp;


--
-- Name: SEQUENCE contact_messages_message_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.contact_messages_message_id_seq TO webapp;


--
-- Name: TABLE favorite_routes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.favorite_routes TO webapp;


--
-- Name: SEQUENCE favorite_routes_route_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.favorite_routes_route_id_seq TO webapp;


--
-- Name: TABLE favorite_stations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.favorite_stations TO webapp;


--
-- Name: SEQUENCE favorite_stations_station_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.favorite_stations_station_id_seq TO webapp;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO webapp;


--
-- Name: SEQUENCE users_user_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.users_user_id_seq TO webapp;


--
-- PostgreSQL database dump complete
--

\unrestrict 1sMiV7NbzSVddWO4CNHopP7ACVD0JVenhjYqV2EdvdoZ1vetHkoeVDh9xVuEnvf

