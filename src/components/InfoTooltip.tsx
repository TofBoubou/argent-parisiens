'use client';

import { useState, useRef, useEffect } from 'react';

// Dictionnaire des termes avec leurs explications
const glossaire: Record<string, string> = {
  // Page Recettes
  'fiscalité directe': "Impôts payés directement par les contribuables à la Ville : taxe foncière pour les propriétaires, taxe d'habitation pour les résidences secondaires. C'est l'argent que vous versez chaque année si vous êtes propriétaire à Paris.",

  'fiscalité indirecte': "Impôts \"cachés\" dans les prix : TVA reversée par l'État, taxes sur les transactions immobilières. Vous les payez sans vous en rendre compte quand vous achetez un bien ou consommez.",

  'attributions de compensation': "Quand l'État ou la Métropole récupère un impôt qui allait à Paris, ils doivent compenser. C'est comme un \"loyer\" versé à Paris pour les impôts qu'on lui a retirés. 1,8 Md€ par an.",

  'tfpb': "L'impôt des propriétaires. Calculé sur la valeur locative de votre bien × le taux voté par Paris (20,5 %). Rapporte 1,85 Md€ à la Ville, mais les bases sont très élevées à Paris.",

  'taxe foncière': "L'impôt des propriétaires. Calculé sur la valeur locative de votre bien × le taux voté par Paris (20,5 %). Rapporte 1,85 Md€ à la Ville, mais les bases sont très élevées à Paris.",

  'thrs': "Taxe d'habitation sur les résidences secondaires. Supprimée pour les résidences principales, elle reste due par les propriétaires de pied-à-terre parisiens. Majorée de 60 % à Paris.",

  'ifer': "Taxe payée par les opérateurs de réseaux (télécom, électricité, gaz) pour leurs installations sur le territoire. Antennes, transformateurs, canalisations : ils paient pour occuper l'espace.",

  'cfe': "L'impôt local des entreprises, basé sur leurs locaux. Transféré à la Métropole du Grand Paris en 2025 : Paris perd cette recette mais reçoit une compensation.",

  'teom': "La taxe poubelle, prélevée avec la taxe foncière. Elle finance la collecte et le traitement des ordures. À Paris : 573 M€ collectés, plus que ce que coûte réellement le service.",

  'dmto': "Les \"frais de notaire\" en partie. Quand vous achetez un appartement, 4,5 % du prix va au département (donc à Paris). Très sensible au marché immobilier : -24 % prévu en 2025.",

  'droits de mutation': "Les \"frais de notaire\" en partie. Quand vous achetez un appartement, 4,5 % du prix va au département (donc à Paris). Très sensible au marché immobilier : -24 % prévu en 2025.",

  'tsca': "Taxe prélevée sur vos contrats d'assurance (auto, habitation...). L'État la collecte et en reverse une partie aux collectivités. 92 M€ pour Paris.",

  'dgd': "Compensation versée par l'État quand il transfère des compétences aux collectivités. \"Tu gères les collèges ? Voici l'argent pour le faire.\" 15,8 M€ pour Paris.",

  'ticpe': "La taxe sur l'essence et le diesel. Une partie finance le RSA. Problème : elle baisse avec la transition écologique, mais le RSA augmente.",

  'dgf': "La principale dotation de l'État aux collectivités. Paris n'en reçoit plus depuis 4 ans : la Ville est jugée \"trop riche\" par les critères nationaux. 0 € en 2025.",

  'fctva': "Quand Paris investit, elle paie la TVA. L'État lui rembourse ensuite une partie. C'est un coup de pouce à l'investissement public. 10 M€ attendus.",

  'plf': "Le projet de budget de l'État pour l'année suivante. Ses mesures peuvent menacer les finances de Paris : prélèvements, gel de dotations... 350 M€ de risque en 2025.",

  'cnracl': "La caisse de retraite des fonctionnaires territoriaux. Paris y cotise pour ses agents. Hausse de 4 points en 2025 = 45 M€ de dépenses en plus.",

  'mgp': "La Métropole du Grand Paris, intercommunalité de 131 communes. Elle récupère certains impôts de Paris (CFE) et verse des compensations en échange.",

  'métropole du grand paris': "Intercommunalité de 131 communes. Elle récupère certains impôts de Paris (CFE) et verse des compensations en échange.",

  'cvae': "Impôt sur les bénéfices des entreprises, supprimé progressivement. Paris l'a perdu, remplacé par une fraction de TVA sur laquelle elle n'a aucun contrôle.",

  // Page Dépenses
  'masse salariale': "Tout ce que coûtent les agents : salaires, primes, cotisations retraite et sécu. 2,89 Md€ pour ~55 000 agents. +20 % en 7 ans.",

  'péréquation': "Robin des Bois version collectivités : les \"riches\" (Paris) donnent aux \"pauvres\". Paris reverse 1,6 Md€/an, soit 20 % du total national. Pas de retour en arrière possible.",

  'fngir': "Compensation figée depuis 2011 lors de la réforme de la taxe pro. Paris verse 898 M€/an, montant gelé alors que ses charges augmentent. Un boulet permanent.",

  'fsrif': "Solidarité entre communes d'Île-de-France. Paris finance 50 % du fonds à elle seule (208 M€). L'argent va aux communes les plus pauvres de la région.",

  'fpic': "Le pot commun national des intercommunalités. Prélevé sur les territoires riches, redistribué aux pauvres. Paris y contribue à hauteur de 200 M€.",

  'fsdrif': "Solidarité entre départements d'IDF. Paris (seule ville-département) verse 30 M€ aux départements voisins moins favorisés.",

  'rsa': "Le revenu minimum pour les personnes sans ressources. Paris le verse (461 M€) mais l'État ne compense que partiellement. Reste à charge : 177 M€/an.",

  'casvp': "Le \"bras social\" de la Ville : aide aux personnes âgées, handicapées, en difficulté. Un établissement public financé à 420 M€ par Paris.",

  'idfm': "L'autorité qui gère métro, bus, RER en Île-de-France. Paris lui verse 472 M€/an mais n'a qu'une voix parmi d'autres pour décider des lignes et des tarifs.",

  'île-de-france mobilités': "L'autorité qui gère métro, bus, RER en Île-de-France. Paris lui verse 472 M€/an mais n'a qu'une voix parmi d'autres pour décider des lignes et des tarifs.",

  'solideo': "La société qui a construit les sites olympiques. Paris lui a versé 165 M€ pour les JO 2024. Elle reverse maintenant le \"trop-perçu\" à la Ville.",

  // Page Dette
  'encours de dette': "Le total de ce que Paris doit encore rembourser. Comme le capital restant dû sur un crédit immobilier. 9,4 Md€ fin 2025, record historique.",

  'épargne brute': "Ce qui reste quand on a payé toutes les dépenses de fonctionnement. C'est l'argent disponible pour investir ou rembourser la dette. 571 M€ en 2025, insuffisant.",

  'durée de désendettement': "Si Paris utilisait toute son épargne pour rembourser, combien d'années faudrait-il ? 16,4 ans. Au-delà de 12 ans = situation dégradée selon les experts.",

  'annuité': "La facture annuelle de la dette : capital remboursé + intérêts. 533 M€ en 2025, soit 1,5 M€ par jour qui ne finance aucun service.",

  'dette obligataire': "Plutôt qu'emprunter à une banque, Paris émet des \"obligations\" sur les marchés. Les investisseurs prêtent, Paris rembourse avec intérêts. 99 % de la dette parisienne.",

  // Page Investissements
  'ap': "L'engagement total sur un projet pluriannuel. \"Cette école coûtera 20 M€ sur 4 ans\" = AP de 20 M€. Permet de lancer des chantiers longs.",

  'autorisation de programme': "L'engagement total sur un projet pluriannuel. \"Cette école coûtera 20 M€ sur 4 ans\" = AP de 20 M€. Permet de lancer des chantiers longs.",

  'autorisations de programme': "L'engagement total sur un projet pluriannuel. \"Cette école coûtera 20 M€ sur 4 ans\" = AP de 20 M€. Permet de lancer des chantiers longs.",

  'cp': "L'argent réellement dépensé l'année N sur un projet. L'AP est la promesse, le CP est le chèque signé. Stock total : 8,6 Md€ de projets en cours.",

  'crédits de paiement': "L'argent réellement dépensé l'année N sur un projet. L'AP est la promesse, le CP est le chèque signé. Stock total : 8,6 Md€ de projets en cours.",

  'zac': "Quartiers entiers aménagés par la Ville : logements, équipements, espaces verts. Paris Rive Gauche, Clichy-Batignolles... La Ville maîtrise tout le projet.",

  'zone d\'aménagement concerté': "Quartiers entiers aménagés par la Ville : logements, équipements, espaces verts. Paris Rive Gauche, Clichy-Batignolles... La Ville maîtrise tout le projet.",

  'budget participatif': "Vous votez, la Ville construit. 5 % du budget d'investissement décidé directement par les Parisiens. 121 projets retenus en 2024 pour 80 M€.",

  // Page Politiques
  'apa': "Aide financière pour les personnes âgées dépendantes : payer une aide à domicile, une maison de retraite. Paris verse 145 M€, partiellement compensés par l'État.",

  'pch': "L'équivalent de l'APA pour les personnes handicapées. Finance les aménagements, aides humaines, fauteuils... Paris assume une partie du coût.",

  'mna': "Jeunes migrants arrivés seuls en France, sans famille. Paris doit les héberger et les accompagner jusqu'à 18 ans (voire 21 ans). Coût en forte hausse.",

  'mineurs non accompagnés': "Jeunes migrants arrivés seuls en France, sans famille. Paris doit les héberger et les accompagner jusqu'à 18 ans (voire 21 ans). Coût en forte hausse.",

  'pmi': "Services de santé gratuits pour les femmes enceintes et enfants de 0 à 6 ans. Consultations, vaccins, dépistages. Géré par le département (donc Paris).",

  'espci': "Grande école scientifique parisienne (physique-chimie). 6 prix Nobel y ont travaillé. Paris la finance à hauteur de 13 M€/an.",

  'bspp': "Les pompiers de Paris, militaires sous statut spécial. Paris paie 119 M€/an mais ne les commande pas : c'est le préfet de police qui décide.",

  'brigade de sapeurs-pompiers': "Les pompiers de Paris, militaires sous statut spécial. Paris paie 119 M€/an mais ne les commande pas : c'est le préfet de police qui décide.",

  'esa': "Budget de proximité géré par chaque mairie d'arrondissement. Entretien des écoles, espaces verts locaux, animations. 173 M€ répartis entre les 17 arrondissements.",

  'états spéciaux d\'arrondissement': "Budget de proximité géré par chaque mairie d'arrondissement. Entretien des écoles, espaces verts locaux, animations. 173 M€ répartis entre les 17 arrondissements.",

  // Page Données techniques
  'opérations d\'ordre': "Écritures comptables \"miroir\" : ce qui sort d'un côté rentre de l'autre. Aucun euro ne bouge vraiment, c'est de la technique comptable pure.",

  'amortissement': "Un bâtiment neuf perd de la valeur avec le temps. L'amortissement enregistre cette usure chaque année. 463 M€ en 2025, qui \"financent\" les investissements.",

  'amortissements': "Un bâtiment neuf perd de la valeur avec le temps. L'amortissement enregistre cette usure chaque année. 463 M€ en 2025, qui \"financent\" les investissements.",

  'provisions': "Argent mis de côté pour les mauvaises surprises : procès perdus, factures impayées. 27 M€ provisionnés en 2025 \"au cas où\".",

  'virement à l\'investissement': "Quand le fonctionnement dégage un excédent, on peut le transférer vers l'investissement. 128 M€ en 2025, contre 79 M€ en 2024. Reste très insuffisant face aux besoins.",

  // Termes supplémentaires courants
  'syctom': "Le syndicat qui traite les déchets de Paris et 84 communes voisines. Incinération, recyclage, valorisation. Paris lui verse 119 M€/an.",

  'cojop': "Le Comité d'organisation des JO Paris 2024. Structure qui a géré l'événement sportif. Paris a contribué aux jeux paralympiques.",

  'tfpnb': "Taxe foncière sur les propriétés non bâties. Concerne les terrains nus, jardins, parkings non couverts. Très faible à Paris (peu de terrains nus).",
};

