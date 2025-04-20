import { INITIAL_LETTERS } from './const'
import { TParameterChecked } from './type'

export function generatePassword(parametersProps: TParameterChecked) {
	let addedLetters = ''
	let createdPassword = ''

	if (parametersProps.numbers) {
		addedLetters += INITIAL_LETTERS.numbers
	}

	if (parametersProps.symbols) {
		addedLetters += INITIAL_LETTERS.symbols
	}

	if (parametersProps.lowercaseLetters) {
		addedLetters += INITIAL_LETTERS.lowerCase
	}

	if (parametersProps.uppercaseLetters) {
		addedLetters += INITIAL_LETTERS.upperCase
	}

	for (let i = 0; i < parametersProps.length; i++) {
		const calcRandomIndex = Math.floor(Math.random() * addedLetters.length)
		createdPassword += addedLetters[calcRandomIndex]
	}

	return createdPassword
}
