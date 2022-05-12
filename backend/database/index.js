const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ghizlaneAfriad:Lavieenrose@cluster0.594rk.mongodb.net/Piquante?retryWrites=true&w=majority', { 
  useNewUrlParser: true,
   useUnifiedTopology: true
}).then( () => console.log('connexion db ok !')).catch( err => console.log(err));
 