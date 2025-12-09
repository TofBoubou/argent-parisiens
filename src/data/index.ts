// Export all budget data
import sommaire from './00_sommaire.json';
import presentationGenerale from './01_presentation_generale.json';
import equilibreGeneral from './01a_equilibre_general.json';
import chiffresCles from './01b_chiffres_cles.json';
import grandsPostes from './01c_grands_postes.json';
import creditsTransverses from './02_credits_transverses.json';
import servicesGeneraux from './03-0_services_generaux.json';
import securite from './03-1_securite.json';
import enseignement from './03-2_enseignement_formation_apprentissage.json';
import cultureSportsLoisirs from './03-3_culture_vie_sociale_jeunesse_sports_loisirs.json';
import santeActionSociale from './03-4_sante_action_sociale.json';
import amenagementHabitat from './03-5_amenagement_territoires_habitat.json';
import actionEconomique from './03-6_action_economique.json';
import environnement from './03-7_environnement.json';
import transports from './03-8_transports.json';
import nouvellesAP from './04a_nouvelles_autorisations_programme.json';
import situationAP from './04b_situation_autorisations_programme_en_cours.json';
import operationsOrdre from './05_operations_ordre.json';
import recapitulatifChapitre from './06_recapitulatif_par_chapitre.json';

// Grouped exports
export const budgetData = {
  sommaire,
  presentationGenerale,
  equilibreGeneral,
  chiffresCles,
  grandsPostes,
  creditsTransverses,
  politiquesPubliques: {
    servicesGeneraux,
    securite,
    enseignement,
    cultureSportsLoisirs,
    santeActionSociale,
    amenagementHabitat,
    actionEconomique,
    environnement,
    transports,
  },
  autorisationsProgramme: {
    nouvelles: nouvellesAP,
    enCours: situationAP,
  },
  operationsOrdre,
  recapitulatifChapitre,
};

// Individual exports for direct import
export {
  sommaire,
  presentationGenerale,
  equilibreGeneral,
  chiffresCles,
  grandsPostes,
  creditsTransverses,
  servicesGeneraux,
  securite,
  enseignement,
  cultureSportsLoisirs,
  santeActionSociale,
  amenagementHabitat,
  actionEconomique,
  environnement,
  transports,
  nouvellesAP,
  situationAP,
  operationsOrdre,
  recapitulatifChapitre,
};
