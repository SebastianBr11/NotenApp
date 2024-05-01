const translations = {
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
	'screen-new-class:year-error': 'The year is required and has to be a number.',
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
}

export default translations

export type TranslationsType = typeof translations
