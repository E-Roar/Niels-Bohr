export const navigationTools = [
  {
    type: 'function',
    function: {
      name: 'scrollToSection',
      description: 'Scroll smoothly to a specific section of the page',
      parameters: {
        type: 'object',
        properties: {
          sectionId: {
            type: 'string',
            enum: ['accueil', 'apropos', 'programmes', 'galerie', 'contact', 'localisation'],
            description: 'The ID of the section to scroll to',
          },
        },
        required: ['sectionId'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'getSectionInfo',
      description: 'Get detailed information about a specific section',
      parameters: {
        type: 'object',
        properties: {
          sectionId: {
            type: 'string',
            enum: ['accueil', 'apropos', 'programmes', 'galerie', 'contact', 'localisation'],
            description: 'The ID of the section',
          },
        },
        required: ['sectionId'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'getSiteStructure',
      description: 'Get the complete site structure and available sections',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
];
