import { useEffect, useState } from 'react'
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
	const [passwordStrength, setPasswordStrength] = useState('Слабый')

	function generatePassword() {
		if (passwordStrength === 'Выберите минимум 1 параметр') return

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

	const copyTextToClipboard = async text => {
		try {
			await navigator.clipboard.writeText(text)
			toast.success('Пароль скопирован в буфер обмена!')
		} catch (err) {
			toast.error('This is an error!')
		}
	}

	useEffect(() => {
		let isTrueChecked = 0

		if (parameterChecked.numbers) {
			isTrueChecked++
		}
		if (parameterChecked.symbols) {
			isTrueChecked++
		}
		if (parameterChecked.lowercaseLetters) {
			isTrueChecked++
		}
		if (parameterChecked.uppercaseLetters) {
			isTrueChecked++
		}

		if (isTrueChecked === 0) {
			setPasswordStrength('Выберите минимум 1 параметр')
		} else if (isTrueChecked >= 3 && parameterChecked.length >= 14) {
			setPasswordStrength('Сильный')
		} else if (
			isTrueChecked > 1 &&
			isTrueChecked <= 4 &&
			parameterChecked.length >= 8 &&
			parameterChecked.length <= 13
		) {
			setPasswordStrength('Средний')
		} else {
			setPasswordStrength('Слабый')
		}
	}, [parameterChecked])

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
					min='6'
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
					className='w-full p-1.5 mb-8 bg-white/80 text-black/95 text-lg rounded'
					onClick={() => generatePassword()}
				>
					Создать
				</button>

				<div className='relative w-full h-3 bg-white/75 rounded'>
					<div
						className={`absolute top-0 left-0 h-3 rounded ${
							passwordStrength === 'Слабый' && 'w-1/3 bg-red-800'
						} ${passwordStrength === 'Средний' && 'w-2/3 bg-orange-400'} ${
							passwordStrength === 'Сильный' && 'w-full bg-green-700'
						}`}
					></div>
				</div>
				<div className='text-center mt-1.5'>{passwordStrength}</div>
			</div>
		</section>
	)
}
