const Post = require("../models/Post");
const fs = require("fs"); // Package qui donne accès aux fonctions qui nous permettent de modifier le système de fichiers et de supprimer les fichiers.

// Crée un nouveau post.
exports.newPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  delete postObject._userId;
  const post = new Post({
    ...postObject, // L'opérateur spread "..." permet de recupérer toute les éléments dans "req.body.post".
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, // Créé un path (chemin/route) pour l'image que j'ajoute pour mon post.
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post enregistré" }))
    .catch((error) => res.status(400).json({ error }));
};

// Permet de modifier un post.
exports.modifyPost = (req, res, next) => {
  /* "Req.file" récupére la requête file qui correspond à l'envoi de fichier. "?" ajoute un pamètre qui est une condition dans cette situation, 
    si avec la req.body il y une image à modifier alors la 1er condition est déclenché ":" (sinon) on envoie juste le req.body. */
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete postObject._userId;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(403).json({ error });
      } else {
        Post.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() => {
            // Lance cette condition si l'image est changé et supprime l'ancienne image du dossier "images" grâce au fs.unlink
            if (postObject.imageUrl) {
              const filename = post.imageUrl.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {
                res
                  .status(201)
                  .json({ message: "Détails post et/ou image remplacés !" });
              });
            } else {
              res.status(201).json({ message: "Détails post remplacés !" });
            }
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Permet de supprimer un post.
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(403).json({ error });
      } else {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Post supprimé !" }))
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Renvoi un post qu'on a sélectionné.
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// Renvoi toutes les posts.
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

// Permet d'aimer un post.
exports.likePost = (req, res, next) => {
  if (req.body.like === 1) {
    delete req.body._userId;
    Post.findOne({ _id: req.params.id })
      .then(() => {
        const like = {
          $addToSet: { usersLiked: req.auth.userId }, // L'Opérateur "$addToSet" ajoute l'id de chaque utilisateur qui aime le post dans le tableau "usersLiked".
          $inc: { likes: req.body.like }, // L'Opérateur "$inc" incrémente le like (= 1) à la data "like".
        };
        Post.updateOne({ _id: req.params.id }, like)
          .then(() => res.status(201).json("Like post"))
          .catch((error) => res.status(401).json({ error }));
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else if (req.body.like === -1) {
    delete req.body._userId;

    Post.findOne({ _id: req.params.id })
      .then(() => {
        const dislike = {
          $addToSet: { usersDisliked: req.auth.userId },
          $inc: { dislikes: 1 },
        };
        Post.updateOne({ _id: req.params.id }, dislike)
          .then(() => res.status(201).json("Dislike post"))
          .catch((error) => res.status(401).json({ error }));
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else {
    delete req.body._userId;
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        const idDislikes = post.usersDisliked.find(
          (id) => id == req.auth.userId
        );

        if (idDislikes) {
          const dislike = {
            $pull: { usersDisliked: req.auth.userId },
            $inc: { dislikes: -1 },
          };
          Post.updateOne({ _id: req.params.id }, dislike)
            .then(() => res.status(201).json("Dislike enlevé"))
            .catch((error) => res.status(401).json({ error }));
        } else {
          const like = {
            $pull: { usersLiked: req.auth.userId },
            $inc: { likes: -1 },
          };
          Post.updateOne({ _id: req.params.id }, like)
            .then(() => res.status(201).json("Like enlevé"))
            .catch((error) => res.status(401).json({ error }));
        }
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
};
