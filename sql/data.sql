insert into region(id, name_of_region) values (1,'Durban');
insert into region(id, name_of_region) values (2,'Cape Town');
insert into region(id, name_of_region) values (3,'Gauteng');


insert into route(id, routes_name, region_id) values (1,'Cape Town - Bellville', 2);
insert into route(id, routes_name , region_id) values (2,'Cape Town - Gugulethu', 2);
insert into route(id, routes_name, region_id) values (3,'Cape Town - Langa', 2);

insert into route(id, routes_name, region_id) values (4,'Sandton - Randburg', 3);
insert into route(id, routes_name, region_id) values (5,'Alexandra - Sandton', 3);
insert into route(id, routes_name, region_id) values (6,'Sandton - Midrand', 3);

insert into route(id, routes_name, region_id) values (7,'Umlazi - Durban Central', 1);
insert into route(id, routes_name, region_id) values (8,'Durban Central - Umhlanga Rocks', 1);
insert into route(id, routes_name, region_id) values (9,'Durban Central - Umbilo', 1);


insert into taxi(id, reg_num, starts_str) values (1, 'CA-081-050', 'CA');
insert into trip( fare, routes_id, taxi_id, region_id) values ( 10.00, 2, 1, 2);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 15.00, 3, 1, 2);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 9.00, 1, 1, 2);


insert into taxi(id, reg_num, starts_str) values (2, 'CA-123-100', 'CA');
insert into trip( fare, routes_id, taxi_id, region_id) values ( 10.00, 2, 2, 2);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 15.00, 3, 2, 2);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 9.00, 1, 2, 2);


insert into taxi(id, reg_num, starts_str) values (3, 'CA-410-070', 'CA');
insert into trip( fare, routes_id, taxi_id, region_id) values ( 10.00, 2, 3, 2);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 15.00, 3, 3, 2);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 9.00, 1, 3, 2);

insert into taxi(id, reg_num, starts_str) values (4, 'GP-081-050', 'GP');
insert into trip( fare, routes_id, taxi_id, region_id) values ( 10.00, 5, 4, 3);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 15.00, 6, 4, 3);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 9.00, 4, 4, 3);


insert into taxi(id, reg_num, starts_str) values (5, 'GP-123-100', 'GP');
insert into trip( fare, routes_id, taxi_id, region_id) values ( 10.00, 5, 5, 3);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 15.00, 4, 5, 3);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 9.00, 6, 5, 3);


insert into taxi(id, reg_num, starts_str) values (6, 'GP-410-070', 'GP');
insert into trip( fare, routes_id, taxi_id, region_id) values ( 10.00, 5, 6, 3);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 15.00, 6, 6, 3);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 9.00, 4, 6, 3);




insert into taxi(id, reg_num, starts_str) values (7, 'ND-081-050', 'ND');
insert into trip( fare, routes_id, taxi_id, region_id) values ( 10.00, 8, 7, 1);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 15.00, 7, 7, 1);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 9.00, 9, 7, 1);


insert into taxi(id, reg_num, starts_str) values (8, 'ND-123-100', 'ND');
insert into trip( fare, routes_id, taxi_id, region_id) values ( 10.00, 7, 8, 1);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 15.00, 9, 8, 1);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 9.00, 8, 8, 1);


insert into taxi(id, reg_num, starts_str) values (9, 'ND-410-070', 'ND');
insert into trip( fare, routes_id, taxi_id, region_id) values ( 10.00, 9, 9, 1);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 15.00, 7, 9, 1);
insert into trip( fare, routes_id, taxi_id, region_id) values ( 9.00, 8, 9, 1);



