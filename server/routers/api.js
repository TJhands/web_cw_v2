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
    GameType.findAll({
        include:[
            {
                model: Game,
                order: [['score','DESC']]
            }
        ],

    }).then(gameTypes =>{
        res.json(gameTypes)
    })
});

router.post("/getAllGames", async (req,res) =>{

   let { currentPage = 1, pageSize } = req.body;
   let offset = (currentPage - 1) * pageSize;
   Game.findAll({
       limit: pageSize,
       offset: offset
   }).then(games =>{
       res.json(games)
   })
});
router.post("/getAllGameTypes", async (req,res) =>{
    GameType.findAll({
    }).then(gametypes =>{
        res.json(gametypes)
    })
});
router.post("/getGamesByType", async (req,res) =>{
    console.log(req.body);
    let { gameTypeId, currentPage = 1, pageSize } = req.body;
    let offset = (currentPage - 1) * pageSize;
    Game.findAll({
        where: {
          gameTypeId:gameTypeId[0]
        },
        limit: pageSize,
        offset: offset
    }).then(games =>{
        res.json(games)
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
