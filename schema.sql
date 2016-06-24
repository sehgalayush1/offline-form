drop table if exists entries;
create table entries (
	id integer primary key autoincrement,
	email text not null,
	password text not null,
	twitter text not null,
	facebook text not null,
	google text not null,
	fname text not null,
	lname text not null,
	phone text not null,
	address text not null
);