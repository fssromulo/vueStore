<template>
	<div>
		<!-- br/>
		<div class="row">
			<button class="btn btn-success" @click="carregarPessoas">
				Carregar lista
			</button> &nbsp;
			<router-link
				:to="{name: 'pessoaCad'}"
				tag="button"
				class="btn btn-success"
				exact
			>Cadastrar nova pessoa</router-link>&nbsp;&nbsp;

		</div>

		<br/><br/>
		<div class="table-responsive">
			<table class="table table-striped">
				<thead>
					<tr>
						<th>Código:</th>
						<th>Nome:</th>
						<th>Fone:</th>
						<th>E-mail:</th>
						<th>Login:</th>
						<th>Ações:</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(pessoa, chave) in arrPessoas" :key="chave">
						<td>{{pessoa.cd_pessoa}}</td>
						<td>{{pessoa.nm_pessoa}}</td>
						<td>{{pessoa.fone}}</td>
						<td>{{pessoa.email}}</td>
						<td>{{pessoa.login}}</td>
						<td>
							<router-link :to="{name: 'pessoaEdit', params:{cd_pessoa: pessoa.cd_pessoa}}" tag="a" exact>Editar</router-link>&nbsp;&nbsp;
							<button class="btn btn-danger" @click="apagarPessoa(pessoa.cd_pessoa)">Apagar</button>
							<button class="btn btn-danger" @click="getLogin(pessoa.login, pessoa.senha)">Logar</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div -->
	<v-expansion-panel>
		<v-expansion-panel-content
			v-for="(item,i) in 1"
			:key="i"
		>
		<template v-slot:header>
			<div>FILTROS</div>
		</template>

			<v-container grid-list-md text-xs-center>
				<v-layout row wrap>
					<v-flex xs12>
						<v-form
						ref="form"
						v-model="valid"
						lazy-validation
						>
							<v-text-field
							v-model="name"
							:counter="10"
							:rules="nameRules"
							label="Descrição"
							required
							></v-text-field>

							<v-select
							v-model="select"
							:items="items"
							:rules="[v => !!v || 'Item is required']"
							label="Lista"
							required
							></v-select>

							<v-btn
							color="error"
							@click="reset"
							>
								Cancelar
							</v-btn>

							<v-btn
							color="success"
							@click="validate"
							>
								Filtrar
							</v-btn>
						</v-form>
					</v-flex>
				</v-layout>
			</v-container>
		</v-expansion-panel-content>
	</v-expansion-panel>

	<br/>

    <v-toolbar flat color="white">
      <div class="mx-2"> </div>

      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Nova Pessoa</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

		<router-view></router-view>
	</div>
</template>

<!-- Programacao do ROmuloooo Original script>
import axios from 'axios';

export default {
	name: "AppNovo",
	data() {
		return {
			arrPessoas : []
		}
	},
	methods: {
		carregarPessoas() {
			axios.get('pessoa')
			.then((response) => {
				this.arrPessoas = response.data;
			})
		},
		apagarPessoa(cd_pessoa_param) {
			axios.delete('pessoa/' + cd_pessoa_param )
			.then(() => {
				this.carregarPessoas();
			})
		}
	},
	mounted() {
		this.carregarPessoas();
	}
}
</script -->

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>