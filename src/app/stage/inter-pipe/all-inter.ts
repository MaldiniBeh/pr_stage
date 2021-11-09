export interface Peronel {
  id?: number,
  nom: string,
  prenom: string,
  profession?: string,
  email: string,
  role?: string,
  actif_ina?: number
}
export interface Eta {
  id?: number,
  nom: string
}
export interface Comp {
  libele: string;
  niv: string
}
export interface Stagiaire {
  id?: number,
  nom: string,
  prenom: string,
  date: string,
  sexe: string,
  residence: string,
  email: string,
  tel: string,
  situation: string,
  salaire?: string,
  anne?: string,
  fili?: string,
  etabli?: string,
  id_etabli?: number,
  competence: string
}

export interface Stag {
  id?: number,
  theme?: string,
  etat_sta?: string,
  dure_d?: string,
  dure_f?: string,
  id_stagiaire?: number,
  id_pers?: string
}
export interface Entre {
  id_entre?: number,
  date_ent: string,
  heure: string
  lieu: string,
  id_stagiaire?: number,
  id_pers?: string,
}
export interface Listentre {
  id_entre?: number,
  date_ent: string,
  heure: string
  lieu: string,
  nom: string,
  prenom: string,
  salaire: string,
  nomp: string,
  prenomp: string,
  id_stagiaire?: number,
  numero?: number,
}

/***A tester */
export interface History {
  id?: number;
  date_ent: string;
  heure: string;
  lieu: string;
  nom: string;
  prenom: string;
  id_pers?: number;
  date_naissance: string;
  sexe: string;
  residence: string;
  email: string;
  email_p: string;
  situa_mat: string;
  anne: string;
  fili?: string;
  profession: string;
  nomp: string;
  theme: string;
  etat_sta: string;
  prenomp: string;
  dure_d: string;
  dure_f: string;
  id_stagiaire: string;
  nom_et: string;
  numero: string;
  salaire: string;
}

