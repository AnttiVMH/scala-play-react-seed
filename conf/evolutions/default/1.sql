-- noinspection SqlDialectInspectionForFile

-- noinspection SqlNoDataSourceInspectionForFile

# --- !Ups

CREATE TABLE CLUBS (
  name varchar(50) NOT NULL,
  members varchar(250) NOT NULL
) ;

# --- !Downs

DROP TABLE IF EXISTS CLUBS;