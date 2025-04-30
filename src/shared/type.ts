export type ICheckboxProps = {
	id: string
	title: string
	parameterName: keyof Omit<TParameterChecked, 'length'>
	[key: string]: any
}

export interface IPasswordStore {
	parameterChecked: TParameterChecked
	password: string
	degreeOfSecurity: string
	setParameterChecked: (update: Partial<TParameterChecked>) => void
	setPassword: (newPassword: string) => void
	setDegreeOfSecurity: (newDegreeOfSecurity: string) => void
}

export type TParameterChecked = {
	length: number
	numbers: boolean
	symbols: boolean
	lowercaseLetters: boolean
	uppercaseLetters: boolean
}

export type TInitialLetters = {
	numbers: string
	symbols: string
	lowerCase: string
	upperCase: string
}

export type TObjectCheckboxData = {
	title: string
	name: keyof Omit<TParameterChecked, 'length'>
}

export type TSecurityValue = {
	ERROR: string
	LOW: string
	MEDIUM: string
	STRONG: string
}
