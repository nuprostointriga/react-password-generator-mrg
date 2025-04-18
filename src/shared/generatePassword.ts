import { INITIAL_LETTERS } from './const'
import { copyText } from './copyText'

export function generatePassword() {
	// const { parameterChecked, degreeOfSecurity, setPassword } = usePasswordStore()
	if (degreeOfSecurity === 'Выберите минимум 1 параметр') return

	let addedLetters: string = ''
	let createdPassword: string = ''

	if (parameterChecked.numbers) {
		addedLetters += INITIAL_LETTERS.numbers
	}

	if (parameterChecked.symbols) {
		addedLetters += INITIAL_LETTERS.symbols
	}

	if (parameterChecked.lowercaseLetters) {
		addedLetters += INITIAL_LETTERS.lowerCase
	}

	if (parameterChecked.uppercaseLetters) {
		addedLetters += INITIAL_LETTERS.upperCase
	}

	for (let i = 0; i < length; i++) {
		const calcRandomIndex = Math.floor(Math.random() * addedLetters.length)
		createdPassword += addedLetters[calcRandomIndex]
	}

	setPassword(createdPassword)
	copyText(createdPassword)
}
