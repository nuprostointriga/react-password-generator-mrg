export const Checkbox = ({ title, state, setState, parameterName }) => {
	return (
		<label className='flex items-center justify-between text-lg'>
			{title}
			<input
				type='checkbox'
				checked={state}
				onChange={e =>
					setState(parametersState => ({
						...parametersState,
						[parameterName]: e.target.checked,
					}))
				}
			/>
		</label>
	)
}
