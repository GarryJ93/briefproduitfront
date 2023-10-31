import { Categorie } from "./categorie";

export interface Product {
    id?: number;
    nom: string;
    prix: number;
    quantite: number;
    id_categorie: number;
    categorie: Categorie;
}
