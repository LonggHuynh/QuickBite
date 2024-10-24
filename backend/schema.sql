create table app_user
(
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

create table restaurant
(
    id             text not null
        constraint chef_pk
            primary key,
    name           text not null,
    logo_url       text,
    delivery_fee  numeric default 0,
    background_url text,
    min_order      integer default 0,
    owner_id UUID NOT NULL UNIQUE REFERENCES app_user(id) ON DELETE CASCADE
);

create table dish
(
    id            uuid    not null
        constraint dish_pk
            primary key,
    name          text    not null,
    description   text    not null,
    restaurant_id text
        constraint dish_restaurant_id_fk
            references restaurant,
    img           text,
    price         numeric not null,
    category      text default 'Others'::text
);

create table app_order
(
    id            uuid not null
        constraint order_pk
            primary key,
    uid           UUID
        constraint app_order_app_user_id_fk
            references app_user,
    rating        integer,
    restaurant_id text not null
        constraint app_order_restaurant_id_fk
            references restaurant,
    date          timestamp default CURRENT_TIMESTAMP,
    name          text not null,
    email         text,
    address       text
);

create table ordered_item
(
    order_id uuid    not null
        constraint ordered_item_app_order_id_fk
            references app_order,
    quantity integer not null,
    dish_id  uuid    not null
        constraint ordered_item_dish_id_fk
            references dish,
    constraint ordered_item_pk
        primary key (order_id, dish_id)
);

