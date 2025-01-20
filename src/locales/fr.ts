// locales/fr.ts
export default {
    header: {
        'age': ' a 21 ans',
        'city': ' est bordelais',
        'food': ' aime les chocolatines !',
        'metier': 'Développeur Web',
    },
    about: {
        'title': 'À propos de moi',
        'content': 'Je suis un développeur web de 21 ans passionné par la création d\'applications modernes et performantes. Je maîtrise {phpIcon} et JavaScript {jsIcon} / TypeScript, ainsi que des frameworks comme Symfony {symfonyIcon}, Angular {angularIcon} et jQuery. Actuellement en apprentissage chez {sullyGroupLink} et en première année de master, je combine théorie et pratique pour concevoir des solutions robustes et sur mesure. Toujours curieux et motivé, je suis prêt à relever de nouveaux défis pour transformer vos idées en projets concrets.'
    },
    projects: [
        {
            title: 'Pétanquaton',
            description: ' est une application mobile Android développée en Kotlin, conçue pour les passionnés de pétanque. Elle permet de suivre les scores des parties en temps réel entre plusieurs joueurs et d\'organiser et gérer des tournois impliquant de nombreux participants.',
        },
        {
            title: 'Countries API WebApp',
            link: 'romainub87.github.io/Application_countries_API/',
            description: ' est une application web qui permet aux utilisateurs de rechercher des pays et de consulter des informations détaillées (population, capitale, région, langues, devises, etc.) en utilisant une API. ' +
                'Elle propose une interface intuitive avec des pages dédiées pour chaque pays. '
        },
        {
            title: 'Extension Tri de favoris',
            description: ' est une extension de navigateur qui améliore l\'expérience de gestion des favoris dans Google Chrome. Elle permet aux utilisateurs de trier les favoris par nom, date ou URL, et de rechercher des favoris par nom ou URL. ' +
                'Elle offre également la possibilité d\'exporter les favoris vers un fichier et d\'importer des favoris à partir d\'un fichier'
        },
        {
            title: 'Woodeo',
            link: 'woodeo.valentinraillard.fr/',
            description: ' est une application web qui permet aux passionnés de séries de suivre leurs émissions préférées, ' +
                'découvrir de nouvelles séries et partager leurs opinions avec une communauté. ' +
                'L\'interface intuitive et le catalogue étendu en font un outil indispensable pour tous les amateurs de séries.'
        },
    ],
    contact: {
        'title': 'Contact',
        'description': 'N\'hésitez pas à me contacter par email à ',
        'email': 'romaincordier33160@gmail.com',
        'copied': 'Copié !'
    }
} as const;