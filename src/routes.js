import PessoaListar from './components/pessoa/PessoaListar'
import PessoaCadastrar from './components/pessoa/PessoaCadastrar'
import PessoaEditar from './components/pessoa/PessoaEditar'


export const routes = [
	{
		path: '/pessoa', component: PessoaListar,
		children: [

			{path: 'cadastar', component: PessoaCadastrar, name: 'pessoaCad'},
			{path: ':cd_pessoa/editar', component: PessoaEditar, name: 'pessoaEdit'}
		]
	}
];