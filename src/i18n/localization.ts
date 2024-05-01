import * as Localization from 'expo-localization'
import { I18n } from 'i18n-js'

import translationsDe from './lang/de'
import translationsEn from './lang/en'

const translations = {
	en: translationsEn,
	de: translationsDe,
} as const

const i18n = new I18n(translations)

i18n.locale = Localization.getLocales()[0].languageCode!
i18n.enableFallback = true
i18n.defaultLocale = 'en'

export default i18n
