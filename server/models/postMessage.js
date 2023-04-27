import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    dateDeNaissance: String,
    profession: String,
    adresse: String,
    medecinTraitant: String,
    telephone: Number,
    email: String,
    name: String,
    numeroFichePatient:String,
    id: { type: String } ,

    
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;


