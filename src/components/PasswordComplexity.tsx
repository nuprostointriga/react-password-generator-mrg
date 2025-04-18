import { usePasswordStore } from '@/store/store'

export const PasswordComplexity = () => {
	const { degreeOfSecurity } = usePasswordStore()
	return (
		<>
			<div className='relative w-full h-3 bg-white/75 rounded'>
				<div
					className={`absolute top-0 left-0 h-3 rounded ${
						degreeOfSecurity === 'Слабый' && 'w-1/3 bg-red-800'
					} ${degreeOfSecurity === 'Средний' && 'w-2/3 bg-orange-400'} ${
						degreeOfSecurity === 'Сильный' && 'w-full bg-green-700'
					}`}
				></div>
			</div>
			<div className='text-center mt-1.5'>{degreeOfSecurity}</div>
		</>
	)
}
