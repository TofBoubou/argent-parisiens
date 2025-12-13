'use client';

import { useState, useRef, useEffect } from 'react';

// Dictionnaire des termes avec leurs explications - Version simplifiée pour tous
const glossaire: Record<string, string> = {
  // Page Recettes
  'fiscalité directe': "Les impôts que vous payez directement à Paris chaque année : la taxe foncière si vous êtes propriétaire, ou la taxe d'habitation si vous avez une résidence secondaire.",

  'fiscalité indirecte': "Des taxes que vous payez sans forcément le savoir, cachées dans le prix des choses : par exemple quand vous achetez un appartement ou via la TVA.",

  'attributions de compensation': "Quand l'État prend un impôt qui revenait à Paris, il doit rendre l'équivalent. C'est un peu comme un remboursement obligatoire. Paris reçoit 1,8 milliard € par an.",

  'tfpb': "La taxe foncière : l'impôt que paient les propriétaires d'appartements ou de maisons à Paris. Elle rapporte 1,85 milliard € à la Ville chaque année.",

  'taxe foncière': "L'impôt annuel que paient tous les propriétaires d'appartements ou de maisons à Paris. Elle rapporte 1,85 milliard € à la Ville.",

  'thrs': "Une taxe pour ceux qui ont un appartement à Paris mais n'y habitent pas (résidence secondaire ou pied-à-terre). Elle est majorée de 60 % à Paris.",

  'ifer': "Une taxe payée par Orange, EDF, Engie... pour leurs antennes, câbles et installations dans Paris.",

  'cfe': "Un impôt que payaient les entreprises à Paris. Depuis 2025, cet argent va à la Métropole du Grand Paris, pas à la Ville.",

  'teom': "La « taxe poubelle » : elle paie le ramassage et le traitement de vos ordures. Vous la payez avec votre taxe foncière.",

  'dmto': "Une partie des « frais de notaire » quand vous achetez un appartement. Sur un achat de 500 000 €, environ 22 500 € vont à Paris.",

  'droits de mutation': "Une partie des « frais de notaire » quand vous achetez un appartement. Sur un achat de 500 000 €, environ 22 500 € vont à Paris.",

  'tsca': "Une petite taxe prélevée sur vos assurances (auto, habitation...). L'État en reverse une partie à Paris.",

  'dgd': "De l'argent que l'État donne à Paris pour gérer certains services à sa place, comme les collèges.",

  'ticpe': "La taxe sur l'essence et le diesel. Une partie sert à financer le RSA.",

  'dgf': "L'aide principale que l'État verse aux villes. Mais Paris est considérée « trop riche » : elle ne reçoit plus rien depuis 4 ans.",

  'fctva': "Quand Paris construit une école ou rénove une rue, elle paie la TVA. L'État lui en rembourse une partie après.",

  'plf': "Le budget de l'État pour l'année prochaine. Il peut contenir des mauvaises nouvelles pour Paris : moins d'aides, plus de prélèvements...",

  'cnracl': "La caisse de retraite des employés de la Ville. Paris cotise pour que ses agents aient une retraite.",

  'mgp': "La Métropole du Grand Paris : un regroupement de 131 villes autour de Paris qui gère certains sujets ensemble.",

  'métropole du grand paris': "Un regroupement de 131 villes autour de Paris qui gère certains sujets en commun et récupère certains impôts.",

  'cvae': "Un ancien impôt sur les entreprises que Paris a perdu. Il a été remplacé par une part de TVA sur laquelle Paris n'a aucun contrôle.",

  // Page Dépenses
  'masse salariale': "Tout ce que Paris dépense pour payer ses employés : salaires, primes, cotisations retraite... 2,89 milliards € pour environ 55 000 personnes.",

  'péréquation': "Un système de solidarité : Paris, considérée comme « riche », doit donner 1,6 milliard € par an aux villes plus pauvres de France.",

  'fngir': "Une somme fixe de 898 millions € que Paris doit verser chaque année depuis 2011. Le montant ne baisse jamais, même si Paris a des difficultés.",

  'fsrif': "Un pot commun entre les villes d'Île-de-France. Paris en paie la moitié à elle seule (208 millions €) pour aider les villes plus pauvres de la région.",

  'fpic': "Une cagnotte nationale où les territoires riches donnent pour les territoires pauvres. Paris y met 200 millions € par an.",

  'fsdrif': "Paris donne 30 millions € par an aux départements voisins (Seine-Saint-Denis, Val-de-Marne...) qui ont moins de moyens.",

  'rsa': "Le Revenu de Solidarité Active : l'aide pour les personnes sans revenus. Paris le verse mais l'État ne rembourse pas tout. Il manque 177 millions € par an.",

  'casvp': "Le Centre d'Action Sociale : l'organisme qui aide les personnes âgées, handicapées ou en difficulté à Paris. Budget : 420 millions €.",

  'idfm': "L'organisme qui gère le métro, les bus et le RER en Île-de-France. Paris lui verse 472 millions € par an.",

  'île-de-france mobilités': "L'organisme qui gère le métro, les bus et le RER. Paris paie 472 millions € par an mais n'a pas beaucoup de pouvoir sur les décisions.",

  'solideo': "La société qui a construit les installations des JO 2024 (piscines, stades...). Paris lui a donné 165 millions €.",

  // Page Dette
  'encours de dette': "Le total de ce que Paris doit encore rembourser. C'est comme le capital restant dû sur un prêt immobilier. Montant : 9,4 milliards €.",

  'épargne brute': "L'argent qui reste à Paris une fois toutes les dépenses courantes payées. C'est avec ça qu'elle peut investir ou rembourser ses dettes. Seulement 571 millions € en 2025.",

  'durée de désendettement': "Le nombre d'années qu'il faudrait à Paris pour rembourser toute sa dette si elle y consacrait toute son épargne. Actuellement : 16,4 ans. Au-delà de 12 ans, c'est inquiétant.",

  'annuité': "Ce que Paris rembourse chaque année sur sa dette : le capital emprunté + les intérêts. Ça fait 533 millions €, soit 1,5 million € par jour.",

  'dette obligataire': "Paris emprunte de l'argent en vendant des « obligations » à des investisseurs, au lieu de passer par une banque. C'est 99 % de sa dette.",

  // Page Investissements
  'ap': "Une enveloppe budgétaire pour un grand projet sur plusieurs années. Exemple : « Cette école coûtera 20 millions € sur 4 ans ».",

  'autorisation de programme': "Une enveloppe budgétaire pour un grand projet sur plusieurs années. Exemple : « Cette école coûtera 20 millions € sur 4 ans ».",

  'autorisations de programme': "Des enveloppes budgétaires pour de grands projets sur plusieurs années. Paris a 8,6 milliards € de projets en cours.",

  'cp': "L'argent réellement dépensé cette année sur un projet. C'est la différence entre la promesse (l'enveloppe) et le chèque signé.",

  'crédits de paiement': "L'argent réellement dépensé cette année sur un projet. C'est la différence entre la promesse (l'enveloppe) et le chèque signé.",

  'zac': "Un quartier entier construit ou rénové par la Ville : logements, écoles, parcs... Exemples : Paris Rive Gauche (13e), Clichy-Batignolles (17e).",

  'zone d\'aménagement concerté': "Un quartier entier construit ou rénové par la Ville : logements, écoles, parcs... Exemples : Paris Rive Gauche, Clichy-Batignolles.",

  'budget participatif': "C'est vous qui décidez ! Les Parisiens votent pour des projets, et la Ville les réalise. 121 projets retenus en 2024 pour 80 millions €.",

  // Page Politiques
  'apa': "L'Allocation Personnalisée d'Autonomie : une aide financière pour les personnes âgées qui ont besoin d'assistance au quotidien (aide à domicile, maison de retraite...).",

  'pch': "La Prestation de Compensation du Handicap : une aide pour les personnes handicapées (aménagement du logement, fauteuil roulant, aide à domicile...).",

  'mna': "Des jeunes migrants arrivés seuls en France, sans leurs parents. Paris doit les loger et s'occuper d'eux jusqu'à leurs 18 ans (parfois 21 ans).",

  'mineurs non accompagnés': "Des jeunes migrants arrivés seuls en France, sans leurs parents. Paris doit les loger et s'occuper d'eux jusqu'à leurs 18 ans.",

  'pmi': "La Protection Maternelle et Infantile : des consultations gratuites pour les femmes enceintes et les enfants de 0 à 6 ans (vaccins, suivi médical...).",

  'espci': "Une grande école de sciences à Paris, spécialisée en physique et chimie. 6 prix Nobel y ont travaillé ! Paris la finance.",

  'bspp': "Les pompiers de Paris. Ce sont des militaires. Paris paie 119 millions € par an, mais c'est le préfet qui les dirige, pas le maire.",

  'brigade de sapeurs-pompiers': "Les pompiers de Paris. Ce sont des militaires. Paris paie 119 millions € par an, mais c'est le préfet qui les dirige, pas le maire.",

  'esa': "Le budget que chaque mairie d'arrondissement gère elle-même : entretien des écoles, petits parcs, animations locales...",

  'états spéciaux d\'arrondissement': "Le budget que chaque mairie d'arrondissement gère elle-même : entretien des écoles, petits parcs, animations locales...",

  // Page Données techniques
  'opérations d\'ordre': "Des écritures comptables où l'argent ne bouge pas vraiment : ce qui sort d'un compte rentre dans un autre. C'est de la technique comptable.",

  'amortissement': "Chaque année, on note qu'un bâtiment ou un équipement vieillit et perd de la valeur. C'est comme la décote d'une voiture.",

  'amortissements': "Chaque année, on note que les bâtiments et équipements vieillissent et perdent de la valeur. C'est comme la décote d'une voiture.",

  'provisions': "De l'argent mis de côté pour les imprévus : un procès perdu, une facture impayée, une mauvaise surprise...",

  'virement à l\'investissement': "Quand il reste de l'argent après les dépenses courantes, on peut le transférer pour construire ou rénover des équipements.",

  // Termes supplémentaires courants
  'syctom': "L'organisme qui s'occupe des poubelles de Paris et de 84 villes voisines : tri, recyclage, incinération...",

  'cojop': "Le Comité d'Organisation des Jeux Olympiques Paris 2024 : la structure qui a organisé les JO et les Paralympiques.",

  'tfpnb': "Une taxe sur les terrains vides (sans construction). Très rare à Paris car il y a peu de terrains non bâtis.",
};

interface InfoTooltipProps {
  terme: string;
  children?: React.ReactNode;
  forcePosition?: 'top' | 'bottom';
}

export default function InfoTooltip({ terme, children, forcePosition }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>(forcePosition || 'bottom');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const explication = glossaire[terme.toLowerCase()];

  useEffect(() => {
    if (forcePosition) {
      setPosition(forcePosition);
      return;
    }
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
  }, [isOpen, forcePosition]);

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
