const router=express.Router();
const fs = require("fs");
const db = require("../db/db.json");
const uuid = require('uuid');

router.get("/api/notes")