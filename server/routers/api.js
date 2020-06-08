const { Router } = require("express");
const router = new Router();
const { User,Game,GameType,Reply } = require(__dirname + "/../db");

router.get("/getAllUsers/:id", async (req, res) => {
    console.log(req.params.id);
    User.findAll().then(users =>{res.json(users);
    }

    )
}
);
router.get("/getFirstTenGames", async (req, res)=>{
    Game.findAll({limit : 10, order: [['score','DESC']]}).then(games =>{
        res.json(games)
    })
});
router.get("/getTypeGames", async (req,res) =>{
    let { currentPage = 1 } = req.query;
    let offset = (currentPage - 1) * 5;
    GameType.findAll({
        include:[
            {
                model: Game,
                limit: 5,
                order: [['score','DESC']]
            }
        ],
        offset,
        limit:5

    }).then(gameTypes =>{
        res.json(gameTypes)
    })
});
router.get("/getUserById/:id",async (req,res) =>{
    User.findOne({
        where:{
            id: req.params.id
        },
        include:[
            {
                model: Game,
                order: [['score','DESC']],
                through:{
                    attributes:[]
                }
            }
        ]
    }).then(user =>{
        res.json(user)
    })
});
router.get("/getGameCommentById/:id", async (req,res) =>{
    Game.findOne({
        where:{
            id: req.params.id
        },
        include:[
            {
                model: Reply,
                include:[
                    {
                        model: User,
                        as: 'poster'
                    },
                    {
                        model: Reply,
                        as: 'child'
                    }
                ]
            }
        ]
    }).then(game =>{
        res.json(game)
    })
});

//add favorate game to user
router.get("/addFavorateGame", async (req,res) =>{

});

module.exports = router;
