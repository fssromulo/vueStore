import axios from 'axios';

const objAxiosFirebase = axios.create({
	// baseURL : 'https://arquivosvue.firebaseio.com/' // Link para cadastrar pessoas no firebase
	baseURL : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
}); 

export default objAxiosFirebase;