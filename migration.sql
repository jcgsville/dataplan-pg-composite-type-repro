create type bar as (
    zz text,
    yy text
);

create table foo (
    id int primary key,
    aa text,
    bb bar
);

insert into foo (id, aa, bb) values (1, 'a', ('z', 'y'));
