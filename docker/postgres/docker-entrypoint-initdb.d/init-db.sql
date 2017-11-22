--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Database creation
--

CREATE DATABASE "AlarmMonitor" WITH TEMPLATE = template0 OWNER = postgres;
REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


\connect "AlarmMonitor"

SET default_transaction_read_only = off;


--
-- Name: alarms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE alarms (
    "ID" integer NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    operatingplace json NOT NULL,
    cardinal json NOT NULL,
    resources json NOT NULL,
    annotation text NOT NULL
);


ALTER TABLE alarms OWNER TO postgres;

--
-- Name: alarms_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "alarms_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "alarms_ID_seq" OWNER TO postgres;

--
-- Name: alarms_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "alarms_ID_seq" OWNED BY alarms."ID";


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE messages (
    "ID" integer NOT NULL,
    created timestamp without time zone DEFAULT CURRENT_DATE NOT NULL,
    show_begin date DEFAULT CURRENT_DATE NOT NULL,
    show_end date NOT NULL,
    message text NOT NULL,
    tag character(100)
);


ALTER TABLE messages OWNER TO postgres;

--
-- Name: messages_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "messages_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "messages_ID_seq" OWNER TO postgres;

--
-- Name: messages_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "messages_ID_seq" OWNED BY messages."ID";


--
-- Name: alarms ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY alarms ALTER COLUMN "ID" SET DEFAULT nextval('"alarms_ID_seq"'::regclass);


--
-- Name: messages ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY messages ALTER COLUMN "ID" SET DEFAULT nextval('"messages_ID_seq"'::regclass);


--
-- Name: alarms pk_alarms_ID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY alarms
    ADD CONSTRAINT "pk_alarms_ID" PRIMARY KEY ("ID");


--
-- Name: messages pk_messages_ID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT "pk_messages_ID" PRIMARY KEY ("ID");


--
-- Name: alarms unique_alarms_ID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY alarms
    ADD CONSTRAINT "unique_alarms_ID" UNIQUE ("ID");


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO PUBLIC;


--
-- Name: alarms; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE alarms TO PUBLIC;


--
-- Name: messages; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE messages TO PUBLIC;

