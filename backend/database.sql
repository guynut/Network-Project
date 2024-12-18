create table users (
	user_id serial primary key,
	username varchar unique,
	password varchar ,
	created timestamptz default current_timestamp
)

create table pdf_lists (
	pdf_id serial primary key,
	user_id int references users(user_id) ON DELETE cascade,
	pdf_name text,
	pdf_file bytea,
	upload_time timestamptz default current_timestamp
)
