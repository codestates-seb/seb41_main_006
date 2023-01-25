CREATE TABLE IF NOT EXISTS address(
    address_id bigint auto_increment primary key,
    beop_jeong_cd varchar not null,
    full_address varchar not null
);

insert into address values (1, '1111', '우리동');
insert into address values (2, '2222', '니네동');
