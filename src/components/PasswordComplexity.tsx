import { SECURITY_VALUE } from '@/shared/const'
import { usePasswordStore } from '@/store/store'
import clsx from 'clsx'

export const PasswordComplexity = () => {
	const { degreeOfSecurity } = usePasswordStore()

	const visualProgressClass = clsx(
		'absolute top-0 left-0 h-3 rounded',
		degreeOfSecurity === SECURITY_VALUE.LOW && 'w-1/3 bg-red-800',
		degreeOfSecurity === SECURITY_VALUE.MEDIUM && 'w-2/3 bg-orange-400',
		degreeOfSecurity === SECURITY_VALUE.STRONG && 'w-full bg-green-700'
	)

	return (
		<>
			<div className='relative w-full h-3 bg-white/75 rounded'>
				<div className={visualProgressClass}></div>
			</div>
			<div className='text-center mt-1.5'>{degreeOfSecurity}</div>
		</>
	)
}
