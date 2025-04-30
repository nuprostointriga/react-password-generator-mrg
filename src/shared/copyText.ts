import toast from 'react-hot-toast'

export const copyText = async (text: string) => {
	if (!text || typeof text !== 'string') {
		return toast.error('Введите текст !')
	}
	try {
		await navigator.clipboard.writeText(text)
		toast.success('Пароль скопирован в буфер обмена!')
	} catch (error) {
		toast.error('This is an error!')
	}
}
