import { IPasswordStore } from '@/shared/type'
import { create } from 'zustand'

export const usePasswordStore = create<IPasswordStore>(set => ({
	parameterChecked: {
		length: 13,
		numbers: true,
		symbols: false,
		lowercaseLetters: false,
		uppercaseLetters: false,
	},
	password: '',
	degreeOfSecurity: 'Слабый',

	setParameterChecked: update =>
		set(state => ({
			parameterChecked: { ...state.parameterChecked, ...update },
		})),

	setPassword: password => set({ password }),
	setDegreeOfSecurity: degreeOfSecurity => set({ degreeOfSecurity }),
}))
