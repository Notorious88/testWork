//  для контроллеров и моделей лучше использовать классы, с ними удобней работать
//  Не стоит смешивать promise.then и async/await и использовать что-то одно

const {ITEM} = require("../../../database/model/index")
const tools = require("../../utils/tools");

//  Логично перенести COUNT_ITEMS в файл ITEM, так как она относится к нему, но лучше вообще не использовать глобальные переменные, а обходиться свойствами классов 
let COUNT_ITEMS

exports.item_create = async (req, res) => {
    if (req.body.name === undefined) {
        //  Лучше использовать 422 или 400 ошибку, так как это относится к данным в сущности, а 412 скорее ошибка браузера
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
    //  такой способ хранения количества документов не позволяет использовать фильтрацию и применим только в таком случае
    if (COUNT_ITEMS === undefined) {
        await ITEM.countDocuments()
            .then(number => {
                COUNT_ITEMS = number
            })
    }

    //  нужно использовать объект req.query
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
    //  метода find не вызывает исключения если ничего не найдено и метод работает некорректно при несуществующем id
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
