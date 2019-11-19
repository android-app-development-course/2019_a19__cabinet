import * as SQLite from "expo-sqlite";

const dbName = "locker.db";
const dbVersion = '0';

const createThing = `create table things
        (
            thing_id INTEGER not null
        constraint things_pk
        primary key autoincrement,
            thing_cat INTEGER not null,
            thing_name TEXT not null,
            thing_photo TEXT not null,
            thing_remark TEXT
    );

        create unique index things_thing_id_uindex
        on things (thing_id);

    `;

const createCat = `create table catergries
(
    cat_id INTEGER not null
constraint catergries_pk
primary key autoincrement,
    cat_name TEXT not null,
    cat_icon TEXT not null
);

create unique index catergries_cat_id_uindex
on catergries (cat_id);`;

export const initDB = (cb) => {
    const db = SQLite.openDatabase(dbName, dbVersion);
    db.transaction(function (tx) {
        tx.executeSql(createThing);
        tx.executeSql(createCat);
    }, cb);
};

export const db = SQLite.openDatabase(dbName);
