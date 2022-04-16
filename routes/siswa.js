const Sequelize = require('sequelize');
const express = require('express');
const db = require("../config/database");
const Siswa = require("../models/siswa")(db, Sequelize.DataTypes);
const Kelas = require("../models/kelas")(db, Sequelize.DataTypes);
const KelasSiswa = require("../models/kelasiswas")(db, Sequelize.DataTypes);

const router = express.Router();

router.post("/", async function(req, res) {
    const name = req.body.name;
    const semester = req.body.semester;
    const siswa = await Siswa.create({
        name,
        semester
    });
    res.send(siswa);
});

router.post("/:id/enroll", async function(req, res) {
    const id = req.params.id;
    const idKelas = req.body.idKelas;
    const kelasSiswa = await KelasSiswa.create({
        idSiswa: id,
        idKelas: idKelas
    });
    res.send(kelasSiswa);
});

router.get("/:id/kelas", async function(req, res) {
    const id = req.params.id;
    var idKelas = await KelasSiswa.findAll({
        where: {
            idSiswa: id
        }
    });

    idKelas = idKelas.map(kelas => kelas.idKelas);

    const kelas = await Kelas.findAll({
        where: {
            id: idKelas
        }
    });
    res.send(kelas);
});

router.get("/", async function(req, res) {
    const page = req.query.page || 0;
    const limit = req.query.limit || 10;
    const siswas = await Siswa.findAndCountAll({
        limit: limit,
        offset: page * limit
    });
    res.send(siswas);
});

router.put("/:id", async function(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const semester = req.body.semester;
    const siswa = await Siswa.update({
        name,
        semester
    }, {
        where: {
            id  
        }
    });
    res.send({ id: id, name: name, semester: semester });
});

router.delete("/:id", async function(req, res) {
    const id = req.params.id;
    const siswa = await Siswa.destroy({
        where: {
            id
        }
    });
    res.send({ id: id });
});

module.exports = router;