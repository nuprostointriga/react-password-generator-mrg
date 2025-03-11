import { useState } from 'react'
import toast from 'react-hot-toast'
import { Checkbox } from './checkbox'

export const PassGenerate = () => {
	const initialLetters = {
		numbersLetters: '1234567890',
		symbolsLetters: '!@#$%&*()_+`}{[];?<,/-=',
		lowerCaseLetters: 'abcdefghijklmnopqrstuvwxyz',
		upperCaseLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	}

	const [parameterChecked, setParameterChecked] = useState({
		length: 13,
		numbers: true,
		symbols: false,
		lowercaseLetters: false,
		uppercaseLetters: false,
	})

	const [password, setPassword] = useState('')

	function generatePassword() {
		let addedLetters = ''
		let createdPassword = ''

		if (parameterChecked.numbers) {
			addedLetters += initialLetters.numbersLetters
		}

		if (parameterChecked.symbols) {
			addedLetters += initialLetters.symbolsLetters
		}

		if (parameterChecked.lowercaseLetters) {
			addedLetters += initialLetters.lowerCaseLetters
		}

		if (parameterChecked.uppercaseLetters) {
			addedLetters += initialLetters.upperCaseLetters
		}

		for (let i = 0; i < parameterChecked.length; i++) {
			const calcRandomIndex = Math.floor(Math.random() * addedLetters.length)
			createdPassword += addedLetters[calcRandomIndex]
		}

		setPassword(createdPassword)
		copyTextToClipboard(createdPassword)
	}

	//https://sky.pro/wiki/javascript/kopirovanie-teksta-v-bufer-obmena-na-react-js-reshenie/
	const copyTextToClipboard = async text => {
		try {
			await navigator.clipboard.writeText(text)
			toast.success('Пароль скопирован в буфер обмена!')
		} catch (err) {
			toast.error('This is an error!')
		}
	}

	return (
		<section className='px-10 py-10 max-w-92'>
			<div className='flex flex-col mb-6'>
				<h2 className='font-bold text-xl mb-2.5'>Параметры пароля</h2>
				<Checkbox
					title='Числа'
					state={parameterChecked.numbers}
					setState={setParameterChecked}
					parameterName='numbers'
				/>
				<Checkbox
					title='Символы'
					state={parameterChecked.symbols}
					setState={setParameterChecked}
					parameterName='symbols'
				/>
				<Checkbox
					title='Буквы нижнего регистра'
					state={parameterChecked.lowercaseLetters}
					setState={setParameterChecked}
					parameterName='lowercaseLetters'
				/>
				<Checkbox
					title='Буквы верхнего регистра'
					state={parameterChecked.uppercaseLetters}
					setState={setParameterChecked}
					parameterName='uppercaseLetters'
				/>
			</div>
			<div className='flex flex-col mb-6'>
				<h2 className='font-bold text-xl mb-2.5'>Выберите длину пароля</h2>
				<input
					type='number'
					className='w-full p-1.5 bg-white/80 text-black/95 rounded'
					value={parameterChecked.length}
					onChange={e =>
						setParameterChecked(parametersState => ({
							...parametersState,
							length: e.target.valueAsNumber,
						}))
					}
					onKeyDown={e => e.preventDefault()}
					min='4'
					max='20'
				/>
			</div>
			<div>
				<h2 className='font-bold text-xl mb-2.5'>Готовый пароль</h2>
				<input
					type='text'
					value={password}
					className='w-full p-1.5 mb-5 bg-white/80 text-black/95 rounded'
					readOnly
				/>
				<button
					className='w-full p-1.5 mb-5 bg-white/80 text-black/95 text-lg rounded'
					onClick={() => generatePassword()}
				>
					Создать
				</button>
			</div>
			{/* <div>
				{parameterChecked.uppercaseLetters &&
					parameterChecked.lowercaseLetters &&
					parameterChecked.symbols &&
					parameterChecked.numbers &&
					parameterChecked.length >= 13 &&
					'Уровень защиты:  Сильный'}
				{parameterChecked.length <= 6 &&
					(parameterChecked.uppercaseLetters ||
						parameterChecked.lowercaseLetters ||
						parameterChecked.symbols ||
						parameterChecked.numbers) &&
					'Уровень защиты:  Слабый'}
			</div> */}
		</section>
	)
}
