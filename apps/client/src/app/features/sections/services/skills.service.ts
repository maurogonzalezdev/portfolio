import { Injectable } from '@angular/core';

import { Skills } from '@client/app/features/sections/models/interfaces';

import {
  hugeElearningExchange,
  hugeMic01,
  hugeIdea,
  hugePlate,
  hugeTimeManagement,
} from '@ng-icons/huge-icons';
import {
  svglAngular,
  svglTypescript,
  svglJavascript,
  svglNestjs,
  svglPostgresql,
  svglPrismaDark,
  svglTypeorm,
  svglBootstrap,
  svglNxDark,
  svglGit,
} from '@ng-icons/svgl';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  // Skills categorized into technical, soft, and general skills
  private _technicalSkills: Skills[] = [
    {
      angular: {
        id: 1,
        name: 'Angular',
        icon: svglAngular,
        description:
          "I'm proficient in Angular, a powerful platform and framework for building single-page web applications using HTML and TypeScript. My experience allows me to develop robust, scalable, and high-performance solutions following Google's best practices.",
        type: 'Technical',
      },
    },
    {
      typescript: {
        id: 2,
        name: 'TypeScript',
        icon: svglTypescript,
        description:
          'I have a strong command of TypeScript, a superset of JavaScript that adds static typing. This enables me to write cleaner, more maintainable code and catch errors early in the development process.',
        type: 'Technical',
      },
    },
    {
      javascript: {
        id: 3,
        name: 'JavaScript',
        icon: svglJavascript,
        description:
          'I am proficient in JavaScript, the core language of the web. My expertise allows me to create dynamic and interactive web applications that enhance user experience.',
        type: 'Technical',
      },
    },
    {
      nestjs: {
        id: 6,
        name: 'NestJS',
        icon: svglNestjs,
        description:
          'I have experience with NestJS, a progressive Node.js framework for building efficient and scalable server-side applications. My knowledge allows me to create robust APIs and microservices.',
        type: 'Technical',
      },
    },
    {
      postgresql: {
        id: 7,
        name: 'PostgreSQL',
        icon: svglPostgresql,
        description:
          'I am proficient in PostgreSQL, a powerful open-source relational database system. My expertise allows me to design and manage databases effectively, ensuring data integrity and performance.',
        type: 'Technical',
      },
    },
    {
      prisma: {
        id: 8,
        name: 'Prisma',
        icon: svglPrismaDark,
        description:
          'I have experience with Prisma, an open-source database toolkit that simplifies database access and management. My knowledge allows me to work efficiently with databases in Node.js applications.',
        type: 'Technical',
      },
    },
    {
      typeorm: {
        id: 9,
        name: 'TypeORM',
        icon: svglTypeorm,
        description:
          'I am skilled in TypeORM, an ORM for TypeScript and JavaScript that supports various databases. My expertise allows me to work with databases seamlessly in my applications.',
        type: 'Technical',
      },
    },
    {
      tailwindcss: {
        id: 10,
        name: 'Bootstrap',
        icon: svglBootstrap,
        description:
          'I have experience with Bootstrap, a popular CSS framework for building responsive and mobile-first web applications. My knowledge allows me to create visually appealing and user-friendly interfaces quickly.',
        type: 'Technical',
      },
    },
    {
      nx: {
        id: 11,
        name: 'Nx',
        icon: svglNxDark,
        description:
          'I am proficient in Nx, a powerful set of extensible dev tools for monorepos. My expertise allows me to manage and scale large codebases effectively, improving developer productivity.',
        type: 'Technical',
      },
    },
    {
      git: {
        id: 12,
        name: 'Git',
        icon: svglGit,
        description:
          'I have a strong command of Git, a distributed version control system. My expertise allows me to manage code changes efficiently, collaborate with teams, and maintain project history effectively.',
        type: 'Technical',
      },
    },
  ];
  private _softSkills: Skills[] = [
    {
      continuousLearning: {
        id: 1,
        name: 'Continuous Learning',
        icon: hugeElearningExchange,
        description:
          'I am committed to continuous learning, always seeking to expand my knowledge and skills. This dedication allows me to stay updated with the latest technologies and best practices in the industry.',
        type: 'Soft',
      },
    },
    {
      effectiveCommunication: {
        id: 3,
        name: 'Effective Communication',
        icon: hugeMic01,
        description:
          'I possess strong communication skills, allowing me to convey ideas clearly and collaborate effectively with team members and stakeholders. This skill is essential for successful project execution.',
        type: 'Soft',
      },
    },
    {
      analyticalThinking: {
        id: 4,
        name: 'Analytical Thinking',
        icon: hugeIdea,
        description:
          'I have strong analytical thinking skills, enabling me to break down complex problems and identify patterns. This ability helps me make informed decisions and optimize processes.',
        type: 'Soft',
      },
    },
  ];
  private _generalSkills: Skills[] = [
    {
      punctuality: {
        id: 1,
        name: 'Punctuality',
        icon: hugePlate,
        description:
          'I value punctuality and consistently meet deadlines. This reliability fosters trust and ensures smooth project execution.',
        type: 'General',
      },
    },
    {
      selfManagement: {
        id: 2,
        name: 'Self Management',
        icon: hugeTimeManagement,
        description:
          'I excel in self-management, effectively prioritizing tasks and managing time. This skill enhances productivity and ensures project success.',
        type: 'General',
      },
    },
  ];

  /**
   * Returns the technical skills of the user.
   * @returns {Skills[]} An array of technical skills.
   * @description This service provides access to categorized skills, including technical, soft, and general skills.
   */
  get getTechnicalSkills(): Skills[] {
    return this._technicalSkills;
  }
  /**
   * Returns the soft skills of the user.
   * @returns {Skills[]} An array of soft skills.
   * @description This service provides access to categorized skills, including technical, soft, and general skills.
   */
  get getSoftSkills(): Skills[] {
    return this._softSkills;
  }
  /**
   * Returns the general skills of the user.
   * @returns {Skills[]} An array of general skills.
   * @description This service provides access to categorized skills, including technical, soft, and general skills.
   */
  get getGeneralSkills(): Skills[] {
    return this._generalSkills;
  }
}
