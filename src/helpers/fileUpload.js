export const fileUpload = async (file) => {
	if (!file) throw new Error('No hay ningun archivo a subir');
	const url = 'https://api.cloudinary.com/v1_1/duphx2ezk/image/upload?upload_preset=react-journal';
	const formData = new FormData();	
	formData.append('file', file);

	try {
		const resp = await fetch(url, {
			method: 'POST',
			body: formData
		});
		if (!resp.ok) {
			throw new Error('No se puede subir la imagen');
		}
		const cloudResp = await resp.json();        
        return  cloudResp.secure_url;
	} catch (error) {
		console.log(error);
		throw new Error(error.message);
	}
};
