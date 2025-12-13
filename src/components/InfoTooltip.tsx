'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';

// Dictionnaire des termes budgétaires
const glossaire: Record<string, string> = {
  // === RECETTES ===
  'fiscalité directe': "Impôts versés directement par les contribuables parisiens à la Ville : taxe foncière (propriétaires) et taxe d'habitation sur les résidences secondaires. Ces recettes représentent 2,19 Md€, soit 22 % des ressources.",

  'fiscalité indirecte': "Taxes prélevées lors de transactions ou de consommations : droits de mutation immobilière, TVA reversée par l'État, taxe sur les contrats d'assurance. Ces recettes dépendent fortement de la conjoncture économique.",

  'attributions de compensation': "Compensations financières versées à Paris lorsque l'État ou la Métropole du Grand Paris lui retire une compétence fiscale. Ce mécanisme garantit la neutralité budgétaire des transferts. Montant : 1,84 Md€/an.",

  'tfpb': "Taxe Foncière sur les Propriétés Bâties. Impôt annuel calculé sur la valeur locative cadastrale des biens immobiliers. Le taux parisien (20,5 %) reste parmi les plus bas des grandes villes françaises. Rendement : 1,85 Md€.",

  'taxe foncière': "Impôt annuel dû par les propriétaires, calculé sur la valeur locative cadastrale du bien. À Paris, le taux de 20,5 % est inférieur à celui de Lyon (31,9 %), Marseille (43,5 %) ou Bordeaux (47,3 %). Rendement : 1,85 Md€.",

  'thrs': "Taxe d'Habitation sur les Résidences Secondaires. Maintenue après la suppression de la taxe d'habitation sur les résidences principales. Majorée de 60 % à Paris pour lutter contre la sous-occupation des logements. Rendement : 335 M€.",

  'ifer': "Imposition Forfaitaire sur les Entreprises de Réseaux. Taxe acquittée par les opérateurs de télécommunications, d'énergie et de transport pour leurs infrastructures implantées sur le territoire parisien.",

  'cfe': "Cotisation Foncière des Entreprises. Impôt local assis sur la valeur locative des locaux professionnels. Transférée à la Métropole du Grand Paris depuis 2016, Paris perçoit une attribution de compensation en contrepartie.",

  'teom': "Taxe d'Enlèvement des Ordures Ménagères. Prélevée avec la taxe foncière, elle finance la collecte et le traitement des déchets. À Paris : 573 M€ collectés, reversés au SYCTOM et aux services municipaux.",

  'dmto': "Droits de Mutation à Titre Onéreux. Taxe perçue lors des ventes immobilières, communément incluse dans les « frais de notaire ». Le taux est de 4,5 % du prix de vente. Recette très sensible au marché immobilier : 1,3 Md€ prévu en 2025 (-24 %).",

  'droits de mutation': "Taxe perçue lors des transactions immobilières (4,5 % du prix de vente). Recette volatile car directement liée au volume et aux prix des ventes. La baisse du marché immobilier entraîne une chute de 24 % en 2025.",

  'tsca': "Taxe Spéciale sur les Conventions d'Assurance. Prélèvement sur les primes d'assurance (automobile, habitation, santé...). L'État en reverse une fraction aux collectivités territoriales. Part parisienne : 92 M€.",

  'dgd': "Dotation Générale de Décentralisation. Compensation versée par l'État pour les compétences transférées aux collectivités (collèges, action sociale...). Paris perçoit 15,8 M€ au titre de diverses compétences exercées.",

  'ticpe': "Taxe Intérieure de Consommation sur les Produits Énergétiques. Taxe sur les carburants dont une fraction finance le RSA. Cette ressource diminue structurellement avec la transition énergétique.",

  'dgf': "Dotation Globale de Fonctionnement. Principale dotation de l'État aux collectivités. Paris n'en perçoit plus depuis 2021 : ses indicateurs de richesse fiscale dépassent les seuils d'éligibilité. Montant : 0 €.",

  'fctva': "Fonds de Compensation pour la TVA. Remboursement partiel de la TVA acquittée par les collectivités sur leurs dépenses d'investissement. Versé avec un décalage de deux ans. Montant attendu : 10 M€.",

  'plf': "Projet de Loi de Finances. Budget annuel de l'État soumis au Parlement. Les mesures du PLF 2025 représentent un risque de 350 M€ pour Paris : hausse des prélèvements, gel des dotations, contribution au redressement des finances publiques.",

  'cnracl': "Caisse Nationale de Retraites des Agents des Collectivités Locales. Régime de retraite des fonctionnaires territoriaux. La hausse du taux de cotisation employeur (+4 points en 2025) représente une charge supplémentaire de 45 M€ pour Paris.",

  'mgp': "Métropole du Grand Paris. Établissement public regroupant Paris et 130 communes. Elle perçoit la CFE et reverse des attributions de compensation. La gouvernance partagée limite l'autonomie fiscale de Paris.",

  'métropole du grand paris': "Intercommunalité regroupant Paris et 130 communes (7 millions d'habitants). Elle exerce des compétences en matière d'aménagement, de logement et d'environnement, et perçoit une partie de la fiscalité économique.",

  'cvae': "Cotisation sur la Valeur Ajoutée des Entreprises. Impôt sur les entreprises supprimé progressivement depuis 2021. Paris a perdu cette recette dynamique, remplacée par une fraction de TVA nationale moins favorable.",

  // === DÉPENSES ===
  'masse salariale': "Ensemble des rémunérations et charges sociales des agents municipaux : traitements, primes, cotisations retraite et sécurité sociale. Paris emploie environ 55 000 agents pour un coût total de 2,89 Md€, soit 31 % du budget de fonctionnement.",

  'péréquation': "Mécanisme de redistribution entre collectivités. Les territoires considérés comme « riches » contribuent au financement des territoires moins favorisés. Paris verse 1,6 Md€/an (20 % du total national), un montant qui augmente chaque année.",

  'fngir': "Fonds National de Garantie Individuelle des Ressources. Prélèvement institué en 2011 lors de la réforme de la taxe professionnelle. Paris verse 898 M€/an, un montant figé qui ne tient pas compte de l'évolution de ses charges.",

  'fsrif': "Fonds de Solidarité des communes de la Région Île-de-France. Mécanisme régional de péréquation horizontale. Paris contribue à hauteur de 208 M€, soit 50 % du fonds total, au bénéfice des communes franciliennes moins favorisées.",

  'fpic': "Fonds national de Péréquation des ressources Intercommunales et Communales. Dispositif national de solidarité entre intercommunalités. Contribution parisienne : 200 M€/an, prélevés sur les recettes fiscales.",

  'fsdrif': "Fonds de Solidarité des Départements de la Région Île-de-France. Péréquation entre les départements franciliens. Paris (unique ville-département de France) verse 30 M€ aux départements voisins.",

  'rsa': "Revenu de Solidarité Active. Allocation versée aux personnes sans ressources, financée par les départements. Paris verse 461 M€/an mais ne reçoit que 284 M€ de compensation de l'État. Reste à charge : 177 M€.",

  'casvp': "Centre d'Action Sociale de la Ville de Paris. Établissement public qui gère l'aide sociale : accompagnement des personnes âgées, hébergement d'urgence, insertion professionnelle. Budget : 420 M€ financés par la Ville.",

  'idfm': "Île-de-France Mobilités. Autorité organisatrice des transports en commun franciliens (métro, bus, RER, tramway). Paris verse une contribution annuelle de 472 M€ mais dispose d'un pouvoir de décision limité au sein de l'instance.",

  'île-de-france mobilités': "Autorité organisatrice des transports en Île-de-France. Gère le réseau RATP, les lignes SNCF et les bus. Paris contribue à hauteur de 472 M€/an au financement du réseau mais ne représente qu'une voix parmi les collectivités membres.",

  'solideo': "Société de Livraison des Ouvrages Olympiques. Établissement public chargé de construire les infrastructures pérennes des JO 2024. Paris a contribué à hauteur de 165 M€. Le « trop-perçu » de 109,7 M€ est en cours de reversement.",

  // === DETTE ===
  'encours de dette': "Montant total du capital restant à rembourser sur l'ensemble des emprunts contractés. L'encours de Paris atteint 9,4 Md€ fin 2025, un niveau historique qui a doublé en dix ans.",

  'épargne brute': "Différence entre les recettes et les dépenses de fonctionnement. Elle mesure la capacité d'autofinancement de la collectivité : sa marge pour investir et rembourser la dette. Paris dispose de 571 M€ en 2025, un niveau insuffisant au regard de son endettement.",

  'durée de désendettement': "Indicateur clé de soutenabilité financière : nombre d'années nécessaires pour rembourser la dette en y consacrant la totalité de l'épargne brute. Paris atteint 16,4 ans en 2025, bien au-delà du seuil d'alerte de 12 ans fixé par les experts.",

  'annuité': "Somme remboursée chaque année au titre de la dette : capital amorti + intérêts. L'annuité 2025 s'élève à 533 M€ (308 M€ de capital, 224 M€ d'intérêts), soit 1,5 M€ par jour qui ne financent aucun service public.",

  'dette obligataire': "Mode de financement par émission d'obligations sur les marchés financiers. Les investisseurs institutionnels souscrivent ces titres, Paris rembourse capital et intérêts selon un échéancier défini. Ce mode représente 99 % de la dette parisienne.",

  // === INVESTISSEMENTS ===
  'ap': "Autorisation de Programme. Engagement pluriannuel sur le coût total d'une opération d'investissement. Permet de lancer des projets dont la réalisation s'étale sur plusieurs exercices budgétaires.",

  'autorisation de programme': "Engagement financier pluriannuel correspondant au coût total prévisionnel d'un projet d'investissement. Constitue le plafond des dépenses pouvant être engagées sur l'opération.",

  'autorisations de programme': "Enveloppes pluriannuelles couvrant le coût global des projets d'investissement. Le stock d'AP représente les engagements de la Ville sur les chantiers en cours et à venir : 8,6 Md€ à Paris.",

  'cp': "Crédits de Paiement. Dotation budgétaire annuelle permettant de régler les dépenses exigibles sur un exercice. Contrairement à l'AP (engagement total), le CP correspond au décaissement effectif de l'année.",

  'crédits de paiement': "Crédits budgétaires ouverts chaque année pour régler les factures des investissements. Les CP constituent la limite supérieure des dépenses d'investissement pouvant être mandatées sur l'exercice.",

  'zac': "Zone d'Aménagement Concerté. Procédure d'urbanisme permettant à la collectivité d'aménager un quartier de manière globale : voirie, équipements publics, logements, espaces verts. Exemples : Paris Rive Gauche (13e), Clichy-Batignolles (17e).",

  'zone d\'aménagement concerté': "Opération d'aménagement urbain conduite par la collectivité sur un périmètre défini. La Ville maîtrise l'ensemble du projet : acquisitions foncières, équipements, cessions aux promoteurs. Durée moyenne : 15 à 25 ans.",

  'budget participatif': "Dispositif de démocratie directe permettant aux Parisiens de proposer et voter des projets d'investissement. Doté de 83,8 M€ (5 % du budget d'investissement), il a permis de réaliser 121 projets en 2024.",

  // === POLITIQUES PUBLIQUES ===
  'apa': "Allocation Personnalisée d'Autonomie. Prestation départementale destinée aux personnes âgées en perte d'autonomie pour financer une aide à domicile ou un hébergement en établissement. Paris verse 145 M€, partiellement compensés par l'État.",

  'pch': "Prestation de Compensation du Handicap. Aide financière versée par le département pour couvrir les besoins liés au handicap : aménagement du logement, auxiliaire de vie, appareillage. Paris assume une part significative du financement.",

  'mna': "Mineurs Non Accompagnés. Jeunes étrangers arrivés en France sans représentant légal. Leur prise en charge (hébergement, scolarisation, accompagnement) relève de la compétence départementale jusqu'à leur majorité, voire 21 ans. Coût en forte hausse.",

  'mineurs non accompagnés': "Jeunes migrants isolés de moins de 18 ans. Paris, en tant que département, a l'obligation légale de les héberger et de les accompagner. Cette compétence représente une charge croissante insuffisamment compensée par l'État.",

  'pmi': "Protection Maternelle et Infantile. Service départemental de prévention sanitaire : consultations prénatales, suivi des nourrissons, vaccinations, bilans de santé en école maternelle. Accès gratuit pour toutes les familles.",

  'espci': "École Supérieure de Physique et de Chimie Industrielles de la Ville de Paris. Grande école d'ingénieurs fondée en 1882. Six prix Nobel y ont travaillé (Pierre et Marie Curie, Frédéric Joliot...). Paris la finance à hauteur de 13 M€/an.",

  'bspp': "Brigade de Sapeurs-Pompiers de Paris. Unité militaire assurant les secours dans Paris et les départements limitrophes. Paris contribue à hauteur de 119 M€/an mais n'exerce aucun commandement opérationnel, dévolu au préfet de police.",

  'brigade de sapeurs-pompiers': "Corps militaire de 8 500 hommes assurant les secours à Paris et en petite couronne. Particularité française : Paris finance (119 M€/an) mais c'est le préfet de police, représentant de l'État, qui commande les opérations.",

  'esa': "État Spécial d'Arrondissement. Enveloppe budgétaire déléguée à chaque mairie d'arrondissement pour gérer les équipements de proximité : entretien des écoles, espaces verts, animations locales. Dotation totale : 173 M€ pour les 17 arrondissements.",

  'états spéciaux d\'arrondissement': "Budgets de proximité gérés par les maires d'arrondissement. Couvrent l'entretien courant des équipements locaux et les animations de quartier. La répartition tient compte de la population et des besoins spécifiques de chaque territoire.",

  // === TECHNIQUE COMPTABLE ===
  'opérations d\'ordre': "Écritures comptables internes qui n'entraînent aucun mouvement de trésorerie. Elles traduisent des flux entre sections budgétaires (fonctionnement/investissement) ou constatent des charges calculées comme les amortissements.",

  'amortissement': "Constatation comptable de la dépréciation des immobilisations dans le temps. Chaque année, une fraction de la valeur des bâtiments et équipements est inscrite en charge, reflétant leur usure et obsolescence.",

  'amortissements': "Charges calculées traduisant la perte de valeur du patrimoine immobilisé. Cette technique comptable permet de constituer des ressources pour le renouvellement des équipements. Montant 2025 : 463 M€.",

  'provisions': "Sommes mises en réserve pour couvrir des risques probables : contentieux en cours, créances douteuses, garanties d'emprunt. La provision anticipe une charge future dont le montant ou l'échéance restent incertains.",

  'virement à l\'investissement': "Transfert de l'excédent de fonctionnement vers la section d'investissement. Cette ressource interne permet de financer des équipements sans recourir à l'emprunt. Montant 2025 : 128 M€.",

  // === AUTRES ===
  'syctom': "Syndicat mixte Central de Traitement des Ordures Ménagères. Établissement public regroupant Paris et 84 communes pour le traitement des déchets : incinération, tri, valorisation énergétique. Contribution parisienne : 119 M€/an.",

  'cojop': "Comité d'Organisation des Jeux Olympiques et Paralympiques Paris 2024. Structure privée ayant piloté l'organisation de l'événement sportif. Distinct de la SOLIDEO (infrastructures), le COJOP gérait les compétitions et la billetterie.",

  'tfpnb': "Taxe Foncière sur les Propriétés Non Bâties. Impôt sur les terrains nus : jardins, parkings non couverts, friches. Rendement marginal à Paris compte tenu de la densité urbaine et de la rareté des espaces non construits.",
};

