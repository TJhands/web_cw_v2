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
   Game.findAndCountAll({
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
    Game.findAndCountAll({
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
router.post("/addFavoriteGame", async (req,res) =>{
    let{userId, gameId} = req.body;
    User.findOne({
        where:{
            id:userId
        }
    }).then(user =>{
        Game.findOne({
            where:{
                id:gameId
            }
        }).then(game =>{
            user.addGame(game)
        })
    })
});
router.post("/removeFavoriteGame", async (req,res) =>{
    let{userId, gameId} = req.body;
    User.findOne({
        where:{
            id:userId
        }
    }).then(user =>{
        Game.findOne({
            where:{
                id:gameId
            }
        }).then(game =>{
            user.removeGame(game)
        })
    })
});

router.post("/getFavoriteGamesByUser", async (req,res) =>{
   let {userId} = req.body;
   User.findOne({
       where:{
           id:userId
       }
   }).then(user =>{
       user.getGames().then(games =>{
           res.json(games)
       })
   })
});

router.post("/checkIsFavoriteGame", async (req,res) =>{
    let {userId,gameId} = req.body;
    User.findOne({
        where:{
            id:userId
        }
    }).then(user =>{
        user.getGames({
            where :{
                id: gameId
            }
        }).then(game =>{
            if (game !== null){
                res.json({result:true})
            } else{
                res.json({result:false})
            }
        })
    })
});

router.post("/writeComment", async (req,res) =>{
    let{userId,gameId,replyId,content} = req.body;
    Reply.create({
        userId: userId,
        gameId:gameId,
        replyId:replyId,
        content:content
    }).then(reply =>{
        res.json({result:true})
    })
});

module.exports = router;
