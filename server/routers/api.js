const { Router } = require("express");
const router = new Router();
const { User } = require(__dirname + "/../db");

router.get("/getAllUsers/:id", async (req, res) => {
    console.log(req.params.id);
    User.findAll().then(users =>{res.json(users);
    }

    )
}
);
module.exports = router;
