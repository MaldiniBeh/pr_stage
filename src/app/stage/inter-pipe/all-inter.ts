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
  libele: string,
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
  salaire: number,
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
  id_entre?: number,
  date_ent: string,
  heure: string,
  lieu: string,
  nom_entre: string,
  prenom_entre: string,
  id_pers_entre?: number,
  profe_entre: string,
  observation: string,

  nom: string,
  prenom: string,
  date_naissance: string,
  sexe: string,
  residence: string,
  email: string,
  situa_mat: string,
  anne: string,
  fili?: string,
  theme: string,
  salaire: number,
  id_stagiaire: number,
  numero: string,
  competence: string,

  id_stg: string,
  etat_sta: string,
  dure_d: string,
  dure_f: string,

  nom_et: string,

  prenom_encad: string,
  nom_encad: string,
  profe_encad: string,
  id_pers_encd: string
}

