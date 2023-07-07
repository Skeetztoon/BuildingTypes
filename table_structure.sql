--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-07-07 15:01:24

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
-- TOC entry 215 (class 1259 OID 16419)
-- Name: house; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.house (
    id integer NOT NULL,
    name character varying(255),
    k1min integer DEFAULT 0,
    k1max integer DEFAULT 0,
    k2min integer DEFAULT 0,
    k2max integer DEFAULT 0,
    link character varying(255),
    k3min integer DEFAULT 0,
    k3max integer DEFAULT 0,
    k4min integer DEFAULT 0,
    k4max integer DEFAULT 0
);


ALTER TABLE public.house OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16418)
-- Name: house_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.house_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.house_id_seq OWNER TO postgres;

--
-- TOC entry 3330 (class 0 OID 0)
-- Dependencies: 214
-- Name: house_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.house_id_seq OWNED BY public.house.id;


--
-- TOC entry 3172 (class 2604 OID 16422)
-- Name: house id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.house ALTER COLUMN id SET DEFAULT nextval('public.house_id_seq'::regclass);


--
-- TOC entry 3182 (class 2606 OID 16424)
-- Name: house house_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.house
    ADD CONSTRAINT house_pkey PRIMARY KEY (id);


-- Completed on 2023-07-07 15:01:24

--
-- PostgreSQL database dump complete
--

