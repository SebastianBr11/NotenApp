import * as Localization from 'expo-localization'
import { I18n, TranslateOptions } from 'i18n-js'

const translations = {
	en: {
		'screen-grades': 'Grades',
		'screen-calendar': 'Calendar',
		'screen-settings': 'Settings',
		'screen-new-subject': 'Add new subject',
		'screen-new-class': 'Add new class',
		'screen-new-subject:new-subject': 'New Subject',
		'screen-new-subject:subject-name': 'Subject Name',
		'screen-new-subject:subject-name-placeholder': 'e.g. German',
		'screen-new-subject:subject-name-error': 'The subject name is required.',
		'screen-new-subject:add-subject': 'Add subject',
		'screen-subject:average': 'Average',
		'screen-subject:points': 'points',
		'screen-subject:semester': 'Semester',
		'screen-new-class:new-class': 'New Class',
		'screen-new-class:year': 'Year',
		'screen-new-class:year-placeholder': 'e.g. 10',
		'screen-new-class:year-error':
			'The year is required and has to be a number.',
		'screen-new-class:class-type': 'Class Type',
		'screen-new-subject:add-class': 'Add Class',
		'screen-grades:add-new-class': 'Add new Class',
		'screen-grades:no-classes-created': "You haven't created any Classes yet",
		'screen-grades:create-class': 'Create new Class',
		'screen-grades:add-subject': 'Add new Subject',
		'screen-grades:manage-classes': 'Manage Classes',
		'screen-grades:class-year': 'Year',
		'screen-grades:delete-class': 'Delete Class?',
		'screen-grades:delete-class-prompt':
			'Are you sure you want to delete the class %{type} %{year}?',
		'screen-grades:delete-class-cancel': 'Cancel',
		'screen-grades:delete-class-confirm': 'Delete',
	},
	de: {
		'screen-grades': 'Noten',
		'screen-calendar': 'Kalender',
		'screen-settings': 'Einstellungen',
		'screen-new-subject': 'Neues Fach hinzufügen',
		'screen-new-class': 'Neue Klasse hinzufügen',
		'screen-new-subject:new-subject': 'Neues Fach',
		'screen-new-subject:subject-name': 'Fachname',
		'screen-new-subject:subject-name-placeholder': 'z. B. Deutsch',
		'screen-new-subject:subject-name-error': 'Der Fachname wird benötigt.',
		'screen-new-subject:add-subject': 'Fach hinzufügen',
		'screen-subject:average': 'Durchschnitt',
		'screen-subject:points': 'Punkte',
		'screen-subject:semester': 'Halbjahr',
		'screen-new-class:new-class': 'Neue Klasse',
		'screen-new-class:year': 'Jahr',
		'screen-new-class:year-placeholder': 'z. B. 10',
		'screen-new-class:year-error':
			'Das Jahr wird benötigt und muss eine Zahl sein.',
		'screen-new-class:class-type': 'Schulart',
		'screen-new-subject:add-class': 'Klasse hinzufügen',
		'screen-grades:add-new-class': 'Neue Klasse hinzufügen',
		'screen-grades:no-classes-created': 'Du hast noch keine Klasse erstellt',
		'screen-grades:create-class': 'Neue Klasse erstellen',
		'screen-grades:add-subject': 'Neues Fach hinzufügen',
		'screen-grades:manage-classes': 'Klassen verwalten',
		'screen-grades:class-year': 'Jahr',
		'screen-grades:delete-class': 'Klasse löschen?',
		'screen-grades:delete-class-prompt':
			'Bist du dir sicher, dass du die Klasse %{type} %{year} löschen willst?',
		'screen-grades:delete-class-cancel': 'Abbrechen',
		'screen-grades:delete-class-confirm': 'Löschen',
	},
} as const

export type TranslationsType = typeof translations

const i18n = new I18n(translations)

i18n.locale = Localization.getLocales()[0].languageCode!
i18n.enableFallback = true
i18n.defaultLocale = 'en'

export default i18n

export function t(
	resource: keyof TranslationsType['en'],
	options?: TranslateOptions,
) {
	return i18n.t(resource, options)
}