interface InfoTooltipProps {
  terme: string;
  children?: React.ReactNode;
  forcePosition?: 'top' | 'bottom';
}

export default function InfoTooltip({ terme, children, forcePosition }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>(forcePosition || 'bottom');
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [isPositioned, setIsPositioned] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const explication = glossaire[terme.toLowerCase()];

  // Fonction de calcul de position optimale (verticale ET horizontale)
  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    // Utiliser la hauteur MAX du tooltip (250px) + padding (24px) + marge (16px)
    const maxTooltipHeight = 290;
    const tooltipWidth = 320; // w-80 = 20rem = 320px

    // === Position verticale ===
    if (!forcePosition) {
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      // Si pas assez de place en dessous, afficher au-dessus
      if (spaceBelow < maxTooltipHeight && spaceAbove > spaceBelow) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
    }

    // === Position horizontale ===
    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const tooltipLeft = triggerCenterX - tooltipWidth / 2;
    const tooltipRight = triggerCenterX + tooltipWidth / 2;
    const margin = 8;

    let offset = 0;
    if (tooltipLeft < margin) {
      offset = margin - tooltipLeft;
    } else if (tooltipRight > window.innerWidth - margin) {
      offset = (window.innerWidth - margin) - tooltipRight;
    }
    setHorizontalOffset(offset);
    setIsPositioned(true);
  };

  // Calculer la position dès l'ouverture
  useLayoutEffect(() => {
    if (isOpen) {
      calculatePosition();
    } else {
      setIsPositioned(false);
    }
  }, [isOpen, forcePosition]);

  // Recalculer la position au scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => calculatePosition();
    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
    };
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
          ref={contentRef}
          className={`absolute z-50 w-72 sm:w-80 p-3 text-sm bg-white border border-gray-200 rounded-lg shadow-lg max-h-[250px] overflow-y-auto ${
            position === 'top'
              ? 'bottom-full mb-2'
              : 'top-full mt-2'
          } left-1/2`}
          style={{ transform: `translateX(calc(-50% + ${horizontalOffset}px))` }}
          role="tooltip"
        >
          <div className="font-semibold text-primary mb-1 capitalize">{terme}</div>
          <p className="text-gray-600 leading-relaxed">{explication}</p>
          {/* Flèche - reste centrée sur le bouton trigger */}
          <div
            className={`absolute w-2 h-2 bg-white border-gray-200 transform rotate-45 ${
              position === 'top'
                ? 'bottom-[-5px] border-r border-b'
                : 'top-[-5px] border-l border-t'
            }`}
            style={{ left: `calc(50% - ${horizontalOffset}px)`, transform: 'translateX(-50%) rotate(45deg)' }}
          />
        </div>
      )}
    </span>
  );
}
