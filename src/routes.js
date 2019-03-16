import Pessoa from './components/pessoa/Pessoa'
import PessoaListar from './components/pessoa/PessoaListar'
import PessoaEditar from './components/pessoa/PessoaEditar'

export const routes = [
	{
		path: '/pessoa', component: Pessoa,
		children: [
			{path: '', component: PessoaListar, name: 'pessoaList'},
			{path: 'cadastar', component: PessoaEditar, name: 'pessoaCad'},
			{path: ':cd_pessoa/editar', component: PessoaEditar, name: 'pessoaEdit'}
		]
	}
];