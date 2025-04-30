import { CHECKBOX_DATA, SECURITY_VALUE } from '@/shared/const'
import { copyText } from '@/shared/copyText'
import { generatePassword } from '@/shared/generatePassword'
import { usePasswordStore } from '@/store/store'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Checkbox } from './Checkbox'
import { PasswordComplexity } from './PasswordComplexity'

export const ContainerPassGenerator = () => {
	const {
		degreeOfSecurity,
		setDegreeOfSecurity,
		setParameterChecked,
		setPassword,
		password,
		parameterChecked,
	} = usePasswordStore()

	useEffect(() => {
		let isTrueChecked = 0

		isTrueChecked = Object.values(parameterChecked).filter(Boolean).length - 1

		if (isTrueChecked === 0) {
			setDegreeOfSecurity(SECURITY_VALUE.ERROR)
		} else if (isTrueChecked >= 3 && parameterChecked.length >= 14) {
			setDegreeOfSecurity(SECURITY_VALUE.STRONG)
		} else if (
			isTrueChecked > 1 &&
			isTrueChecked <= 4 &&
			parameterChecked.length >= 8 &&
			parameterChecked.length <= 13
		) {
			setDegreeOfSecurity(SECURITY_VALUE.MEDIUM)
		} else {
			setDegreeOfSecurity(SECURITY_VALUE.LOW)
		}
	}, [parameterChecked])

	const handleClickGenerate = () => {
		if (degreeOfSecurity === SECURITY_VALUE.ERROR) {
			return toast.error(
				'Необходимо выбрать минимум 1 "Параметр пароля", для генерации.'
			)
		}

		const readyPassword = generatePassword(parameterChecked)
		setPassword(readyPassword)
		copyText(readyPassword)
	}

	return (
		<section className='px-10 py-10 max-w-92'>
			<div className='flex flex-col mb-6'>
				<h2 className='font-bold text-xl mb-2.5'>Параметры пароля</h2>
				{CHECKBOX_DATA.map(({ name, title }, index) => {
					return (
						<Checkbox
							key={index}
							id={name}
							title={title}
							parameterName={name}
						/>
					)
				})}
			</div>
			<div className='flex flex-col mb-6'>
				<h2 className='font-bold text-xl mb-2.5'>Выберите длину пароля</h2>
				<input
					type='number'
					className='w-full p-1.5 bg-white/80 text-black/95 rounded'
					value={parameterChecked.length}
					onChange={e =>
						setParameterChecked({ length: e.target.valueAsNumber })
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
					onClick={() => handleClickGenerate()}
				>
					Создать
				</button>

				<PasswordComplexity />
			</div>
		</section>
	)
}
