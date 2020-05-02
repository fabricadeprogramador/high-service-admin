
<template>
  <v-data-table
    :headers="headers"
    :items="empresas"
    sort-by="empresa">
    
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="item in items" :key="item.cnjp">         
          <td v-bind:class="{ transacaoInativa: !item.ativo }">{{item.empresa }}</td>
          <td v-bind:class="{ transacaoInativa: !item.ativo }">{{item.cnpj}}</td>
          <td v-bind:class="{ transacaoInativa: !item.ativo }">{{item.email}}</td>
          <td v-bind:class="{ transacaoInativa: !item.ativo }">{{item.telefone}}</td>
          <td>
            <v-icon small class="mr-2" @click="editItem(item)" v-bind:title="messageVisuzalizar">mdi-magnify</v-icon>
            <v-icon v-if="item.ativo" small @click="ativarDesativarEmpresa(item)" v-bind:title="messageDisable">mdi-close</v-icon>
            <v-icon v-if="!item.ativo" small color="red" @click="ativarDesativarEmpresa(item)" v-bind:title="messageEnable">mdi-cancel</v-icon>
          </td>
        </tr>
      </tbody>
    </template>

    <template v-slot:top>
        <v-expand-transition>
            <v-card v-if="novoCadastro">
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>


                <v-form ref="form" v-model="valid">
                    <v-card-text>
                         <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.empresa" :readonly="readonly"
                                        :rules="empresaRules"
                                        label="Nome da Empresa"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.cnpj" :readonly="readonly"
                                        v-mask="['###.###.###-##', '##.###.###/####-##']"
                                        :counter="18"
                                        label="CPNJ"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        v-model="editedItem.email"
                                        label="E-mail"
                                        :rules="emailRules"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        v-model="editedItem.telefone"
                                        label="Telefone"
                                        v-mask="['(##) ####-####', '(##) #####-####']"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-layout justify-center>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                @click="save"
                                :disabled="!valid">Salvar</v-btn>
                            <v-btn color="primary" dark class="mb-2" @click="reset">Cancelar</v-btn>
                        </v-card-actions>
                    </v-layout>
                </v-form>
            </v-card>
        </v-expand-transition>

        <v-toolbar flat color="dark-grey">
            <v-toolbar-title>Lista de Empresas</v-toolbar-title>
            <v-spacer></v-spacer>

        <v-btn color="primary" fab dark small @click="mostrarCadastro">
          <v-icon v-if="!novoCadastro" dark v-bind:title="messageNewAdd">mdi-plus</v-icon>
          <v-icon v-if="novoCadastro" dark>mdi-minus</v-icon>
        </v-btn>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
  import {mask} from 'vue-the-mask'

  export default {
    directives: {mask},

  data: () => ({
      valid: true,
      readonly: false,
      novoCadastro: false,
      headers: [
        { text: 'Empresa', value: 'empresa',},
        { text: 'CNPJ', value: 'cnpj' },
        { text: 'E-mail', value: 'email'},
        { text: 'Telefone', value: 'telefone'},
        { text: 'Ações', value: 'acoes', sortable: false },
      ],
      empresas: [],
      editedIndex: -1,
      messageDisable :'Desativar Empresa',
      messageEnable: 'Ativar Empresa',
      messageVisuzalizar:'Visualizar Empresa',
      messageNewAdd:'Novo Cadastro',

      editedItem: {
        empresa: '',
        cnpj: '',
        email: '',
        telefone: '',
        ativo: Boolean,
      },

      defaultItem: {
        empresa: '',
        cnpj: '',
        email: '',
        telefone: '',
        ativo: Boolean,
      },

        empresaRules: [
          v=> !!v || 'Empresa Obrigatório'        ],

        emailRules: [(v) => /.+@.+\..+/.test(v) || "Digite um e-mail válido"],
    }),

    computed: {
      formTitle () {
        return this.editedIndex == -1 ? 'Cadastrar Empresa' : 'Editar dados da Empresa'
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.empresas = [
          {
            empresa: 'Empresa 1',
            cnpj: '11122233344455',
            email: 'empresa1@empresa1.com.br',
            telefone: '6733334444',
            ativo: true
          },
          {
            empresa: 'Empresa 2',
            cnpj: '11122233344456',
            email: 'empresa2@empresa2.com.br',
            telefone: '6733334444',
            ativo: true
          },
           {
            empresa: 'Empresa 3',
            cnpj: '11122233344457',
            email: 'empresa3@empresa3.com.br',
            telefone: '6733334444',
            ativo: true
          },
           {
            empresa: 'Empresa 4',
            cnpj: '11122233344458',
            email: 'empresa4@empresa4.com.br',
            telefone: '6733334444',
            ativo: true
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.empresas.indexOf(item)
        this.editedItem = Object.assign({}, item)
      },

      ativarDesativarEmpresa(item) {
        let resp = ""
        if(item.ativo)
          resp = confirm("Tem certeza que deseja desativar essa empresa?") 
        else
          resp = confirm("Tem certeza que deseja reativar essa empresa?") 
        
        if(resp){
          item.ativo = !item.ativo
        }
      },

        mostrarCadastro() {
            this.novoCadastro = !this.novoCadastro;
            this.reset()
            },

        close() {
            this.novoCadastro = false
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            this.reset()
        },

      save () {
          if (this.editedIndex > -1) {
            Object.assign(this.empresas[this.editedIndex], this.editedItem)
          }
          else {
            this.editedItem.ativo = true
            this.empresas.push(this.editedItem)
          }
        this.close()
      },

      reset(){
        this.$refs.form.reset();
        this.novoCadastro = false
      },

    },
  }
</script>

<style>
.transacaoInativa {
  color: #454547;
}
</style>
