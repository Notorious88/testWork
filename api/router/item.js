const express = require('express');
const router = express.Router();

const auth = require("./../middleware/auth")

const itemControl = require("./controller/itemControl")

router.get("/",
    itemControl.item_show
);

router.get("/show/:ID",
    itemControl.item_show_one
);

router.post("/create",
    auth,
    itemControl.item_create
);

router.patch("/change/:ID",
    auth,
    itemControl.item_change
);

router.delete("/delete/:ID",
    auth,
    itemControl.item_delete
);

module.exports = router;