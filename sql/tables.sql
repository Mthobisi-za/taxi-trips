
create table region(id int primary key  not null,  name_of_region text not null);

create table route(id int primary key not null, routes_name text not null,  region_id int not null, foreign key (region_id) references region(id));

create table taxi(id int primary key not null, reg_num text not null, starts_str text not null);

create table trip(id serial primary key not null, fare decimal(10,02), routes_id int not null, taxi_id int not null, region_id int not null,
foreign key (routes_id) references route(id),
foreign key (taxi_id) references taxi(id),
foreign key (region_id) references region(id)
);