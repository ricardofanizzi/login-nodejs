/* Obtener todos los usuarios */
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, rows) => {
            if (err) reject(err)
            resolve(rows);
        });
    });
};

/* Registro de usuarios */
const insert = ({ email, password, name, surname }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users ( email, password, name, surname) VALUES (?, ?, ?, ? )', [email, password, name, surname], (err, result) => {
            if (err) reject(err)
            if (result) {
                resolve(result)
            };
        });
    });
};

/* Obtener usuarios por su Email */
const getByEmail = (pEmail) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [pEmail], (err, rows) => {
            if (err) reject(err)
            resolve(rows[0])
        });
    });
};

/* Obtener usuarios por su ID */
const getById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE id = ?', [pId], (err, rows) => {
            if (err) reject(err)
            resolve(rows[0])
        });
    });
};


module.exports = {
    getAll: getAll,
    insert: insert,
    getByEmail: getByEmail,
    getById: getById
}

