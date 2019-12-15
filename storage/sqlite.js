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

export const initDB = (errCb, successCb) => {
    const db = SQLite.openDatabase(dbName, dbVersion);
    db.transaction(function (tx) {
        tx.executeSql(createThing);
        tx.executeSql(createCat);
    }, errCb, successCb);
};

export const insert_cat = (name, icon, errCb, successCb) => {
    db.transaction(function (tx) {
        tx.executeSql(`INSERT INTO catergries (cat_name, cat_icon) VALUES (?, ?)`, [name, icon]);
    }, errCb, successCb);
};

export const getAllCat = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(function (tx) {
            tx.executeSql(`SELECT * FROM catergries`, [], function (tx, res) {
                resolve(res);
            })
        }, function (err) {
            reject(err);
        })
    })

};

export const deleteCat = async (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(function (tx) {
            tx.executeSql(`DELETE FROM catergries WHERE cat_id = ?`, [id], function (tx, res) {
                resolve(res);
            })
        }, function (err) {
            reject(err);
        })
    })
};

export const insertThing = (thingName, image, selectedCatId, remark) => {
    return new Promise((resolve, reject) => {
        db.transaction(function (tx) {
            tx.executeSql(`INSERT INTO things (thing_cat, thing_name, thing_photo, thing_remark) VALUES (?,?,?,?)`,
                [selectedCatId, thingName, image.uri, remark]);
        }, (err) => {
            reject(err)
        }, () => resolve());
    })
};

export const getThingByCat = (cat_id) => {
    return new Promise((resolve, reject) => {
        db.transaction(function (tx) {
            tx.executeSql(`SELECT * FROM things WHERE thing_cat = ?`, [cat_id], function (tx, res) {
                resolve(res);
            })
        }, (err) => {
            reject(err)
        })
    });
};

//查找图片
export const getPhotoById = (thing_id) => {
    return new Promise(((resolve, reject) => {
        db.transaction(function (tx) {
            tx.executeSql(`SELECT * FROM things WHERE thing_id = ?`,[thing_id],function (tx,res) {
                resolve(res);
            })
        },(err)=>{
            reject(err)
        })
    }))
};

export const deleteThing = async (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(function (tx) {
            tx.executeSql(`DELETE FROM things WHERE thing_id = ?`, [id], function (tx, res) {
                resolve(res);
            })
        }, function (err) {
            reject(err);
        })
    })
};

export const updateThing = (name, remark, id) => {
    return new Promise(((resolve, reject) => {
        db.transaction(function (tx) {
            tx.executeSql(`UPDATE things SET thing_name = ? thing_remark = ? where thing_id =?`,[name, remark, id], function (tx, res) {
                resolve(res);
            })
        },function (err) {
            reject(err);
        })
    }))
}
export const db = SQLite.openDatabase(dbName);
