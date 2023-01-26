CREATE TABLE IF NOT EXISTS address(
    address_id bigint auto_increment primary key,
    beop_jeong_cd varchar not null,
    full_address varchar not null
);

-- create table if not exists member(
--     member_id bigint auto_increment primary key,
--     up_file_id bigint,
--     nick_name varchar not null unique,
--     email varchar not null unique,
--     password varchar not null,
--     member_age varchar not null,
--     address varchar not null,
--     member_status varchar not null,
--     about_me varchar,
--     gender varchar not null
-- );

insert into address values (1, '1111', '우리동');
insert into address values (2, '2222', '니네동');

-- insert into member values (1, null, '테스트', 'test1@gmail.com', '!1a2s3d4f', 'TWENTIES', '1111', 'MEMBER_ACTIVE', null, 'M');
-- (member_id, created_at, last_modified_at, about_me, address, email, gender, member_age, member_status, nick_name, password, up_file_id)