import { ICheckboxProps } from '@/shared/type'
import { usePasswordStore } from '@/store/store'

export const Checkbox = ({ id, title, parameterName }: ICheckboxProps) => {
	const { parameterChecked, setParameterChecked } = usePasswordStore()
	return (
		<label className='flex items-center justify-between text-lg' id={id}>
			{title}
			<input
				type='checkbox'
				checked={parameterChecked[parameterName]}
				onChange={(e) => setParameterChecked({ [parameterName]: e.target.checked })}
			/>
		</label>
	)
}
