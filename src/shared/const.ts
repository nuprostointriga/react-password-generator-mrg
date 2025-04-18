import { TInitialLetters, TObjectCheckboxData } from './type'

export const INITIAL_LETTERS: TInitialLetters = {
	numbers: '1234567890',
	symbols: '!@#$%&*()_+`}{[];?<,/-=',
	lowerCase: 'abcdefghijklmnopqrstuvwxyz',
	upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
}

export const CHECKBOX_DATA: Array<TObjectCheckboxData> = [
	{ title: 'Числа', name: 'numbers' },
	{ title: 'Символы', name: 'symbols' },
	{ title: 'Буквы нижнего регистра', name: 'lowercaseLetters' },
	{ title: 'Буквы верхнего регистра', name: 'uppercaseLetters' },
]
