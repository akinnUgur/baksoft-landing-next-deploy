export const i18n = {
  defaultLocale: 'tr',
  locales: ['tr', 'en'],
} as const

export type Locale = (typeof i18n)['locales'][number]

// Dictionary types
export type Dictionary = {
  nav: {
    home: string
    about: string
    services: string
    projects: string
    contact: string
  }
  hero: {
    title: string
    subtitle: string
    description: string
    cta: string
    secondary_cta: string
  }
  services: {
    title: string
    description: string
    web_development: {
      title: string
      description: string
    }
    mobile_development: {
      title: string
      description: string
    }
    ai_solutions: {
      title: string
      description: string
    }
    consulting: {
      title: string
      description: string
    }
  }
  about: {
    title: string
    description: string
    mission: string
    vision: string
    values: string
  }
  contact: {
    title: string
    description: string
    address: string
    phone: string
    email: string
    form: {
      name: string
      email: string
      subject: string
      message: string
      send: string
    }
  }
  footer: {
    description: string
    rights: string
  }
  meta: {
    home: {
      title: string
      description: string
    }
    about: {
      title: string
      description: string
    }
    services: {
      title: string
      description: string
    }
    projects: {
      title: string
      description: string
    }
    contact: {
      title: string
      description: string
    }
  }
}

// Dictionary loaders
const dictionaries = {
  tr: () => import('../dictionaries/tr.json').then((module) => module.default),
  en: () => import('../dictionaries/en.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]()
}