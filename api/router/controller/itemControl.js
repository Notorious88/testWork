const {ITEM} = require("../../../database/model/index")
const tools = require("../../utils/tools");

let COUNT_ITEMS

exports.item_create = async (req, res) => {
    if (req.body.name === undefined) {
        return res.status(412).json({
            success: false,
            massage: "Invalid data"
        })
    }

    await new ITEM({
        name: req.body.name
    })
        .save()
        .then(result => {
            res.status(200).json({
                success: true,
                massage: "Create success"
            })

            if (COUNT_ITEMS === undefined) COUNT_ITEMS = 0
            COUNT_ITEMS++

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                success: false,
                massage: "create"
            })
        })
}


exports.item_show = async (req, res) => {
    if (COUNT_ITEMS === undefined) {
        await ITEM.countDocuments()
            .then(number => {
                COUNT_ITEMS = number
            })
    }

    const pageContent = tools.pagination(req.url, COUNT_ITEMS);

    await ITEM.find()
        .skip(pageContent.multiplyNumber * 10)
        .limit(10)
        .then(result => {

            const items = result.filter(item => {
                return {id: item._id, name: item.name}
            })


            res.render("index", {
                success: true,
                items,
                pagination: pageContent.pagination,
                author: req.isAuthenticated()
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                massage: "Error"
            })
        })

}

exports.item_show_one = (req, res) => {
    ITEM.find({_id: req.params.ID})
        .then(result => {
            if (result[0]) {
                res.render("item", {
                    success: true,
                    name: result[0].name,
                    author: req.isAuthenticated()
                })
            }
        }).catch(err => {
        res.status(404);
        res.render('404.hbs');
    })
}

exports.item_change = async (req, res) => {
    if (req.body.name === undefined) {
        return res.status(412).json({
            success: false,
            massage: "Invalid data"
        })
    }
    await ITEM.updateOne({_id: req.params.ID}, {"$set": {name: req.body.name}})
        .then(result => {
            res.status(200).json({
                success: true,
                massage: "change"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                success: false,
                massage: "Error"
            })
        })


}


exports.item_delete = async (req, res) => {
    await ITEM.remove({_id: req.params.ID})
        .then(result => {
            res.status(200).json({
                success: true,
                massage: "delete"
            })
            COUNT_ITEMS--
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                success: false,
                massage: "Error"
            })
        })
}