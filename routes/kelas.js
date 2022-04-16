const Sequelize = require('sequelize');
const express = require('express');
const db = require("../config/database");
const Siswa = require("../models/siswa")(db, Sequelize.DataTypes);
const Kelas = require("../models/kelas")(db, Sequelize.DataTypes);
const KelasSiswa = require("../models/kelasiswas")(db, Sequelize.DataTypes);

const router = express.Router();

router.post("/", async function(req, res) {
    const name = req.body.name;
    const location = req.body.location;
    const kelas = await Kelas.create({
        name,
        location
    });
    res.send(kelas);
});

router.get("/", async function(req, res) {
    const kelas = await Kelas.findAll();
    res.send(kelas);
});

router.get("/:id/siswa", async function(req, res) {
    const id = req.params.id;
    var idSiswa = await KelasSiswa.findAll({
        where: {
            idKelas: id
        }
    });

    idSiswa = idSiswa.map(siswa => siswa.idSiswa);

    const siswa = await Siswa.findAll({
        where: {
            id: idSiswa
        }
    });
    res.send(siswa);
});

router.put("/:id", async function(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const location = req.body.location;
    const kelas = await Kelas.update({
        name,
        location
    }, {
        where: {
            id
        }
    });
    res.send({ id: id, name: name, location: location });
});

router.delete("/:id", async function(req, res) {
    const id = req.params.id;
    const kelas = await Kelas.destroy({
        where: {
            id
        }
    });
    res.send({ id: id });
});

module.exports = router;

