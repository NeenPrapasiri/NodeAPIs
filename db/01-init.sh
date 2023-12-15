#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE DATABASE $POSTGRES_DB_NAME;
    \connect $POSTGRES_DB_NAME $POSTGRES_USER
    BEGIN;
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE "tbl_users" (
        "user_id" SERIAL PRIMARY KEY,
        "username" varchar(30),
        "first_name" varchar(50),
        "last_name" varchar(50),
        "password" varchar,
        "create_dt" timestamp DEFAULT now(),
        "update_dt" timestamp DEFAULT now(),
        "delete_flag"numeric(1,0) DEFAULT 0,
        "user_uuid" UUID DEFAULT uuid_generate_v4()
        );

        CREATE TABLE "tbl_board" (
        "board_id" SERIAL PRIMARY KEY,
        "status" numeric(1,0) DEFAULT 1,
        "topic" varchar(100),
        "detail" varchar(300),
        "archive"  numeric(1,0) DEFAULT 0,
        "create_by" int4,
        "create_dt" timestamp DEFAULT now(),
        "update_dt" timestamp DEFAULT now(),
        "board_uuid" UUID DEFAULT uuid_generate_v4()
        );

        CREATE TABLE "tbl_board_log" (
        "board_log_id" SERIAL PRIMARY KEY,
        "board_id" int4,
        "status" numeric(1,0),
        "topic" varchar(100),
        "detail" varchar(300),
        "delete_flag" numeric(1,0) DEFAULT 0,
        "create_dt" timestamp DEFAULT now()
        );

        CREATE TABLE "tbl_board_comment" (
        "comment_id" SERIAL PRIMARY KEY,
        "board_id" int4,
        "comment" varchar(300),
        "user_id" int4,
        "delete_flag" numeric(1,0) DEFAULT 0,
        "create_dt" timestamp DEFAULT now(),
        "update_dt" timestamp DEFAULT now(),
        "comment_uuid" UUID DEFAULT uuid_generate_v4()
        );

        COMMENT ON COLUMN "tbl_board"."status" IS '1: To Do, 2: Progress, 3: Done';

        COMMENT ON COLUMN "tbl_board"."archive" IS '0: Not archived  1: archive';

        COMMENT ON COLUMN "tbl_board_comment"."delete_flag" IS '0:not delete  1: delete';

        ALTER TABLE "tbl_board_log" ADD FOREIGN KEY ("board_id") REFERENCES "tbl_board" ("board_id");

        ALTER TABLE "tbl_board_comment" ADD FOREIGN KEY ("board_id") REFERENCES "tbl_board" ("board_id");

        ALTER TABLE "tbl_board_comment" ADD FOREIGN KEY ("user_id") REFERENCES "tbl_users" ("user_id");

        ALTER TABLE "tbl_board" ADD FOREIGN KEY ("create_by") REFERENCES "tbl_users" ("user_id");
    COMMIT;
        CREATE INDEX CONCURRENTLY tbl_users_user_id_idx ON tbl_users (user_id);
        CREATE INDEX CONCURRENTLY tbl_users_delete_flag_idx ON tbl_users (delete_flag)  WHERE delete_flag = 0;
        CREATE INDEX CONCURRENTLY tbl_users_user_uuid_idx ON tbl_users (user_uuid);

        CREATE INDEX CONCURRENTLY tbl_board_board_id_idx ON tbl_board (board_id);
        CREATE INDEX CONCURRENTLY tbl_board_status_idx ON tbl_board (status);
        CREATE INDEX CONCURRENTLY tbl_board_archive_idx ON tbl_board (archive);
        CREATE INDEX CONCURRENTLY tbl_board_create_by_idx ON tbl_board(create_by);
        CREATE INDEX CONCURRENTLY tbl_board_board_uuid_idx ON tbl_board(board_uuid);

        CREATE INDEX CONCURRENTLY tbl_board_board_log_id_idx ON tbl_board_log (board_log_id);

        CREATE INDEX CONCURRENTLY tbl_board_comment_comment_id_idx ON tbl_board_comment (comment_id);
        CREATE INDEX CONCURRENTLY tbl_board_comment_board_id_idx ON tbl_board_comment (board_id);
        CREATE INDEX CONCURRENTLY tbl_board_comment_delete_flag_idx ON tbl_board_comment (delete_flag)   WHERE delete_flag = 0;
    BEGIN;
        INSERT INTO tbl_users (user_id, username, first_name, last_name, password, create_dt, update_dt, delete_flag)
        VALUES
        (321, 'john_doe', 'John', 'Doe', 'abc123', '2023-01-01', '2023-01-01', 0),
        (654, 'jane_smith', 'Jane', 'Smith', 'xyz456', '2023-01-02', '2023-01-02', 0),
        (987, 'bob_jackson', 'Bob', 'Jackson', '123abc', '2023-01-03', '2023-01-03', 0);


        INSERT INTO tbl_board (board_id, status, topic, detail, archive, create_by, create_dt, update_dt)
        VALUES
        (123, 1, 'Project Update', 'Discussing the latest project updates', 0, 321, '2023-01-01', '2023-01-01'),
        (456, 2, 'Team Meeting', 'Weekly team meeting agenda', 0, 654, '2023-01-02', '2023-01-02'),
        (789, 3, 'Vacation Planning', 'Planning team vacation schedule', 0, 987, '2023-01-03', '2023-01-03'),
        (89, 3, 'Code Review', 'Reviewing and improving code quality', 1, 987, '2023-01-04', '2023-01-04'),
        (67,1, 'Project Update 2', 'Discussing the latest project updates', 0, 321, '2023-01-10', '2023-01-10'),
        (45,1, 'Team Meeting 2', 'Weekly team meeting agenda', 0, 654, '2023-01-11', '2023-01-11'),
        (23,1, 'Vacation Planning 2', 'Planning team vacation schedule', 1, 987, '2023-01-12', '2023-01-12');


        INSERT INTO tbl_board_log (board_id, status, topic, detail, create_dt)
        VALUES
        (123, 1, 'Vacation', 'Updated project milestones', '2023-01-01'),
        (123, 2, 'Vacation jaja', 'Minutes of the team meeting', '2023-01-02'),
        (456, 1, 'Task Assignment', 'Assigned tasks for the upcoming sprint', '2023-01-03'),
        (789, 0, 'Bug Fixing', 'Resolved critical bugs in the system', '2023-01-04');


        -- ข้อมูลสำหรับตาราง "tbl_board_comment" ที่สอดคล้องกับ Foreign Key
        INSERT INTO tbl_board_comment (board_id, comment, user_id, delete_flag, create_dt, update_dt)
        VALUES
        (123, 'Great update! Looking forward to the progress.',987, 0, '2023-01-01', '2023-01-01'),
        (456, 'Interesting points in the meeting minutes.', 321, 0, '2023-01-02', '2023-01-02'),
        (456, 'Assigned tasks for the upcoming sprint.', 987, 0, '2023-01-03', '2023-01-03');
    COMMIT;
EOSQL