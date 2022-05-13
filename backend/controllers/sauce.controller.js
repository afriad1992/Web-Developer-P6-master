
const Sauce = require('../database/models/sauce.model');
const fs = require('fs');

exports.postOneSauce = (req, res, next) => {

  const sauce = new Sauce({
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, 
    likes:0,
    dislikes:0,
    usersLiked:[],
    usersDisliked:[],
   
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
      console.log(sauce);
     
    
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneSauce = (req, res, next) => {
 
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.putOneSauce = (req, res, next) => {
 
if(req.file){
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`);
}).catch((error)=>{res.status().json({error})})
};

    const sauce =req.file ? {
    _id: req.params.id,
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
   
  }:{ _id: req.params.id, ...req.body,};
  Sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteOneSauce = (req, res, next) => {
Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {Sauce.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        });
    })
  }) .catch(error => res.status(500).json({ error }));
    
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
    (Sauces) => {
      res.status(200).json(Sauces);
   
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
exports.likeSauce=(req,res,next) => {
  if(req.body.like==1){
    Sauce.updateOne({ _id: req.params.id },{ $inc: { likes: 1 }, $push: { usersLiked:req.body.userId }})
    .then((sauce) => {res.status(201).json({ message: 'Objet modifié !'});
  })
    .catch(error => res.status(400).json({ error }));
  }else if(req.body.like==-1){
    Sauce.updateOne({ _id: req.params.id },{ $inc: { dislikes: 1 }, $push: { usersDisliked:req.body.userId }})
    .then((sauce) =>{ res.status(201).json({ message: 'Objet modifié !'});

  })
    .catch(error => res.status(400).json({ error }));
  }else if(req.body.like==0){
    Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
      if(sauce.usersLiked.includes(req.body.userId)){
      Sauce.updateOne({ _id: req.params.id ,usersLiked: { $in: [ req.body.userId ] }},{ $inc: { likes: -1 }, $pull: { usersLiked:req.body.userId }})
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));


    }else if(sauce.usersDisliked.includes(req.body.userId)){
      Sauce.updateOne({ _id: req.params.id ,usersDisliked: { $in: [ req.body.userId ] }},{ $inc: { dislikes: -1 }, $pull: { usersDisliked:req.body.userId }})
      .then((sauce) => {res.status(201).json({ message: 'Objet modifié !'});
     })
      .catch(error => res.status(400).json({ error }));
    }

}) .catch(error => res.status(500).json({ error }));
  };
 
};