const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(
            `
                SELECT * 
                FROM  teachers
                ORDER BY name ASC
            `, function(err, results) {
                if(err) 
                throw `Database Error! ${err}`;

                callback(results.rows);
        }
    );
    },
    create(data, callback) {
        const query = `
                INSERT INTO teachers (
                    avatar_url,
                    name,
                    gender,
                    birth,
                    degree,
                    class_type,
                    subject_taught,
                    created_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 )
                RETURNING id
        `

        const value = [
            data.avatar_url,
            data.name,
            data.gender,
            data(data.birth).iso,
            data.degree,
            data.class_type,
            data.subject_taught,
            data(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if(err) 
            throw `Database Error! ${err}`;

            callback (results.rows[0]);   
        }
    ); 
            
    },
    find(id, callback) {
        db.query (
            `
            SELECT *
            FROM teachers
            WHERE id = ${id}
            `, function(err, results) {
                if(err) 
                throw `Database Error! ${err}`;

                callback(results.rows[0]);
            }
        );
    },
    update(data, callback) {
        const query = 
        `
        UPDATE teachers
        SET
        avatar_url=($1),
        name=($2),
        gender=($3),
        birth=($4),
        degree=($5),
        class_type=($6),
        subject_taught=($7),
        WHERE id = $8
        `
        const value = [
            data.avatar_url,
            data.name,
            data.gender,
            data(data.birth).iso,
            data.degree,
            data.class_type,
            data.subject_taught,
            data.id
        ]

        db.query(query, value, 
            function(err, results) {
                if(err)
                throw `Database Error! ${err}`;

                callback();
            }
        );
    },
    delete(id, callback) {
        db.query (
            `
                DELETE FROM teachers 
                WHERE id = $1
            `, [id], function(err, results) {
                if(err)
                throw `Database Error! ${err}`;
                }
        );

        callback();
    },
}; 