import { TranslateOptions } from 'i18n-js'

import { TranslationsType } from './lang/en'
import i18n from './localization'

export function t(
	resource: keyof TranslationsType,
	options?: TranslateOptions,
) {
	return i18n.t(resource, options)
}

const numberFormatter = new Intl.NumberFormat(i18n.locale)

export function formatNumber(number: number) {
	return numberFormatter.format(number)
}
