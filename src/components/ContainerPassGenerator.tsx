import { CHECKBOX_DATA } from '@/shared/const'
import { generatePassword } from '@/shared/generatePassword'
import { usePasswordStore } from '@/store/store'
import { useEffect } from 'react'
import { Checkbox } from './Checkbox'
import { PasswordComplexity } from './PasswordComplexity'

export const ContainerPassGenerator = () => {
	const {
		setDegreeOfSecurity,
		setParameterChecked,
		password,
		parameterChecked,
	} = usePasswordStore()

	useEffect(() => {
		let isTrueChecked = 0

		isTrueChecked = Object.values(parameterChecked).filter(Boolean).length - 1

		if (isTrueChecked === 0) {
			setDegreeOfSecurity('Выберите минимум 1 параметр')
		} else if (isTrueChecked >= 3 && parameterChecked.length >= 14) {
			setDegreeOfSecurity('Сильный')
		} else if (
			isTrueChecked > 1 &&
			isTrueChecked <= 4 &&
			parameterChecked.length >= 8 &&
			parameterChecked.length <= 13
		) {
			setDegreeOfSecurity('Средний')
		} else {
			setDegreeOfSecurity('Слабый')
		}
	}, [parameterChecked])

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
					onClick={() => generatePassword()}
				>
					Создать
				</button>

				<PasswordComplexity />
			</div>
		</section>
	)
}