interface InfoTooltipProps {
  terme: string;
  children?: React.ReactNode;
}

export default function InfoTooltip({ terme, children }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const explication = glossaire[terme.toLowerCase()];

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Si moins de 200px en dessous, afficher au-dessus
      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!explication) {
    // Si le terme n'est pas dans le glossaire, afficher juste le texte
    return <>{children || terme}</>;
  }

  return (
    <span className="relative inline-flex items-center group" ref={tooltipRef}>
      {children || terme}
      <button
        ref={triggerRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="ml-0.5 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-gray-400 hover:text-primary bg-gray-100 hover:bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label={`En savoir plus sur ${terme}`}
      >
        i
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 w-72 sm:w-80 p-3 text-sm bg-white border border-gray-200 rounded-lg shadow-lg ${
            position === 'top'
              ? 'bottom-full mb-2'
              : 'top-full mt-2'
          } left-1/2 -translate-x-1/2`}
          role="tooltip"
        >
          <div className="font-semibold text-primary mb-1 capitalize">{terme}</div>
          <p className="text-gray-600 leading-relaxed">{explication}</p>
          {/* Flèche */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-gray-200 transform rotate-45 ${
              position === 'top'
                ? 'bottom-[-5px] border-r border-b'
                : 'top-[-5px] border-l border-t'
            }`}
          />
        </div>
      )}
    </span>
  );
}
