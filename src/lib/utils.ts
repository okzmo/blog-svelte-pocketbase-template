export const validateData = async (formData: FormData, zodSchema: any) => {
    const body = Object.fromEntries(formData);
    
    try {
        const data = zodSchema.parse(body);
        return {
            formData: data,
            errors: null
        }
    } catch(err) {
        console.error('Error : ', err)
        const errors = err.flatten()

        return {
            formData: body,
            errors: errors
        }
    }
}